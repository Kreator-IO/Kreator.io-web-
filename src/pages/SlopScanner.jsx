import { AlertTriangle, ArrowRight, ClipboardCheck, FileSearch, Gauge, RefreshCw, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';

const aiVocabulary = [
  'seamless',
  'robust',
  'powerful',
  'cutting-edge',
  'game-changing',
  'unlock',
  'leverage',
  'delve',
  'tapestry',
  'revolutionize',
  'next-generation',
  'innovative',
  'fast-paced world',
  'world-class',
  'drive real results',
];

const categories = [
  { key: 'visual', label: 'Visual Genericness', weight: 25 },
  { key: 'typography', label: 'Typography Genericness', weight: 10 },
  { key: 'layout', label: 'Layout Repetition', weight: 15 },
  { key: 'copy', label: 'Copywriting Slop', weight: 15 },
  { key: 'states', label: 'Missing UX States', weight: 10 },
  { key: 'system', label: 'Design System Inconsistency', weight: 10 },
  { key: 'brand', label: 'Lack of Brand Identity', weight: 10 },
  { key: 'decoration', label: 'Excessive Decoration', weight: 5 },
];

const sampleAudit = `Paste website copy, JSX, HTML, Tailwind classes, or a page audit here.

Example:
<section className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-400">
  <h1>Unlock Powerful Next-Generation Innovation</h1>
  <p>We deliver seamless, robust, cutting-edge solutions for the fast-paced world.</p>
  <button className="rounded-full shadow-xl bg-gradient-to-r from-blue-500 to-cyan-400">Get Started</button>
</section>`;

function countMatches(source, patterns) {
  const text = source.toLowerCase();
  return patterns.reduce((count, pattern) => {
    const matches = text.match(new RegExp(pattern, 'g'));
    return count + (matches ? matches.length : 0);
  }, 0);
}

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function getTier(score) {
  if (score <= 20) return 'Distinct';
  if (score <= 40) return 'Slightly Generic';
  if (score <= 60) return 'AI-Looking';
  if (score <= 80) return 'Heavy Slop';
  return 'Template Collapse';
}

function extractReferences(input) {
  const references = new Set();
  const fileMatches = input.match(/(?:src|app|pages|components|styles|public|backend)[\\/][\w./\\-]+\.(?:jsx?|tsx?|css|scss|html)/gi) || [];
  const routeMatches = input.match(/\/[\w/-]+(?:\.(?:jsx?|tsx?|css|scss|html))?/g) || [];

  fileMatches.forEach((item) => references.add(item.replaceAll('\\', '/')));
  routeMatches
    .filter((item) => item.includes('.') || item.includes('components') || item.includes('pages'))
    .forEach((item) => references.add(item.replaceAll('\\', '/')));

  return Array.from(references).slice(0, 8);
}

function makeIssue({ category, title, evidence, fix, priority, principle, codeRef }) {
  return {
    category,
    title,
    evidence,
    fix,
    priority,
    principle,
    codeRef,
  };
}

function analyzeSlop(input) {
  const source = input.trim();

  if (!source) {
    return null;
  }

  const gradientCount = countMatches(source, [
    'bg-gradient',
    'linear-gradient',
    'radial-gradient',
    'from-purple',
    'to-blue',
    'via-blue',
    'cyan',
    'blur-\\[',
    'blur-xl',
    'glow',
    'shadow-\\[',
  ]);
  const cardCount = countMatches(source, ['rounded-', 'shadow', 'border ', 'border-', 'p-6', 'p-8', 'p-10', 'glass']);
  const radiusCount = countMatches(source, ['rounded-full', 'rounded-2xl', 'rounded-3xl', 'rounded-\\[']);
  const headingCount = countMatches(source, ['<h1', '<h2', '<h3', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'font-bold', 'font-black']);
  const gridCount = countMatches(source, ['grid-cols-3', 'grid-cols-4', 'md:grid-cols', 'lg:grid-cols', '.map\\(', 'feature', 'service']);
  const ctaCount = countMatches(source, ['get started', 'learn more', 'book a call', 'start your project', 'unlock', 'cta']);
  const stateCount = countMatches(source, ['hover:', 'focus:', 'disabled:', 'aria-', 'loading', 'error', 'empty', 'success', 'active:']);
  const tokenNoise = countMatches(source, ['#[a-f0-9]{3,8}', 'rgba\\(', 'px-7', 'px-9', 'py-5', 'm-\\[', 'p-\\[', 'w-\\[', 'h-\\[']);
  const fakeTrust = countMatches(source, ['trusted by', 'testimonial', 'avatar', '50\\+', '100\\+', '10x', 'millions', 'worldwide']);
  const aiWordCount = aiVocabulary.reduce((count, word) => count + countMatches(source, [word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')]), 0);
  const emojiCount = (source.match(/[\u{1F300}-\u{1FAFF}]/gu) || []).length;

  const lineCount = Math.max(1, source.split(/\r?\n/).length);
  const visual = clamp(gradientCount * 9 + cardCount * 2 + radiusCount * 3);
  const typography = clamp(headingCount * 5 + countMatches(source, ['inter', 'tracking-tight', 'leading-relaxed']) * 8);
  const layout = clamp(gridCount * 12 + countMatches(source, ['text-center', 'items-center', 'justify-center']) * 4);
  const copy = clamp(aiWordCount * 12 + ctaCount * 4 + emojiCount * 5);
  const states = clamp(100 - stateCount * 12);
  const system = clamp(tokenNoise * 10 + Math.max(0, radiusCount - 3) * 6);
  const brand = clamp(45 + aiWordCount * 8 + fakeTrust * 6 - countMatches(source, ['constraint', 'tradeoff', 'workflow', 'specific', 'case study']) * 10);
  const decoration = clamp(gradientCount * 7 + countMatches(source, ['animate-', 'motion.', 'floating', 'orb', 'bokeh']) * 10);

  const scores = {
    visual,
    typography,
    layout,
    copy,
    states,
    system,
    brand,
    decoration,
  };

  const weightedScore = Math.round(
    categories.reduce((total, category) => total + scores[category.key] * (category.weight / 100), 0),
  );

  const references = extractReferences(source);
  const fallbackRef = references[0] || 'Pasted input';
  const issues = [];

  if (gradientCount > 2) {
    issues.push(
      makeIssue({
        category: 'Visual Genericness',
        title: 'Gradient and glow stack is doing too much of the identity work',
        evidence: `${gradientCount} gradient, glow, blur, cyan, or custom shadow signals found across ${lineCount} lines.`,
        fix: 'Remove decorative gradients first. Keep one accent treatment for a meaningful state, not every section.',
        priority: 'High',
        principle: 'Hierarchy over decoration',
        codeRef: fallbackRef,
      }),
    );
  }

  if (cardCount > 5 || radiusCount > 3) {
    issues.push(
      makeIssue({
        category: 'Visual Genericness',
        title: 'Cardification and radius inflation are flattening the page rhythm',
        evidence: `${cardCount} card-like container signals and ${radiusCount} large radius classes found.`,
        fix: 'Replace repeated cards with open rows, editorial blocks, tables, comparison bands, or one dense workflow panel.',
        priority: 'High',
        principle: 'Composition over containers',
        codeRef: fallbackRef,
      }),
    );
  }

  if (gridCount > 2) {
    issues.push(
      makeIssue({
        category: 'Layout Repetition',
        title: 'Feature-grid cloning makes scrolling predictable',
        evidence: `${gridCount} grid, feature, service, or map-loop patterns detected.`,
        fix: 'Break the sequence with one asymmetric section, one detailed workflow, and one concrete example with real constraints.',
        priority: 'Medium',
        principle: 'Editorial pacing over feature grids',
        codeRef: fallbackRef,
      }),
    );
  }

  if (aiWordCount > 0) {
    issues.push(
      makeIssue({
        category: 'Copywriting Slop',
        title: 'Generic AI vocabulary weakens believability',
        evidence: `${aiWordCount} generic phrases found, including words from the scanner vocabulary list.`,
        fix: 'Replace broad claims with use cases, stack choices, operational constraints, delivery boundaries, and falsifiable outcomes.',
        priority: 'High',
        principle: 'Specificity over smoothness',
        codeRef: fallbackRef,
      }),
    );
  }

  if (stateCount < 4) {
    issues.push(
      makeIssue({
        category: 'Missing UX States',
        title: 'Interaction states look incomplete for production UI',
        evidence: `${stateCount} state, accessibility, loading, error, or focus signals found.`,
        fix: 'Add focus-visible styles, disabled states, validation copy, empty states, loading treatment, and keyboard-safe controls.',
        priority: 'High',
        principle: 'Production realism over static polish',
        codeRef: fallbackRef,
      }),
    );
  }

  if (tokenNoise > 3) {
    issues.push(
      makeIssue({
        category: 'Design System Inconsistency',
        title: 'Arbitrary token usage suggests missing system ownership',
        evidence: `${tokenNoise} custom color, spacing, size, or rgba signals found.`,
        fix: 'Create named spacing, radius, shadow, color, and motion tokens, then replace one-off values with the shared scale.',
        priority: 'Medium',
        principle: 'Systems over aesthetics',
        codeRef: fallbackRef,
      }),
    );
  }

  if (fakeTrust > 1) {
    issues.push(
      makeIssue({
        category: 'Lack of Brand Identity',
        title: 'Trust signals risk feeling synthetic',
        evidence: `${fakeTrust} testimonial, avatar, metric, or broad trust claims detected.`,
        fix: 'Use real screenshots, real project fragments, named workflows, or remove trust claims until there are verifiable artifacts.',
        priority: 'Medium',
        principle: 'Authenticity over polish',
        codeRef: fallbackRef,
      }),
    );
  }

  if (issues.length === 0) {
    issues.push(
      makeIssue({
        category: 'Scanner Result',
        title: 'No strong slop pattern detected in this sample',
        evidence: 'The pasted input did not trigger the major visual, copy, layout, or UX thresholds.',
        fix: 'Run the scanner against a full page or component file to catch repetition and missing states more accurately.',
        priority: 'Low',
        principle: 'Evidence over vibes',
        codeRef: fallbackRef,
      }),
    );
  }

  return {
    scores,
    weightedScore,
    tier: getTier(weightedScore),
    issues,
    references,
  };
}

export default function SlopScanner() {
  const [input, setInput] = useState(sampleAudit);
  const result = useMemo(() => analyzeSlop(input), [input]);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 text-slate-950 transition-colors dark:bg-[#020617] dark:text-white">
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="container mx-auto grid gap-10 px-4 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <FileSearch size={14} />
              AI Slop Scanner
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-normal md:text-6xl">
              Find the parts of a website that feel predicted instead of owned.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Paste page copy, JSX, HTML, Tailwind classes, or a design audit. The scanner scores generic visual patterns,
              copy, layout repetition, missing UX states, and brand absence with concrete fixes.
            </p>
          </div>

          <div className="border-l-4 border-cyan-500 bg-slate-100 p-6 dark:bg-slate-900">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">Rule</p>
            <p className="mt-3 text-2xl font-bold leading-snug">
              A website should not look modern. It should look inevitable.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-black">Scan Input</h2>
            <button
              type="button"
              onClick={() => setInput('')}
              className="inline-flex items-center gap-2 border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-[560px] w-full resize-y border border-slate-300 bg-white p-5 font-mono text-sm leading-6 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Paste website copy, JSX, HTML, CSS, Tailwind classes, or notes..."
            spellCheck="false"
          />
        </div>

        <div className="space-y-6">
          {result ? (
            <>
              <div className="border border-slate-300 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Slop Score</p>
                    <div className="mt-2 flex items-end gap-3">
                      <span className="text-6xl font-black">{result.weightedScore}</span>
                      <span className="pb-2 text-xl font-bold text-slate-500 dark:text-slate-400">/100</span>
                    </div>
                    <p className="mt-3 inline-flex items-center gap-2 bg-slate-950 px-3 py-1.5 text-sm font-bold text-white dark:bg-white dark:text-slate-950">
                      <Gauge size={16} />
                      {result.tier}
                    </p>
                  </div>
                  <div className="max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Weighted by visual genericness, typography, layout repetition, copy, UX states, system consistency,
                    brand identity, and decoration.
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {categories.map((category) => (
                    <div key={category.key} className="border border-slate-200 p-4 dark:border-slate-800">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="font-bold">{category.label}</span>
                        <span className="font-mono text-slate-500">{result.scores[category.key]}/100</span>
                      </div>
                      <div className="mt-3 h-2 bg-slate-200 dark:bg-slate-800">
                        <div
                          className="h-full bg-cyan-500"
                          style={{ width: `${result.scores[category.key]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-300 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <div className="mb-5 flex items-center gap-2">
                  <AlertTriangle className="text-amber-500" size={20} />
                  <h2 className="text-xl font-black">Detected Problems</h2>
                </div>
                <div className="space-y-4">
                  {result.issues.map((issue, index) => (
                    <article key={`${issue.title}-${index}`} className="border border-slate-200 p-5 dark:border-slate-800">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]">
                        <span className="bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                          {issue.category}
                        </span>
                        <span className="bg-cyan-100 px-2 py-1 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-200">
                          {issue.priority}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-black">{issue.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{issue.evidence}</p>
                      <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                        <div className="bg-slate-100 p-4 dark:bg-slate-900">
                          <p className="font-bold">Why it feels generic</p>
                          <p className="mt-2 text-slate-600 dark:text-slate-300">{issue.principle}</p>
                        </div>
                        <div className="bg-slate-100 p-4 dark:bg-slate-900">
                          <p className="font-bold">Exact fix</p>
                          <p className="mt-2 text-slate-600 dark:text-slate-300">{issue.fix}</p>
                        </div>
                      </div>
                      <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
                        <ArrowRight size={14} />
                        {issue.codeRef}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="border border-slate-300 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                  <div className="mb-4 flex items-center gap-2">
                    <ClipboardCheck size={20} className="text-cyan-500" />
                    <h2 className="text-xl font-black">Exact Code References</h2>
                  </div>
                  {result.references.length > 0 ? (
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {result.references.map((reference) => (
                        <li key={reference} className="font-mono">{reference}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                      No file paths were found in the pasted input. Paste a component file or audit notes with paths for
                      reference-level output.
                    </p>
                  )}
                </div>

                <div className="border border-slate-300 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                  <div className="mb-4 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    <h2 className="text-xl font-black">Refactor Priorities</h2>
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    <li>1. Replace generic claims with product-specific constraints and workflows.</li>
                    <li>2. Reduce decorative gradients, glows, and repeated card containers.</li>
                    <li>3. Add complete hover, focus, disabled, loading, error, empty, and success states.</li>
                    <li>4. Define shared tokens before adding more one-off Tailwind values.</li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="border border-slate-300 bg-white p-8 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              Paste content to generate the slop score, reasons, code references, and fix plan.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
