/**
 * FIRE prompts — Local Prompt Optimization Engine
 * Transforms vague prompts into expert-level, structured prompts.
 * No network calls, no API keys — runs entirely in the browser.
 */

const PromptEngine = (() => {

  // ── Category Detection ──────────────────────────────────────────────

  const CATEGORIES = {
    code: {
      keywords: ['code', 'program', 'function', 'api', 'bug', 'debug', 'script', 'html', 'css', 'javascript', 'python', 'java', 'react', 'node', 'database', 'sql', 'algorithm', 'deploy', 'git', 'frontend', 'backend', 'server', 'compile', 'error', 'syntax', 'class', 'object', 'array', 'loop', 'variable', 'framework', 'library', 'component', 'endpoint', 'rest', 'graphql', 'docker', 'kubernetes', 'aws', 'cloud', 'devops', 'ci/cd', 'test', 'unit test', 'integration', 'typescript', 'rust', 'go', 'c++', 'php', 'ruby', 'swift', 'kotlin', 'flutter', 'django', 'flask', 'express', 'nextjs', 'vue', 'angular', 'mongodb', 'postgres', 'redis', 'webpack', 'vite'],
      role: 'an expert software engineer',
      extras: [
        'Specify the programming language, framework, and version if relevant.',
        'Include error handling and edge cases.',
        'Follow best practices and established design patterns.',
        'Add concise inline comments explaining non-obvious logic.',
        'Consider performance, security, and maintainability.',
      ],
    },
    writing: {
      keywords: ['write', 'essay', 'article', 'blog', 'story', 'poem', 'letter', 'email', 'content', 'copy', 'headline', 'paragraph', 'draft', 'edit', 'proofread', 'rewrite', 'summarize', 'paraphrase', 'narrative', 'fiction', 'non-fiction', 'report', 'proposal', 'resume', 'cover letter', 'speech', 'script', 'dialogue', 'chapter', 'book', 'novel', 'memoir', 'journal', 'review', 'critique', 'description', 'bio', 'tagline', 'slogan', 'caption'],
      role: 'a professional writer and editor',
      extras: [
        'Specify the target audience and their background.',
        'Define the desired tone (formal, casual, persuasive, etc.).',
        'Indicate the approximate length or word count.',
        'Clarify the purpose and call-to-action if applicable.',
        'Ensure clarity, coherence, and engagement throughout.',
      ],
    },
    analysis: {
      keywords: ['analyze', 'analysis', 'compare', 'evaluate', 'assess', 'research', 'data', 'statistics', 'metric', 'trend', 'insight', 'report', 'study', 'survey', 'benchmark', 'performance', 'roi', 'kpi', 'correlation', 'regression', 'forecast', 'predict', 'hypothesis', 'conclusion', 'findings', 'methodology', 'qualitative', 'quantitative', 'swot', 'pros and cons', 'cost-benefit', 'risk', 'audit', 'review', 'diagnosis', 'root cause', 'breakdown'],
      role: 'a senior data analyst and strategic thinker',
      extras: [
        'Define the specific metrics or criteria to evaluate.',
        'Specify the data sources or context being analyzed.',
        'Request structured output (tables, bullet points, sections).',
        'Ask for actionable insights and recommendations.',
        'Consider multiple perspectives and potential biases.',
      ],
    },
    creative: {
      keywords: ['creative', 'design', 'brainstorm', 'idea', 'concept', 'innovate', 'imagine', 'invent', 'logo', 'brand', 'visual', 'aesthetic', 'art', 'illustration', 'mood', 'theme', 'color', 'layout', 'wireframe', 'mockup', 'prototype', 'ux', 'ui', 'typography', 'icon', 'animation', 'video', 'photo', 'campaign', 'marketing', 'advertisement', 'poster', 'flyer', 'infographic', 'presentation', 'pitch', 'storyboard', 'moodboard'],
      role: 'a creative director with expertise in design and ideation',
      extras: [
        'Describe the desired mood, style, and aesthetic direction.',
        'Specify the medium and platform (web, print, social, etc.).',
        'Define the brand voice and visual identity constraints.',
        'Request multiple creative options or variations.',
        'Consider the target audience\'s preferences and expectations.',
      ],
    },
    math: {
      keywords: ['math', 'calculate', 'equation', 'formula', 'solve', 'proof', 'theorem', 'algebra', 'calculus', 'geometry', 'trigonometry', 'statistics', 'probability', 'matrix', 'vector', 'integral', 'derivative', 'limit', 'series', 'sequence', 'logarithm', 'exponential', 'polynomial', 'fraction', 'percentage', 'ratio', 'proportion', 'number', 'arithmetic'],
      role: 'a mathematics professor and problem-solving expert',
      extras: [
        'Show all steps of the solution clearly.',
        'Explain the reasoning behind each step.',
        'Verify the answer with an alternative method if possible.',
        'Note any assumptions or constraints.',
        'Present the final answer clearly and distinctly.',
      ],
    },
    learning: {
      keywords: ['explain', 'teach', 'learn', 'understand', 'how does', 'what is', 'why does', 'tutorial', 'guide', 'course', 'lesson', 'concept', 'theory', 'principle', 'fundamentals', 'basics', 'introduction', 'overview', 'example', 'demonstrate', 'illustrate', 'clarify', 'simplify', 'define', 'meaning', 'difference between', 'how to'],
      role: 'an expert educator who excels at clear, accessible explanations',
      extras: [
        'Start with a concise high-level overview before diving into details.',
        'Use concrete examples and analogies to illustrate concepts.',
        'Build from foundational concepts to advanced topics.',
        'Anticipate common misconceptions and address them.',
        'Provide practical applications and next steps for further learning.',
      ],
    },
    business: {
      keywords: ['business', 'startup', 'strategy', 'market', 'revenue', 'profit', 'customer', 'client', 'sales', 'growth', 'scale', 'funding', 'investor', 'pitch', 'plan', 'model', 'competitive', 'product', 'service', 'pricing', 'management', 'leadership', 'team', 'hire', 'operations', 'supply chain', 'b2b', 'b2c', 'saas', 'ecommerce', 'partnership', 'negotiation', 'contract'],
      role: 'a seasoned business strategist and consultant',
      extras: [
        'Define the business context, industry, and stage (startup, growth, enterprise).',
        'Specify the target market and customer segment.',
        'Consider financial implications and resource constraints.',
        'Request actionable steps with timelines.',
        'Account for competitive landscape and market dynamics.',
      ],
    },
  };

  function detectCategory(text) {
    const lower = text.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    for (const [category, config] of Object.entries(CATEGORIES)) {
      let score = 0;
      for (const kw of config.keywords) {
        if (lower.includes(kw)) {
          score += kw.includes(' ') ? 3 : 1; // multi-word matches weigh more
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = category;
      }
    }

    return bestScore >= 1 ? bestMatch : 'general';
  }

  // ── Prompt Analysis ─────────────────────────────────────────────────

  function analyzePrompt(text) {
    const words = text.trim().split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    return {
      wordCount: words.length,
      sentenceCount: sentences.length,
      isQuestion: /\?$/.test(text.trim()),
      isVeryShort: words.length < 8,
      isShort: words.length < 20,
      isMedium: words.length >= 20 && words.length < 60,
      isLong: words.length >= 60,
      hasContext: /because|since|given|context|background|situation/i.test(text),
      hasConstraints: /must|should|only|limit|restrict|avoid|don't|do not|within|maximum|minimum|at least|at most|no more/i.test(text),
      hasFormat: /list|table|bullet|step|format|json|markdown|csv|numbered|section|heading/i.test(text),
      hasExamples: /example|instance|like|such as|e\.g\.|for instance|sample/i.test(text),
      hasRole: /act as|you are|pretend|role|persona|expert|specialist/i.test(text),
    };
  }

  // ── Prompt Enhancement ──────────────────────────────────────────────

  function buildEnhancedPrompt(originalText, category, analysis) {
    const cat = CATEGORIES[category];
    const parts = [];

    // 1. Role assignment (if not already specified)
    if (!analysis.hasRole && cat) {
      parts.push(`Act as ${cat.role}.`);
    }

    // 2. Core task — reframe the original prompt with clarity
    parts.push('');
    parts.push(`## Task`);
    parts.push(reframeTask(originalText, analysis));

    // 3. Add context guidance if missing
    if (!analysis.hasContext && analysis.isShort) {
      parts.push('');
      parts.push(`## Context`);
      parts.push(`Consider the broader context and background relevant to this request. Address the "why" behind the task to ensure the response is well-targeted and thorough.`);
    }

    // 4. Add specific domain requirements
    if (cat && cat.extras.length > 0) {
      parts.push('');
      parts.push(`## Requirements`);
      for (const extra of cat.extras) {
        parts.push(`- ${extra}`);
      }
    }

    // 5. Add constraints guidance if missing
    if (!analysis.hasConstraints) {
      parts.push('');
      parts.push(`## Constraints`);
      parts.push(`- Be thorough yet concise — avoid unnecessary filler.`);
      parts.push(`- Prioritize accuracy and practical applicability.`);
      parts.push(`- If any part of the request is ambiguous, state your assumptions clearly.`);
    }

    // 6. Add output format guidance if missing
    if (!analysis.hasFormat) {
      parts.push('');
      parts.push(`## Output Format`);
      parts.push(suggestFormat(category, analysis));
    }

    return parts.join('\n').trim();
  }

  function reframeTask(text, analysis) {
    let task = text.trim();

    // Clean up the prompt
    if (!task.endsWith('.') && !task.endsWith('?') && !task.endsWith('!')) {
      task += '.';
    }

    // For very short prompts, expand the request
    if (analysis.isVeryShort) {
      return `${task}\n\nProvide a comprehensive, well-structured response. Think through this step-by-step, considering all relevant aspects and nuances.`;
    }

    if (analysis.isShort) {
      return `${task}\n\nApproach this methodically and provide a detailed, actionable response.`;
    }

    return task;
  }

  function suggestFormat(category, analysis) {
    switch (category) {
      case 'code':
        return `Provide clean, well-commented code in a fenced code block. Include a brief explanation of the approach and any important design decisions.`;
      case 'writing':
        return `Present the writing with clear structure. Use paragraphs, headings, or sections as appropriate for the content type.`;
      case 'analysis':
        return `Structure the analysis with clear sections. Use bullet points for key findings, and present data in tables where appropriate. End with a summary of actionable insights.`;
      case 'creative':
        return `Present each creative option or concept clearly. Use descriptive language and explain the reasoning behind creative choices.`;
      case 'math':
        return `Present the solution with clearly numbered steps. Box or highlight the final answer. Show all work.`;
      case 'learning':
        return `Structure the explanation from simple to complex. Use examples, analogies, and visual descriptions. Include a brief summary at the end.`;
      case 'business':
        return `Organize the response with clear sections and actionable recommendations. Use bullet points for key takeaways and include a prioritized next-steps section.`;
      default:
        return `Use clear headings, bullet points, and structured sections to organize the response for maximum readability and usefulness.`;
    }
  }

  // ── For "general" category (no specific domain detected) ────────────

  function buildGeneralPrompt(originalText, analysis) {
    const parts = [];

    parts.push(`Act as a knowledgeable, thoughtful assistant.`);
    parts.push('');
    parts.push(`## Task`);
    parts.push(reframeTask(originalText, analysis));

    if (!analysis.hasContext && analysis.isShort) {
      parts.push('');
      parts.push(`## Guidelines`);
      parts.push(`- Consider the request from multiple angles.`);
      parts.push(`- Provide well-reasoned, evidence-based responses.`);
      parts.push(`- Be thorough yet concise — prioritize clarity and actionability.`);
      parts.push(`- If the request is ambiguous, state your interpretation and assumptions.`);
    }

    if (!analysis.hasFormat) {
      parts.push('');
      parts.push(`## Output Format`);
      parts.push(`Use clear structure with headings, bullet points, or numbered lists as appropriate. Make the response easy to scan and act upon.`);
    }

    return parts.join('\n').trim();
  }

  // ── Public API ──────────────────────────────────────────────────────

  /**
   * Optimize a prompt.
   * @param {string} text — the original user prompt
   * @param {string} [forcedCategory='auto'] — override category detection
   * @returns {{ optimized: string, category: string }}
   */
  function optimize(text, forcedCategory = 'auto') {
    if (!text || !text.trim()) {
      return { optimized: text, category: 'general' };
    }

    const analysis = analyzePrompt(text);
    const category = forcedCategory !== 'auto'
      ? forcedCategory
      : detectCategory(text);

    let optimized;
    if (category === 'general') {
      optimized = buildGeneralPrompt(text, analysis);
    } else {
      optimized = buildEnhancedPrompt(text, category, analysis);
    }

    return { optimized, category };
  }

  return { optimize, detectCategory, CATEGORIES };
})();

// Export for both module and script contexts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PromptEngine;
}
