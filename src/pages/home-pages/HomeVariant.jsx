import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Briefcase,
  Calendar,
  CheckCircle,
  Cloud,
  Code2,
  Database,
  Globe2,
  Heart,
  Mail,
  Menu,
  Phone,
  Rocket,
  Send,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import KreonixLogo from '../../components/KreonixLogo';
import { UserContext } from '../../context/UserContext';
import { auth } from '../../firebase';

const iconMap = {
  ai: Brain,
  analytics: BarChart3,
  automation: Zap,
  bot: Bot,
  briefcase: Briefcase,
  calendar: Calendar,
  check: CheckCircle,
  cloud: Cloud,
  code: Code2,
  database: Database,
  globe: Globe2,
  heart: Heart,
  mail: Mail,
  phone: Phone,
  rocket: Rocket,
  send: Send,
  shield: Shield,
  smartphone: Smartphone,
  sparkle: Sparkles,
  star: Star,
  trend: TrendingUp,
  users: Users,
};

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Portals', href: '/portals' },
  { label: 'Contact', href: '/contact' },
];

const variantStyles = `
html[data-kreonix-home-variant='active'] body { background: #020617; }
html[data-kreonix-home-variant='active'] { scroll-behavior: smooth; }
html[data-kreonix-home-variant='active'] .bg-animation-wrapper { opacity: 0; }
html[data-kreonix-home-variant='active'] header { display: none; }

.hpv-page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at 70% 8%, rgba(59, 130, 246, 0.24), transparent 28%),
    radial-gradient(circle at 24% 22%, rgba(168, 85, 247, 0.16), transparent 25%),
    linear-gradient(180deg, #010410 0%, #020817 44%, #030816 100%);
  color: #f8fafc;
}

.hpv-page::before,
.hpv-page::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hpv-page::before {
  opacity: 0.22;
  background-image:
    radial-gradient(circle, rgba(56, 189, 248, 0.72) 0 1px, transparent 2px),
    linear-gradient(rgba(37, 99, 235, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.12) 1px, transparent 1px);
  background-position: 24px 36px, 0 0, 0 0;
  background-size: 142px 128px, 96px 96px, 96px 96px;
  mask-image: linear-gradient(180deg, black, transparent 70%);
  animation: hpvGridDrift 24s linear infinite;
}

.hpv-page::after {
  background:
    linear-gradient(90deg, rgba(2, 6, 23, 0.82), transparent 18%, transparent 82%, rgba(2, 6, 23, 0.82)),
    linear-gradient(115deg, transparent 0 26%, rgba(56, 189, 248, 0.08) 28%, transparent 31% 66%, rgba(168, 85, 247, 0.08) 68%, transparent 71%);
  animation: hpvLightSweep 13s ease-in-out infinite;
}

.hpv-shell {
  position: relative;
  z-index: 2;
  width: min(1180px, calc(100vw - 48px));
  margin: 0 auto;
}

.hpv-nav {
  position: relative;
  z-index: 4;
  display: grid;
  grid-template-columns: 240px 1fr auto;
  align-items: center;
  gap: 26px;
  padding: 20px 0 8px;
}

.hpv-logo {
  transform: scale(0.86);
  transform-origin: left center;
}

.hpv-menu {
  display: flex;
  justify-content: center;
  gap: 34px;
  color: #f8fafc;
  font-size: 0.9rem;
  font-weight: 800;
}

.hpv-menu a:first-child {
  color: #38bdf8;
  text-shadow: 0 0 18px rgba(59, 130, 246, 0.8);
}

.hpv-nav-action {
  display: flex;
  align-items: center;
  gap: 14px;
}

.hpv-auth {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border-radius: 999px;
  color: #fff;
}

.hpv-auth-avatar {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 999px;
  background: linear-gradient(135deg, #7c3aed, #0ea5e9);
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.45);
  font-weight: 950;
}

.hpv-auth span {
  font-size: 0.85rem;
  font-weight: 900;
}

.hpv-auth a,
.hpv-auth button {
  display: inline-flex;
  min-height: 52px;
  align-items: center;
  border: 0;
  border-radius: 999px;
  padding: 0 22px;
  font-size: 1.08rem;
  font-weight: 900;
  line-height: 1;
}

.hpv-auth a:first-child {
  background: rgba(30, 41, 59, 0.92);
  color: #fff;
  box-shadow: 0 14px 30px rgba(2, 6, 23, 0.22);
}

.hpv-auth a:nth-child(2) {
  background: #38bdf8;
  color: #020617;
  box-shadow: 0 14px 34px rgba(56, 189, 248, 0.25);
}

.hpv-auth button {
  background: rgba(220, 38, 38, 0.92);
  color: #fff;
}

.hpv-pill-button,
.hpv-ghost-button,
.hpv-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: 900;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.hpv-pill-button {
  min-height: 44px;
  gap: 10px;
  padding: 0 22px;
  color: white;
  background: linear-gradient(100deg, #8b3dff, #16b8ff);
  box-shadow: 0 0 28px rgba(37, 99, 235, 0.55);
}

.hpv-ghost-button {
  min-height: 44px;
  gap: 10px;
  padding: 0 22px;
  color: #fff;
  border: 1px solid rgba(148, 163, 184, 0.45);
  background: rgba(15, 23, 42, 0.58);
}

.hpv-icon-button {
  display: none;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(148, 163, 184, 0.42);
  background: rgba(15, 23, 42, 0.54);
}

.hpv-pill-button:hover,
.hpv-ghost-button:hover,
.hpv-icon-button:hover {
  transform: translateY(-2px);
}

.hpv-pill-button,
.hpv-ghost-button {
  animation: hpvButtonRise 700ms ease both;
  animation-delay: 420ms;
}

.hpv-hero {
  position: relative;
  display: grid;
  grid-template-columns: 0.86fr 1.14fr;
  align-items: center;
  min-height: 500px;
  gap: 24px;
  padding: 30px 0 16px;
}

.hpv-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  border: 1px solid rgba(96, 165, 250, 0.48);
  border-radius: 999px;
  padding: 8px 14px;
  color: #67e8f9;
  background: linear-gradient(90deg, rgba(14, 165, 233, 0.18), rgba(147, 51, 234, 0.16), rgba(249, 115, 22, 0.16));
  box-shadow: 0 0 22px rgba(59, 130, 246, 0.18);
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hpv-hero h1 {
  max-width: 660px;
  color: #fff;
  font-size: clamp(3rem, 5.6vw, 5.25rem);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 1.02;
  overflow: hidden;
  animation: hpvHeadlineReveal 900ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hpv-hero h1 span {
  background: linear-gradient(100deg, #16c7ff 0%, #4d7cff 42%, #c445ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: hpvHeadlineReveal 900ms cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 140ms;
}

.hpv-lede {
  max-width: 540px;
  margin-top: 20px;
  color: #dbeafe;
  font-size: 1.05rem;
  line-height: 1.6;
}

.hpv-hero-actions,
.hpv-hero-stats,
.hpv-trust-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.hpv-hero-actions {
  gap: 18px;
  margin-top: 28px;
}

.hpv-hero-stats {
  gap: 34px;
  margin-top: 28px;
}

.hpv-mini-stat {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 0.85rem;
}

.hpv-mini-stat svg {
  color: #f59e0b;
  filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.66));
}

.hpv-mini-stat strong {
  display: block;
  font-size: 1.15rem;
}

.hpv-trust-row {
  gap: 24px;
  margin-top: 34px;
  color: #d1d5db;
  font-size: 0.78rem;
  font-weight: 800;
}

.hpv-visual {
  position: relative;
  min-height: 462px;
  isolation: isolate;
}

.hpv-visual::before {
  content: '';
  position: absolute;
  inset: 4% 0 0;
  opacity: 0.58;
  background:
    radial-gradient(circle, rgba(56, 189, 248, 0.78) 0 2px, transparent 3px),
    linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.18), transparent);
  background-size: 122px 96px, 100% 100%;
  mask-image: radial-gradient(ellipse at center, black 0 64%, transparent 82%);
  animation: hpvParticleDrift 18s linear infinite;
}

.hpv-orb {
  position: absolute;
  left: 50%;
  top: 44%;
  display: grid;
  width: 236px;
  aspect-ratio: 1;
  place-items: center;
  border: 2px solid rgba(96, 165, 250, 0.75);
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 42%, rgba(56, 189, 248, 0.4), transparent 46%),
    linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(30, 64, 175, 0.42));
  box-shadow: 0 0 60px rgba(14, 165, 233, 0.86), inset 0 0 54px rgba(59, 130, 246, 0.54);
  transform: translate(-50%, -50%);
  animation: hpvOrbSpin 18s linear infinite;
}

.hpv-orb::before,
.hpv-orb::after {
  content: '';
  position: absolute;
  border-radius: 50%;
}

.hpv-orb::before {
  inset: -44px;
  border: 2px solid rgba(59, 130, 246, 0.28);
  box-shadow: inset 0 0 42px rgba(59, 130, 246, 0.18);
  animation: hpvOrbitSpin 12s linear infinite;
}

.hpv-orb::after {
  inset: -78px;
  border: 2px solid rgba(168, 85, 247, 0.22);
  transform: rotateX(72deg) rotateZ(22deg);
  animation: hpvOrbitSpinReverse 19s linear infinite;
}

.hpv-orb span {
  background: linear-gradient(135deg, #e0f2fe, #38bdf8 35%, #2563eb 62%, #a855f7);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 7rem;
  font-weight: 950;
  filter: drop-shadow(0 0 18px rgba(56, 189, 248, 0.96));
}

.hpv-platform {
  position: absolute;
  left: 50%;
  bottom: 46px;
  width: min(560px, 88%);
  height: 120px;
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.32), rgba(37, 99, 235, 0.14) 58%, transparent 72%);
  box-shadow: 0 0 60px rgba(37, 99, 235, 0.55);
  transform: translateX(-50%);
  animation: hpvPlatformPulse 4.5s ease-in-out infinite;
}

.hpv-particle {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: #67e8f9;
  box-shadow: 0 0 14px rgba(56, 189, 248, 0.95);
  animation: hpvParticleFloat var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
}

.hpv-connection {
  position: absolute;
  left: 50%;
  top: 44%;
  width: var(--w);
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8), transparent);
  transform: rotate(var(--r));
  transform-origin: left center;
  animation: hpvConnectionPulse 2.8s ease-in-out infinite;
  animation-delay: var(--delay);
}

.hpv-badge {
  position: absolute;
  z-index: 3;
  display: grid;
  width: 112px;
  min-height: 106px;
  place-items: center;
  gap: 7px;
  border: 1px solid rgba(96, 165, 250, 0.64);
  border-radius: 14px;
  padding: 12px 10px;
  color: #fff;
  text-align: center;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.48));
  box-shadow: 0 0 34px rgba(37, 99, 235, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  animation: hpvFloatBadge 5s ease-in-out infinite;
  animation-delay: var(--float-delay, 0s);
}

.hpv-badge svg {
  color: #38bdf8;
  filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.86));
}

.hpv-badge span {
  font-size: 0.75rem;
  font-weight: 900;
  line-height: 1.08;
}

.hpv-badge-0 { left: 18%; top: 4%; }
.hpv-badge-1 { right: 12%; top: 8%; }
.hpv-badge-2 { left: 8%; top: 36%; }
.hpv-badge-3 { right: 3%; top: 38%; }
.hpv-badge-4 { left: 20%; bottom: 10%; }
.hpv-badge-5 { right: 18%; bottom: 7%; }

.hpv-section {
  position: relative;
  z-index: 2;
  padding: 22px 0;
}

.hpv-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 800ms ease, transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
}

.hpv-reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}

.hpv-stagger > * {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 720ms ease, transform 720ms cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(var(--i, 0) * 80ms);
}

.hpv-stagger.in-view > * {
  opacity: 1;
  transform: translateY(0);
}

.hpv-section-head {
  margin: 0 auto 22px;
  text-align: center;
}

.hpv-section-head .tag {
  color: #38bdf8;
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hpv-section-head h2 {
  margin-top: 6px;
  color: #fff;
  font-size: clamp(1.9rem, 3vw, 2.65rem);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 1.1;
}

.hpv-section-head h2 span {
  background: linear-gradient(100deg, #38bdf8, #a855f7);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.hpv-section-head p {
  max-width: 640px;
  margin: 8px auto 0;
  color: #cbd5e1;
  line-height: 1.55;
}

.hpv-card,
.hpv-panel,
.hpv-metric-strip,
.hpv-cta,
.hpv-footer {
  border: 1px solid rgba(96, 165, 250, 0.24);
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.72), rgba(15, 23, 42, 0.36));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 24px 70px rgba(2, 6, 23, 0.34);
  backdrop-filter: blur(18px);
}

.hpv-service-grid {
  display: grid;
  grid-template-columns: repeat(var(--service-columns, 4), minmax(0, 1fr));
  gap: 18px;
}

.hpv-card {
  min-height: 188px;
  border-radius: 16px;
  padding: 22px;
  transform: perspective(900px) rotateX(var(--tilt-y, 0deg)) rotateY(var(--tilt-x, 0deg)) translateY(0);
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
  will-change: transform;
}

.hpv-card.featured {
  min-height: 250px;
}

.hpv-card-icon {
  display: grid;
  width: 58px;
  height: 58px;
  margin-bottom: 18px;
  place-items: center;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.26), rgba(168, 85, 247, 0.22));
  box-shadow: 0 0 24px rgba(59, 130, 246, 0.25);
  transition: transform 220ms ease;
}

.hpv-card:hover {
  border-color: rgba(56, 189, 248, 0.72);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 28px 90px rgba(14, 165, 233, 0.24);
  transform: perspective(900px) rotateX(var(--tilt-y, 0deg)) rotateY(var(--tilt-x, 0deg)) translateY(-10px);
}

.hpv-card:hover .hpv-card-icon {
  transform: scale(1.1);
}

.hpv-card-icon svg,
.hpv-value svg,
.hpv-process-step svg {
  color: #38bdf8;
  filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.7));
}

.hpv-card h3,
.hpv-panel h3,
.hpv-value h3 {
  color: #fff;
  font-size: 1.08rem;
  font-weight: 950;
  letter-spacing: 0;
}

.hpv-card p,
.hpv-panel p,
.hpv-value p {
  margin-top: 8px;
  color: #dbeafe;
  font-size: 0.86rem;
  line-height: 1.55;
}

.hpv-card a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  color: #38bdf8;
  font-size: 0.82rem;
  font-weight: 900;
}

.hpv-metric-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin-top: 16px;
  border-radius: 14px;
  overflow: hidden;
}

.hpv-metric {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 78px;
  border-right: 1px solid rgba(96, 165, 250, 0.16);
}

.hpv-metric:last-child { border-right: 0; }
.hpv-metric strong {
  display: block;
  color: #22d3ee;
  font-size: 2rem;
  font-weight: 950;
  line-height: 1;
}
.hpv-metric span {
  color: #cbd5e1;
  font-size: 0.82rem;
}

.hpv-split {
  display: grid;
  grid-template-columns: 1fr 1fr 0.78fr;
  gap: 18px;
}

.hpv-panel {
  min-height: 260px;
  border-radius: 18px;
  padding: 24px;
}

.hpv-process-list {
  display: grid;
  gap: 14px;
}

.hpv-process-item {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 12px;
}

.hpv-process-number {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  font-weight: 950;
}

.hpv-showcase-window {
  display: grid;
  min-height: 180px;
  margin-top: 18px;
  place-items: center;
  border: 1px solid rgba(96, 165, 250, 0.24);
  border-radius: 14px;
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.2), rgba(2, 6, 23, 0.62)),
    repeating-linear-gradient(90deg, rgba(56, 189, 248, 0.1) 0 1px, transparent 1px 34px);
}

.hpv-laptop {
  width: min(340px, 92%);
  height: 168px;
  border: 8px solid rgba(15, 23, 42, 0.9);
  border-radius: 16px;
  background:
    radial-gradient(circle at 28% 34%, rgba(168, 85, 247, 0.38), transparent 18%),
    linear-gradient(135deg, rgba(37, 99, 235, 0.45), rgba(2, 6, 23, 0.8));
  box-shadow: 0 0 34px rgba(59, 130, 246, 0.36);
}

.hpv-values-list {
  display: grid;
  gap: 14px;
  margin-top: 16px;
}

.hpv-value {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 12px;
}

.hpv-process-line {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
  margin-top: 28px;
}

.hpv-process-line::before {
  content: '';
  position: absolute;
  left: 8%;
  right: 8%;
  top: 38px;
  height: 2px;
  background: linear-gradient(90deg, #0ea5e9, #a855f7, #0ea5e9);
  background-size: 200% 100%;
  animation: hpvFlowLine 3s linear infinite;
}

.hpv-process-step {
  position: relative;
  z-index: 1;
  text-align: center;
}

.hpv-process-icon {
  display: grid;
  width: 76px;
  height: 76px;
  margin: 0 auto 14px;
  place-items: center;
  border: 1px solid rgba(96, 165, 250, 0.5);
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.86);
  box-shadow: 0 0 24px rgba(59, 130, 246, 0.28);
  animation: hpvIconPulse 3.4s ease-in-out infinite;
}

.hpv-case-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.hpv-case-card {
  min-height: 220px;
  overflow: hidden;
  border-radius: 14px;
}

.hpv-case-art {
  height: 118px;
  border-radius: 12px;
  background:
    radial-gradient(circle at 35% 35%, rgba(168, 85, 247, 0.46), transparent 26%),
    linear-gradient(135deg, rgba(14, 165, 233, 0.34), rgba(2, 6, 23, 0.78)),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 28px);
}

.hpv-cta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  min-height: 170px;
  overflow: hidden;
  border-radius: 18px;
  padding: 30px 44px;
  background:
    radial-gradient(circle at 78% 50%, rgba(56, 189, 248, 0.36), transparent 24%),
    radial-gradient(circle at 90% 70%, rgba(168, 85, 247, 0.42), transparent 26%),
    linear-gradient(100deg, rgba(30, 64, 175, 0.46), rgba(15, 23, 42, 0.64));
  background-size: 140% 140%, 140% 140%, 100% 100%;
  animation: hpvCtaLights 9s ease-in-out infinite;
}

.hpv-cta h2 {
  color: #fff;
  font-size: clamp(1.9rem, 3vw, 2.65rem);
  font-weight: 950;
  letter-spacing: 0;
}

.hpv-cta p {
  max-width: 520px;
  margin-top: 8px;
  color: #dbeafe;
  line-height: 1.55;
}

.hpv-cta-art {
  position: relative;
  min-height: 132px;
}

.hpv-cta-art::before {
  content: '';
  position: absolute;
  inset: 10px 0 0;
  border-radius: 999px;
  background:
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.65), transparent 8%),
    radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.4), transparent 48%);
  box-shadow: 0 0 46px rgba(56, 189, 248, 0.45);
  animation: hpvCtaGlow 4s ease-in-out infinite;
}

.hpv-footer {
  display: grid;
  grid-template-columns: 1.1fr repeat(4, 0.78fr);
  gap: 28px;
  margin-top: 18px;
  border-radius: 16px 16px 0 0;
  padding: 30px 28px;
}

.hpv-footer p,
.hpv-footer a {
  color: #cbd5e1;
  font-size: 0.86rem;
  line-height: 1.7;
}

.hpv-footer h3 {
  margin-bottom: 10px;
  color: #fff;
  font-size: 0.98rem;
  font-weight: 950;
}

.hpv-footer a {
  display: block;
}

.hpv-home3 .hpv-service-grid { --service-columns: 5; }
.hpv-home4 .hpv-service-grid { --service-columns: 6; }
.hpv-home5 .hpv-service-grid { --service-columns: 6; }

@keyframes hpvGridDrift {
  to { background-position: 166px 164px, 96px 96px, 96px 96px; }
}

@keyframes hpvLightSweep {
  0%, 100% { opacity: 0.72; transform: translateX(-1%); }
  50% { opacity: 1; transform: translateX(1%); }
}

@keyframes hpvParticleDrift {
  to { background-position: 146px 132px, 100% 100%; }
}

@keyframes hpvHeadlineReveal {
  from { opacity: 0; transform: translateY(36px); clip-path: inset(0 0 100% 0); }
  to { opacity: 1; transform: translateY(0); clip-path: inset(0 0 0 0); }
}

@keyframes hpvButtonRise {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes hpvOrbSpin {
  from { transform: translate(-50%, -50%) rotateY(0deg) rotateZ(0deg); }
  to { transform: translate(-50%, -50%) rotateY(360deg) rotateZ(360deg); }
}

@keyframes hpvOrbitSpin {
  to { transform: rotate(360deg); }
}

@keyframes hpvOrbitSpinReverse {
  to { transform: rotateX(72deg) rotateZ(-338deg); }
}

@keyframes hpvPlatformPulse {
  0%, 100% { opacity: 0.72; filter: saturate(1); }
  50% { opacity: 1; filter: saturate(1.4); }
}

@keyframes hpvParticleFloat {
  0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.45; }
  50% { transform: translate3d(18px, -24px, 0); opacity: 1; }
}

@keyframes hpvConnectionPulse {
  0%, 100% { opacity: 0.18; filter: brightness(0.8); }
  50% { opacity: 0.9; filter: brightness(1.6); }
}

@keyframes hpvFloatBadge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@keyframes hpvFlowLine {
  to { background-position: 200% 0; }
}

@keyframes hpvIconPulse {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-4px) scale(1.05); }
}

@keyframes hpvCtaLights {
  0%, 100% { background-position: 0% 50%, 100% 50%, 0 0; }
  50% { background-position: 100% 50%, 0% 50%, 0 0; }
}

@keyframes hpvCtaGlow {
  0%, 100% { transform: translateX(0) scale(0.96); opacity: 0.72; }
  50% { transform: translateX(-24px) scale(1.06); opacity: 1; }
}

@keyframes hpvChatSpring {
  from { opacity: 0; transform: translateY(24px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes hpvBotPulse {
  0%, 100% { box-shadow: 0 0 24px rgba(56, 189, 248, 0.58); transform: translateY(0); }
  50% { box-shadow: 0 0 42px rgba(168, 85, 247, 0.82); transform: translateY(-5px); }
}

@keyframes hpvTyping {
  to { background-position: 33px 0; }
}

@media (max-width: 1080px) {
  .hpv-nav,
  .hpv-hero,
  .hpv-split,
  .hpv-cta {
    grid-template-columns: 1fr;
  }

  .hpv-menu {
    justify-content: flex-start;
    overflow-x: auto;
  }

  .hpv-hero-copy {
    text-align: center;
  }

  .hpv-lede,
  .hpv-hero-actions,
  .hpv-hero-stats,
  .hpv-trust-row {
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  .hpv-service-grid,
  .hpv-case-grid,
  .hpv-metric-strip,
  .hpv-footer {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hpv-process-line {
    grid-template-columns: 1fr;
  }

  .hpv-process-line::before {
    display: none;
  }
}

@media (max-width: 700px) {
  .hpv-shell {
    width: min(100% - 28px, 1180px);
  }

  .hpv-nav {
    grid-template-columns: 1fr auto;
  }

  .hpv-icon-button {
    display: inline-flex;
  }

  .hpv-menu {
    display: none;
    grid-column: 1 / -1;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 18px;
    padding: 10px;
    background: rgba(2, 6, 23, 0.92);
  }

  .hpv-menu.is-open {
    display: flex;
  }

  .hpv-menu a {
    justify-content: flex-start;
    padding: 12px 14px;
  }

  .hpv-hero {
    min-height: auto;
  }

  .hpv-visual {
    min-height: 380px;
    transform: scale(0.88);
    transform-origin: top center;
    margin-bottom: -48px;
  }

  .hpv-badge {
    width: 92px;
    min-height: 88px;
  }

  .hpv-service-grid,
  .hpv-case-grid,
  .hpv-metric-strip,
  .hpv-footer {
    grid-template-columns: 1fr;
  }

  .hpv-cta {
    padding: 24px;
  }

}
`;

function Icon({ name, size = 24 }) {
  const LucideIcon = iconMap[name] || Sparkles;
  return <LucideIcon size={size} />;
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

function Reveal({ children, className = '', stagger = false }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`${className} ${stagger ? 'hpv-stagger' : 'hpv-reveal'} ${visible ? 'in-view' : ''}`}>
      {children}
    </div>
  );
}

function CountUp({ value }) {
  const [ref, visible] = useReveal();
  const [display, setDisplay] = useState('0');
  const parsed = useMemo(() => {
    const match = String(value).match(/(\d+)/);
    return {
      target: match ? Number(match[1]) : 0,
      suffix: String(value).replace(match?.[1] || '', ''),
    };
  }, [value]);

  useEffect(() => {
    if (!visible) return undefined;
    let frame;
    const start = performance.now();
    const duration = 1300;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(parsed.target * eased)}${parsed.suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [parsed.suffix, parsed.target, visible]);

  return <strong ref={ref}>{display}</strong>;
}

function AuthControl() {
  const { user, updateUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch {
      // Demo/local auth sessions may not always have a Firebase user.
    }
    updateUser(null);
    localStorage.removeItem('token');
  };

  if (!user) {
    return (
      <div className="hpv-auth">
        <Link to="/login">Login</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    );
  }

  return (
    <div className="hpv-auth">
      <span className="hpv-auth-avatar">{(user.name || 'U')[0]}</span>
      <span>{user.name || 'User'}</span>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
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

function HeroVisual({ badges }) {
  const particles = Array.from({ length: 18 }, (_, index) => ({
    x: `${12 + ((index * 23) % 76)}%`,
    y: `${9 + ((index * 31) % 72)}%`,
    duration: `${4 + (index % 5)}s`,
    delay: `${index * -0.28}s`,
  }));
  const connections = ['-18deg', '24deg', '72deg', '128deg', '190deg', '244deg'];

  return (
    <div className="hpv-visual" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="hpv-particle"
          style={{ '--x': particle.x, '--y': particle.y, '--duration': particle.duration, '--delay': particle.delay }}
        />
      ))}
      {connections.map((rotation, index) => (
        <span
          key={rotation}
          className="hpv-connection"
          style={{ '--r': rotation, '--w': `${180 + index * 34}px`, '--delay': `${index * -0.3}s` }}
        />
      ))}
      <div className="hpv-orb">
        <span>K</span>
      </div>
      <div className="hpv-platform"></div>
      {badges.map((badge, index) => (
        <div key={badge.label} className={`hpv-badge hpv-badge-${index}`} style={{ '--float-delay': `${index * -0.45}s` }}>
          <Icon name={badge.icon} size={30} />
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

function SectionHead({ kicker, title, copy }) {
  return (
    <div className="hpv-section-head">
      <p className="tag">{kicker}</p>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {copy && <p>{copy}</p>}
    </div>
  );
}

export default function HomeVariant({ config }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.kreonixHomeVariant = 'active';
    return () => {
      delete document.documentElement.dataset.kreonixHomeVariant;
    };
  }, []);

  return (
    <div className={`hpv-page ${config.className}`}>
      <style>{variantStyles}</style>

      <nav className="hpv-nav hpv-shell">
        <KreonixLogo className="hpv-logo" />
        <div className={`hpv-menu ${isMenuOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hpv-nav-action">
          <AuthControl />
          <button
            type="button"
            className="hpv-icon-button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      <section className="hpv-hero hpv-shell">
        <div className="hpv-hero-copy">
          <p className="hpv-eyebrow">
            <Icon name="rocket" size={16} />
            {config.eyebrow}
          </p>
          <h1 dangerouslySetInnerHTML={{ __html: config.headline }} />
          <p className="hpv-lede">{config.lede}</p>
          <div className="hpv-hero-stats">
            {config.heroStats.map((stat) => (
              <div className="hpv-mini-stat" key={stat.label}>
                <Icon name={stat.icon} size={26} />
                <div>
                  <CountUp value={stat.value} />
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="hpv-hero-actions">
            <Link to="/services" className="hpv-pill-button">
              {config.primaryCta}
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="hpv-ghost-button">
              {config.secondaryCta}
              <Icon name="calendar" size={18} />
            </Link>
          </div>
          <div className="hpv-trust-row">
            {config.trusted.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>

        <HeroVisual badges={config.badges} />
      </section>

      <section className="hpv-section hpv-shell">
        <SectionHead {...config.servicesHead} />
        <Reveal className="hpv-service-grid" stagger>
          {config.services.map((service) => (
            <article
              className={`hpv-card ${service.featured ? 'featured' : ''}`}
              key={service.title}
              onMouseMove={handleCardTilt}
              onMouseLeave={resetCardTilt}
            >
              <div className="hpv-card-icon">
                <Icon name={service.icon} size={30} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <a href="#">
                Learn More
                <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </Reveal>
        {config.metrics && (
          <Reveal className="hpv-metric-strip">
            {config.metrics.map((metric) => (
              <div className="hpv-metric" key={metric.label}>
                <Icon name={metric.icon} size={28} />
                <div>
                  <CountUp value={metric.value} />
                  <span>{metric.label}</span>
                </div>
              </div>
            ))}
          </Reveal>
        )}
      </section>

      {config.split && (
        <section className="hpv-section hpv-shell">
          <Reveal className="hpv-split" stagger>
            <article className="hpv-panel">
              <h3>{config.split.processTitle}</h3>
              <div className="hpv-process-list">
                {config.split.process.map((item, index) => (
                  <div className="hpv-process-item" key={item.title}>
                    <span className="hpv-process-number">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <article className="hpv-panel">
              <h3>{config.split.featuredTitle}</h3>
              <div className="hpv-showcase-window">
                <div className="hpv-laptop"></div>
              </div>
              <Link to="/portfolio" className="hpv-ghost-button">
                View All Projects
                <ArrowRight size={16} />
              </Link>
            </article>
            <article className="hpv-panel">
              <h3>{config.split.whyTitle}</h3>
              <div className="hpv-values-list">
                {config.split.values.map((item) => (
                  <div className="hpv-value" key={item.title}>
                    <Icon name={item.icon} size={24} />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </section>
      )}

      {config.process && (
        <section className="hpv-section hpv-shell">
          <SectionHead {...config.process.head} />
          <Reveal className="hpv-process-line" stagger>
            {config.process.steps.map((step) => (
              <div className="hpv-process-step" key={step.title}>
                <div className="hpv-process-icon">
                  <Icon name={step.icon} size={28} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            ))}
          </Reveal>
        </section>
      )}

      {config.cases && (
        <section className="hpv-section hpv-shell">
          <SectionHead {...config.cases.head} />
          <Reveal className="hpv-case-grid" stagger>
            {config.cases.items.map((item) => (
              <article className="hpv-card hpv-case-card" key={item.title} onMouseMove={handleCardTilt} onMouseLeave={resetCardTilt}>
                <div className="hpv-case-art"></div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </Reveal>
        </section>
      )}

      <section className="hpv-section hpv-shell">
        <Reveal className="hpv-cta">
          <div>
            <h2>{config.cta.title}</h2>
            <p>{config.cta.copy}</p>
            <div className="hpv-hero-actions">
              <Link to="/contact" className="hpv-pill-button">
                {config.cta.primary}
                <ArrowRight size={18} />
              </Link>
              {config.cta.secondary && (
                <Link to="/contact" className="hpv-ghost-button">
                  {config.cta.secondary}
                  <ArrowRight size={18} />
                </Link>
              )}
            </div>
          </div>
          <div className="hpv-cta-art"></div>
        </Reveal>
      </section>
    </div>
  );
}
