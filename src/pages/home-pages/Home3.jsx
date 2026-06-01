import HomeVariant from './HomeVariant';

const config = {
  className: 'hpv-home3',
  nav: ['Home', 'Services', 'About', 'Portfolio', 'Portals', 'Contact'],
  navCta: 'vanish',
  eyebrow: 'Next-Gen Technology Solutions',
  headline: 'Empowering Businesses with <span>Intelligence & Innovation</span>',
  lede: 'We deliver world-class AI/ML, Web, Android, and Cloud solutions that drive real results.',
  primaryCta: 'Book a Call',
  secondaryCta: 'Free Consultation',
  heroStats: [
    { value: '50+', label: 'Experts', icon: 'users' },
    { value: '200+', label: 'Projects Delivered', icon: 'briefcase' },
    { value: '30+', label: 'Global Clients', icon: 'globe' },
    { value: '99%', label: 'Client Satisfaction', icon: 'star' },
  ],
  trusted: ['Fast Growth', 'Secure Systems', 'Clean Development', 'Worldwide Services'],
  badges: [
    { label: 'AI/ML Solutions', icon: 'ai' },
    { label: 'Data & Analytics', icon: 'analytics' },
    { label: 'Web Engineering', icon: 'code' },
    { label: 'Automation', icon: 'bot' },
    { label: 'Mobile Ecosystems', icon: 'smartphone' },
    { label: 'Cloud & DevOps', icon: 'cloud' },
  ],
  servicesHead: {
    kicker: 'Our Expertise',
    title: 'Enterprise-Grade Solutions',
    copy: 'We combine deep technical expertise with industry insights to deliver scalable digital products.',
  },
  services: [
    {
      title: 'AI/ML Solutions',
      copy: 'Build predictive models and intelligent automation systems that learn and adapt.',
      icon: 'ai',
      featured: true,
    },
    {
      title: 'Web Engineering',
      copy: 'Scalable cloud-native web applications built with React, Next.js, and modern backends.',
      icon: 'code',
      featured: true,
    },
    {
      title: 'Mobile Ecosystems',
      copy: 'Native and cross-platform mobile experiences that users love across Android and iOS.',
      icon: 'smartphone',
      featured: true,
    },
    {
      title: 'Cloud & DevOps',
      copy: 'Robust infrastructure management and automated deployment pipelines on AWS/Azure.',
      icon: 'cloud',
      featured: true,
    },
    {
      title: 'Data Intelligence',
      copy: 'Real-time dashboards, reports and intelligence for faster decision making.',
      icon: 'analytics',
      featured: true,
    },
  ],
  split: {
    processTitle: 'Why Industry Leaders Trust kreonix.io',
    featuredTitle: 'Command Center',
    whyTitle: 'Values',
    process: [
      { title: 'Technical Excellence', copy: 'Deep experience in distributed systems and AI.' },
      { title: 'Agile Delivery', copy: 'Transparent iterations that keep your product moving.' },
      { title: 'Scalable Design', copy: 'Architecture built to handle millions of users.' },
      { title: 'Expert Team', copy: 'Committed specialists focused on your success.' },
    ],
    values: [
      { title: 'Clean Code', copy: 'Maintainable systems with modern practices.', icon: 'code' },
      { title: 'Rapid Launch', copy: 'Focused delivery without losing quality.', icon: 'rocket' },
      { title: 'Secure Stack', copy: 'Security and reliability baked in.', icon: 'shield' },
    ],
  },
  cases: {
    head: {
      kicker: 'Clients',
      title: 'Trusted by Innovators',
      copy: "Don't just take our word for it - hear what our partners say.",
    },
    items: [
      { title: 'Rahul Singh', copy: 'Kreonix transformed our vision into a world-class platform.' },
      { title: 'Priya Desai', copy: 'Outstanding team with exceptional technical expertise.' },
      { title: 'Amit Kumar', copy: 'Responsive, innovative, and committed to excellence.' },
    ],
  },
  cta: {
    title: 'Ready to Build the Future?',
    copy: "Let's collaborate to build software that defines the next generation of your industry.",
    primary: 'Start Your Project',
    secondary: 'Learn More',
  },
  footerGroups: [
    { title: 'Quick Links', links: ['About Us', 'Services', 'Portfolio', 'Pricing'] },
    { title: 'Services', links: ['AI/ML Solutions', 'Web Development', 'Android Development', 'Cloud Database'] },
    { title: 'Connect', links: ['Kreator_IO@proton.me', 'LinkedIn', 'GitHub', 'Instagram'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms of Service'] },
  ],
};

export default function Home3() {
  return <HomeVariant config={config} />;
}
