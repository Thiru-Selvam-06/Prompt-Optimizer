<div align="center">

<!-- Animated fire header via SVG -->
<img src="https://readme-typing-svg.demolab.com?font=Syne&weight=800&size=64&pause=1000&color=FF4500&center=true&vCenter=true&width=600&height=100&lines=%F0%9F%94%A5+FIRE+prompts" alt="FIRE prompts" />

<img src="https://readme-typing-svg.demolab.com?font=Space+Mono&size=18&pause=2000&color=FF8C00&center=true&vCenter=true&width=700&height=40&lines=Transform+vague+prompts+into+expert+AI+instructions.;Powered+by+Gemini+2.0+Flash+%26+Groq+Llama+70B.;Injected+directly+into+ChatGPT+%26+Claude." alt="subtitle" />

<br/>

<!-- Badges -->
![Manifest](https://img.shields.io/badge/Manifest-v3-E05D44?style=for-the-badge&logo=googlechrome&logoColor=white)
![Version](https://img.shields.io/badge/Version-2.2-4C9E3F?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-007EC6?style=for-the-badge)
![Engines](https://img.shields.io/badge/Engines-Gemini_%2B_Groq-FF6B35?style=for-the-badge&logo=google&logoColor=white)
![Offline](https://img.shields.io/badge/Offline-Supported-555?style=for-the-badge)
![No Dependencies](https://img.shields.io/badge/Dependencies-Zero-22C55E?style=for-the-badge)

<br/><br/>

<!-- Hero image / demo gif placeholder -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=FF4500,FF8C00,FFD700&height=120&section=header&text=&fontAlign=50" width="100%"/>

</div>

---

<div align="center">

## 🔥 What is FIRE prompts?

**FIRE prompts** is a Chrome extension that rewrites your rough, vague prompts into structured, expert-level AI instructions — instantly, with one click.

It injects a native `🗿 Improvise` button directly inside **ChatGPT** and **Claude**, powered by a triple-engine stack: **Gemini 2.0 Flash**, **Groq Llama 3.3 70B**, and a **zero-dependency local fallback engine** that works completely offline.

</div>

---

## ✨ Features at a Glance

<table>
<tr>
<td width="50%">

### 🧠 Smart Category Detection
Keyword-weighted scoring across **8 prompt domains** — code, writing, analysis, creative, math, learning, business, and general. Multi-word keyword phrases score **3× higher** for precision matching.

</td>
<td width="50%">

### ⚡ Hybrid AI Fallback Chain
`Auto → Groq → Gemini → Local` — never fails. If one API hits quota, the next engine fires seamlessly. Your prompt is **always** optimized.

</td>
</tr>
<tr>
<td width="50%">

### 🗿 Native Button Injection
A `🗿 Improvise` button appears **inside** ChatGPT and Claude via DOM injection + `MutationObserver`. Works on SPA route changes.

</td>
<td width="50%">

### 🔌 Zero-Config Offline Engine
No API key needed. The local `PromptEngine` runs entirely in-browser using structured templates for every category. **Instant. Forever free.**

</td>
</tr>
<tr>
<td width="50%">

### 🔒 Private by Design
API keys live only in `chrome.storage.local` — never sent to any third-party server. FIRE prompts has **zero backend**.

</td>
<td width="50%">

### 💾 Session Memory
Last prompt, result, category, and provider are persisted across popup sessions. Your work is never lost.

</td>
</tr>
<tr>
<td width="50%">

### 🌙 Dark-Mode Aware UI
Loading and success overlays detect system dark/light preference at **runtime** — looks native on any OS theme.

</td>
<td width="50%">

### ⌨️ Keyboard Shortcut
Press `Ctrl+Enter` (or `⌘+Enter` on Mac) inside the popup to fire optimization — no mouse needed.

</td>
</tr>
</table>

---

## ⚙️ How It Works

```
 ┌─────────────┐     ┌──────────────────┐     ┌──────────────────────┐
 │  User types  │────▶│ Category Detector │────▶│  Provider Selector   │
 │   a prompt   │     │ (8 domain scoring)│     │  (auto / gemini /    │
 └─────────────┘     └──────────────────┘     │        groq)         │
                                               └──────────┬───────────┘
                                                          │
                          ┌───────────────────────────────┼──────────────────┐
                          ▼                               ▼                  ▼
                  ┌──────────────┐              ┌──────────────┐    ┌──────────────┐
                  │  ♊ Gemini    │              │  ⚡ Groq      │    │  🔌 Local    │
                  │  2.0 Flash   │              │  Llama 70B   │    │  Engine      │
                  │  (primary)   │              │  (primary)   │    │  (fallback)  │
                  └──────┬───────┘              └──────┬───────┘    └──────┬───────┘
                         │     on fail ──────────────▶ │  on fail ────────▶│
                         └────────────────────────────▶└──────────────────▶│
                                                                            ▼
                                                                   ┌──────────────┐
                                                                   │  ✨ Optimized │
                                                                   │     Prompt   │
                                                                   └──────────────┘
```

> **Auto mode** prefers Groq first (faster inference), then falls back to Gemini, then the local engine. Every path is guaranteed to produce an output.

---

## 🏎️ Engine Comparison

| Engine | Model | Speed | Quality | Free Tier | Offline |
|:---|:---|:---:|:---:|:---:|:---:|
| ♊ **Gemini** | `gemini-2.0-flash` | 🟡 Fast | ⭐⭐⭐⭐⭐ | ✅ Free | ❌ |
| ⚡ **Groq** | `llama-3.3-70b-versatile` | 🟢 Ultra Fast | ⭐⭐⭐⭐⭐ | ✅ Free | ❌ |
| 🔌 **Local** | PromptEngine v2.2 | 🟢 Instant | ⭐⭐⭐⭐ | ♾️ Always Free | ✅ |

---

## 📦 Installation

### Step 1 — Clone or Download

```bash
git clone https://github.com/your-username/fire-prompts.git
```

Or download the ZIP and extract it.

### Step 2 — Load in Chrome

1. Open `chrome://extensions` in your browser
2. Toggle **Developer Mode** ON (top-right)
3. Click **Load unpacked**
4. Select the `FIRE prompts/` folder

### Step 3 — Add API Keys _(optional)_

1. Click the 🔥 extension icon in your toolbar
2. Click ⚙️ **Settings**
3. Paste your **Gemini** and/or **Groq** key
4. Hit **Save & Verify All**

> Leave keys blank to use the built-in offline engine — no setup required.

**Get your free keys:**
- 🔑 [Gemini API Key](https://aistudio.google.com/apikey) — Google AI Studio (free tier)
- 🔑 [Groq API Key](https://console.groq.com/keys) — Groq Cloud (free tier)

### Step 4 — 🗿 Improvise!

Navigate to [chatgpt.com](https://chatgpt.com) or [claude.ai](https://claude.ai), type any rough prompt, and click the **🗿 Improvise** button that appears above the input — or press `Ctrl+Enter` in the popup.

---

## 🗂️ Project Structure

```
FIRE prompts/
│
├── manifest.json        # MV3 config — permissions, content_scripts, icons
├── popup.html           # Extension popup UI (settings, input, output)
├── popup.css            # All popup styles — dark theme, animations
├── popup.js             # Popup logic — provider waterfall, session state
│
├── prompt-engine.js     # LOCAL engine — category detection + prompt builder
├── gemini-api.js        # Gemini 2.0 Flash — validate, optimize, store key
├── groq-api.js          # Groq Llama 70B — validate, optimize, store key
│
├── content.js           # DOM injection + MutationObserver + UI overlays
│
├── icon16.png
├── icon48.png
└── icon128.png

Total: ~600 LOC · 0 dependencies · 0 build steps · 0 backend
```

---

## 🔬 Code Deep-Dive

### Hybrid Fallback Waterfall (`popup.js`)

```js
// Provider waterfall: preferred → fallback → guaranteed local engine
if (provider === 'gemini') {
  optimized = await tryGemini();
  if (!optimized) optimized = await tryGroq();       // seamless fallback

} else if (provider === 'groq') {
  optimized = await tryGroq();
  if (!optimized) optimized = await tryGemini();

} else {
  // Auto mode: Groq first (faster), Gemini second
  optimized = await tryGroq() ?? await tryGemini();
}

// Guaranteed offline fallback — this line never fails
if (!optimized) {
  const result = PromptEngine.optimize(text, category);
  optimized = result.optimized;
  usedProvider = 'Local';
}
```

### Category Scoring Engine (`prompt-engine.js`)

```js
// Multi-word keyword phrases score 3× for higher precision
for (const kw of config.keywords) {
  if (lower.includes(kw)) {
    score += kw.includes(' ') ? 3 : 1;
  }
}

// 8 categories: code · writing · analysis · creative
//               math · learning · business · general
if (score > bestScore) { bestScore = score; bestMatch = category; }
```

### MutationObserver Injection (`content.js`)

```js
// Re-inject button on every DOM change (handles SPA navigation)
const observer = new MutationObserver(() => {
  injectButton(); // idempotent: checks .fire-prompts-optimize-btn first
});

observer.observe(document.body, { childList: true, subtree: true });
```

### Gemini API Call (`gemini-api.js`)

```js
// Structured prompt sent to gemini-2.0-flash with controlled params
const body = {
  contents: [{ role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\n"${text}"` }] }],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 2048,
    topP: 0.95,
    topK: 40
  }
};

// Granular error handling per HTTP status code
if (response.status === 429) throw new Error('QUOTA_EXCEEDED — switching...');
if (response.status === 403) throw new Error('API not enabled on this key.');
```

---

## 🛡️ Error Handling

| Failure Mode | Behavior |
|:---|:---|
| 🔑 Invalid API key (401/400) | User-friendly message in settings status bar |
| ⏱️ Rate limit hit (429) | Silent switch to next provider in waterfall |
| 🌐 Network offline | Caught by try/catch → routes to local engine |
| 📭 Empty API response | Parser throws → triggers next fallback level |
| 🖋️ Empty prompt input | Red border flash + focus, no request fired |
| 🔄 SPA navigation (React) | MutationObserver re-injects button; idempotent |
| 🖥️ Missing DOM selector | Multiple fallback selectors per site, graceful skip |

---

## 🗺️ Supported Prompt Categories

<table>
<tr>
<td>💻 <b>Code</b> — algorithms, debugging, APIs, frameworks</td>
<td>✍️ <b>Writing</b> — essays, emails, stories, blogs</td>
</tr>
<tr>
<td>📊 <b>Analysis</b> — data, SWOT, metrics, forecasting</td>
<td>🎨 <b>Creative</b> — design, branding, ideation, UX</td>
</tr>
<tr>
<td>🔢 <b>Math</b> — equations, proofs, calculus, statistics</td>
<td>📚 <b>Learning</b> — explanations, tutorials, concepts</td>
</tr>
<tr>
<td>💼 <b>Business</b> — strategy, pitches, sales, operations</td>
<td>🌐 <b>General</b> — everything else, auto-structured</td>
</tr>
</table>

---

## 🔐 Permissions

| Permission | Why It's Needed |
|:---|:---|
| `storage` | Save API keys & last session in `chrome.storage.local` |
| `host_permissions: generativelanguage.googleapis.com` | Make requests to Gemini API |
| `host_permissions: api.groq.com` | Make requests to Groq API |
| `content_scripts: chatgpt.com, claude.ai` | Inject the Improvise button into these pages |

> **No tabs permission. No history permission. No browsing data.** Minimal surface area by design.

---

## 🗺️ Roadmap

- [ ] OpenAI GPT-4o as a 4th engine option
- [ ] Prompt history panel (last 20 optimizations)
- [ ] Per-category custom prompt templates (user-editable)
- [ ] Firefox (MV3) port
- [ ] Unit tests for `PromptEngine` (Jest)
- [ ] Keyboard shortcut to trigger injection from page (no popup needed)
- [ ] Export optimized prompt as `.txt` / copy-to-Notion

---

## 🤝 Contributing

```bash
# 1. Fork the repo, then clone your fork
git clone https://github.com/YOUR-USERNAME/fire-prompts.git

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make changes — load unpacked in Chrome to test live

# 4. Commit with a conventional message
git commit -m "feat(engine): add OpenAI GPT-4o provider"

# 5. Push and open a PR against main
git push origin feature/your-feature-name
```

**Commit conventions:** `feat` · `fix` · `refactor` · `docs` · `chore`

---

## 📄 License

```
MIT License — free to use, modify, and distribute.
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=FF4500,FF8C00,FFD700&height=100&section=footer" width="100%"/>

**Built with 🔥 and way too much caffeine.**

Get your free keys: &nbsp; [Gemini →](https://aistudio.google.com/apikey) &nbsp;·&nbsp; [Groq →](https://console.groq.com/keys)

![Made with Love](https://img.shields.io/badge/Made_with-🔥_Fire-FF4500?style=for-the-badge)

</div>
