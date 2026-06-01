import HomeVariant from './HomeVariant';

const config = {
  className: 'hpv-home5',
  nav: ['Home', 'Services', 'About', 'Portfolio', 'Portals', 'Contact'],
  navCta: 'Book a Free Call',
  eyebrow: 'AI | Automation | Software | Cloud',
  headline: 'We Build Intelligent Systems That Grow Your Business',
  lede: 'Kreonix.io is a full-stack technology agency helping businesses automate, scale and innovate with AI, custom software, web, mobile and cloud solutions.',
  primaryCta: 'Book a Free Call',
  secondaryCta: 'Explore Services',
  heroStats: [{ value: '100+', label: 'Trusted Businesses Worldwide', icon: 'users' }],
  trusted: ['Globex', 'HEXATECH', 'ScaleBase', 'LUMEN', 'PentaCorp', 'NextGen', 'DataPro'],
  badges: [
    { label: 'AI Agents & Automation', icon: 'bot' },
    { label: 'Mobile Applications', icon: 'smartphone' },
    { label: 'Web Development', icon: 'code' },
    { label: 'Cloud Solutions', icon: 'cloud' },
    { label: 'CRM & ERP Solutions', icon: 'database' },
    { label: 'Data & Analytics', icon: 'analytics' },
  ],
  servicesHead: {
    kicker: 'What We Do',
    title: 'End-to-End Technology Solutions',
    copy: 'Everything you need to build, automate and scale your business in the digital era.',
  },
  services: [
    { title: 'AI & Automation', copy: 'AI agents, chatbots, workflow automation and intelligent systems that save time.', icon: 'ai' },
    { title: 'Software Development', copy: 'Custom software, SaaS platforms, web apps and scalable backend systems.', icon: 'code' },
    { title: 'Web & Mobile Applications', copy: 'High-performance websites and mobile apps built for modern businesses.', icon: 'smartphone' },
    { title: 'CRM & ERP Solutions', copy: 'Custom CRM, ERP and business systems to streamline operations.', icon: 'database' },
    { title: 'Cloud & DevOps', copy: 'Cloud architecture, DevOps, CI/CD and infrastructure that scale with you.', icon: 'cloud' },
    { title: 'Data & Analytics', copy: 'Dashboards, reports, business intelligence and data-driven insights.', icon: 'analytics' },
  ],
  metrics: [
    { value: '100+', label: 'Projects Delivered', icon: 'briefcase' },
    { value: '80+', label: 'Happy Clients', icon: 'users' },
    { value: '25+', label: 'Team Experts', icon: 'sparkle' },
    { value: '4+', label: 'Years of Experience', icon: 'rocket' },
  ],
  process: {
    head: {
      kicker: 'Our Process',
      title: 'Our Proven Process',
      copy: 'A simple, transparent and effective approach to deliver exceptional results.',
    },
    steps: [
      { title: 'Discover', copy: 'We understand your business goals and challenges.', icon: 'database' },
      { title: 'Plan & Design', copy: 'We blueprint the solution with strategy, UI/UX and architecture.', icon: 'sparkle' },
      { title: 'Develop', copy: 'We build powerful, scalable and secure solutions.', icon: 'code' },
      { title: 'Deploy', copy: 'We deploy, test and ensure everything runs smoothly.', icon: 'cloud' },
      { title: 'Scale & Support', copy: 'We monitor, optimize and help your business grow continuously.', icon: 'analytics' },
    ],
  },
  cases: {
    head: {
      kicker: 'Case Studies',
      title: 'Solutions That Drive Results',
      copy: '',
    },
    items: [
      { title: 'AI-Powered CRM Platform', copy: 'Custom CRM with AI automation and analytics for a real estate company.' },
      { title: 'Business Intelligence Dashboard', copy: 'Real-time analytics dashboard for a finance company to track KPIs.' },
      { title: 'On-Demand Services App', copy: 'Cross-platform mobile app for an on-demand service marketplace.' },
    ],
  },
  cta: {
    title: 'Ready to Transform Your Business?',
    copy: "Let's build intelligent solutions that drive growth, efficiency and success.",
    primary: 'Book a Free Consultation',
  },
  footerGroups: [
    { title: 'Services', links: ['AI & Automation', 'Software Development', 'Web & Mobile Apps', 'CRM & ERP Solutions'] },
    { title: 'Solutions', links: ['Startup Solutions', 'Enterprise Solutions', 'Digital Transformation', 'Workflow Automation'] },
    { title: 'Company', links: ['About Us', 'Our Process', 'Case Studies', 'Careers'] },
    { title: 'Get in Touch', links: ['info@kreonix.io', '+91 98765 43210', 'Gurugram, Haryana', 'Subscribe'] },
  ],
};

export default function Home5() {
  return <HomeVariant config={config} />;
}
