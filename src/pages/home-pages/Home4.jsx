import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Code2,
  Cpu,
  Database,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Rocket,
  Send,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  Workflow,
  Youtube,
  Instagram,
  X,
} from 'lucide-react';
import KreonixLogo from '../../components/KreonixLogo';

const services = [
  { title: 'AI Agents & Automation', copy: 'Intelligent AI Agents and workflow automation for your business', icon: Bot },
  { title: 'Web & Mobile Development', copy: 'Modern, responsive websites and powerful mobile applications', icon: Smartphone },
  { title: 'CRM & ERP Solutions', copy: 'Custom CRM & ERP systems to manage your entire business', icon: Database },
  { title: 'Cloud & DevOps Solutions', copy: 'Scalable cloud infrastructure & DevOps for high performance', icon: Cloud },
  { title: 'Analytics & Dashboards', copy: 'Real-time analytics, reports and business intelligence dashboards', icon: BarChart3 },
  { title: 'Digital Marketing', copy: 'SEO, Social Media, Paid Ads & Growth Marketing', icon: Rocket },
];

const heroBadges = [
  { label: 'AI Agents', icon: Bot, className: 'badge-ai' },
  { label: 'Web & App Development', icon: Code2, className: 'badge-web' },
  { label: 'CRM & ERP Systems', icon: Database, className: 'badge-crm' },
  { label: 'Cloud Solutions', icon: Cloud, className: 'badge-cloud' },
  { label: 'Analytics & Dashboards', icon: BarChart3, className: 'badge-analytics' },
  { label: 'Automation Workflows', icon: Workflow, className: 'badge-auto' },
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

const footerGroups = [
  ['Services', ['AI Agents & Automation', 'Web & App Development', 'CRM & ERP Solutions', 'Cloud & DevOps', 'Analytics & Dashboards', 'Digital Marketing']],
  ['Solutions', ['Business Automation', 'SaaS Development', 'E-commerce Solutions', 'AI Chatbots', 'Workflow Automation', 'System Integration']],
  ['Company', ['About Us', 'Our Process', 'Portfolio', 'Blog', 'Careers', 'Contact Us']],
];

const styles = `
html[data-kreonix-home4='active'] body { background: #010716; }
html[data-kreonix-home4='active'] .bg-animation-wrapper,
html[data-kreonix-home4='active'] header { display: none; }

.home4 {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at 64% 15%, rgba(32, 120, 255, 0.32), transparent 24%),
    radial-gradient(circle at 90% 42%, rgba(138, 43, 226, 0.18), transparent 22%),
    linear-gradient(180deg, #020613 0%, #050b1d 40%, #03112a 100%);
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
  width: min(1810px, calc(100vw - 72px));
  margin: 0 auto;
}

.h4-nav {
  display: grid;
  grid-template-columns: 330px 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 20px 0 14px;
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
.h4-menu span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #f8fbff;
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
.h4-menu-btn,
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

.h4-menu-btn {
  width: 88px;
  height: 52px;
  border: 1px solid rgba(185, 156, 255, 0.36);
  color: #fff;
  background: rgba(4, 8, 24, 0.76);
}

.h4-hero {
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  align-items: center;
  min-height: 690px;
  gap: 18px;
}

.h4-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
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
  max-width: 700px;
  font-size: clamp(3.2rem, 5.3vw, 5.75rem);
  font-weight: 950;
  line-height: 1.03;
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
  max-width: 600px;
  margin-top: 18px;
  color: #e4ebff;
  font-size: 19px;
  line-height: 1.45;
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
  margin-top: 38px;
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
  margin-top: 52px;
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
  min-height: 650px;
  isolation: isolate;
}

.h4-orb {
  position: absolute;
  left: 50%;
  top: 48%;
  display: grid;
  width: min(470px, 48vw);
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
}

.h4-orb::before,
.h4-orb::after,
.h4-k::before,
.h4-k::after {
  content: '';
  position: absolute;
  border-radius: 50%;
}

.h4-orb::before {
  inset: -46px;
  border: 4px solid rgba(31, 163, 255, 0.34);
  border-left-color: rgba(255, 127, 30, 0.92);
  border-right-color: rgba(160, 84, 255, 0.78);
  transform: rotate(-12deg) skewY(-14deg);
  box-shadow: 0 0 32px rgba(81, 179, 255, 0.55);
}

.h4-orb::after {
  inset: -78px;
  border: 2px solid rgba(108, 90, 255, 0.38);
  transform: rotateX(72deg) rotateZ(12deg);
}

.h4-k {
  position: relative;
  z-index: 2;
  color: #fff;
  font-size: clamp(8rem, 11vw, 14rem);
  font-weight: 950;
  line-height: 0.8;
  text-shadow: 0 0 24px #38d8ff, 0 0 58px rgba(58, 127, 255, 0.85);
}

.h4-k::before {
  left: -86px;
  top: 42%;
  width: 640px;
  height: 28px;
  border: 4px solid #ff8930;
  border-left-color: transparent;
  border-right-color: transparent;
  transform: translateY(-50%) rotate(-13deg);
  filter: drop-shadow(0 0 18px rgba(255, 106, 35, 0.9));
}

.h4-platform {
  position: absolute;
  left: 50%;
  bottom: 44px;
  width: min(720px, 78%);
  height: 160px;
  border: 2px solid rgba(46, 181, 255, 0.52);
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(50, 196, 255, 0.36), rgba(20, 72, 220, 0.2) 52%, transparent 72%);
  box-shadow: 0 0 64px rgba(46, 181, 255, 0.72), inset 0 0 34px rgba(147, 73, 255, 0.46);
  transform: translateX(-50%);
}

.h4-desk {
  position: absolute;
  bottom: 38px;
  width: 120px;
  height: 54px;
  border-radius: 8px;
  background: linear-gradient(180deg, #14244d, #09112b);
  box-shadow: 0 0 28px rgba(37, 156, 255, 0.48);
}

.desk-left { left: 27%; }
.desk-right { right: 22%; }

.h4-desk::before {
  content: '';
  position: absolute;
  left: 22px;
  top: -34px;
  width: 58px;
  height: 34px;
  border: 3px solid #2ecbff;
  border-radius: 6px;
  background: linear-gradient(135deg, rgba(32, 129, 255, 0.8), rgba(5, 9, 28, 0.94));
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
}

.h4-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1fd4ff;
  box-shadow: 0 0 17px #1fd4ff;
}

.dot-1 { left: 21%; top: 17%; background: #ff7b20; box-shadow: 0 0 18px #ff7b20; }
.dot-2 { right: 18%; top: 22%; }
.dot-3 { left: 14%; top: 56%; }
.dot-4 { right: 5%; top: 55%; background: #ff7b20; box-shadow: 0 0 18px #ff7b20; }

.h4-badge {
  position: absolute;
  z-index: 3;
  display: grid;
  width: 132px;
  min-height: 120px;
  place-items: center;
  gap: 8px;
  border: 1px solid rgba(66, 199, 255, 0.78);
  border-radius: 18px;
  padding: 14px 10px;
  color: #fff;
  text-align: center;
  background: linear-gradient(180deg, rgba(17, 58, 145, 0.88), rgba(6, 13, 35, 0.82));
  box-shadow: 0 0 30px rgba(34, 151, 255, 0.62), inset 0 0 18px rgba(129, 68, 255, 0.24);
}

.h4-badge svg {
  color: #33d4ff;
  filter: drop-shadow(0 0 12px rgba(48, 209, 255, 0.92));
}

.h4-badge span {
  font-size: 13px;
  font-weight: 950;
  line-height: 1.08;
}

.badge-ai { left: 22%; top: 3%; }
.badge-web { right: 16%; top: 2%; }
.badge-crm { left: 12%; top: 35%; }
.badge-cloud { right: 1%; top: 32%; }
.badge-analytics { left: 21%; bottom: 9%; }
.badge-auto { right: 11%; bottom: 11%; }

.h4-section {
  position: relative;
  z-index: 2;
  padding: 14px 0;
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
  grid-template-columns: repeat(6, minmax(0, 1fr));
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
}

.h4-panel h3 {
  font-size: 22px;
  font-weight: 950;
}

.h4-process-body {
  display: grid;
  grid-template-columns: 150px 1fr;
  align-items: center;
  gap: 18px;
  margin-top: 14px;
}

.h4-steps {
  display: grid;
  gap: 14px;
}

.h4-step {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: start;
}

.h4-step-num {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #8f37ff, #254fff);
  box-shadow: 0 0 18px rgba(137, 62, 255, 0.76);
  font-size: 13px;
  font-weight: 950;
}

.h4-step strong {
  display: block;
  font-size: 13px;
}

.h4-step span {
  display: block;
  color: #dce6ff;
  font-size: 11px;
  line-height: 1.35;
}

.h4-process-art {
  position: relative;
  min-height: 310px;
}

.h4-screen {
  position: absolute;
  left: 20px;
  top: 50px;
  width: 210px;
  height: 132px;
  border: 6px solid #0c1738;
  border-radius: 16px;
  background: linear-gradient(135deg, #174dff, #020617 66%), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0 2px, transparent 2px 18px);
  box-shadow: 0 0 38px rgba(31, 187, 255, 0.55);
}

.h4-screen::before,
.h4-screen::after {
  content: '';
  position: absolute;
  left: 28px;
  right: 28px;
  height: 3px;
  border-radius: 999px;
  background: #29d9ff;
  box-shadow: 0 18px 0 #8f4fff, 0 36px 0 #29d9ff, 0 54px 0 #ff8d27;
}

.h4-screen::before { top: 28px; }
.h4-screen::after { top: 88px; width: 92px; right: auto; }

.h4-phone {
  position: absolute;
  right: 10px;
  bottom: 48px;
  width: 78px;
  height: 152px;
  border: 6px solid #102150;
  border-radius: 20px;
  background: radial-gradient(circle at 50% 20%, rgba(48, 211, 255, 0.42), transparent 22%), linear-gradient(180deg, #0a2c7d, #05091d);
  box-shadow: 0 0 28px rgba(52, 202, 255, 0.48);
}

.h4-rocket {
  position: absolute;
  right: 78px;
  top: 20px;
  color: #ff8f22;
  filter: drop-shadow(0 0 16px rgba(255, 143, 34, 0.78));
}

.h4-showcase-tabs {
  display: flex;
  gap: 70px;
  margin: 24px 0 20px;
  font-size: 13px;
  font-weight: 900;
}

.h4-showcase-tabs span:first-child {
  color: #fff;
  border-bottom: 2px solid #a754ff;
  padding-bottom: 9px;
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
  content: 'Smart Inventory Management System';
  display: grid;
  height: 100%;
  place-items: center;
  color: #fff;
  text-align: center;
  font-size: 15px;
  font-weight: 950;
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
  padding: 24px 28px 24px 290px;
}

.h4-cta-bot {
  position: absolute;
  left: 18px;
  bottom: -34px;
  width: 240px;
  height: 220px;
  background-image: url('/babu-ram-ai-chat-boot.png');
  background-size: cover;
  background-position: center;
  border-radius: 26px;
  filter: drop-shadow(0 0 18px rgba(52, 196, 255, 0.5));
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
  grid-template-columns: 1.35fr 0.72fr 0.72fr 0.72fr 0.9fr 1.5fr;
  gap: 28px;
  margin-top: 22px;
  border-width: 1px 0 0;
  border-radius: 0;
  padding: 30px 20px 18px;
  background: rgba(2, 8, 25, 0.7);
  box-shadow: none;
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

.h4-legal {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 0 24px;
  color: #aebbd4;
  font-size: 13px;
}

.h4-legal-links {
  display: flex;
  gap: 30px;
}

.h4-chat {
  position: fixed;
  z-index: 6;
  right: 28px;
  bottom: 104px;
  display: grid;
  grid-template-columns: 72px 1fr;
  align-items: center;
  gap: 14px;
  width: 332px;
  border: 1px solid rgba(180, 90, 255, 0.68);
  border-radius: 24px;
  padding: 13px 18px;
  background: linear-gradient(180deg, rgba(12, 18, 47, 0.96), rgba(22, 8, 48, 0.94));
  box-shadow: 0 0 34px rgba(136, 72, 255, 0.58);
}

.h4-chat img {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
}

.h4-chat strong {
  display: block;
  font-size: 14px;
}

.h4-chat span,
.h4-chat p {
  color: #edf5ff;
  font-size: 13px;
  line-height: 1.35;
}

.h4-chat-heart {
  position: fixed;
  right: 36px;
  bottom: 190px;
  z-index: 7;
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 50%;
  color: #15344e;
  background: #fff;
  box-shadow: 0 0 22px rgba(45, 255, 204, 0.7);
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

@media (max-width: 1250px) {
  .h4-nav,
  .h4-hero,
  .h4-main-grid,
  .h4-cta,
  .h4-footer {
    grid-template-columns: 1fr;
  }

  .h4-menu { justify-content: flex-start; overflow-x: auto; }
  .h4-services { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .h4-cta-copy { padding-left: 240px; }
}

@media (max-width: 760px) {
  .h4-wrap { width: min(100% - 28px, 1810px); }
  .h4-nav { gap: 14px; }
  .h4-menu { display: none; }
  .h4-call { min-width: 128px; min-height: 46px; }
  .h4-menu-btn { width: 54px; height: 46px; }
  .h4-hero { min-height: auto; padding-top: 24px; }
  .h4-hero h1 { font-size: 3rem; }
  .h4-visual { min-height: 520px; transform: scale(0.86); transform-origin: top center; }
  .h4-services,
  .h4-mini-metrics,
  .h4-journey {
    grid-template-columns: 1fr;
  }
  .h4-process-body { grid-template-columns: 1fr; }
  .h4-cta-copy { padding: 180px 20px 22px; }
  .h4-cta-bot { width: 180px; height: 170px; bottom: auto; top: -6px; }
  .h4-chat { position: static; width: auto; margin: 18px auto; }
  .h4-chat-heart,
  .h4-top { display: none; }
}
`;

function Home4() {
  useEffect(() => {
    document.documentElement.dataset.kreonixHome4 = 'active';
    return () => {
      delete document.documentElement.dataset.kreonixHome4;
    };
  }, []);

  return (
    <main className="home4" id="top">
      <style>{styles}</style>

      <nav className="h4-nav h4-wrap">
        <Link to="/" aria-label="Kreonix home">
          <KreonixLogo className="h4-logo" />
        </Link>
        <div className="h4-menu">
          <Link to="/home4">Home</Link>
          <span>Services <ChevronDown size={14} /></span>
          <span>Solutions <ChevronDown size={14} /></span>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/about">About Us</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="h4-nav-actions">
          <Link className="h4-call" to="/contact">Book a Call</Link>
          <button className="h4-menu-btn" type="button" aria-label="Open menu">
            <Menu size={32} />
          </button>
        </div>
      </nav>

      <section className="h4-hero h4-wrap">
        <div>
          <div className="h4-eyebrow">AI <span>*</span> Software <span>*</span> Automation</div>
          <h1>
            We Build
            <span>Intelligent Solutions</span>
            That Grow Businesses
          </h1>
          <p className="h4-lede">AI Agents, Automations, Web & Mobile Apps, Cloud Solutions & More.</p>

          <div className="h4-stats">
            <div className="h4-stat"><Briefcase size={32} /><div><strong>50+</strong><span>Projects Delivered</span></div></div>
            <div className="h4-stat"><Heart size={32} /><div><strong>30+</strong><span>Happy Clients</span></div></div>
            <div className="h4-stat"><ShieldCheck size={32} /><div><strong>99%</strong><span>Client Satisfaction</span></div></div>
          </div>

          <div className="h4-actions">
            <Link className="h4-primary" to="/services">Explore Our Solutions <ArrowRight size={20} /></Link>
            <Link className="h4-secondary" to="/contact">Book Free Consultation <CalendarDays size={19} /></Link>
          </div>

          <div className="h4-trust">
            <p>Trusted by growing businesses worldwide</p>
            <div className="h4-brand-row">
              {['verox', 'NexaMart', 'BrightFlow', 'Techora', 'HypeTech'].map((brand) => <span key={brand}>{brand}</span>)}
            </div>
          </div>
        </div>

        <div className="h4-visual" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="h4-wire" style={{ '--r': `${[-18, 22, 67, 132, 195, 248][i]}deg`, '--w': `${250 + i * 36}px` }} />
          ))}
          <span className="h4-dot dot-1" />
          <span className="h4-dot dot-2" />
          <span className="h4-dot dot-3" />
          <span className="h4-dot dot-4" />
          <div className="h4-orb"><div className="h4-k">K</div></div>
          <div className="h4-platform" />
          <div className="h4-desk desk-left" />
          <div className="h4-desk desk-right" />
          {heroBadges.map(({ label, icon: Icon, className }) => (
            <div className={`h4-badge ${className}`} key={label}>
              <Icon size={38} />
              <span>{label}</span>
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
          {services.map(({ title, copy, icon: Icon }) => (
            <article className="h4-card" key={title}>
              <div className="h4-card-icon"><Icon size={42} /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link to="/services">Explore <ArrowRight size={14} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="h4-section h4-wrap">
        <div className="h4-main-grid">
          <article className="h4-panel">
            <h3>Our Process</h3>
            <div className="h4-process-body">
              <div className="h4-steps">
                {process.map(([title, copy], index) => (
                  <div className="h4-step" key={title}>
                    <span className="h4-step-num">{String(index + 1).padStart(2, '0')}</span>
                    <div><strong>{title}</strong><span>{copy}</span></div>
                  </div>
                ))}
              </div>
              <div className="h4-process-art">
                <div className="h4-screen" />
                <Smartphone className="h4-phone" size={74} strokeWidth={1.4} />
                <Rocket className="h4-rocket" size={82} />
              </div>
            </div>
          </article>

          <article className="h4-panel">
            <h3>Featured Work</h3>
            <div className="h4-showcase-tabs"><span>Websites</span><span>Apps</span><span>Dashboards</span><span>Automation</span></div>
            <div className="h4-project">
              <div className="h4-laptop" />
              <div className="h4-mobile-mock" />
            </div>
            <Link className="h4-view-all" to="/portfolio">View All Projects <ArrowRight size={16} /></Link>
          </article>

          <article className="h4-panel">
            <h3>Why Choose Kreonix?</h3>
            <div className="h4-why-list">
              {why.map(([label, Icon]) => (
                <div className="h4-why-item" key={label}><Icon size={21} /><span>{label}</span></div>
              ))}
            </div>
            <div className="h4-mini-metrics">
              <div className="h4-mini-metric"><span>Years of Experience</span><strong>5+</strong></div>
              <div className="h4-mini-metric"><span>Projects Delivered</span><strong>50+</strong></div>
              <div className="h4-mini-metric"><span>Clients Worldwide</span><strong>30+</strong></div>
              <div className="h4-mini-metric"><span>Satisfaction Rate</span><strong>99%</strong></div>
            </div>
          </article>
        </div>
      </section>

      <section className="h4-section h4-wrap">
        <div className="h4-cta">
          <div className="h4-cta-copy">
            <div className="h4-cta-bot" />
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's build something intelligent together.</p>
            <div className="h4-actions">
              <Link className="h4-primary" to="/contact">Book Free Call <ArrowRight size={18} /></Link>
              <Link className="h4-secondary" to="/contact">Chat with Babu Ram <ArrowRight size={18} /></Link>
            </div>
          </div>
          <div className="h4-journey">
            <div className="h4-journey-step"><span className="h4-journey-icon"><MapPin size={34} /></span>Share Idea</div>
            <div className="h4-journey-step"><span className="h4-journey-icon"><Cloud size={34} /></span>Get Plan</div>
            <div className="h4-journey-step"><span className="h4-journey-icon"><Code2 size={34} /></span>We Build</div>
            <div className="h4-journey-step"><span className="h4-journey-icon"><TrendingUp size={34} /></span>You Grow</div>
          </div>
        </div>
      </section>

      <footer className="h4-footer h4-wrap">
        <div>
          <KreonixLogo className="h4-footer-logo" />
          <p>We build intelligent software, AI agents and automation systems that help businesses grow faster.</p>
          <div className="h4-socials"><span><Linkedin size={16} /></span><span><X size={16} /></span><span><Instagram size={16} /></span><span><Youtube size={16} /></span></div>
        </div>
        {footerGroups.map(([title, links]) => (
          <div key={title}>
            <h3>{title}</h3>
            {links.map((link) => <Link to="/" key={link}>{link}</Link>)}
          </div>
        ))}
        <div>
          <h3>Let's Connect</h3>
          <div className="h4-contact-line"><Mail size={17} /><span>hello@kreonix.io</span></div>
          <div className="h4-contact-line"><Send size={17} /><span>+91 7984936675</span></div>
          <div className="h4-contact-line"><MapPin size={17} /><span>India</span></div>
        </div>
        <div className="h4-newsletter">
          <h3>Stay Updated</h3>
          <p>Get latest updates and offers</p>
          <input aria-label="Email address" placeholder="Your email address" />
          <button className="h4-subscribe" type="button">Subscribe</button>
        </div>
      </footer>

      <div className="h4-legal h4-wrap">
        <span>© 2025 Kreonix.io Technologies Pvt. Ltd. All Rights Reserved.</span>
        <div className="h4-legal-links"><span>Privacy Policy</span><span>Terms & Conditions</span></div>
      </div>

      <div className="h4-chat-heart"><Heart size={24} /></div>
      <aside className="h4-chat">
        <img src="/babu-ram-ai-chat-boot.png" alt="" />
        <div>
          <strong>Babu Ram</strong>
          <span>AI Assistant</span>
          <p>How can I help you today?</p>
        </div>
      </aside>
      <a className="h4-top" href="#top" aria-label="Back to top">↑</a>
    </main>
  );
}

export default Home4;
