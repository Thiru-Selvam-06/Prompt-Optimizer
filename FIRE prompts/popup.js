/**
 * FIRE prompts Popup — Gemini & Groq Powered
 * Uses Gemini or Groq API when keys are available.
 */

document.addEventListener('DOMContentLoaded', async () => {
    // ── DOM Elements ────────────────────────────────────────────────
    const userInput = document.getElementById('userInput');
    const categorySelect = document.getElementById('categorySelect');
    const providerSelect = document.getElementById('providerSelect');
    const submitButton = document.getElementById('submitButton');
    const outputDiv = document.getElementById('output');
    const responseText = document.getElementById('responseText');
    const copyButton = document.getElementById('copyButton');
    const categoryBadge = document.getElementById('categoryBadge');

    // Settings
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    const apiKeyInput = document.getElementById('apiKeyInput'); // Gemini
    const groqKeyInput = document.getElementById('groqKeyInput');
    const toggleKeyVisibility = document.getElementById('toggleKeyVisibility');
    const toggleGroqKeyVisibility = document.getElementById('toggleGroqKeyVisibility');
    const saveKeysBtn = document.getElementById('saveKeysBtn');
    const removeKeysBtn = document.getElementById('removeKeysBtn');
    const apiStatus = document.getElementById('apiStatus');
    const engineIcon = document.getElementById('engineIcon');
    const engineLabel = document.getElementById('engineLabel');

    let hasGemini = false;
    let hasGroq = false;

    // ── Initialize ──────────────────────────────────────────────────

    async function updateInternalState() {
        const geminiKey = await GeminiAPI.loadKey();
        const groqKey = await GroqAPI.loadKey();

        hasGemini = !!geminiKey;
        hasGroq = !!groqKey;

        if (geminiKey) apiKeyInput.value = geminiKey;
        if (groqKey) groqKeyInput.value = groqKey;

        if (hasGemini || hasGroq) {
            removeKeysBtn.style.display = 'inline-block';
            setEngineStatus(hasGemini && hasGroq ? 'both' : (hasGemini ? 'gemini' : 'groq'));
        } else {
            removeKeysBtn.style.display = 'none';
            setEngineStatus('local');
        }
    }

    await updateInternalState();

    // Load last session
    chrome.storage.local.get(['lastPrompt', 'lastOptimized', 'lastCategory', 'lastProvider'], (data) => {
        if (data.lastPrompt) userInput.value = data.lastPrompt;
        if (data.lastProvider) providerSelect.value = data.lastProvider;
        if (data.lastOptimized) {
            responseText.textContent = data.lastOptimized;
            outputDiv.style.display = 'block';
            if (data.lastCategory) categoryBadge.textContent = data.lastCategory;
        }
    });

    // ── Engine Status ───────────────────────────────────────────────

    function setEngineStatus(mode) {
        if (mode === 'both') {
            engineIcon.textContent = '🔥';
            engineLabel.textContent = 'Gemini & Groq Active — Maximum Power';
            engineLabel.parentElement.className = 'engine-status status-gemini';
        } else if (mode === 'gemini') {
            engineIcon.textContent = '🚀';
            engineLabel.textContent = 'Gemini AI Active';
            engineLabel.parentElement.className = 'engine-status status-gemini';
        } else if (mode === 'groq') {
            engineIcon.textContent = '⚡';
            engineLabel.textContent = 'Groq AI Active';
            engineLabel.parentElement.className = 'engine-status status-gemini';
        } else {
            engineIcon.textContent = '🔌';
            engineLabel.textContent = 'Local Engine — Add API keys for AI power';
            engineLabel.parentElement.className = 'engine-status status-local';
        }
    }

    // ── Settings Panel ──────────────────────────────────────────────

    settingsToggle.addEventListener('click', () => {
        const isVisible = settingsPanel.style.display !== 'none';
        settingsPanel.style.display = isVisible ? 'none' : 'block';
        settingsToggle.classList.toggle('active', !isVisible);
    });

    toggleKeyVisibility.addEventListener('click', () => {
        const isPassword = apiKeyInput.type === 'password';
        apiKeyInput.type = isPassword ? 'text' : 'password';
        toggleKeyVisibility.textContent = isPassword ? '🙈' : '👁️';
    });

    toggleGroqKeyVisibility.addEventListener('click', () => {
        const isPassword = groqKeyInput.type === 'password';
        groqKeyInput.type = isPassword ? 'text' : 'password';
        toggleGroqKeyVisibility.textContent = isPassword ? '🙈' : '👁️';
    });

    saveKeysBtn.addEventListener('click', async () => {
        const geminiKey = apiKeyInput.value.trim();
        const groqKey = groqKeyInput.value.trim();

        saveKeysBtn.disabled = true;
        saveKeysBtn.textContent = 'Verifying...';
        showApiStatus('Verifying keys...', 'info');

        let results = [];
        if (geminiKey) {
            const res = await GeminiAPI.validateKey(geminiKey);
            if (res.valid) {
                await GeminiAPI.saveKey(geminiKey);
                results.push('Gemini ✅');
            } else {
                results.push(`Gemini ❌ (${res.error})`);
            }
        }

        if (groqKey) {
            const res = await GroqAPI.validateKey(groqKey);
            if (res.valid) {
                await GroqAPI.saveKey(groqKey);
                results.push('Groq ✅');
            } else {
                results.push(`Groq ❌ (${res.error})`);
            }
        }

        if (results.length === 0) {
            showApiStatus('No keys entered.', 'error');
        } else {
            showApiStatus(results.join(' | '), 'info');
        }

        await updateInternalState();
        saveKeysBtn.disabled = false;
        saveKeysBtn.textContent = 'Save & Verify All';
    });

    removeKeysBtn.addEventListener('click', async () => {
        await GeminiAPI.removeKey();
        await GroqAPI.removeKey();
        apiKeyInput.value = '';
        groqKeyInput.value = '';
        await updateInternalState();
        showApiStatus('All keys removed.', 'info');
    });

    function showApiStatus(message, type) {
        apiStatus.textContent = message;
        apiStatus.style.display = 'block';
        apiStatus.className = `api-status api-status-${type}`;
    }

    // ── Optimize ────────────────────────────────────────────────────

    submitButton.addEventListener('click', async () => {
        const text = userInput.value.trim();
        if (!text) {
            userInput.focus();
            userInput.style.borderColor = '#ef4444';
            setTimeout(() => { userInput.style.borderColor = ''; }, 1500);
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = '⏳ Improvising...';

        try {
            let optimized;
            let category = categorySelect.value;
            let provider = providerSelect.value;
            let usedProvider = 'Local';

            // Hybrid Fallback Logic
            const geminiKey = await GeminiAPI.loadKey();
            const groqKey = await GroqAPI.loadKey();

            async function tryGemini() {
                if (!geminiKey) return null;
                try {
                    const res = await GeminiAPI.optimize(text, geminiKey);
                    usedProvider = 'Gemini';
                    return res;
                } catch (e) { return null; }
            }

            async function tryGroq() {
                if (!groqKey) return null;
                try {
                    const res = await GroqAPI.optimize(text, groqKey);
                    usedProvider = 'Groq';
                    return res;
                } catch (e) { return null; }
            }

            if (provider === 'gemini') {
                optimized = await tryGemini();
                if (!optimized) optimized = await tryGroq(); // Fallback to Groq
            } else if (provider === 'groq') {
                optimized = await tryGroq();
                if (!optimized) optimized = await tryGemini(); // Fallback to Gemini
            } else {
                // Auto: Prefer Groq then Gemini
                optimized = await tryGroq();
                if (!optimized) optimized = await tryGemini();
            }

            if (!optimized) {
                // Final fallback to Local Engine
                const result = PromptEngine.optimize(text, category);
                optimized = result.optimized;
                category = result.category;
                usedProvider = 'Local';
            } else if (category === 'auto') {
                category = PromptEngine.detectCategory(text) || 'general';
            }

            // Show result
            responseText.textContent = optimized;
            categoryBadge.textContent = `${category} (${usedProvider})`;
            outputDiv.style.display = 'block';

            // Animate
            void outputDiv.offsetWidth;
            outputDiv.classList.add('output-card');

            // Save
            chrome.storage.local.set({
                lastPrompt: text,
                lastOptimized: optimized,
                lastCategory: category,
                lastProvider: provider
            });

        } catch (err) {
            responseText.textContent = `Error: ${err.message}. Using local fallback...`;
            const result = PromptEngine.optimize(text, categorySelect.value);
            responseText.textContent = result.optimized;
            categoryBadge.textContent = `${result.category} (Local)`;
            outputDiv.style.display = 'block';
        }

        submitButton.disabled = false;
        submitButton.textContent = '🗿 Improvise';
    });

    // ── Copy ────────────────────────────────────────────────────────

    copyButton.addEventListener('click', () => {
        const text = responseText.textContent;
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
            const feedback = document.createElement('span');
            feedback.textContent = '✓ Copied!';
            feedback.className = 'copy-feedback';
            copyButton.style.position = 'relative';
            copyButton.appendChild(feedback);
            setTimeout(() => feedback.remove(), 1500);
        });
    });

    // Ctrl+Enter shortcut
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            submitButton.click();
        }
    });
});
