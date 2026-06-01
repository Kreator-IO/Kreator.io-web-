import HomeVariant from './HomeVariant';

const config = {
  className: 'hpv-home4',
  nav: ['Home', 'Services', 'About', 'Portfolio', 'Portals', 'Contact'],
  navCta: 'Book a Call',
  eyebrow: 'AI • Software • Automation',
  headline: 'We Build <span>Intelligent Solutions</span> That Grow Businesses',
  lede: 'AI Agents, Automations, Web & Mobile Apps, Cloud Solutions and more.',
  primaryCta: 'Explore Our Solutions',
  secondaryCta: 'Book Free Consultation',
  heroStats: [
    { value: '50+', label: 'Projects Delivered', icon: 'briefcase' },
    { value: '30+', label: 'Happy Clients', icon: 'heart' },
    { value: '99%', label: 'Client Satisfaction', icon: 'star' },
  ],
  trusted: ['verox', 'NexaMart', 'BrightFlow', 'Techora', 'HypeTech'],
  badges: [
    { label: 'AI Agents', icon: 'bot' },
    { label: 'Web & App Development', icon: 'code' },
    { label: 'CRM & ERP Systems', icon: 'database' },
    { label: 'Cloud Solutions', icon: 'cloud' },
    { label: 'Analytics & Dashboards', icon: 'analytics' },
    { label: 'Automation Workflows', icon: 'automation' },
  ],
  servicesHead: {
    kicker: 'Our Services',
    title: 'Complete <span>Technology Solutions</span> Under One Roof',
    copy: '',
  },
  services: [
    { title: 'AI Agents & Automation', copy: 'Intelligent AI agents and workflow automation for your business.', icon: 'bot' },
    { title: 'Web & Mobile Development', copy: 'Modern websites and powerful mobile applications.', icon: 'smartphone' },
    { title: 'CRM & ERP Solutions', copy: 'Custom systems to manage your entire business.', icon: 'database' },
    { title: 'Cloud & DevOps Solutions', copy: 'Scalable cloud infrastructure and DevOps for high performance.', icon: 'cloud' },
    { title: 'Analytics & Dashboards', copy: 'Real-time analytics, reports and business intelligence dashboards.', icon: 'analytics' },
    { title: 'Digital Marketing', copy: 'SEO, social media, paid ads and growth marketing.', icon: 'rocket' },
  ],
  split: {
    processTitle: 'Our Process',
    featuredTitle: 'Featured Work',
    whyTitle: 'Why Choose Kreonix?',
    process: [
      { title: 'Discover', copy: 'We understand your business and goals.' },
      { title: 'Design', copy: 'We plan the perfect solution for you.' },
      { title: 'Develop', copy: 'We build with latest technologies.' },
      { title: 'Deploy', copy: 'We launch and integrate smoothly.' },
      { title: 'Scale', copy: 'We optimize and help you grow.' },
    ],
    values: [
      { title: 'Expert Technology Team', copy: 'Senior engineers for every project.', icon: 'users' },
      { title: 'Custom & Scalable Solutions', copy: 'Built around your workflow.', icon: 'sparkle' },
      { title: 'On-Time Project Delivery', copy: 'Clean execution and fast milestones.', icon: 'calendar' },
      { title: 'AI-Powered Development', copy: 'Modern AI inside the build process.', icon: 'ai' },
      { title: '24/7 Support & Maintenance', copy: 'Support that keeps systems healthy.', icon: 'check' },
    ],
  },
  cta: {
    title: 'Ready to Transform Your Business?',
    copy: "Let's build something intelligent together.",
    primary: 'Book Free Call',
    secondary: 'Start a Project',
  },
  footerGroups: [
    { title: 'Services', links: ['AI Agents & Automation', 'Web & App Development', 'CRM & ERP Solutions', 'Cloud & DevOps'] },
    { title: 'Solutions', links: ['Business Automation', 'SaaS Development', 'E-commerce Solutions', 'AI Chatbots'] },
    { title: 'Company', links: ['About Us', 'Our Process', 'Portfolio', 'Careers'] },
    { title: "Let's Connect", links: ['hello@kreonix.io', '+91 7984936675', 'India', 'Subscribe'] },
  ],
};

export default function Home4() {
  return <HomeVariant config={config} />;
}
