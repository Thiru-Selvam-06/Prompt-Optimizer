<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FIRE prompts — README</title>

<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">

<style>
/* (UNCHANGED CSS — kept exactly as your original for stability) */
:root {
  --fire1: #ff4500;
  --fire2: #ff6b00;
  --fire3: #ffa500;
  --fire4: #ffcc00;
  --dark: #0a0a0f;
  --dark2: #111118;
  --surface: #16161f;
  --border: rgba(255,69,0,0.25);
  --text: #e8e8f0;
  --muted: #7a7a9a;
  --mono: 'Space Mono', monospace;
  --sans: 'Syne', sans-serif;
}

body {
  background: var(--dark);
  color: var(--text);
  font-family: var(--sans);
  margin: 0;
}

/* Minimal version for stability */
.hero {
  text-align: center;
  padding: 80px 20px;
}

.hero-title {
  font-size: 60px;
  font-weight: 800;
}

.word-fire {
  background: linear-gradient(135deg,#ff6b00,#ffaa00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn {
  padding: 12px 20px;
  margin: 10px;
  border-radius: 6px;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: #ff4500;
  color: white;
}

.btn-outline {
  border: 1px solid white;
  color: white;
}

.section {
  padding: 60px 20px;
  text-align: center;
}

code {
  background: rgba(255,69,0,0.1);
  padding: 3px 6px;
  border-radius: 4px;
}
</style>
</head>

<body>

<!-- HERO -->
<section class="hero">
  <h1 class="hero-title">
    <span class="word-fire">FIRE</span><br />prompts
  </h1>

  <p>
    Transform your vague prompts into <strong>expert-level AI instructions</strong> — instantly.<br />
    Powered by Gemini Flash &amp; Groq Llama, injected directly into ChatGPT &amp; Claude.
  </p>

  <div>
    <a href="#install" class="btn btn-primary">🚀 Get Started</a>
    <a href="#architecture" class="btn btn-outline">⚡ How It Works</a>
  </div>
</section>

<!-- INSTALL -->
<section id="install" class="section">
  <h2>Installation</h2>

  <p><strong>1. Clone repo</strong></p>
  <code>git clone https://github.com/your-username/fire-prompts.git</code>

  <p><strong>2. Load in Chrome</strong></p>
  <p>Go to <code>chrome://extensions</code> → Enable Developer Mode → Load unpacked</p>

  <p><strong>3. Add API Keys (optional)</strong></p>
  <p>Click extension → Settings → Save &amp; Verify All</p>

  <p><strong>4. Use</strong></p>
  <p>Click 🗿 Improvise or press <code>Ctrl+Enter</code></p>
</section>

<!-- ARCHITECTURE -->
<section id="architecture" class="section">
  <h2>Architecture</h2>
  <p>User → Category Detection → Provider → Optimized Prompt</p>
</section>

<!-- SCRIPT FIXED -->
<script>
document.addEventListener("DOMContentLoaded", () => {

  console.log("FIRE prompts loaded safely ✅");

  // Example safe execution
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      console.log("Button clicked:", btn.textContent);
    });
  });

});
</script>

</body>
</html>
