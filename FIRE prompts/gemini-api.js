/**
 * FIRE prompts — Gemini API Integration
 * Calls Google Gemini to optimize prompts with LLM-quality results.
 * Falls back to local PromptEngine if no API key is configured.
 */

const GeminiAPI = (() => {

    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

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
     * Call Gemini API to optimize a prompt.
     * @param {string} text — the original prompt
     * @param {string} apiKey — Gemini API key
     * @returns {Promise<string>} — the optimized prompt
     */
    async function optimize(text, apiKey) {
        if (!apiKey || !apiKey.trim()) {
            throw new Error('No API key configured');
        }

        const url = `${API_URL}?key=${apiKey}`;

        const body = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: `${SYSTEM_PROMPT}\n\n---\n\nUser's original prompt to optimize:\n\n"${text}"\n\nOptimized prompt:`
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2048,
                topP: 0.95,
                topK: 40
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMsg = errorData?.error?.message || `HTTP ${response.status}`;

            if (response.status === 400 && errorMsg.includes('API key')) {
                throw new Error('Invalid API key. Please check your Gemini API key in settings.');
            }
            if (response.status === 429) {
                throw new Error('QUOTA_EXCEEDED: Gemini free limit reached. Switching...');
            }
            if (response.status === 403) {
                throw new Error('API key does not have access. Make sure the Generative Language API is enabled.');
            }

            throw new Error(`Gemini API error: ${errorMsg}`);
        }

        const data = await response.json();

        const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!result) {
            throw new Error('Empty response from Gemini. Please try again.');
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
            const url = `${API_URL}?key=${apiKey}`;
            const body = {
                contents: [{ role: 'user', parts: [{ text: 'Hi' }] }],
                generationConfig: { maxOutputTokens: 5 }
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
            chrome.storage.local.set({ geminiApiKey: apiKey }, resolve);
        });
    }

    /**
     * Load API key from chrome storage.
     */
    function loadKey() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['geminiApiKey'], (data) => {
                resolve(data.geminiApiKey || '');
            });
        });
    }

    /**
     * Remove API key from chrome storage.
     */
    function removeKey() {
        return new Promise((resolve) => {
            chrome.storage.local.remove(['geminiApiKey'], resolve);
        });
    }

    return { optimize, validateKey, saveKey, loadKey, removeKey };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeminiAPI;
}
