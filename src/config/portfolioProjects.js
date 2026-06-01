export const fallbackPortfolioProjects = [
  {
    title: 'Nexus AI Engine',
    category: 'AI/ML',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    desc: 'Enterprise-grade neural processing engine for predictive supply chain analytics.',
    challenge: 'Teams needed faster forecasting across suppliers, stock, and delivery constraints.',
    solution: 'We built a learning pipeline with live anomaly detection, model monitoring, and operator dashboards.',
    impact: ['41% faster planning cycles', '28% fewer stockout events', 'Live model health visibility'],
    stack: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
  },
  {
    title: 'Quantum Pay',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    desc: 'Decentralized payment gateway with sub-second finality and multi-chain support.',
    challenge: 'The client needed a secure payment layer that could handle high-volume digital transactions.',
    solution: 'We designed a responsive merchant console, transaction risk scoring, and settlement workflows.',
    impact: ['Sub-second checkout feedback', 'Multi-currency reporting', 'Role-based finance controls'],
    stack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  },
  {
    title: 'SkyNet OS',
    category: 'Cloud',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    desc: 'Distributed operating system for edge computing and low-latency IoT networks.',
    challenge: 'Remote devices needed resilient orchestration with minimal latency and downtime.',
    solution: 'We shipped cloud control planes, edge telemetry, and automated failover routines.',
    impact: ['99.95% service uptime', 'Edge-first monitoring', 'Automated incident routing'],
    stack: ['AWS', 'Docker', 'Kubernetes', 'Go'],
  },
  {
    title: 'BioTrace App',
    category: 'Android',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    desc: 'Native health monitoring application utilizing advanced biometric sensor data.',
    challenge: 'Healthcare teams needed simple mobile access to biometric trends and alerts.',
    solution: 'We created a secure Android app with sensor sync, patient timelines, and clinical alerts.',
    impact: ['Real-time biometric tracking', 'Encrypted patient sessions', 'Cleaner clinician handoffs'],
    stack: ['Android', 'Kotlin', 'Firebase', 'FHIR'],
  },
  {
    title: 'Titan ERP',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    desc: 'Modular enterprise resource planning system for manufacturing automation.',
    challenge: 'Manufacturing operations were split across spreadsheets, legacy systems, and manual approvals.',
    solution: 'We delivered modules for inventory, procurement, production planning, and executive reporting.',
    impact: ['Unified operations view', '37% faster approvals', 'Audit-ready process logs'],
    stack: ['React', 'Express', 'MongoDB', 'Tailwind CSS'],
  },
  {
    title: 'Neural Vision',
    category: 'AI/ML',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    desc: 'Real-time computer vision system for autonomous industrial quality control.',
    challenge: 'Manual inspection was slow, inconsistent, and hard to scale across production lines.',
    solution: 'We trained vision models, built review queues, and connected alerts to factory dashboards.',
    impact: ['Real-time defect detection', 'Lower inspection overhead', 'Traceable quality decisions'],
    stack: ['OpenCV', 'PyTorch', 'React', 'WebSockets'],
  },
];

export function projectSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function normalizeProject(project) {
  const image = project.image?.includes('[')
    ? fallbackPortfolioProjects[0].image
    : project.image || fallbackPortfolioProjects[0].image;

  return {
    ...project,
    slug: project.slug || projectSlug(project.title),
    image,
    desc: project.desc || project.description,
  };
}

export function getProjectBySlug(slug) {
  return fallbackPortfolioProjects.map(normalizeProject).find((project) => project.slug === slug);
}
