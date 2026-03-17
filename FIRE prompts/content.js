/**
 * FIRE prompts Content Script — Gemini & Groq Powered
 * Injects the "Improvise" button into ChatGPT and Claude.
 * Uses Gemini or Groq API when available, falls back to local PromptEngine.
 */
console.log('FIRE prompts: Content script loaded');

// ── Loading Overlay ─────────────────────────────────────────────────

function showLoadingOverlay(container) {
  const overlay = document.createElement('div');
  overlay.className = 'metaprompt-loading-overlay';

  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const bgColor = isDark ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)';

  overlay.style.cssText = `
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: ${bgColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    border-radius: 8px;
    backdrop-filter: blur(2px);
    box-sizing: border-box;
    overflow: hidden;
  `;

  const label = document.createElement('div');
  label.textContent = 'Improvising your prompt...';
  label.style.cssText = `
    font-family: ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #3b82f6;
    font-weight: 500;
    white-space: nowrap;
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fire-prompts-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes fire-prompts-shine {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .fire-prompts-loading-overlay::after {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
      animation: fire-prompts-shine 1.5s infinite;
      box-sizing: border-box;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
  overlay.appendChild(label);

  const target = container;
  if (getComputedStyle(target).position === 'static') {
    target.style.position = 'relative';
  }
  const prevOverflow = target.style.overflow;
  target.style.overflow = 'hidden';
  target.appendChild(overlay);
  overlay.dataset.originalOverflow = prevOverflow;

  return overlay;
}

function removeLoadingOverlay(overlay) {
  if (overlay && overlay.parentElement) {
    if (overlay.dataset.originalOverflow !== undefined) {
      overlay.parentElement.style.overflow = overlay.dataset.originalOverflow;
    }
    overlay.parentElement.removeChild(overlay);
  }
}

// ── Success Overlay ─────────────────────────────────────────────────

function showSuccessOverlay(container, duration = 1500) {
  const overlay = document.createElement('div');
  overlay.className = 'fire-prompts-success-overlay';

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const bgColor = isDark ? 'rgba(6, 78, 59, 0.7)' : 'rgba(236, 253, 245, 0.7)';

  overlay.style.cssText = `
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: ${bgColor};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    border-radius: 8px;
    backdrop-filter: blur(2px);
    animation: fire-prompts-fade-out 0.5s ${duration}ms forwards;
    box-sizing: border-box;
    overflow: hidden;
  `;

  const icon = document.createElement('div');
  icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
         fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fire-prompts-fade-out {
      0% { opacity: 1; }
      100% { opacity: 0; visibility: hidden; }
    }
    @keyframes fire-prompts-scale-in {
      0% { transform: scale(0); }
      70% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    .fire-prompts-success-icon {
      animation: fire-prompts-scale-in 0.3s ease-out;
    }
  `;
  document.head.appendChild(style);
  icon.className = 'fire-prompts-success-icon';
  overlay.appendChild(icon);

  const target = container;
  if (getComputedStyle(target).position === 'static') {
    target.style.position = 'relative';
  }
  const prevOverflow = target.style.overflow;
  target.style.overflow = 'hidden';
  overlay.dataset.originalOverflow = prevOverflow;
  target.appendChild(overlay);

  setTimeout(() => {
    if (overlay.parentElement) {
      if (overlay.dataset.originalOverflow !== undefined) {
        overlay.parentElement.style.overflow = overlay.dataset.originalOverflow;
      }
      overlay.parentElement.removeChild(overlay);
    }
  }, duration + 500);
}

// ── Optimize Prompt (Gemini or Local) ───────────────────────────────

async function optimizePrompt(text) {
  const keys = await new Promise((resolve) => {
    chrome.storage.local.get(['geminiApiKey', 'groqApiKey', 'lastProvider'], (data) => {
      resolve(data);
    });
  });

  const geminiKey = keys.geminiApiKey;
  const groqKey = keys.groqApiKey;
  const preferredProvider = keys.lastProvider || 'auto';

  async function tryGemini() {
    if (!geminiKey) return null;
    try {
      const optimized = await GeminiAPI.optimize(text, geminiKey);
      return { optimized, source: 'gemini' };
    } catch (err) {
      console.warn('FIRE prompts: Gemini API failed:', err.message);
      return null;
    }
  }

  async function tryGroq() {
    if (!groqKey) return null;
    try {
      const optimized = await GroqAPI.optimize(text, groqKey);
      return { optimized, source: 'groq' };
    } catch (err) {
      console.warn('FIRE prompts: Groq API failed:', err.message);
      return null;
    }
  }

  let result = null;

  if (preferredProvider === 'gemini') {
    result = await tryGemini();
    if (!result) result = await tryGroq();
  } else if (preferredProvider === 'groq') {
    result = await tryGroq();
    if (!result) result = await tryGemini();
  } else {
    // Auto: Prefer Groq then Gemini
    result = await tryGroq();
    if (!result) result = await tryGemini();
  }

  if (result) return result;

  // Fallback to local engine
  console.log('FIRE prompts: All APIs failed or unavailable, using local engine');
  const localResult = PromptEngine.optimize(text);
  return { optimized: localResult.optimized, source: 'local' };
}

// ── Create Optimize Button ──────────────────────────────────────────

function createOptimizeButton(inputEl, containerEl) {
  const button = document.createElement('button');
  button.textContent = '🗿 Improvise';
  button.style.cssText = `
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    position: absolute;
    left: 3px;
    bottom: 100%;
    padding: 4px 8px;
    border-radius: 12px;
    border-color: #D3D3D3;
    border-width: thin;
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 8px;
    margin-left: 12px;
    font-weight: 500;
    font-family: ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    transition: all 0.2s ease;
  `;

  button.addEventListener('mouseover', () => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      button.style.backgroundColor = '#1e3a5f';
      button.style.borderColor = '#3b82f6';
    } else {
      button.style.backgroundColor = '#f0f9ff';
      button.style.borderColor = '#93c5fd';
    }
  });

  button.addEventListener('mouseout', () => {
    button.style.backgroundColor = 'inherit';
    button.style.borderColor = '#D3D3D3';
  });

  button.addEventListener('click', async () => {
    try {
      const promptText = inputEl.innerText;
      if (!promptText || !promptText.trim()) return;

      button.innerHTML = '<span style="display: inline-block; animation: fire-prompts-pulse 1s infinite;">⏳</span> Improvising...';
      button.disabled = true;
      button.style.opacity = '0.7';

      const loadingOverlay = showLoadingOverlay(containerEl);

      // Optimize using Gemini or local engine
      const result = await optimizePrompt(promptText);

      removeLoadingOverlay(loadingOverlay);

      if (result && result.optimized) {
        const optimized = result.optimized.trim();

        inputEl.style.transition = 'opacity 0.3s ease';
        inputEl.style.opacity = '0';

        setTimeout(() => {
          // Robust text injection for rich text editors
          if (inputEl.tagName === 'TEXTAREA' || inputEl.tagName === 'INPUT') {
            inputEl.value = optimized;
          } else {
            inputEl.innerText = optimized;
          }

          // Dispatch multiple events to ensure the site's state updates
          const events = ['input', 'change', 'compositionend'];
          events.forEach(evtType => {
            inputEl.dispatchEvent(new Event(evtType, { bubbles: true }));
          });

          inputEl.style.opacity = '1';
          showSuccessOverlay(containerEl, 1500);

          button.innerHTML = '✅ Done!';
          button.style.backgroundColor = '#ecfdf5';
          button.style.borderColor = '#6ee7b7';
          button.style.color = '#059669';
          button.style.opacity = '1';

          setTimeout(() => {
            button.textContent = '🗿 Improvise';
            button.disabled = false;
            button.style.backgroundColor = 'inherit';
            button.style.borderColor = '#D3D3D3';
            button.style.color = 'initial';
          }, 2000);
        }, 300);

        chrome.storage.local.set({ lastPrompt: optimized });
      } else {
        button.innerHTML = '❌ Error';
        button.style.opacity = '1';
        setTimeout(() => {
          button.textContent = '🗿 Improvise';
          button.disabled = false;
          button.style.backgroundColor = 'inherit';
          button.style.borderColor = '#D3D3D3';
          button.style.color = 'initial';
        }, 2000);
      }

      inputEl.focus();
    } catch (err) {
      console.error('FIRE prompts error:', err);
      button.textContent = '🗿 Improvise';
      button.disabled = false;
    }
  });

  return button;
}

// ── DOM Injection ───────────────────────────────────────────────────

function injectButton() {
  const selectors = {
    'chatgpt.com': ['#prompt-textarea', '.ProseMirror', '[contenteditable="true"]'],
    'claude.ai': ['[contenteditable="true"]', '.ProseMirror', '#chat-input'],
  };

  const containerSelectors = {
    'chatgpt.com': ['[data-type="unified-composer"]', '.flex.flex-col.w-full.py-2.flex-grow', 'main form'],
    'claude.ai': {
      new: ['#chat-input-file-upload-onpage', '.flex.flex-col.gap-2'],
      chat: ['#chat-input-file-upload-bottom', '.flex.flex-col.gap-3'],
      default: ['#chat-input-file-upload-onpage', '[role="presentation"]'],
    },
  };

  const hostname = window.location.hostname;
  const pathname = window.location.pathname;

  let site;
  if (hostname.includes('chatgpt.com')) site = 'chatgpt.com';
  else if (hostname.includes('claude.ai')) site = 'claude.ai';

  if (!site) return;

  const inputSelector = selectors[site];
  let containerSelector;
  const cs = containerSelectors[site];

  if (Array.isArray(cs)) {
    containerSelector = cs;
  } else if (pathname.startsWith('/new') && cs.new) {
    containerSelector = cs.new;
  } else if (pathname.startsWith('/chat') && cs.chat) {
    containerSelector = cs.chat;
  } else if (cs.default) {
    containerSelector = cs.default;
  }

  if (!inputSelector || !containerSelector) return;

  // Try multiple selectors for robustness
  let inputEl = null;
  const inputSelectors = Array.isArray(inputSelector) ? inputSelector : [inputSelector];
  for (const s of inputSelectors) {
    const found = document.querySelector(s);
    if (found) {
      inputEl = found;
      break;
    }
  }

  let containerEl = null;
  const contSelectors = Array.isArray(containerSelector) ? containerSelector : [containerSelector];
  for (const s of contSelectors) {
    const found = document.querySelector(s);
    if (found) {
      containerEl = found;
      break;
    }
  }

  if (containerEl && inputEl) {
    if (!containerEl.parentElement) return;

    const parent = containerEl.parentElement;
    if (parent.querySelector('.fire-prompts-optimize-btn')) return;

    if (getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative';
    }

    const btn = createOptimizeButton(inputEl, containerEl);
    btn.classList.add('fire-prompts-optimize-btn');
    parent.appendChild(btn);
  }
}

// ── Initialize ──────────────────────────────────────────────────────

injectButton();

const observer = new MutationObserver(() => {
  injectButton();
});

observer.observe(document.body, { childList: true, subtree: true });
