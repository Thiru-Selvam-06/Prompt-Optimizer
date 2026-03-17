/**
 * FIRE prompts — Groq API Integration
 * Calls Groq Cloud to optimize prompts with LLM-quality results.
 * Falls back to local PromptEngine if no API key is configured.
 */

const GroqAPI = (() => {

    const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
    const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

    const SYSTEM_PROMPT = `You are FIRE prompts, an expert AI prompt engineer. Your job is to take a user's rough, vague, or unclear prompt and transform it into a highly effective, detailed, expert-level prompt that will get the best possible response from an AI assistant.

Rules:
1. REWRITE the prompt completely — don't just add instructions around it.
2. Make it specific, clear, and well-structured.
3. Add relevant context, constraints, and output format when helpful.
4. Assign an expert role/persona when appropriate.
5. Keep the user's original intent — don't change what they're asking for.
6. Use markdown formatting (headers, bullets) for complex prompts.
7. Output ONLY the optimized prompt — no explanations, no preamble, no "Here's the optimized prompt:" prefix.
8. The optimized prompt should be ready to paste directly into ChatGPT or Claude.`;

    /**
     * Call Groq API to optimize a prompt.
     * @param {string} text — the original prompt
     * @param {string} apiKey — Groq API key
     * @returns {Promise<string>} — the optimized prompt
     */
    async function optimize(text, apiKey) {
        if (!apiKey || !apiKey.trim()) {
            throw new Error('No Groq API key configured');
        }

        const body = {
            model: DEFAULT_MODEL,
            messages: [
                {
                    role: 'system',
                    content: SYSTEM_PROMPT
                },
                {
                    role: 'user',
                    content: `Optimize this prompt:\n\n"${text}"`
                }
            ],
            temperature: 0.7,
            max_tokens: 2048,
            top_p: 1
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMsg = errorData?.error?.message || `HTTP ${response.status}`;

            if (response.status === 401) {
                throw new Error('Invalid Groq API key. Please check your key in settings.');
            }
            if (response.status === 429) {
                throw new Error('QUOTA_EXCEEDED: Groq rate limit reached. Switching...');
            }

            throw new Error(`Groq API error: ${errorMsg}`);
        }

        const data = await response.json();
        const result = data?.choices?.[0]?.message?.content;

        if (!result) {
            throw new Error('Empty response from Groq. Please try again.');
        }

        return result.trim();
    }

    /**
     * Validate an API key by making a minimal request.
     * @param {string} apiKey
     * @returns {Promise<{valid: boolean, error?: string}>}
     */
    async function validateKey(apiKey) {
        try {
            const body = {
                model: DEFAULT_MODEL,
                messages: [{ role: 'user', content: 'Hi' }],
                max_tokens: 5
            };

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                return { valid: true };
            }

            const errorData = await response.json().catch(() => ({}));
            const errorMsg = errorData?.error?.message || `HTTP ${response.status}`;
            return { valid: false, error: errorMsg };
        } catch (err) {
            return { valid: false, error: err.message };
        }
    }

    /**
     * Save API key to chrome storage.
     */
    function saveKey(apiKey) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ groqApiKey: apiKey }, resolve);
        });
    }

    /**
     * Load API key from chrome storage.
     */
    function loadKey() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['groqApiKey'], (data) => {
                resolve(data.groqApiKey || '');
            });
        });
    }

    /**
     * Remove API key from chrome storage.
     */
    function removeKey() {
        return new Promise((resolve) => {
            chrome.storage.local.remove(['groqApiKey'], resolve);
        });
    }

    return { optimize, validateKey, saveKey, loadKey, removeKey };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GroqAPI;
}
