import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle,
  Cloud,
  Code2,
  Globe2,
  Rocket,
  Shield,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

const homeShowcaseStyles = `
html[data-vexquorai-home='showcase'] body { background: #020617; }
html[data-vexquorai-home='showcase'] .bg-animation-wrapper { opacity: 0; }

.vexquorai-home-showcase {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at 72% 11%, rgba(59, 130, 246, 0.24), transparent 28%),
    radial-gradient(circle at 21% 30%, rgba(124, 58, 237, 0.14), transparent 23%),
    linear-gradient(180deg, #010512 0%, #020817 39%, #03091a 100%);
  color: #f8fafc;
}
.vexquorai-home-showcase::before,
.vexquorai-home-showcase::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.vexquorai-home-showcase::before {
  opacity: 0.2;
  background-image:
    linear-gradient(rgba(59, 130, 246, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.12) 1px, transparent 1px);
  background-size: 88px 88px;
  mask-image: linear-gradient(180deg, black, transparent 62%);
}
.vexquorai-home-showcase::after {
  background:
    radial-gradient(circle at 50% 7%, transparent, rgba(0, 0, 0, 0.36) 70%),
    linear-gradient(90deg, rgba(2, 6, 23, 0.76), transparent 20%, transparent 78%, rgba(2, 6, 23, 0.76));
}
.home-shell {
  position: relative;
  z-index: 2;
  width: min(1130px, calc(100vw - 48px));
  margin: 0 auto;
}
.home-hero { position: relative; padding: 132px 0 30px; }
.home-hero-grid {
  display: grid;
  grid-template-columns: 0.92fr 1.18fr;
  align-items: center;
  min-height: 410px;
  gap: 20px;
}

.home-hero-copy { max-width: 600px; }
.home-kicker {
  margin-bottom: 8px;
  color: #e5e7eb;
  font-size: clamp(1.45rem, 2.4vw, 2rem);
  font-weight: 800;
  letter-spacing: 0;
}
.home-hero h1 {
  font-size: clamp(3.15rem, 6.1vw, 5.5rem);
  font-weight: 900;
  line-height: 0.93;
  letter-spacing: 0;
}
.home-hero h1,
.home-hero h1 span {
  display: block;
  background: linear-gradient(100deg, #20c4ff 0%, #3d8cff 43%, #a655ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 24px rgba(37, 99, 235, 0.28));
}
.home-lede {
  max-width: 440px;
  margin-top: 24px;
  color: #f8fafc;
  font-size: 1.05rem;
  line-height: 1.55;
}
.home-actions { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 30px; }
.home-primary-btn,
.home-secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 158px;
  min-height: 46px;
  border-radius: 8px;
  padding: 0 24px;
  font-size: 0.93rem;
  font-weight: 800;
  transition: transform 180ms ease, box-shadow 180ms ease;
}
.home-primary-btn {
  gap: 12px;
  color: #fff;
  background: linear-gradient(100deg, #7c3cff, #0ea5ff 86%);
  box-shadow: 0 0 32px rgba(59, 130, 246, 0.58);
}
.home-secondary-btn {
  color: #fff;
  border: 1px solid rgba(226, 232, 240, 0.6);
  background: rgba(15, 23, 42, 0.52);
}
.home-primary-btn:hover,
.home-secondary-btn:hover { transform: translateY(-2px); }

.home-hero-visual {
  position: relative;
  height: 430px;
  min-width: 0;
  isolation: isolate;
}
.orb-grid {
  position: absolute;
  inset: 4% 0 0;
  opacity: 0.6;
  background:
    radial-gradient(circle, rgba(56, 189, 248, 0.72) 0 2px, transparent 3px),
    linear-gradient(90deg, transparent 0 13%, rgba(59, 130, 246, 0.2) 13.2% 13.5%, transparent 13.7%),
    linear-gradient(180deg, transparent 0 22%, rgba(59, 130, 246, 0.16) 22.2% 22.5%, transparent 22.8%);
  background-position: 14px 11px, center, center;
  background-size: 120px 78px, 100% 100%, 100% 100%;
  mask-image: radial-gradient(ellipse at center, black 0 58%, transparent 76%);
}
.orb-rings {
  position: absolute;
  left: 50%;
  top: 45%;
  width: min(440px, 72vw);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
}
.orb-rings .ring {
  position: absolute;
  inset: 18%;
  border: 2px solid rgba(59, 130, 246, 0.75);
  border-radius: 50%;
  box-shadow: 0 0 22px rgba(59, 130, 246, 0.8), inset 0 0 46px rgba(14, 165, 233, 0.25);
}
.orb-rings .orbit-a { transform: rotateX(66deg) rotateZ(-12deg); }
.orb-rings .orbit-b {
  inset: 12%;
  border-color: rgba(147, 51, 234, 0.75);
  transform: rotateX(74deg) rotateZ(28deg);
}
.orb-rings .orbit-c {
  inset: 4%;
  border-color: rgba(34, 211, 238, 0.35);
  transform: rotateX(72deg) rotateZ(-48deg);
}
.orb-core {
  position: absolute;
  left: 50%;
  top: 43%;
  display: grid;
  width: 190px;
  aspect-ratio: 1;
  place-items: center;
  border: 2px solid rgba(96, 165, 250, 0.66);
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.35), transparent 48%),
    linear-gradient(135deg, rgba(2, 6, 23, 0.92), rgba(15, 23, 42, 0.46));
  box-shadow: 0 0 42px rgba(14, 165, 233, 0.88), inset 0 0 42px rgba(59, 130, 246, 0.52);
  transform: translate(-50%, -50%);
}
.orb-core::before,
.orb-core::after {
  content: '';
  position: absolute;
  border-radius: inherit;
}
.orb-core::before {
  inset: -28px;
  border: 1px solid rgba(59, 130, 246, 0.26);
  box-shadow: inset 0 0 36px rgba(59, 130, 246, 0.18);
}
.orb-core::after {
  inset: -58px;
  border: 1px dashed rgba(59, 130, 246, 0.22);
}
.orb-k {
  background: linear-gradient(135deg, #e0f2fe 0%, #38bdf8 28%, #2563eb 58%, #7c3aed 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 6rem;
  font-weight: 950;
  line-height: 1;
  filter: drop-shadow(0 0 16px rgba(56, 189, 248, 0.95));
}
.orb-pedestal,
.orb-platform {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.orb-pedestal {
  bottom: 42px;
  width: 240px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.5), rgba(37, 99, 235, 0.2) 42%, transparent 72%);
  box-shadow: 0 0 48px rgba(59, 130, 246, 0.6);
}
.orb-platform {
  bottom: 22px;
  width: 430px;
  height: 92px;
  border: 1px solid rgba(37, 99, 235, 0.32);
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(30, 64, 175, 0.36), rgba(2, 6, 23, 0.2) 60%, transparent 72%);
  box-shadow: 0 0 44px rgba(37, 99, 235, 0.5);
}
.hero-tech-badge {
  position: absolute;
  z-index: 3;
  display: grid;
  width: 92px;
  min-height: 100px;
  place-items: center;
  gap: 6px;
  border: 1px solid rgba(96, 165, 250, 0.62);
  border-radius: 10px;
  padding: 12px 8px;
  color: #f8fafc;
  text-align: center;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.48));
  box-shadow: 0 0 28px rgba(37, 99, 235, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12);
}
.hero-tech-badge svg {
  color: #38bdf8;
  filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.82));
}
.hero-tech-badge span {
  font-size: 0.73rem;
  font-weight: 800;
  line-height: 1.08;
}
.badge-ai { left: 19%; top: 4%; }
.badge-web { right: 11%; top: 3%; }
.badge-mobile { left: 8%; top: 36%; }
.badge-cloud { right: 2%; top: 37%; }
.badge-auto { left: 19%; bottom: 6%; }

.home-feature-strip,
.home-metrics,
.home-testimonial-panel,
.home-cta-card,
.home-service-card {
  border: 1px solid rgba(96, 165, 250, 0.22);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.68), rgba(15, 23, 42, 0.36));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 24px 70px rgba(2, 6, 23, 0.35);
  backdrop-filter: blur(18px);
}
.home-feature-strip {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  width: 100%;
  margin-top: 34px;
  border-radius: 12px;
  padding: 14px 20px;
  overflow: hidden;
}
.home-feature-strip::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 38%;
  background: linear-gradient(105deg, rgba(14, 165, 233, 0.26), rgba(124, 58, 237, 0.16));
  clip-path: polygon(0 0, 86% 0, 100% 100%, 0 100%);
  pointer-events: none;
}
.home-feature-strip::after {
  content: '';
  position: absolute;
  inset: auto 18px 0 auto;
  width: 120px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #38bdf8, #8b5cf6);
  pointer-events: none;
}
.home-feature-chip {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  gap: 10px;
  color: #f8fafc;
  font-size: 0.82rem;
  font-weight: 700;
  white-space: nowrap;
}
.home-feature-chip svg { color: #38bdf8; }
.home-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 32px;
  border-radius: 14px;
  padding: 22px 26px;
}
.home-metric-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  min-height: 58px;
  border-right: 1px solid rgba(96, 165, 250, 0.16);
}
.home-metric-card:last-child { border-right: 0; }
.home-metric-card svg,
.home-value-item svg,
.home-card-icon svg {
  color: #60a5fa;
  filter: drop-shadow(0 0 10px rgba(124, 58, 237, 0.88));
}
.home-metric-card strong {
  display: block;
  color: #fff;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1;
}
.home-metric-card span {
  display: block;
  margin-top: 5px;
  color: #dbeafe;
  font-size: 0.86rem;
}

.home-section { position: relative; padding: 30px 0; }
.home-section.compact { padding-top: 22px; }
.home-section.slim { padding-top: 6px; }
.home-section-title {
  margin: 0 auto 26px;
  text-align: center;
}
.home-title-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-bottom: 8px;
}
.home-title-line span {
  width: min(210px, 22vw);
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.48));
}
.home-title-line span:last-child { background: linear-gradient(90deg, rgba(59, 130, 246, 0.48), transparent); }
.home-title-line p {
  color: #38bdf8;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.home-section-title h2 {
  color: #f8fafc;
  font-size: clamp(1.75rem, 3vw, 2.35rem);
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.1;
}
.home-section-copy {
  max-width: 440px;
  margin: 10px auto 0;
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.6;
}
.home-service-grid,
.home-values-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
.home-service-card {
  min-height: 230px;
  border-radius: 15px;
  padding: 26px 22px 24px;
  text-align: center;
}
.home-card-icon {
  display: grid;
  width: 84px;
  height: 64px;
  margin: 0 auto 20px;
  place-items: center;
}
.home-service-card h3,
.home-value-item h3,
.home-testimonial-card h3 {
  color: #fff;
  font-weight: 900;
  letter-spacing: 0;
}
.home-service-card h3 { margin-bottom: 10px; font-size: 1.18rem; }
.home-service-card p,
.home-value-item p,
.home-testimonial-card p {
  color: #d6deed;
  font-size: 0.92rem;
  line-height: 1.55;
}
.home-value-item {
  display: flex;
  gap: 18px;
  min-height: 106px;
  padding-right: 20px;
  border-right: 1px solid rgba(96, 165, 250, 0.18);
}
.home-value-item:last-child { border-right: 0; }
.home-value-item h3 { margin-bottom: 6px; font-size: 1rem; }
.home-value-item p { font-size: 0.78rem; }

.home-section.testimonials { padding-top: 0; }
.home-testimonial-panel {
  width: min(880px, 100%);
  border-radius: 14px;
  padding: 22px 16px 12px;
  margin: 0 auto;
}
.home-testimonial-panel .home-section-title { margin-bottom: 14px; }
.home-testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.home-testimonial-card {
  display: grid;
  grid-template-columns: 52px 1fr;
  align-items: start;
  min-height: 154px;
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 12px;
  padding: 16px;
  background: rgba(2, 6, 23, 0.2);
}
.home-avatar {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #c026d3, #7c3aed);
  color: #fff;
  font-size: 1.45rem;
  font-weight: 900;
}
.home-testimonial-card p { min-height: 76px; font-size: 0.82rem; }
.home-testimonial-card h3,
.home-testimonial-card span {
  grid-column: 1 / -1;
  margin-left: 0;
}
.home-testimonial-card h3 { margin-top: 8px; font-size: 0.98rem; }
.home-testimonial-card span { color: #94a3b8; font-size: 0.78rem; }
.home-cta-section { padding: 0 0 24px; }
.home-cta-card {
  position: relative;
  display: grid;
  grid-template-columns: 0.88fr 1.12fr;
  align-items: center;
  min-height: 180px;
  overflow: hidden;
  border-color: rgba(37, 99, 235, 0.85);
  border-radius: 16px;
  padding: 26px 64px;
  background:
    radial-gradient(circle at 78% 34%, rgba(14, 165, 233, 0.62), transparent 24%),
    linear-gradient(90deg, rgba(30, 64, 175, 0.4), rgba(15, 23, 42, 0.6));
}
.home-cta-card h2 {
  color: #fff;
  font-size: clamp(1.8rem, 3vw, 2.35rem);
  font-weight: 900;
  letter-spacing: 0;
}
.home-cta-card p {
  max-width: 440px;
  margin-top: 8px;
  color: #eff6ff;
  font-size: 1rem;
  line-height: 1.45;
}
.home-city-visual {
  position: relative;
  min-height: 130px;
  overflow: hidden;
  border-radius: 12px;
  background:
    linear-gradient(180deg, transparent, rgba(2, 6, 23, 0.45)),
    repeating-linear-gradient(90deg, transparent 0 32px, rgba(56, 189, 248, 0.16) 33px 34px);
}
.home-city-visual::before {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 74%;
  background:
    linear-gradient(180deg, transparent 0 15%, rgba(56, 189, 248, 0.7) 15% 16%, transparent 17%),
    linear-gradient(90deg, transparent 2%, #173a94 2% 5%, transparent 5% 8%, #0d2f7a 8% 13%, transparent 13% 18%, #1554bd 18% 22%, transparent 22% 29%, #1d4ed8 29% 33%, transparent 33% 42%, #0e7490 42% 47%, transparent 47% 56%, #2563eb 56% 63%, transparent 63% 69%, #312e81 69% 74%, transparent 74% 83%, #0f766e 83% 88%, transparent 88%);
  filter: drop-shadow(0 0 14px rgba(59, 130, 246, 0.7));
}
.home-city-visual span {
  position: absolute;
  right: 23%;
  top: 18%;
  color: #7dd3fc;
  font-size: 4.5rem;
  font-weight: 950;
  filter: drop-shadow(0 0 22px rgba(56, 189, 248, 0.9));
}
.home-city-visual svg {
  position: absolute;
  right: 33%;
  top: 16%;
  color: #a855f7;
}

@media (max-width: 1024px) {
  .home-hero-grid,
  .home-cta-card { grid-template-columns: 1fr; }
  .home-hero-copy {
    max-width: 680px;
    text-align: center;
    margin: 0 auto;
  }
  .home-lede,
  .home-actions {
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }
  .home-feature-strip {
    margin-top: 26px;
  }
  .home-feature-strip,
  .home-metrics,
  .home-service-grid,
  .home-values-grid,
  .home-testimonial-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .home-value-item:nth-child(2),
  .home-metric-card:nth-child(2) { border-right: 0; }
}
@media (max-width: 720px) {
  .home-shell { width: min(100% - 28px, 1130px); }
  .home-hero { padding-top: 104px; }
  .home-hero-visual {
    height: 380px;
    transform: scale(0.86);
    transform-origin: top center;
    margin-bottom: -54px;
  }
  .hero-tech-badge {
    width: 82px;
    min-height: 88px;
  }
  .home-feature-strip,
  .home-metrics,
  .home-service-grid,
  .home-values-grid,
  .home-testimonial-grid { grid-template-columns: 1fr; }
  .home-feature-strip {
    width: 100%;
    gap: 8px;
    padding: 14px;
  }
  .home-feature-chip {
    justify-content: flex-start;
    white-space: normal;
  }
  .home-metric-card,
  .home-value-item { border-right: 0; }
  .home-cta-card { padding: 24px; }
}

html[data-vexquorai-home='showcase'] { scroll-behavior: smooth; }
.vexquorai-home-showcase::before { animation: homeGridDrift 24s linear infinite; }
.orb-grid { animation: homeParticleDrift 18s linear infinite; }
.home-hero h1,
.home-hero h1 span { animation: homeHeadlineReveal 900ms cubic-bezier(0.16, 1, 0.3, 1) both; }
.home-hero h1 span { animation-delay: 120ms; }
.home-primary-btn,
.home-secondary-btn { animation: homeButtonRise 760ms ease both; animation-delay: 360ms; }
.orb-core { animation: homeOrbSpin 18s linear infinite; }
.orb-rings .ring { animation: homeOrbitSpin 14s linear infinite; }
.orb-rings .orbit-b { animation-duration: 20s; animation-direction: reverse; }
.orb-rings .orbit-c { animation-duration: 26s; }
.orb-platform { animation: homePlatformPulse 4.5s ease-in-out infinite; }
.hero-tech-badge { animation: homeFloatBadge 5s ease-in-out infinite; animation-delay: var(--float-delay, 0s); }
.home-service-card {
  transform: perspective(900px) rotateX(var(--tilt-y, 0deg)) rotateY(var(--tilt-x, 0deg)) translateY(0);
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
}
.home-card-icon { transition: transform 220ms ease; }
.home-service-card:hover {
  border-color: rgba(56, 189, 248, 0.72);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 28px 90px rgba(14, 165, 233, 0.24);
  transform: perspective(900px) rotateX(var(--tilt-y, 0deg)) rotateY(var(--tilt-x, 0deg)) translateY(-10px);
}
.home-service-card:hover .home-card-icon { transform: scale(1.1); }
.home-value-item { animation: homeRevealUp 800ms ease both; }
.home-cta-card {
  background-size: 140% 140%, 100% 100%;
  animation: homeCtaLights 9s ease-in-out infinite;
}
.home-city-visual span { animation: homeLogoGlow 3.6s ease-in-out infinite; }
html[data-vexquorai-home='showcase'] .fixed.bottom-5.right-5 > button,
html[data-vexquorai-home='showcase'] .fixed.bottom-7.right-7 > button { animation: homeBotPulse 2.7s ease-in-out infinite; }
.home-particle {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: #67e8f9;
  box-shadow: 0 0 14px rgba(56, 189, 248, 0.95);
  animation: homeParticleFloat var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
}
.home-connection {
  position: absolute;
  left: 50%;
  top: 43%;
  width: var(--w);
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8), transparent);
  transform: rotate(var(--r));
  transform-origin: left center;
  animation: homeConnectionPulse 2.8s ease-in-out infinite;
  animation-delay: var(--delay);
}
@keyframes homeGridDrift { to { background-position: 88px 88px, 88px 88px; } }
@keyframes homeParticleDrift { to { background-position: 134px 89px, center, center; } }
@keyframes homeHeadlineReveal {
  from { opacity: 0; transform: translateY(36px); clip-path: inset(0 0 100% 0); }
  to { opacity: 1; transform: translateY(0); clip-path: inset(0 0 0 0); }
}
@keyframes homeButtonRise {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes homeOrbSpin {
  from { transform: translate(-50%, -50%) rotateY(0deg) rotateZ(0deg); }
  to { transform: translate(-50%, -50%) rotateY(360deg) rotateZ(360deg); }
}
@keyframes homeOrbitSpin { to { rotate: 360deg; } }
@keyframes homePlatformPulse {
  0%, 100% { opacity: 0.72; filter: saturate(1); }
  50% { opacity: 1; filter: saturate(1.4); }
}
@keyframes homeParticleFloat {
  0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.45; }
  50% { transform: translate3d(18px, -24px, 0); opacity: 1; }
}
@keyframes homeConnectionPulse {
  0%, 100% { opacity: 0.18; filter: brightness(0.8); }
  50% { opacity: 0.9; filter: brightness(1.6); }
}
@keyframes homeFloatBadge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes homeRevealUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes homeCtaLights {
  0%, 100% { background-position: 0% 50%, 0 0; }
  50% { background-position: 100% 50%, 0 0; }
}
@keyframes homeLogoGlow {
  0%, 100% { filter: drop-shadow(0 0 18px rgba(56, 189, 248, 0.7)); transform: translateY(0); }
  50% { filter: drop-shadow(0 0 34px rgba(168, 85, 247, 0.9)); transform: translateY(-6px); }
}
@keyframes homeBotPulse {
  0%, 100% { box-shadow: 0 0 28px rgba(56, 189, 248, 0.55); transform: translateY(0); }
  50% { box-shadow: 0 0 48px rgba(168, 85, 247, 0.82); transform: translateY(-5px); }
}
`;

const heroBadges = [
  { label: 'AI/ML Solutions', icon: Brain, className: 'badge-ai' },
  { label: 'Web Engineering', icon: Code2, className: 'badge-web' },
  { label: 'Mobile Ecosystems', icon: Smartphone, className: 'badge-mobile' },
  { label: 'Cloud & DevOps', icon: Cloud, className: 'badge-cloud' },
  { label: 'Automation', icon: Zap, className: 'badge-auto' },
];

const featureChips = [
  { label: 'Fast Growth', icon: Rocket },
  { label: 'Secure Systems', icon: Shield },
  { label: 'Clean Development', icon: Code2 },
  { label: 'Worldwide Services', icon: Globe2 },
];

const services = [
  {
    icon: Brain,
    title: 'AI/ML Solutions',
    description: 'Build predictive models and intelligent automation systems that learn and adapt.',
  },
  {
    icon: Code2,
    title: 'Web Engineering',
    description: 'Scalable cloud-native web applications built with React, Next.js, and modern backends.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Ecosystems',
    description: 'Native and cross-platform mobile experiences that users love across Android and iOS.',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Robust infrastructure management and automated deployment pipelines on AWS/Azure.',
  },
];

const values = [
  {
    title: 'Technical Excellence',
    description: 'Our team comprises experts with deep knowledge in distributed systems and AI.',
    icon: CheckCircle,
  },
  {
    title: 'Agile Delivery',
    description: 'We value transparency and rapid iteration to ensure your product hits the market faster.',
    icon: Zap,
  },
  {
    title: 'Scalable Design',
    description: 'Architecture built to handle millions of users from day one.',
    icon: Briefcase,
  },
  {
    title: 'Focused Product Team',
    description: 'Committed to careful discovery, clean execution, and steady support.',
    icon: Users,
  },
];

const testimonials = [
  {
    name: 'Rahul Singh',
    company: 'TechStart India',
    text: 'VexquorAI transformed our vision into a world-class platform. Highly professional and results-driven!',
    initial: 'R',
  },
  {
    name: 'Priya Desai',
    company: 'CloudFlow Solutions',
    text: 'Outstanding team with exceptional technical expertise. They delivered our project ahead of schedule.',
    initial: 'P',
  },
  {
    name: 'Amit Kumar',
    company: 'FinTech Plus',
    text: 'Best investment in technology partners we made. Responsive, innovative, and committed to excellence.',
    initial: 'A',
  },
];

function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="home-section-title">
      <div className="home-title-line">
        <span></span>
        <p>{eyebrow}</p>
        <span></span>
      </div>
      <h2>{title}</h2>
      {children && <p className="home-section-copy">{children}</p>}
    </div>
  );
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function handleCardTilt(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  card.style.setProperty('--tilt-x', `${x * 8}deg`);
  card.style.setProperty('--tilt-y', `${y * -8}deg`);
}

function resetCardTilt(event) {
  event.currentTarget.style.setProperty('--tilt-x', '0deg');
  event.currentTarget.style.setProperty('--tilt-y', '0deg');
}

function HeroGraphic() {
  const particles = Array.from({ length: 18 }, (_, index) => ({
    x: `${12 + ((index * 23) % 76)}%`,
    y: `${9 + ((index * 31) % 72)}%`,
    duration: `${4 + (index % 5)}s`,
    delay: `${index * -0.28}s`,
  }));
  const connections = ['-18deg', '24deg', '72deg', '128deg', '190deg', '244deg'];

  return (
    <div className="home-hero-visual" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="home-particle"
          style={{ '--x': particle.x, '--y': particle.y, '--duration': particle.duration, '--delay': particle.delay }}
        />
      ))}
      {connections.map((rotation, index) => (
        <span
          key={rotation}
          className="home-connection"
          style={{ '--r': rotation, '--w': `${180 + index * 34}px`, '--delay': `${index * -0.3}s` }}
        />
      ))}
      <div className="orb-grid"></div>
      <div className="orb-rings">
        <span className="ring orbit-a"></span>
        <span className="ring orbit-b"></span>
        <span className="ring orbit-c"></span>
      </div>
      <div className="orb-core">
        <span className="orb-k">V</span>
      </div>
      <div className="orb-pedestal"></div>
      <div className="orb-platform"></div>
      {heroBadges.map(({ label, icon: Icon, className }, index) => (
        <div key={label} className={`hero-tech-badge ${className}`} style={{ '--float-delay': `${index * -0.45}s` }}>
          <Icon size={28} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.dataset.vexquoraiHome = 'showcase';
    return () => {
      delete document.documentElement.dataset.vexquoraiHome;
    };
  }, []);

  return (
    <div className="vexquorai-home-showcase">
      <style>{homeShowcaseStyles}</style>
      <section className="home-hero">
        <div className="home-shell home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-kicker">Empowering Businesses with</p>
            <h1>
              Intelligence &amp;
              <span>Innovation</span>
            </h1>
            <p className="home-lede">
              We deliver world-class AI/ML, Web, Android, and Cloud solutions that drive real results.
            </p>
            <div className="home-actions">
              <Link to="/contact" className="home-primary-btn">
                Book a Call
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="home-secondary-btn">
                Free Consultation
              </Link>
            </div>
          </div>

          <HeroGraphic />
        </div>

        <div className="home-shell">
          <div className="home-feature-strip">
            {featureChips.map(({ label, icon: Icon }) => (
              <div key={label} className="home-feature-chip">
                <Icon size={18} />
                <span>{label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="home-section compact">
        <div className="home-shell">
          <SectionTitle eyebrow="Our Expertise" title="Enterprise-Grade Solutions">
            We combine deep technical expertise with industry insights to deliver scalable digital products.
          </SectionTitle>

          <div className="home-service-grid">
            {services.map(({ title, description, icon: Icon }) => (
              <article
                className="home-service-card"
                key={title}
                onMouseMove={handleCardTilt}
                onMouseLeave={resetCardTilt}
              >
                <div className="home-card-icon">
                  <Icon size={48} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section slim">
        <div className="home-shell">
          <SectionTitle eyebrow="Why Industry Leaders" title="Trust VexquorAI" />
          <div className="home-values-grid">
            {values.map(({ title, description, icon: Icon }) => (
              <article key={title} className="home-value-item">
                <Icon size={34} />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section testimonials">
        <div className="home-shell">
          <div className="home-testimonial-panel">
            <SectionTitle eyebrow="Clients" title="Trusted by Innovators">
              Don&apos;t just take our word for it - hear what our partners say.
            </SectionTitle>
            <div className="home-testimonial-grid">
              {testimonials.map(({ name, company, text, initial }) => (
                <article key={name} className="home-testimonial-card">
                  <div className="home-avatar">{initial}</div>
                  <p>&quot;{text}&quot;</p>
                  <h3>{name}</h3>
                  <span>{company}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-cta-section">
        <div className="home-shell">
          <div className="home-cta-card">
            <div>
              <h2>Ready to Build the Future?</h2>
              <p>Let&apos;s collaborate to build software that defines the next generation of your industry.</p>
              <div className="home-actions">
                <Link to="/contact" className="home-primary-btn">
                  Start Your Project
                  <ArrowRight size={18} />
                </Link>
                <Link to="/services" className="home-secondary-btn">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="home-city-visual" aria-hidden="true">
              <Sparkles size={28} />
              <span>V</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
