<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FIRE prompts — README</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --fire1: #ff4500;
    --fire2: #ff6b00;
    --fire3: #ffa500;
    --fire4: #ffcc00;
    --ember: #ff2d00;
    --dark: #0a0a0f;
    --dark2: #111118;
    --dark3: #1a1a24;
    --surface: #16161f;
    --border: rgba(255,69,0,0.25);
    --text: #e8e8f0;
    --muted: #7a7a9a;
    --mono: 'Space Mono', monospace;
    --sans: 'Syne', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--dark);
    color: var(--text);
    font-family: var(--sans);
    overflow-x: hidden;
    cursor: default;
  }

  /* ── Fire canvas background ── */
  #fireCanvas {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.07;
  }

  /* ── Particle field ── */
  .sparks-layer {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  }

  .spark {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: var(--fire3);
    animation: floatSpark linear infinite;
    opacity: 0;
  }

  @keyframes floatSpark {
    0%   { transform: translateY(100vh) translateX(0px) scale(1); opacity: 0; }
    10%  { opacity: 1; }
    50%  { transform: translateY(50vh) translateX(var(--drift)) scale(1.5); opacity: 0.8; }
    90%  { opacity: 0.3; }
    100% { transform: translateY(-10vh) translateX(calc(var(--drift) * 2)) scale(0); opacity: 0; }
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--dark); }
  ::-webkit-scrollbar-thumb { background: var(--fire1); border-radius: 2px; }

  /* ── Layout ── */
  .wrapper {
    position: relative;
    z-index: 2;
    max-width: 920px;
    margin: 0 auto;
    padding: 0 32px;
  }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 32px;
    position: relative;
  }

  .hero-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,69,0,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Animated flame emoji */
  .flame-icon {
    font-size: 96px;
    display: block;
    animation: flamePulse 2s ease-in-out infinite, flameShake 0.15s ease-in-out infinite;
    filter: drop-shadow(0 0 30px rgba(255,100,0,0.8)) drop-shadow(0 0 60px rgba(255,50,0,0.5));
    margin-bottom: 24px;
    position: relative;
    z-index: 2;
  }

  @keyframes flamePulse {
    0%,100% { transform: scale(1) translateY(0); }
    50%      { transform: scale(1.08) translateY(-6px); }
  }
  @keyframes flameShake {
    0%,100% { transform: rotate(-1deg); }
    50%      { transform: rotate(1deg); }
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,69,0,0.1);
    border: 1px solid rgba(255,69,0,0.3);
    border-radius: 100px;
    padding: 6px 16px;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--fire3);
    margin-bottom: 24px;
    animation: fadeSlideDown 0.6s ease both;
  }

  .badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--fire1);
    animation: blink 1.5s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }

  .hero-title {
    font-size: clamp(64px, 10vw, 112px);
    font-weight: 800;
    line-height: 0.9;
    letter-spacing: -0.03em;
    margin-bottom: 16px;
    position: relative;
    animation: fadeSlideUp 0.7s 0.1s ease both;
  }

  .hero-title .word-fire {
    background: linear-gradient(135deg, #ff6b00 0%, #ff4500 30%, #ffaa00 60%, #ff6b00 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0%,100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }

  .hero-subtitle {
    font-size: clamp(18px, 3vw, 26px);
    font-weight: 400;
    color: var(--muted);
    margin-bottom: 48px;
    max-width: 600px;
    line-height: 1.5;
    animation: fadeSlideUp 0.7s 0.2s ease both;
  }

  .hero-subtitle span {
    color: var(--fire3);
    font-weight: 600;
  }

  .btn-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
    animation: fadeSlideUp 0.7s 0.3s ease both;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    border-radius: 8px;
    font-family: var(--sans);
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
    letter-spacing: 0.01em;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--fire1), var(--fire2));
    color: #fff;
    box-shadow: 0 4px 24px rgba(255,69,0,0.4), 0 0 0 0 rgba(255,69,0,0.4);
    animation: pulseShadow 2s ease infinite;
  }

  @keyframes pulseShadow {
    0%,100% { box-shadow: 0 4px 24px rgba(255,69,0,0.4), 0 0 0 0 rgba(255,69,0,0); }
    50%      { box-shadow: 0 4px 32px rgba(255,69,0,0.6), 0 0 0 8px rgba(255,69,0,0); }
  }

  .btn-primary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 36px rgba(255,69,0,0.6);
  }

  .btn-outline {
    background: transparent;
    color: var(--text);
    border: 1px solid rgba(255,255,255,0.15);
  }
  .btn-outline:hover {
    border-color: var(--fire1);
    color: var(--fire3);
    transform: translateY(-2px);
    background: rgba(255,69,0,0.05);
  }

  /* ── Stats strip ── */
  .stats-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    margin: 80px 0;
  }

  .stat-cell {
    background: var(--surface);
    padding: 28px 24px;
    text-align: center;
    transition: background 0.2s;
  }
  .stat-cell:hover { background: var(--dark3); }

  .stat-number {
    font-family: var(--mono);
    font-size: 32px;
    font-weight: 700;
    color: var(--fire3);
    display: block;
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-label {
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: var(--mono);
  }

  /* ── Section titles ── */
  .section {
    padding: 80px 0;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .section-tag {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--fire1);
    margin-bottom: 12px;
    display: block;
  }

  .section-title {
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 20px;
  }

  .section-desc {
    font-size: 17px;
    color: var(--muted);
    line-height: 1.7;
    max-width: 640px;
    margin-bottom: 48px;
  }

  /* ── Feature grid ── */
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .feature-card {
    background: var(--surface);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 28px 24px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: default;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,69,0,0.08) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .feature-card:hover {
    border-color: rgba(255,69,0,0.35);
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,69,0,0.1);
  }

  .feature-card:hover::before { opacity: 1; }

  .feature-icon {
    font-size: 32px;
    margin-bottom: 16px;
    display: block;
    filter: drop-shadow(0 0 8px rgba(255,100,0,0.4));
  }

  .feature-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--text);
  }

  .feature-desc {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.6;
  }

  /* NEW badge */
  .new-badge {
    display: inline-block;
    background: linear-gradient(90deg, var(--fire1), var(--fire2));
    color: #fff;
    font-family: var(--mono);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding: 2px 7px;
    border-radius: 4px;
    text-transform: uppercase;
    vertical-align: middle;
    margin-left: 8px;
    animation: newBadgePop 2s ease-in-out infinite;
  }

  @keyframes newBadgePop {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.06); }
  }

  /* ── Architecture diagram ── */
  .arch-diagram {
    background: var(--dark2);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 48px 40px;
    position: relative;
    overflow: hidden;
  }

  .arch-diagram::after {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,69,0,0.15), transparent 70%);
    pointer-events: none;
  }

  .flow-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    flex-wrap: wrap;
    row-gap: 24px;
  }

  .flow-node {
    background: var(--surface);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 14px 20px;
    text-align: center;
    min-width: 120px;
    transition: all 0.25s;
    position: relative;
  }

  .flow-node:hover {
    border-color: var(--fire1);
    box-shadow: 0 0 20px rgba(255,69,0,0.25);
    transform: scale(1.04);
  }

  .flow-node-icon { font-size: 22px; display: block; margin-bottom: 4px; }
  .flow-node-label { font-size: 12px; color: var(--muted); font-family: var(--mono); }

  .flow-arrow {
    color: var(--fire1);
    font-size: 20px;
    padding: 0 8px;
    animation: arrowPulse 1.5s ease-in-out infinite;
    flex-shrink: 0;
  }

  @keyframes arrowPulse {
    0%,100% { opacity: 0.4; transform: translateX(0); }
    50%      { opacity: 1;   transform: translateX(4px); }
  }

  .flow-fork {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .flow-option {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--surface);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 12px;
    font-family: var(--mono);
    color: var(--muted);
    transition: all 0.2s;
  }

  .flow-option:hover {
    border-color: var(--fire2);
    color: var(--fire3);
  }

  .flow-option-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── Code block ── */
  .code-block {
    background: var(--dark2);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    margin: 24px 0;
  }

  .code-titlebar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 18px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.02);
  }

  .code-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
  }

  .code-filename {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--muted);
    margin-left: 4px;
  }

  .code-body {
    padding: 24px;
    font-family: var(--mono);
    font-size: 13px;
    line-height: 1.7;
    overflow-x: auto;
    color: #c9d1d9;
  }

  .code-body .c-comment { color: #6a737d; font-style: italic; }
  .code-body .c-keyword { color: #ff7b72; }
  .code-body .c-string  { color: #a5d6ff; }
  .code-body .c-func    { color: #d2a8ff; }
  .code-body .c-prop    { color: #79c0ff; }
  .code-body .c-value   { color: #ffa657; }
  .code-body .c-fire    { color: #ff6b35; }

  /* ── Install steps ── */
  .steps-list {
    counter-reset: steps;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .step-item {
    counter-increment: steps;
    display: flex;
    gap: 24px;
    padding: 32px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    position: relative;
    align-items: flex-start;
  }

  .step-item:last-child { border-bottom: none; }

  .step-num {
    flex-shrink: 0;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(255,69,0,0.1);
    border: 1px solid rgba(255,69,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--mono);
    font-size: 15px;
    font-weight: 700;
    color: var(--fire1);
    position: relative;
    z-index: 1;
    transition: all 0.2s;
  }

  .step-item:hover .step-num {
    background: rgba(255,69,0,0.2);
    border-color: var(--fire1);
    box-shadow: 0 0 20px rgba(255,69,0,0.3);
  }

  .step-connector {
    position: absolute;
    left: 21px;
    top: 76px;
    bottom: -32px;
    width: 1px;
    background: linear-gradient(to bottom, rgba(255,69,0,0.3), transparent);
  }

  .step-item:last-child .step-connector { display: none; }

  .step-body { flex: 1; padding-top: 8px; }
  .step-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
  .step-desc { font-size: 15px; color: var(--muted); line-height: 1.6; }

  /* ── API comparison table ── */
  .compare-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .compare-table th {
    background: var(--surface);
    padding: 14px 20px;
    text-align: left;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .compare-table td {
    padding: 14px 20px;
    font-size: 14px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background 0.15s;
  }

  .compare-table tr:hover td { background: rgba(255,69,0,0.04); }
  .compare-table tr:last-child td { border-bottom: none; }

  .td-check { color: #22c55e; font-size: 16px; }
  .td-free  { background: rgba(34,197,94,0.08); color: #4ade80; font-size: 12px; font-family: var(--mono); padding: 2px 8px; border-radius: 4px; }
  .td-fast  { background: rgba(251,191,36,0.08); color: #fbbf24; font-size: 12px; font-family: var(--mono); padding: 2px 8px; border-radius: 4px; }

  /* ── Terminal demo ── */
  .terminal {
    background: #0d1117;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    overflow: hidden;
  }

  .terminal-bar {
    background: #161b22;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .t-dot { width: 10px; height: 10px; border-radius: 50%; }

  .terminal-body {
    padding: 24px;
    font-family: var(--mono);
    font-size: 13px;
    line-height: 1.8;
  }

  .t-prompt { color: #ff6b35; }
  .t-cmd    { color: #e6edf3; }
  .t-output { color: #8b949e; }
  .t-success{ color: #3fb950; }
  .t-accent { color: #ffa657; }

  .type-cursor {
    display: inline-block;
    width: 8px; height: 14px;
    background: var(--fire1);
    margin-left: 2px;
    vertical-align: middle;
    animation: blink 0.8s steps(1) infinite;
  }

  /* ── Scroll reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: none;
  }

  /* ── Footer ── */
  .footer {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 48px 0;
    text-align: center;
  }

  .footer-flame { font-size: 40px; display: block; margin-bottom: 16px; animation: flamePulse 2s ease-in-out infinite; }

  .footer-text {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--muted);
    line-height: 1.8;
  }

  .footer-text a { color: var(--fire3); text-decoration: none; transition: color 0.2s; }
  .footer-text a:hover { color: var(--fire1); }

  /* ── Shields strip ── */
  .shields-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 32px;
  }

  .shield {
    display: inline-flex;
    align-items: center;
    gap: 0;
    border-radius: 6px;
    overflow: hidden;
    font-family: var(--mono);
    font-size: 12px;
    height: 22px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.4);
  }

  .shield-label {
    background: #333;
    color: #ccc;
    padding: 0 8px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .shield-value {
    padding: 0 8px;
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: 700;
    color: #fff;
  }

  /* ── Animations ── */
  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: none; }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .feature-grid { grid-template-columns: 1fr; }
    .stats-strip  { grid-template-columns: repeat(2, 1fr); }
    .flow-row     { flex-direction: column; align-items: center; }
    .flow-arrow   { transform: rotate(90deg); padding: 4px 0; }
  }

  /* ── Horizontal scroll marquee ── */
  .marquee-strip {
    background: rgba(255,69,0,0.06);
    border-top: 1px solid rgba(255,69,0,0.15);
    border-bottom: 1px solid rgba(255,69,0,0.15);
    padding: 14px 0;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    z-index: 2;
  }

  .marquee-inner {
    display: inline-block;
    animation: marqueeScroll 30s linear infinite;
  }

  .marquee-item {
    display: inline-block;
    font-family: var(--mono);
    font-size: 12px;
    color: var(--fire3);
    letter-spacing: 0.1em;
    margin: 0 32px;
    opacity: 0.7;
  }

  .marquee-item::before { content: '🔥  '; }

  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* inline tag */
  code {
    font-family: var(--mono);
    font-size: 0.85em;
    background: rgba(255,69,0,0.12);
    color: var(--fire3);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid rgba(255,69,0,0.2);
  }
</style>
</head>
<body>

<!-- Fire background canvas -->
<canvas id="fireCanvas"></canvas>

<!-- Floating sparks -->
<div class="sparks-layer" id="sparksLayer"></div>

<!-- ════════════════════ HERO ════════════════════ -->
<section class="hero">
  <div class="hero-glow"></div>

  <div class="shields-row" style="justify-content:center; animation: fadeSlideDown 0.5s both;">
    <div class="shield"><span class="shield-label">manifest</span><span class="shield-value" style="background:#e05d44;">v3</span></div>
    <div class="shield"><span class="shield-label">version</span><span class="shield-value" style="background:#4c9e3f;">2.2</span></div>
    <div class="shield"><span class="shield-label">license</span><span class="shield-value" style="background:#007ec6;">MIT</span></div>
    <div class="shield"><span class="shield-label">engines</span><span class="shield-value" style="background:#ff6b35;">Gemini + Groq</span></div>
    <div class="shield"><span class="shield-label">targets</span><span class="shield-value" style="background:#555;">ChatGPT · Claude</span></div>
  </div>

  <span class="flame-icon">🔥</span>

  <span class="hero-badge">
    <span class="badge-dot"></span>
    Chrome Extension · MV3 · Free & Open
  </span>

  <h1 class="hero-title">
    <span class="word-fire">FIRE</span><br>prompts
  </h1>

  <p class="hero-subtitle">
    Transform your vague prompts into <span>expert-level AI instructions</span> — instantly.<br>
    Powered by Gemini Flash & Groq Llama, injected directly into ChatGPT &amp; Claude.
  </p>

  <div class="btn-row">
    <a href="#install" class="btn btn-primary">
      <span>🚀</span> Get Started
    </a>
    <a href="#architecture" class="btn btn-outline">
      <span>⚡</span> How It Works
    </a>
  </div>
</section>

<!-- ════════════ MARQUEE ════════════ -->
<div class="marquee-strip">
  <div class="marquee-inner">
    <span class="marquee-item">Smart Category Detection</span>
    <span class="marquee-item">Hybrid AI Fallback</span>
    <span class="marquee-item">Gemini 2.0 Flash</span>
    <span class="marquee-item">Groq Llama 3.3 70B</span>
    <span class="marquee-item">ChatGPT Injection</span>
    <span class="marquee-item">Claude Injection</span>
    <span class="marquee-item">Local Offline Engine</span>
    <span class="marquee-item">Zero Data Retention</span>
    <span class="marquee-item">One-Click Optimize</span>
    <span class="marquee-item">Ctrl+Enter Shortcut</span>
    <!-- dupe for seamless loop -->
    <span class="marquee-item">Smart Category Detection</span>
    <span class="marquee-item">Hybrid AI Fallback</span>
    <span class="marquee-item">Gemini 2.0 Flash</span>
    <span class="marquee-item">Groq Llama 3.3 70B</span>
    <span class="marquee-item">ChatGPT Injection</span>
    <span class="marquee-item">Claude Injection</span>
    <span class="marquee-item">Local Offline Engine</span>
    <span class="marquee-item">Zero Data Retention</span>
    <span class="marquee-item">One-Click Optimize</span>
    <span class="marquee-item">Ctrl+Enter Shortcut</span>
  </div>
</div>

<!-- ════════════ STATS ════════════ -->
<div class="wrapper">
  <div class="stats-strip reveal">
    <div class="stat-cell">
      <span class="stat-number" data-target="8">0</span>
      <span class="stat-label">Prompt Categories</span>
    </div>
    <div class="stat-cell">
      <span class="stat-number" data-target="3">0</span>
      <span class="stat-label">AI Engines</span>
    </div>
    <div class="stat-cell">
      <span class="stat-number" data-target="2">0</span>
      <span class="stat-label">Target Platforms</span>
    </div>
    <div class="stat-cell">
      <span class="stat-number" data-suffix="ms" data-target="0">—</span>
      <span class="stat-label">Offline Latency</span>
    </div>
  </div>

  <!-- ════════════ FEATURES ════════════ -->
  <section class="section reveal">
    <span class="section-tag">// what makes it special</span>
    <h2 class="section-title">Every feature,<br>built to <span style="color:var(--fire1)">ignite</span>.</h2>
    <p class="section-desc">From instant offline optimization to cloud AI fallback chains — FIRE prompts is engineered to never leave you without a better prompt.</p>

    <div class="feature-grid">

      <div class="feature-card">
        <span class="feature-icon">🧠</span>
        <div class="feature-title">Smart Category Detection</div>
        <p class="feature-desc">Keyword-weighted scoring across 8 domains (code, writing, analysis, creative, math, learning, business, general) — multi-word phrases score 3×.</p>
      </div>

      <div class="feature-card">
        <span class="feature-icon">⚡</span>
        <div class="feature-title">Hybrid Fallback Chain <span class="new-badge">NEW</span></div>
        <p class="feature-desc">Auto → Groq → Gemini → Local. Never fails. If one API quota hits, the next fires instantly. Your prompt is always optimized.</p>
      </div>

      <div class="feature-card">
        <span class="feature-icon">🗿</span>
        <div class="feature-title">Injected Improvise Button</div>
        <p class="feature-desc">A floating <code>🗿 Improvise</code> button appears natively inside ChatGPT and Claude — no copy-pasting needed.</p>
      </div>

      <div class="feature-card">
        <span class="feature-icon">🔌</span>
        <div class="feature-title">Zero-Config Offline Engine</div>
        <p class="feature-desc">No API key? No problem. The local <code>PromptEngine</code> runs entirely in-browser, using structured prompt templates for every category.</p>
      </div>

      <div class="feature-card">
        <span class="feature-icon">🔒</span>
        <div class="feature-title">Private by Design</div>
        <p class="feature-desc">API keys are stored only in <code>chrome.storage.local</code> — never sent to our servers. FIRE prompts has zero backend.</p>
      </div>

      <div class="feature-card">
        <span class="feature-icon">💾</span>
        <div class="feature-title">Session Memory <span class="new-badge">NEW</span></div>
        <p class="feature-desc">Last prompt, optimized result, category, and provider are persisted across popup sessions so you never lose your work.</p>
      </div>

      <div class="feature-card">
        <span class="feature-icon">🎨</span>
        <div class="feature-title">Dark-Mode Aware UI</div>
        <p class="feature-desc">Loading and success overlays detect system dark/light preference at runtime — looks native everywhere.</p>
      </div>

      <div class="feature-card">
        <span class="feature-icon">♊</span>
        <div class="feature-title">Gemini 2.0 Flash</div>
        <p class="feature-desc">Hits Google's fastest multimodal model — <code>gemini-2.0-flash</code> — with 2048-token output budget. Free tier included.</p>
      </div>

      <div class="feature-card">
        <span class="feature-icon">🦙</span>
        <div class="feature-title">Groq Llama 3.3 70B <span class="new-badge">NEW</span></div>
        <p class="feature-desc"><code>llama-3.3-70b-versatile</code> via Groq's hyper-fast inference API — sub-second prompt rewrites at scale.</p>
      </div>

    </div>
  </section>

  <!-- ════════════ ARCHITECTURE ════════════ -->
  <section class="section reveal" id="architecture">
    <span class="section-tag">// system architecture</span>
    <h2 class="section-title">Waterfall.<br><span style="color:var(--fire1)">Never fails.</span></h2>
    <p class="section-desc">FIRE prompts uses a deterministic provider waterfall — preferred provider first, graceful degradation to the next, guaranteed local fallback last.</p>

    <div class="arch-diagram">
      <div class="flow-row">
        <div class="flow-node">
          <span class="flow-node-icon">⌨️</span>
          <span class="flow-node-label">User Prompt</span>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">
          <span class="flow-node-icon">🧠</span>
          <span class="flow-node-label">Category<br>Detector</span>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">
          <span class="flow-node-icon">🤖</span>
          <span class="flow-node-label">Provider<br>Selector</span>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-fork">
          <div class="flow-option">
            <span class="flow-option-dot" style="background:#ff6b35;"></span>
            <span>♊ Gemini 2.0 Flash</span>
          </div>
          <div class="flow-option">
            <span class="flow-option-dot" style="background:#fbbf24;"></span>
            <span>⚡ Groq Llama 70B</span>
          </div>
          <div class="flow-option">
            <span class="flow-option-dot" style="background:#6b7280;"></span>
            <span>🔌 Local Engine</span>
          </div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-node">
          <span class="flow-node-icon">✨</span>
          <span class="flow-node-label">Optimized<br>Prompt</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ════════════ PROVIDER COMPARISON ════════════ -->
  <section class="section reveal">
    <span class="section-tag">// provider matrix</span>
    <h2 class="section-title">Choose your<br><span style="color:var(--fire1)">engine.</span></h2>
    <p class="section-desc">All three engines produce structured, expert-grade prompts. Add API keys to unlock cloud AI — or run fully offline.</p>

    <table class="compare-table">
      <thead>
        <tr>
          <th>Engine</th>
          <th>Model</th>
          <th>Speed</th>
          <th>Quality</th>
          <th>Free Tier</th>
          <th>Offline</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>♊ <strong>Gemini</strong></td>
          <td><code>gemini-2.0-flash</code></td>
          <td><span class="td-fast">Fast</span></td>
          <td>⭐⭐⭐⭐⭐</td>
          <td><span class="td-free">✓ Free</span></td>
          <td>—</td>
        </tr>
        <tr>
          <td>⚡ <strong>Groq</strong></td>
          <td><code>llama-3.3-70b-versatile</code></td>
          <td><span class="td-fast">Ultra Fast</span></td>
          <td>⭐⭐⭐⭐⭐</td>
          <td><span class="td-free">✓ Free</span></td>
          <td>—</td>
        </tr>
        <tr>
          <td>🔌 <strong>Local</strong></td>
          <td>PromptEngine v2.2</td>
          <td><span class="td-fast">Instant</span></td>
          <td>⭐⭐⭐⭐</td>
          <td><span class="td-free">∞ Free</span></td>
          <td><span class="td-check">✓</span></td>
        </tr>
      </tbody>
    </table>
  </section>

  <!-- ════════════ INSTALL ════════════ -->
  <section class="section reveal" id="install">
    <span class="section-tag">// installation</span>
    <h2 class="section-title">Zero to<br><span style="color:var(--fire1)">blazing</span> in 60s.</h2>

    <div class="steps-list">
      <div class="step-item">
        <div class="step-num">1</div>
        <div class="step-connector"></div>
        <div class="step-body">
          <div class="step-title">Clone or Download</div>
          <div class="step-desc">Grab the repo as a ZIP or clone it locally.</div>
          <div class="code-block" style="margin-top:16px;">
            <div class="code-titlebar">
              <div class="code-dot" style="background:#ff5f57;"></div>
              <div class="code-dot" style="background:#febc2e;"></div>
              <div class="code-dot" style="background:#28c840;"></div>
              <span class="code-filename">terminal</span>
            </div>
            <div class="code-body">
<span class="t-prompt">$</span> <span class="t-cmd">git clone https://github.com/your-username/fire-prompts.git</span>
<span class="t-output">Cloning into 'fire-prompts'...</span>
<span class="t-success">✓ Done. 6 files, ~42 KB</span>
            </div>
          </div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-num">2</div>
        <div class="step-connector"></div>
        <div class="step-body">
          <div class="step-title">Load in Chrome</div>
          <div class="step-desc">Open <code>chrome://extensions</code>, enable <strong>Developer Mode</strong>, click <strong>Load unpacked</strong>, and select the <code>FIRE prompts/</code> folder.</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-num">3</div>
        <div class="step-connector"></div>
        <div class="step-body">
          <div class="step-title">Add API Keys <em style="color:var(--muted); font-size:13px;">(optional)</em></div>
          <div class="step-desc">Click the extension icon → ⚙️ Settings. Paste your <strong>Gemini</strong> or <strong>Groq</strong> key and hit <em>Save &amp; Verify All</em>. Leave blank to use the offline engine.</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-num">4</div>
        <div class="step-body">
          <div class="step-title">🗿 Improvise!</div>
          <div class="step-desc">Head to ChatGPT or Claude. Type any rough prompt and hit the <strong>🗿 Improvise</strong> button — or press <code>Ctrl+Enter</code> in the popup.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ════════════ CODE DEEP DIVE ════════════ -->
  <section class="section reveal">
    <span class="section-tag">// code deep-dive</span>
    <h2 class="section-title">Under the<br><span style="color:var(--fire1)">hood.</span></h2>
    <p class="section-desc">FIRE prompts is ~600 lines of vanilla JS split across 4 focused modules. No build step, no bundler, no dependencies.</p>

    <div class="code-block">
      <div class="code-titlebar">
        <div class="code-dot" style="background:#ff5f57;"></div>
        <div class="code-dot" style="background:#febc2e;"></div>
        <div class="code-dot" style="background:#28c840;"></div>
        <span class="code-filename">popup.js — Hybrid Fallback Logic</span>
      </div>
      <div class="code-body"><span class="c-comment">// Provider waterfall: preferred → fallback → local engine</span>
<span class="c-keyword">if</span> (provider === <span class="c-string">'gemini'</span>) {
  optimized = <span class="c-keyword">await</span> <span class="c-func">tryGemini</span>();
  <span class="c-keyword">if</span> (!optimized) optimized = <span class="c-keyword">await</span> <span class="c-func">tryGroq</span>();    <span class="c-comment">// seamless fallback</span>
} <span class="c-keyword">else if</span> (provider === <span class="c-string">'groq'</span>) {
  optimized = <span class="c-keyword">await</span> <span class="c-func">tryGroq</span>();
  <span class="c-keyword">if</span> (!optimized) optimized = <span class="c-keyword">await</span> <span class="c-func">tryGemini</span>();
} <span class="c-keyword">else</span> {
  <span class="c-comment">// Auto mode: Groq first (faster), Gemini second</span>
  optimized = <span class="c-keyword">await</span> <span class="c-func">tryGroq</span>() ?? <span class="c-keyword">await</span> <span class="c-func">tryGemini</span>();
}

<span class="c-keyword">if</span> (!optimized) {
  <span class="c-comment">// Guaranteed offline fallback — zero failures</span>
  <span class="c-keyword">const</span> result = <span class="c-func">PromptEngine</span>.<span class="c-func">optimize</span>(text, category);
  optimized = result.<span class="c-prop">optimized</span>;
  usedProvider = <span class="c-string">'Local'</span>;
}</div>
    </div>

    <div class="code-block">
      <div class="code-titlebar">
        <div class="code-dot" style="background:#ff5f57;"></div>
        <div class="code-dot" style="background:#febc2e;"></div>
        <div class="code-dot" style="background:#28c840;"></div>
        <span class="code-filename">prompt-engine.js — Category Scoring</span>
      </div>
      <div class="code-body"><span class="c-comment">// Multi-word keyword matches score 3× for precision</span>
<span class="c-keyword">for</span> (<span class="c-keyword">const</span> kw <span class="c-keyword">of</span> config.<span class="c-prop">keywords</span>) {
  <span class="c-keyword">if</span> (lower.<span class="c-func">includes</span>(kw)) {
    score += kw.<span class="c-func">includes</span>(<span class="c-string">' '</span>) ? <span class="c-value">3</span> : <span class="c-value">1</span>;
  }
}
<span class="c-keyword">if</span> (score > bestScore) { bestScore = score; bestMatch = category; }</div>
    </div>

    <div class="code-block">
      <div class="code-titlebar">
        <div class="code-dot" style="background:#ff5f57;"></div>
        <div class="code-dot" style="background:#febc2e;"></div>
        <div class="code-dot" style="background:#28c840;"></div>
        <span class="code-filename">content.js — DOM Injection (MutationObserver)</span>
      </div>
      <div class="code-body"><span class="c-comment">// Re-inject on every DOM mutation (SPA navigation support)</span>
<span class="c-keyword">const</span> observer = <span class="c-keyword">new</span> <span class="c-func">MutationObserver</span>(() => {
  <span class="c-func">injectButton</span>();   <span class="c-comment">// idempotent: checks .fire-prompts-optimize-btn first</span>
});

observer.<span class="c-func">observe</span>(document.<span class="c-prop">body</span>, {
  <span class="c-prop">childList</span>: <span class="c-keyword">true</span>,
  <span class="c-prop">subtree</span>: <span class="c-keyword">true</span>
});</div>
    </div>
  </section>

  <!-- ════════════ FILE STRUCTURE ════════════ -->
  <section class="section reveal">
    <span class="section-tag">// project structure</span>
    <h2 class="section-title">Clean.<br><span style="color:var(--fire1)">Modular.</span></h2>

    <div class="terminal">
      <div class="terminal-bar">
        <div class="t-dot" style="background:#ff5f57;"></div>
        <div class="t-dot" style="background:#febc2e;"></div>
        <div class="t-dot" style="background:#28c840;"></div>
        <span style="font-family:var(--mono); font-size:12px; color:#666; margin-left:8px;">FIRE prompts/</span>
      </div>
      <div class="terminal-body">
<span class="t-prompt">FIRE prompts/</span>
<span class="t-output">│</span>
<span class="t-output">├── </span><span class="t-accent">manifest.json</span>       <span class="t-output"># MV3 config — permissions, content_scripts, icons</span>
<span class="t-output">├── </span><span class="t-accent">popup.html</span>          <span class="t-output"># Extension popup UI (settings, input, output)</span>
<span class="t-output">├── </span><span class="t-accent">popup.css</span>           <span class="t-output"># All popup styles — dark theme, animations</span>
<span class="t-output">├── </span><span class="t-accent">popup.js</span>            <span class="t-output"># Popup logic — provider selection, session state</span>
<span class="t-output">├── </span><span class="t-success">prompt-engine.js</span>    <span class="t-output"># LOCAL engine — category detection + prompt builder</span>
<span class="t-output">├── </span><span class="t-success">gemini-api.js</span>       <span class="t-output"># Gemini 2.0 Flash — validate, optimize, store key</span>
<span class="t-output">├── </span><span class="t-success">groq-api.js</span>         <span class="t-output"># Groq Llama 70B — validate, optimize, store key</span>
<span class="t-output">├── </span><span class="t-accent">content.js</span>          <span class="t-output"># DOM injection + MutationObserver + overlays</span>
<span class="t-output">├── icon16.png</span>
<span class="t-output">├── icon48.png</span>
<span class="t-output">└── icon128.png</span>

<span class="t-output">Total: ~600 LOC · 0 dependencies · 0 build steps</span><span class="type-cursor"></span>
      </div>
    </div>
  </section>

  <!-- ════════════ ERROR HANDLING ════════════ -->
  <section class="section reveal">
    <span class="section-tag">// resilience</span>
    <h2 class="section-title">Every error,<br><span style="color:var(--fire1)">handled.</span></h2>
    <p class="section-desc">FIRE prompts handles every failure mode without exposing errors to the user — silent fallbacks all the way down.</p>

    <div class="feature-grid">
      <div class="feature-card">
        <span class="feature-icon">🔑</span>
        <div class="feature-title">Invalid API Key</div>
        <p class="feature-desc">HTTP 400/401 responses are caught, a user-friendly message is shown in the settings status bar, and the engine falls back gracefully.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">⏱️</span>
        <div class="feature-title">Rate Limit (429)</div>
        <p class="feature-desc">Quota exceeded on one provider? The waterfall silently switches to the next available engine mid-request.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🌐</span>
        <div class="feature-title">Network Offline</div>
        <p class="feature-desc">All <code>fetch()</code> calls are wrapped in try/catch. Any network failure routes directly to the local PromptEngine — zero UI disruption.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">📭</span>
        <div class="feature-title">Empty API Response</div>
        <p class="feature-desc">Both Gemini and Groq parsers check for null/empty candidates before returning — if empty, they throw and trigger fallback.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🖋️</span>
        <div class="feature-title">Empty Prompt Input</div>
        <p class="feature-desc">Button is disabled with a red border flash on empty input. The content script checks <code>innerText.trim()</code> before firing.</p>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🔄</span>
        <div class="feature-title">SPA Navigation</div>
        <p class="feature-desc">MutationObserver re-runs <code>injectButton()</code> on every DOM change, and the injection is idempotent — no duplicate buttons.</p>
      </div>
    </div>
  </section>

  <!-- ════════════ CONTRIBUTING ════════════ -->
  <section class="section reveal">
    <span class="section-tag">// contributing</span>
    <h2 class="section-title">Fan the<br><span style="color:var(--fire1)">flames.</span></h2>
    <p class="section-desc">PRs welcome. Here's the fastest way to contribute:</p>

    <div class="code-block">
      <div class="code-titlebar">
        <div class="code-dot" style="background:#ff5f57;"></div>
        <div class="code-dot" style="background:#febc2e;"></div>
        <div class="code-dot" style="background:#28c840;"></div>
        <span class="code-filename">contributing.sh</span>
      </div>
      <div class="code-body">
<span class="c-comment"># 1. Fork the repo, then:</span>
<span class="t-prompt">$</span> <span class="c-func">git</span> checkout -b feature/your-feature-name

<span class="c-comment"># 2. Make your changes, load unpacked in Chrome to test</span>

<span class="c-comment"># 3. Commit with a clear message</span>
<span class="t-prompt">$</span> <span class="c-func">git</span> commit -m <span class="c-string">"feat: add [feature] to [module]"</span>

<span class="c-comment"># 4. Push and open a PR against main</span>
<span class="t-prompt">$</span> <span class="c-func">git</span> push origin feature/your-feature-name</div>
    </div>

    <p style="color:var(--muted); font-size:14px; margin-top:16px; line-height:1.7;">
      Ideas for contributions: add OpenAI GPT-4o as a 4th engine · build a prompt history panel · add per-category prompt templates · port to Firefox (MV3) · write unit tests for <code>PromptEngine</code>.
    </p>
  </section>

</div><!-- /wrapper -->

<!-- ════════════ FOOTER ════════════ -->
<footer class="footer" style="position:relative;z-index:2;">
  <span class="footer-flame">🔥</span>
  <p class="footer-text">
    Built with <span style="color:var(--fire1);">♥</span> and way too much caffeine.<br>
    MIT License · FIRE prompts v2.2 · Chrome MV3<br>
    <a href="https://aistudio.google.com/apikey" target="_blank">Get Gemini Key</a>
    &nbsp;·&nbsp;
    <a href="https://console.groq.com/keys" target="_blank">Get Groq Key</a>
    &nbsp;·&nbsp;
    <a href="#install">Install Guide</a>
  </p>
</footer>

<script>
// ── Fire canvas (procedural upward-moving fire) ─────────────────────
const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Simplified fire particle system
const particles = [];
class FireParticle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = -(Math.random() * 3 + 2);
    this.life = Math.random() * 0.8 + 0.2;
    this.maxLife = this.life;
    this.size = Math.random() * 60 + 20;
  }
  update() {
    this.x  += this.vx;
    this.y  += this.vy;
    this.vx += (Math.random() - 0.5) * 0.3;
    this.life -= 0.006;
    if (this.life <= 0) this.reset();
  }
  draw() {
    const ratio = this.life / this.maxLife;
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * ratio);
    grad.addColorStop(0,   `rgba(255,200,50,${ratio * 0.6})`);
    grad.addColorStop(0.4, `rgba(255,80,0,${ratio * 0.4})`);
    grad.addColorStop(1,   `rgba(255,0,0,0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * ratio, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 60; i++) {
  const p = new FireParticle();
  p.life = Math.random() * p.maxLife; // stagger
  particles.push(p);
}

function animateFire() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateFire);
}
animateFire();

// ── Floating sparks ─────────────────────────────────────────────────
const sparksLayer = document.getElementById('sparksLayer');

function makeSpark() {
  const el = document.createElement('div');
  el.className = 'spark';
  const x = Math.random() * 100;
  const drift = (Math.random() - 0.5) * 120;
  const dur   = Math.random() * 8 + 6;
  const delay = Math.random() * 10;
  el.style.cssText = `
    left: ${x}%;
    --drift: ${drift}px;
    animation-duration: ${dur}s;
    animation-delay: ${delay}s;
    width: ${Math.random() * 3 + 1}px;
    height: ${Math.random() * 3 + 1}px;
    background: hsl(${Math.random() * 40 + 10}, 100%, 60%);
  `;
  sparksLayer.appendChild(el);
}

for (let i = 0; i < 60; i++) makeSpark();

// ── Scroll reveal ────────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ── Counter animation ────────────────────────────────────────────────
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 30);
}

const statIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('[data-target]');
      nums.forEach(n => {
        const t = parseInt(n.dataset.target);
        const s = n.dataset.suffix || '';
        if (!isNaN(t)) animateCounter(n, t, s);
        else n.textContent = '~0ms';
      });
      statIO.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stats-strip').forEach(el => statIO.observe(el));
</script>
</body>
</html>
