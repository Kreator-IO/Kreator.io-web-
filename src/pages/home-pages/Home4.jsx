import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  MapPin,
  Smartphone,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react';

const services = [
  { title: 'AI Agents & Automation', copy: 'Intelligent AI Agents and workflow automation for your business', icon: Bot, href: '/services' },
  { title: 'Web & Mobile Development', copy: 'Modern, responsive websites and powerful mobile applications', icon: Smartphone, href: '/services' },
  { title: 'CRM & ERP Solutions', copy: 'Custom CRM & ERP systems to manage your entire business', icon: Database, href: '/services' },
  { title: 'Cloud & DevOps Solutions', copy: 'Scalable cloud infrastructure & DevOps for high performance', icon: Cloud, href: '/services' },
];

const heroBadges = [
  { label: 'AI/ML Solutions', icon: Bot, className: 'node-ai' },
  { label: 'Web Engineering', icon: Code2, className: 'node-web' },
  { label: 'Mobile Ecosystems', icon: Smartphone, className: 'node-mobile' },
  { label: 'Cloud & DevOps', icon: Cloud, className: 'node-cloud' },
  { label: 'Automation', icon: Workflow, className: 'node-auto' },
];

const process = [
  ['Discover', 'We understand your business & goals'],
  ['Design', 'We plan the perfect solution for you'],
  ['Develop', 'We build with latest technologies'],
  ['Deploy', 'We launch and integrate smoothly'],
  ['Scale', 'We optimize and help you grow'],
];

const why = [
  ['Expert Technology Team', Users],
  ['Custom & Scalable Solutions', Cpu],
  ['On-Time Project Delivery', CalendarDays],
  ['AI-Powered Development', Bot],
  ['24/7 Support & Maintenance', CheckCircle2],
];

const featuredWorks = [
  { tab: 'Websites', title: 'Smart Inventory Management System', copy: 'Responsive business portal with live stock views and reporting.', href: '/portfolio' },
  { tab: 'Apps', title: 'Field Service Mobile App', copy: 'Mobile workflows for teams, tasks, photos, and client updates.', href: '/portfolio' },
  { tab: 'Automation', title: 'AI Workflow Automation Suite', copy: 'Automated handoffs, reminders, approvals, and customer responses.', href: '/portfolio' },
];

const styles = `
html[data-kreonix-home4='active'] body { background: #010716; }
html[data-kreonix-home4='active'] .bg-animation-wrapper { display: none; }

.home4 {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at 64% 15%, rgba(32, 120, 255, 0.2), transparent 24%),
    radial-gradient(circle at 90% 42%, rgba(20, 184, 166, 0.14), transparent 22%),
    linear-gradient(180deg, #020613 0%, #061123 46%, #061123 100%);
  color: #fff;
}

.home4::before,
.home4::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.home4::before {
  opacity: 0.42;
  background:
    radial-gradient(circle, rgba(28, 191, 255, 0.85) 0 1px, transparent 2px),
    linear-gradient(90deg, transparent 0 56%, rgba(0, 135, 255, 0.18) 57%, transparent 60%),
    linear-gradient(115deg, transparent 0 22%, rgba(118, 67, 255, 0.12) 23%, transparent 28% 70%, rgba(0, 201, 255, 0.11) 72%, transparent 76%);
  background-size: 130px 118px, 100% 100%, 100% 100%;
  mask-image: linear-gradient(180deg, black, transparent 72%);
}

.home4::after {
  background: linear-gradient(90deg, rgba(1, 7, 22, 0.84), transparent 18%, transparent 82%, rgba(1, 7, 22, 0.72));
}

.h4-wrap {
  position: relative;
  z-index: 2;
  width: min(1180px, calc(100vw - 72px));
  margin: 0 auto;
}

.h4-nav {
  display: grid;
  grid-template-columns: 330px 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 20px 0 14px;
  animation: h4SlideDown 700ms ease both;
}

.h4-logo {
  transform: scale(0.96);
  transform-origin: left center;
}

.h4-menu {
  display: flex;
  justify-content: center;
  gap: 44px;
  font-size: 15px;
  font-weight: 900;
}

.h4-menu a,
.h4-menu span,
.h4-menu button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  color: #f8fbff;
  background: transparent;
  font: inherit;
  cursor: pointer;
}

.h4-menu a:first-child {
  color: #fff;
  position: relative;
}

.h4-menu a:first-child::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -18px;
  width: 74px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #803dff, transparent);
  transform: translateX(-50%);
}

.h4-nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.h4-call,
.h4-primary,
.h4-secondary,
.h4-subscribe {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 950;
}

.h4-call,
.h4-primary,
.h4-subscribe {
  color: #fff;
  background: linear-gradient(100deg, #9139ff 0%, #147eff 55%, #24d2ff 100%);
  box-shadow: 0 0 30px rgba(34, 147, 255, 0.52);
}

.h4-call {
  min-width: 176px;
  min-height: 52px;
}

.h4-menu-item {
  position: relative;
}

.h4-dropdown {
  position: absolute;
  left: 0;
  top: calc(100% + 16px);
  z-index: 8;
  display: grid;
  min-width: 240px;
  gap: 6px;
  border: 1px solid rgba(62, 180, 255, 0.36);
  border-radius: 16px;
  padding: 10px;
  background: rgba(4, 10, 31, 0.96);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.38), 0 0 28px rgba(34, 147, 255, 0.2);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-8px);
  transition: opacity 180ms ease, transform 180ms ease;
}

.h4-menu-item:hover .h4-dropdown,
.h4-menu-item:focus-within .h4-dropdown,
.h4-dropdown.is-open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.h4-dropdown a {
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px 12px;
  color: #dcecff;
  font-size: 13px;
}

.h4-dropdown a:hover {
  color: #fff;
  background: rgba(31, 199, 255, 0.12);
}

.h4-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(420px, 0.82fr);
  align-items: center;
  min-height: 650px;
  gap: 8px;
  padding-top: 88px;
}

.h4-hero > div:first-child {
  max-width: 620px;
  justify-self: end;
  animation: h4FadeUp 850ms ease both;
}

.h4-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 22px;
  border: 1px solid rgba(55, 200, 255, 0.7);
  border-radius: 999px;
  padding: 9px 20px;
  color: #dffaff;
  background: linear-gradient(90deg, rgba(19, 119, 255, 0.28), rgba(1, 12, 31, 0.72), rgba(255, 116, 33, 0.28));
  box-shadow: 0 0 28px rgba(43, 174, 255, 0.48), inset 0 0 14px rgba(255, 255, 255, 0.1);
  font-size: 14px;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.h4-hero h1 {
  max-width: 620px;
  font-size: clamp(2.8rem, 3.55vw, 4rem);
  font-weight: 950;
  line-height: 1.05;
  letter-spacing: 0;
}

.h4-hero h1 span {
  display: block;
  background: linear-gradient(95deg, #09c8ff 0%, #2688ff 42%, #a553ff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.h4-lede {
  max-width: 540px;
  margin-top: 20px;
  color: #e4ebff;
  font-size: 18px;
  line-height: 1.55;
}

.h4-stats,
.h4-actions,
.h4-trust,
.h4-brand-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.h4-stats {
  gap: 54px;
  margin-top: 32px;
}

.h4-stat {
  display: flex;
  align-items: center;
  gap: 12px;
}

.h4-stat svg {
  color: #ff9f14;
  filter: drop-shadow(0 0 11px rgba(255, 153, 0, 0.75));
}

.h4-stat strong {
  display: block;
  font-size: 20px;
}

.h4-stat span {
  display: block;
  color: #f4f7ff;
  font-size: 12px;
}

.h4-actions {
  gap: 28px;
  margin-top: 30px;
}

.h4-primary,
.h4-secondary {
  min-height: 62px;
  gap: 16px;
  padding: 0 30px;
}

.h4-secondary {
  border: 1px solid rgba(202, 174, 255, 0.62);
  color: #fff;
  background: rgba(7, 11, 31, 0.74);
  box-shadow: inset 0 0 18px rgba(135, 77, 255, 0.12);
}

.h4-trust {
  margin-top: 30px;
}

.h4-trust p {
  width: 100%;
  margin-bottom: 18px;
  color: #cfd8ef;
  font-size: 13px;
}

.h4-brand-row {
  gap: 34px;
  color: #fff;
  font-size: 14px;
  font-weight: 900;
}

.h4-brand-row span::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 7px;
  border-radius: 50%;
  vertical-align: -3px;
  background: radial-gradient(circle at 35% 35%, #fff, #8be9ff 36%, #071a3e 38%, #071a3e 54%, #fff 56%, #ff9f18 72%, #2df1ff);
}

.h4-visual {
  position: relative;
  width: min(100%, 500px);
  min-height: 430px;
  margin-top: 0;
  justify-self: start;
  isolation: isolate;
  animation: h4FadeIn 1s ease 160ms both;
}

.h4-visual::before,
.h4-visual::after {
  content: '';
  position: absolute;
  inset: 24px 0 18px;
  border-radius: 42% 58% 46% 54%;
  pointer-events: none;
}

.h4-visual::before {
  background:
    radial-gradient(circle at 50% 48%, rgba(71, 197, 255, 0.2), transparent 30%),
    radial-gradient(circle at 35% 26%, rgba(255, 136, 42, 0.18), transparent 18%),
    radial-gradient(circle at 78% 60%, rgba(154, 86, 255, 0.2), transparent 24%);
  filter: blur(10px);
  animation: h4VisualBreath 5.8s ease-in-out infinite;
}

.h4-visual::after {
  opacity: 0.52;
  background-image:
    linear-gradient(rgba(53, 197, 255, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(53, 197, 255, 0.14) 1px, transparent 1px);
  background-size: 58px 58px;
  mask-image: radial-gradient(ellipse at center, black 0 46%, transparent 72%);
  animation: h4GridDrift 18s linear infinite;
}

.h4-orb {
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  width: min(280px, 30vw);
  aspect-ratio: 1;
  place-items: center;
  border: 2px solid rgba(49, 174, 255, 0.78);
  border-radius: 50%;
  background:
    radial-gradient(circle at 48% 40%, rgba(255, 255, 255, 0.22), transparent 16%),
    radial-gradient(circle at 50% 48%, rgba(49, 174, 255, 0.4), transparent 46%),
    linear-gradient(135deg, rgba(35, 86, 255, 0.44), rgba(107, 43, 255, 0.28) 52%, rgba(3, 7, 24, 0.96));
  box-shadow: 0 0 90px rgba(0, 136, 255, 0.86), inset 0 0 80px rgba(40, 198, 255, 0.32);
  transform: translate(-50%, -50%);
  animation: h4CoreBreathe 4.8s ease-in-out infinite;
}

.h4-orb::before,
.h4-orb::after,
.h4-robot-core::before {
  content: '';
  position: absolute;
  border-radius: 50%;
}

.h4-orb::before {
  inset: -34px;
  border: 4px solid rgba(31, 163, 255, 0.34);
  border-left-color: rgba(255, 127, 30, 0.92);
  border-right-color: rgba(160, 84, 255, 0.78);
  transform: rotate(-12deg) skewY(-14deg);
  box-shadow: 0 0 32px rgba(81, 179, 255, 0.55);
  animation: h4RingSpin 10s linear infinite;
}

.h4-orb::after {
  inset: -58px;
  border: 2px solid rgba(108, 90, 255, 0.38);
  transform: rotateX(72deg) rotateZ(12deg);
  animation: h4HaloTilt 8s ease-in-out infinite;
}

.h4-robot-core {
  position: relative;
  z-index: 2;
  display: grid;
  width: min(175px, 56%);
  aspect-ratio: 1;
  place-items: center;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.22), rgba(33, 150, 255, 0.08) 42%, transparent 70%);
  animation: h4KGlow 3.4s ease-in-out infinite;
}

.h4-robot-core::before {
  left: 50%;
  top: 52%;
  width: 310px;
  height: 22px;
  border: 4px solid #ff8930;
  border-left-color: transparent;
  border-right-color: transparent;
  transform: translate(-50%, -50%) rotate(-13deg);
  filter: drop-shadow(0 0 18px rgba(255, 106, 35, 0.9));
  animation: h4SlashSweep 2.8s ease-in-out infinite;
}

.h4-robot-core img {
  position: relative;
  z-index: 2;
  width: 150%;
  height: 150%;
  object-fit: contain;
  border-radius: 0;
  filter: drop-shadow(0 0 18px rgba(74, 202, 255, 0.9));
}

.h4-platform {
  position: absolute;
  left: 50%;
  bottom: 8px;
  width: min(430px, 78%);
  height: 108px;
  border: 2px solid rgba(46, 181, 255, 0.52);
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(50, 196, 255, 0.36), rgba(20, 72, 220, 0.2) 52%, transparent 72%);
  box-shadow: 0 0 64px rgba(46, 181, 255, 0.72), inset 0 0 34px rgba(147, 73, 255, 0.46);
  transform: translateX(-50%);
  animation: h4PlatformScan 4s ease-in-out infinite;
}

.h4-wire {
  position: absolute;
  left: 50%;
  top: 48%;
  width: var(--w);
  height: 2px;
  background: linear-gradient(90deg, transparent, #1fc7ff, transparent);
  transform: rotate(var(--r));
  transform-origin: left center;
  box-shadow: 0 0 10px rgba(31, 199, 255, 0.9);
  animation: h4WirePulse 2.6s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

.h4-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1fd4ff;
  box-shadow: 0 0 17px #1fd4ff;
  animation: h4DotPing 3.5s ease-in-out infinite;
}

.dot-1 { left: 21%; top: 17%; background: #ff7b20; box-shadow: 0 0 18px #ff7b20; }
.dot-2 { right: 18%; top: 22%; }
.dot-3 { left: 14%; top: 56%; }
.dot-4 { right: 5%; top: 55%; background: #ff7b20; box-shadow: 0 0 18px #ff7b20; }

.h4-badge {
  position: absolute;
  z-index: 3;
  display: grid;
  width: 104px;
  min-height: 96px;
  place-items: center;
  gap: 8px;
  border: 1px solid rgba(66, 199, 255, 0.78);
  border-radius: 18px;
  padding: 12px 8px;
  color: #fff;
  text-align: center;
  background: linear-gradient(180deg, rgba(17, 58, 145, 0.88), rgba(6, 13, 35, 0.82));
  box-shadow: 0 0 30px rgba(34, 151, 255, 0.62), inset 0 0 18px rgba(129, 68, 255, 0.24);
  backdrop-filter: blur(12px);
  overflow: hidden;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.h4-badge::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.28), transparent 58%);
  opacity: 0;
  transform: translateX(-45%);
  animation: h4CardShine 4.2s ease-in-out infinite;
  animation-delay: inherit;
}

.h4-badge:hover {
  border-color: rgba(255, 137, 48, 0.9);
  box-shadow: 0 0 42px rgba(255, 137, 48, 0.36), 0 0 34px rgba(34, 151, 255, 0.5), inset 0 0 18px rgba(129, 68, 255, 0.24);
}

.h4-badge-inner {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  gap: 8px;
  animation: h4BadgeFloat 5.5s ease-in-out infinite;
  animation-delay: var(--float-delay);
}

.h4-badge svg {
  color: #33d4ff;
  filter: drop-shadow(0 0 12px rgba(48, 209, 255, 0.92));
}

.h4-badge span {
  font-size: 11px;
  font-weight: 950;
  line-height: 1.08;
}

.h4-orbit-ring {
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 48%;
  width: min(430px, 58vw);
  aspect-ratio: 1;
  border: 1px solid rgba(55, 200, 255, 0.28);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotateX(66deg) rotateZ(var(--tilt));
  box-shadow: 0 0 28px rgba(31, 199, 255, 0.2);
  animation: h4OrbitSpin var(--speed) linear infinite;
}

.orbit-2 {
  width: min(500px, 66vw);
  border-color: rgba(255, 137, 48, 0.36);
  animation-direction: reverse;
}

.h4-comet {
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 48%;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #ff8b2a;
  box-shadow: 0 0 16px #ff8b2a, 0 0 38px rgba(255, 139, 42, 0.72);
  transform-origin: 0 0;
  animation: h4CometOrbit var(--speed) linear infinite;
  animation-delay: var(--delay);
}

.h4-comet::before {
  content: '';
  position: absolute;
  right: 5px;
  top: 3px;
  width: 130px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(255, 139, 42, 0.92));
  transform: translateY(-50%);
}

.h4-service-node {
  position: absolute;
  z-index: 4;
  animation: h4BadgeFloat 5.8s ease-in-out infinite;
  animation-delay: var(--float-delay, 0s);
}

.h4-service-node .h4-badge {
  position: static;
}

.node-ai { left: 14%; top: 5%; }
.node-web { right: 7%; top: 7%; }
.node-mobile { left: 4%; top: 39%; }
.node-cloud { right: 1%; top: 39%; }
.node-auto { left: 15%; bottom: 2%; }

.h4-section {
  position: relative;
  z-index: 2;
  padding: 48px 0;
  animation: h4FadeUp 900ms ease both;
}

.h4-section-head {
  margin-bottom: 18px;
  text-align: center;
}

.h4-section-head p {
  color: #12b7ff;
  font-size: 13px;
  font-weight: 950;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.h4-section-head h2 {
  margin-top: 5px;
  font-size: clamp(1.9rem, 2.4vw, 2.6rem);
  font-weight: 950;
  line-height: 1.1;
}

.h4-section-head span {
  background: linear-gradient(92deg, #15c8ff, #8b54ff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.h4-services {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.h4-card,
.h4-panel,
.h4-cta,
.h4-footer,
.h4-newsletter {
  border: 1px solid rgba(62, 180, 255, 0.38);
  background: linear-gradient(180deg, rgba(9, 20, 53, 0.88), rgba(2, 8, 24, 0.76));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 34px rgba(0, 153, 255, 0.17);
}

.h4-card {
  min-height: 194px;
  border-radius: 18px;
  padding: 18px;
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.h4-card:hover,
.h4-panel:hover {
  border-color: rgba(45, 211, 255, 0.68);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 42px rgba(0, 178, 255, 0.24);
  transform: translateY(-6px);
}

.h4-card-icon {
  display: grid;
  width: 72px;
  height: 70px;
  margin-bottom: 10px;
  place-items: center;
  border-radius: 16px;
  background: radial-gradient(circle at 45% 28%, rgba(255, 255, 255, 0.18), transparent 22%), linear-gradient(135deg, rgba(21, 193, 255, 0.24), rgba(136, 65, 255, 0.24));
  box-shadow: inset 0 0 18px rgba(255, 255, 255, 0.08), 0 0 26px rgba(34, 174, 255, 0.34);
}

.h4-card-icon svg {
  color: #2cd3ff;
  filter: drop-shadow(0 0 12px rgba(44, 211, 255, 0.8));
}

.h4-card h3 {
  font-size: 15px;
  font-weight: 950;
  line-height: 1.18;
}

.h4-card p {
  margin-top: 8px;
  color: #d8e3ff;
  font-size: 12px;
  line-height: 1.45;
}

.h4-card a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
}

.h4-main-grid {
  display: grid;
  grid-template-columns: 1.05fr 1.06fr 0.94fr;
  gap: 18px;
}

.h4-panel {
  min-height: 400px;
  border-radius: 20px;
  padding: 22px;
  overflow: hidden;
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.h4-panel h3 {
  font-size: 22px;
  font-weight: 950;
}

.h4-process-body {
  margin-top: 18px;
}

.h4-steps {
  display: grid;
  gap: 12px;
}

.h4-process-summary {
  margin-top: 12px;
  color: #b9c8e8;
  font-size: 13px;
  line-height: 1.55;
}

.h4-step {
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 14px;
  align-items: center;
  min-height: 58px;
  border: 1px solid rgba(73, 167, 255, 0.2);
  border-radius: 14px;
  padding: 10px 12px;
  background: rgba(5, 13, 36, 0.62);
}

.h4-step-num {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #8f37ff, #254fff);
  box-shadow: 0 0 18px rgba(137, 62, 255, 0.76);
  font-size: 12px;
  font-weight: 950;
}

.h4-step strong {
  display: block;
  color: #fff;
  font-size: 15px;
}

.h4-step span {
  display: block;
  color: #dce6ff;
  margin-top: 3px;
  font-size: 12px;
  line-height: 1.35;
}

.h4-showcase-tabs {
  display: flex;
  gap: 70px;
  margin: 24px 0 20px;
  font-size: 13px;
  font-weight: 900;
}

.h4-showcase-tabs button {
  border: 0;
  border-bottom: 2px solid transparent;
  padding: 0 0 9px;
  color: #dce6ff;
  background: transparent;
  font: inherit;
  cursor: pointer;
}

.h4-showcase-tabs button.is-active {
  color: #fff;
  border-bottom: 2px solid #a754ff;
}

.h4-project {
  position: relative;
  min-height: 210px;
}

.h4-laptop {
  width: 380px;
  max-width: 80%;
  height: 190px;
  border: 8px solid #0c1431;
  border-radius: 16px;
  background:
    radial-gradient(circle at 73% 18%, rgba(255, 132, 40, 0.35), transparent 20%),
    radial-gradient(circle at 18% 35%, rgba(156, 77, 255, 0.45), transparent 28%),
    linear-gradient(135deg, #0a42b9, #03091d 65%);
  box-shadow: 0 0 30px rgba(89, 176, 255, 0.42);
}

.h4-laptop::before {
  content: '';
  display: grid;
  height: 100%;
  place-items: center;
  color: #fff;
  text-align: center;
  font-size: 15px;
  font-weight: 950;
}

.h4-project-copy {
  position: absolute;
  left: 26px;
  top: 50%;
  width: min(260px, 58%);
  transform: translateY(-50%);
  color: #fff;
  text-align: center;
}

.h4-project-copy strong {
  display: block;
  font-size: 15px;
  line-height: 1.2;
}

.h4-project-copy span {
  display: block;
  margin-top: 8px;
  color: #dce6ff;
  font-size: 11px;
  line-height: 1.4;
}

.h4-mobile-mock {
  position: absolute;
  right: 24px;
  bottom: 4px;
  width: 92px;
  height: 172px;
  border: 7px solid #eef6ff;
  border-radius: 22px;
  background: linear-gradient(180deg, #f8fbff, #dce9ff);
  box-shadow: 0 0 24px rgba(255, 255, 255, 0.28);
}

.h4-mobile-mock::before {
  content: '';
  position: absolute;
  inset: 22px 14px;
  border-radius: 5px;
  background: linear-gradient(#4aa3ff 0 12px, transparent 12px 24px, #9b5cff 24px 36px, transparent 36px 48px, #26d2ff 48px 60px, transparent 60px);
}

.h4-view-all {
  width: fit-content;
  min-height: 36px;
  margin: 4px auto 0;
  padding: 0 24px;
  border: 1px solid rgba(194, 103, 255, 0.78);
  border-radius: 999px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 900;
}

.h4-why-list {
  display: grid;
  gap: 18px;
  margin-top: 26px;
}

.h4-why-item {
  display: grid;
  grid-template-columns: 26px 1fr;
  align-items: center;
  gap: 14px;
  font-size: 14px;
  font-weight: 900;
}

.h4-why-item svg {
  color: #1fd4ff;
  filter: drop-shadow(0 0 9px rgba(31, 212, 255, 0.84));
}

.h4-mini-metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 28px;
}

.h4-mini-metric {
  min-height: 94px;
  border: 1px solid rgba(73, 167, 255, 0.36);
  border-radius: 12px;
  padding: 12px;
  background: rgba(7, 14, 38, 0.8);
}

.h4-mini-metric span {
  color: #fff;
  font-size: 12px;
  line-height: 1.25;
}

.h4-mini-metric strong {
  display: block;
  margin-top: 12px;
  color: #2ff3d3;
  font-size: 28px;
  line-height: 1;
}

.h4-cta {
  display: grid;
  grid-template-columns: 0.45fr 0.55fr;
  align-items: center;
  min-height: 168px;
  border-radius: 22px;
  overflow: hidden;
  background:
    radial-gradient(circle at 6% 50%, rgba(255, 255, 255, 0.12), transparent 14%),
    radial-gradient(circle at 86% 56%, rgba(38, 209, 255, 0.3), transparent 28%),
    linear-gradient(100deg, rgba(29, 45, 113, 0.88), rgba(4, 18, 47, 0.86));
}

.h4-cta-copy {
  position: relative;
  padding: 30px 42px;
}

.h4-cta h2 {
  font-size: 28px;
  font-weight: 950;
}

.h4-cta p {
  margin-top: 3px;
  color: #eff5ff;
  font-size: 15px;
  font-weight: 800;
}

.h4-cta .h4-actions {
  margin-top: 18px;
  gap: 20px;
}

.h4-cta .h4-primary,
.h4-cta .h4-secondary {
  min-height: 44px;
  padding: 0 24px;
  font-size: 13px;
}

.h4-journey {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 26px;
  padding: 18px 26px;
}

.h4-journey-step {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 950;
  text-align: center;
}

.h4-journey-step:not(:last-child)::after {
  content: '->';
  position: absolute;
  right: -22px;
  top: 32px;
  color: rgba(255, 255, 255, 0.64);
  font-weight: 400;
}

.h4-journey-icon {
  display: grid;
  width: 74px;
  height: 74px;
  place-items: center;
  border-radius: 22px;
  background: radial-gradient(circle at 45% 30%, rgba(255, 255, 255, 0.18), transparent 20%), linear-gradient(135deg, #12ccff, #6f3bff);
  box-shadow: 0 0 28px rgba(31, 212, 255, 0.58);
}

.h4-footer {
  display: grid;
  grid-template-columns: minmax(260px, 1.25fr) repeat(3, minmax(150px, 0.72fr)) minmax(210px, 0.9fr) minmax(300px, 1.35fr);
  gap: 34px;
  margin-top: 22px;
  border-width: 1px 0 0;
  border-radius: 0;
  padding: 32px 22px 20px;
  background: rgba(2, 8, 25, 0.7);
  box-shadow: none;
  align-items: start;
}

.h4-footer p,
.h4-footer a,
.h4-footer li {
  color: #ccd7ee;
  font-size: 13px;
  line-height: 1.8;
}

.h4-footer h3 {
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 950;
}

.h4-footer a {
  display: block;
  width: fit-content;
  margin-top: 6px;
  white-space: normal;
}

.h4-footer-logo {
  transform: scale(0.82);
  transform-origin: left center;
  margin-bottom: 10px;
}

.h4-socials {
  display: flex;
  gap: 12px;
  margin-top: 18px;
}

.h4-socials span {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.h4-socials a {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #ccd7ee;
}

.h4-contact-line {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 10px;
  align-items: start;
  margin-bottom: 12px;
  color: #eaf3ff;
  font-size: 13px;
}

.h4-newsletter {
  border-radius: 20px;
  padding: 22px;
  min-width: 0;
}

.h4-newsletter input {
  width: 100%;
  min-height: 54px;
  margin-top: 14px;
  border: 1px solid rgba(151, 182, 255, 0.46);
  border-radius: 10px;
  padding: 0 18px;
  color: #fff;
  background: rgba(4, 9, 27, 0.84);
  outline: none;
}

.h4-subscribe {
  width: 150px;
  min-height: 48px;
  margin-top: 16px;
  margin-left: auto;
  border: 0;
}

.h4-news-status {
  margin-top: 10px;
  color: #2ff3d3;
  font-size: 12px;
  font-weight: 800;
}

.h4-top {
  position: fixed;
  right: 42px;
  bottom: 28px;
  z-index: 7;
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, #8742ff, #19cbff);
  box-shadow: 0 0 28px rgba(42, 185, 255, 0.68);
}

@keyframes h4FadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes h4SlideDown {
  from { opacity: 0; transform: translateY(-18px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes h4FadeIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes h4VisualBreath {
  0%, 100% { opacity: 0.74; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1.03); }
}

@keyframes h4GridDrift {
  to { background-position: 58px 58px, 58px 58px; }
}

@keyframes h4CoreBreathe {
  0%, 100% { transform: translate(-50%, -50%) scale(1); filter: saturate(1); }
  50% { transform: translate(-50%, -50%) scale(1.035); filter: saturate(1.35); }
}

@keyframes h4RingSpin {
  to { rotate: 360deg; }
}

@keyframes h4HaloTilt {
  0%, 100% { transform: rotateX(72deg) rotateZ(12deg) scale(1); opacity: 0.74; }
  50% { transform: rotateX(66deg) rotateZ(34deg) scale(1.04); opacity: 1; }
}

@keyframes h4KGlow {
  0%, 100% { transform: translateY(0) scale(1); filter: saturate(1); }
  50% { transform: translateY(-4px) scale(1.04); filter: saturate(1.28) brightness(1.08); }
}

@keyframes h4SlashSweep {
  0%, 100% { transform: translate(-50%, -50%) rotate(-13deg) translateX(-8px); opacity: 0.82; }
  50% { transform: translate(-50%, -50%) rotate(-13deg) translateX(12px); opacity: 1; }
}

@keyframes h4PlatformScan {
  0%, 100% { opacity: 0.78; filter: hue-rotate(0deg); }
  50% { opacity: 1; filter: hue-rotate(28deg) brightness(1.16); }
}

@keyframes h4WirePulse {
  0%, 100% { opacity: 0.26; transform: rotate(var(--r)) scaleX(0.72); }
  50% { opacity: 1; transform: rotate(var(--r)) scaleX(1); }
}

@keyframes h4DotPing {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.6); opacity: 1; }
}

@keyframes h4BadgeFloat {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -6px; }
}

@keyframes h4CardShine {
  0%, 55% { opacity: 0; transform: translateX(-55%); }
  70% { opacity: 1; }
  100% { opacity: 0; transform: translateX(55%); }
}

@keyframes h4OrbitSpin {
  to { transform: translate(-50%, -50%) rotateX(66deg) rotateZ(calc(var(--tilt) + 360deg)); }
}

@keyframes h4CometOrbit {
  from { transform: rotate(var(--start)) translateX(var(--radius)) rotate(0deg); }
  to { transform: rotate(calc(var(--start) + 360deg)) translateX(var(--radius)) rotate(-360deg); }
}

@keyframes h4NodeOrbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes h4NodeCounterSpin {
  from {
    transform: rotate(var(--node-angle)) translateX(var(--node-radius)) rotate(calc(var(--node-angle) * -1)) rotate(0deg) translate(-50%, -50%);
  }
  to {
    transform: rotate(var(--node-angle)) translateX(var(--node-radius)) rotate(calc(var(--node-angle) * -1)) rotate(-360deg) translate(-50%, -50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .h4-visual *,
  .h4-visual::before,
  .h4-visual::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
  }
}

@media (max-width: 1250px) {
  .h4-nav,
  .h4-hero,
  .h4-main-grid,
  .h4-cta,
  .h4-footer {
    grid-template-columns: 1fr;
  }

  .h4-menu { justify-content: flex-start; overflow-x: auto; }
  .h4-hero { justify-items: center; text-align: center; }
  .h4-actions,
  .h4-brand-row { justify-content: center; }
  .h4-services { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .h4-cta-copy { padding: 30px; }
}

@media (min-width: 761px) and (max-width: 1250px) {
  .h4-hero {
    gap: 28px;
    padding-top: 104px;
  }

  .h4-visual {
    width: min(100%, 520px);
    min-height: 440px;
  }

  .h4-main-grid {
    grid-template-columns: 1fr;
  }

  .h4-cta {
    grid-template-columns: 1fr;
  }

  .h4-journey {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .h4-journey-step:not(:last-child)::after {
    display: none;
  }
}

@media (min-width: 1500px) {
  .h4-wrap {
    width: min(1260px, calc(100vw - 90px));
  }

  .h4-hero {
    grid-template-columns: minmax(650px, 0.95fr) minmax(460px, 0.82fr);
    gap: 10px;
  }

  .h4-hero h1 {
    font-size: 4rem;
  }

  .h4-visual {
    width: 500px;
    min-height: 430px;
  }
}

@media (max-width: 760px) {
  .h4-wrap { width: min(100% - 28px, 1280px); }
  .h4-nav { gap: 14px; }
  .h4-menu { grid-column: 1 / -1; justify-content: flex-start; gap: 22px; padding-bottom: 8px; }
  .h4-call { min-width: 128px; min-height: 46px; }
  .h4-hero {
    min-height: auto;
    gap: 22px;
    padding-top: 86px;
    text-align: center;
  }
  .h4-eyebrow {
    max-width: 100%;
    justify-content: center;
    padding: 8px 14px;
    font-size: 11px;
    white-space: normal;
  }
  .h4-hero h1 {
    font-size: clamp(2.25rem, 12vw, 3rem);
    line-height: 1.08;
  }
  .h4-lede {
    margin-left: auto;
    margin-right: auto;
    font-size: 15px;
    line-height: 1.55;
  }
  .h4-actions {
    width: 100%;
    justify-content: center;
    gap: 12px;
  }
  .h4-primary,
  .h4-secondary {
    min-height: 52px;
    flex: 1 1 100%;
    max-width: 320px;
    padding: 0 18px;
  }
  .h4-trust {
    margin-top: 24px;
  }
  .h4-brand-row {
    justify-content: center;
    gap: 14px 18px;
    font-size: 12px;
  }
  .h4-visual {
    width: min(100%, 360px);
    min-height: 360px;
    margin: 4px auto 0;
    transform: none;
  }
  .h4-visual::before,
  .h4-visual::after {
    inset: 34px 4px 28px;
  }
  .h4-orb {
    top: 50%;
    width: 200px;
  }
  .h4-orb::before { inset: -24px; }
  .h4-orb::after { inset: -38px; }
  .h4-robot-core {
    width: 128px;
  }
  .h4-robot-core::before {
    width: 230px;
    height: 18px;
  }
  .h4-platform {
    bottom: 18px;
    width: 300px;
    height: 78px;
  }
  .h4-orbit-ring {
    width: 300px;
  }
  .orbit-2 {
    width: 340px;
  }
  .h4-wire {
    width: calc(var(--w) * 0.62);
  }
  .h4-badge {
    width: 82px;
    min-height: 78px;
    border-radius: 14px;
    padding: 9px 6px;
  }
  .h4-badge-inner {
    gap: 5px;
  }
  .h4-badge svg {
    width: 24px;
    height: 24px;
  }
  .h4-badge span {
    font-size: 9px;
  }
  .node-ai { left: 9%; top: 5%; }
  .node-web { right: 8%; top: 6%; }
  .node-mobile { left: 0; top: 40%; }
  .node-cloud { right: 0; top: 40%; }
  .node-auto { left: 50%; bottom: 0; transform: translateX(-50%); }
  .h4-services,
  .h4-mini-metrics,
  .h4-journey {
    grid-template-columns: 1fr;
  }
  .h4-section {
    padding: 34px 0;
  }
  .h4-section-head {
    margin-bottom: 18px;
  }
  .h4-section-head h2 {
    font-size: 1.8rem;
  }
  .h4-card,
  .h4-panel {
    min-height: auto;
    padding: 18px;
  }
  .h4-main-grid {
    gap: 14px;
  }
  .h4-showcase-tabs {
    gap: 16px;
    overflow-x: auto;
    padding-bottom: 4px;
  }
  .h4-project {
    min-height: 260px;
  }
  .h4-laptop {
    width: 100%;
    max-width: 100%;
    height: 170px;
  }
  .h4-project-copy {
    left: 18px;
    width: min(220px, 62%);
  }
  .h4-mobile-mock {
    right: 8px;
    width: 76px;
    height: 142px;
  }
  .h4-cta {
    min-height: auto;
  }
  .h4-cta-copy {
    padding: 24px 18px;
    text-align: center;
  }
  .h4-cta h2 {
    font-size: 1.8rem;
  }
  .h4-cta .h4-actions {
    justify-content: center;
  }
  .h4-journey {
    gap: 16px;
    padding: 18px;
  }
  .h4-journey-step {
    font-size: 16px;
  }
  .h4-journey-step:not(:last-child)::after {
    display: none;
  }
  .h4-journey-icon {
    width: 58px;
    height: 58px;
    border-radius: 16px;
  }
  .h4-process-body { grid-template-columns: 1fr; }
  .h4-top { display: none; }
}
`;

function Home4() {
  const [activeWork, setActiveWork] = useState(featuredWorks[0]);

  useEffect(() => {
    document.documentElement.dataset.kreonixHome4 = 'active';
    return () => {
      delete document.documentElement.dataset.kreonixHome4;
    };
  }, []);

  return (
    <main className="home4" id="top">
      <style>{styles}</style>

      <section className="h4-hero h4-wrap">
        <div>
          <div className="h4-eyebrow">AI <span>*</span> Software <span>*</span> Automation</div>
          <h1>
            Empowering Businesses with
            <span>Intelligence &amp; Innovation</span>
          </h1>
          <p className="h4-lede">We deliver world-class AI/ML, Web, Android, and Cloud solutions that drive real results.</p>

          <div className="h4-actions">
            <Link className="h4-primary" to="/contact">Book a Call <ArrowRight size={20} /></Link>
            <Link className="h4-secondary" to="/contact">Free Consultation <CalendarDays size={19} /></Link>
          </div>

          <div className="h4-trust">
            <p>Trusted by growing businesses worldwide</p>
            <div className="h4-brand-row">
              {['verox', 'NexaMart', 'BrightFlow', 'Techora', 'HypeTech'].map((brand) => <span key={brand}>{brand}</span>)}
            </div>
          </div>
        </div>

        <div className="h4-visual" aria-hidden="true">
          <span className="h4-orbit-ring orbit-1" style={{ '--tilt': '-16deg', '--speed': '16s' }} />
          <span className="h4-orbit-ring orbit-2" style={{ '--tilt': '28deg', '--speed': '22s' }} />
          {[0, 1, 2].map((i) => (
            <span
              key={`comet-${i}`}
              className="h4-comet"
              style={{
                '--start': `${[18, 142, 256][i]}deg`,
                '--radius': `${[248, 315, 280][i]}px`,
                '--speed': `${[7, 11, 9][i]}s`,
                '--delay': `${i * -1.4}s`,
              }}
            />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="h4-wire" style={{ '--r': `${[-18, 22, 67, 132, 195, 248][i]}deg`, '--w': `${250 + i * 36}px`, '--delay': `${i * -0.22}s` }} />
          ))}
          <span className="h4-dot dot-1" />
          <span className="h4-dot dot-2" />
          <span className="h4-dot dot-3" />
          <span className="h4-dot dot-4" />
          <div className="h4-orb">
            <div className="h4-robot-core">
              <img src="/home4-robot.png" alt="" />
            </div>
          </div>
          <div className="h4-platform" />
          {heroBadges.map(({ label, icon: Icon, className }, index) => (
            <div
              className={`h4-service-node ${className}`}
              key={label}
              style={{ '--float-delay': `${index * -0.7}s` }}
            >
              <div className="h4-badge">
                <div className="h4-badge-inner">
                  <Icon size={34} />
                  <span>{label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="h4-section h4-wrap">
        <div className="h4-section-head">
          <p>Our Services</p>
          <h2>Complete <span>Technology Solutions</span> Under One Roof</h2>
        </div>
        <div className="h4-services">
          {services.map(({ title, copy, icon: Icon, href }) => (
            <article className="h4-card" key={title}>
              <div className="h4-card-icon"><Icon size={42} /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link to={href}>Explore <ArrowRight size={14} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="h4-section h4-wrap">
        <div className="h4-main-grid">
          <article className="h4-panel">
            <h3>Our Process</h3>
            <p className="h4-process-summary">
              A simple build path from idea to launch, without extra visual clutter.
            </p>
            <div className="h4-process-body">
              <div className="h4-steps">
                {process.map(([title, copy], index) => (
                  <div className="h4-step" key={title}>
                    <span className="h4-step-num">{String(index + 1).padStart(2, '0')}</span>
                    <div><strong>{title}</strong><span>{copy}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="h4-panel">
            <h3>Featured Work</h3>
            <div className="h4-showcase-tabs">
              {featuredWorks.map((item) => (
                <button
                  className={activeWork.tab === item.tab ? 'is-active' : ''}
                  key={item.tab}
                  type="button"
                  onClick={() => setActiveWork(item)}
                >
                  {item.tab}
                </button>
              ))}
            </div>
            <div className="h4-project">
              <div className="h4-laptop" />
              <div className="h4-project-copy">
                <strong>{activeWork.title}</strong>
                <span>{activeWork.copy}</span>
              </div>
              <div className="h4-mobile-mock" />
            </div>
            <Link className="h4-view-all" to={activeWork.href}>View All Projects <ArrowRight size={16} /></Link>
          </article>

          <article className="h4-panel">
            <h3>Why Choose Kreonix?</h3>
            <div className="h4-why-list">
              {why.map(([label, Icon]) => (
                <div className="h4-why-item" key={label}><Icon size={21} /><span>{label}</span></div>
              ))}
            </div>
            <div className="h4-mini-metrics">
              <div className="h4-mini-metric"><span>Discovery First</span><strong>01</strong></div>
              <div className="h4-mini-metric"><span>Prototype Sprint</span><strong>02</strong></div>
              <div className="h4-mini-metric"><span>Launch Support</span><strong>03</strong></div>
              <div className="h4-mini-metric"><span>Growth Ready</span><strong>04</strong></div>
            </div>
          </article>
        </div>
      </section>

      <section className="h4-section h4-wrap">
        <div className="h4-cta">
          <div className="h4-cta-copy">
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's build something intelligent together.</p>
            <div className="h4-actions">
              <Link className="h4-primary" to="/contact">Book Free Call <ArrowRight size={18} /></Link>
              <Link className="h4-secondary" to="/contact">Start a Project <ArrowRight size={18} /></Link>
            </div>
          </div>
          <div className="h4-journey">
            <Link className="h4-journey-step" to="/contact"><span className="h4-journey-icon"><MapPin size={34} /></span>Share Idea</Link>
            <Link className="h4-journey-step" to="/services"><span className="h4-journey-icon"><Cloud size={34} /></span>Get Plan</Link>
            <Link className="h4-journey-step" to="/portfolio"><span className="h4-journey-icon"><Code2 size={34} /></span>We Build</Link>
            <Link className="h4-journey-step" to="/contact"><span className="h4-journey-icon"><TrendingUp size={34} /></span>You Grow</Link>
          </div>
        </div>
      </section>
      <a className="h4-top" href="#top" aria-label="Back to top">↑</a>
    </main>
  );
}

export default Home4;

