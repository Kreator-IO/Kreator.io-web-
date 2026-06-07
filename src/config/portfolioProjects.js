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
    demoTitle: 'AI/ML Forecasting Demo',
    demoDesc: 'Sample repository with model training flow, anomaly scoring, and API-ready inference structure.',
    githubUrl: 'https://github.com/VexquorAI/ai-ml-forecasting-demo',
    liveDemoUrl: 'https://vexquorai.github.io/nexus-ai-engine-demo',
  },
  {
    title: 'Website',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    desc: 'Responsive food ordering website with menu browsing, cart flow, checkout, and polished restaurant UX.',
    challenge: 'The restaurant needed a fast web ordering experience that made menu discovery and checkout simple for customers.',
    solution: 'We built a responsive ordering flow with category browsing, cart management, payment-ready checkout, and clean admin-friendly structure.',
    impact: ['Smoother online ordering', 'Mobile-friendly menu flow', 'Checkout-ready customer journey'],
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    liveDemoUrl: 'https://food-order-website-seven.vercel.app',
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
    liveDemoUrl: 'https://vexquorai.github.io/skynet-os-demo',
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
    liveDemoUrl: 'https://vexquorai.github.io/biotrace-app-demo',
  },
  {
    title: 'Big Data Processing',
    category: 'Data Engineering',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
    desc: 'Scalable data pipeline for ingesting, transforming, and analyzing high-volume business events.',
    challenge: 'Teams needed clean, reliable insights from fast-growing data spread across apps, logs, and operations tools.',
    solution: 'We built a batch and streaming pipeline with automated validation, warehouse modeling, and analytics-ready APIs.',
    impact: ['3.2x faster data processing', 'Unified reporting layer', 'Cleaner operational intelligence'],
    stack: ['Python', 'Apache Spark', 'Kafka', 'BigQuery'],
    liveDemoUrl: 'https://vexquorai.github.io/big-data-processing-demo',
  },
  {
    title: 'UX/UI Design System',
    category: 'Product Design',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1200',
    desc: 'Reusable interface system with polished components, design tokens, and production-ready UX patterns.',
    challenge: 'Product teams needed consistent screens, faster handoff, and a shared visual language across web and mobile experiences.',
    solution: 'We created a tokenized component library, interaction states, responsive layouts, and documentation for designers and developers.',
    impact: ['Reusable component library', '45% faster screen delivery', 'Consistent cross-platform UX'],
    stack: ['Figma', 'React', 'Tailwind CSS', 'Storybook'],
    liveDemoUrl: 'https://vexquorai.github.io/ux-ui-design-system-demo',
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

export function getCategoryGithubProjects(category) {
  const categoryName = category || 'Web App';
  const categorySlug = projectSlug(categoryName);
  const projectTypes = [
    {
      title: `${categoryName} Starter Kit`,
      desc: 'Clean starter implementation with core layout, routing, and reusable project structure.',
      repo: `${categorySlug}-starter-kit`,
    },
    {
      title: `${categoryName} Dashboard`,
      desc: 'Interactive dashboard demo with metrics, filters, data states, and responsive screens.',
      repo: `${categorySlug}-dashboard-demo`,
    },
    {
      title: `${categoryName} Automation Flow`,
      desc: 'Workflow-focused demo showing task triggers, status updates, and business logic patterns.',
      repo: `${categorySlug}-automation-flow`,
    },
    {
      title: `${categoryName} API Backend`,
      desc: 'Backend reference with REST endpoints, validation, auth-ready structure, and database models.',
      repo: `${categorySlug}-api-backend`,
    },
    {
      title: `${categoryName} Admin Portal`,
      desc: 'Admin console demo with tables, detail views, permissions, and operational controls.',
      repo: `${categorySlug}-admin-portal`,
    },
  ];

  return projectTypes.map((item) => ({
    ...item,
    githubUrl: `https://github.com/VexquorAI/${item.repo}`,
  }));
}

export function getProjectBySlug(slug) {
  const projectAliases = {
    cloud: 'skynet-os',
    'cloud-project': 'skynet-os',
    'ux-ui': 'ux-ui-design-system',
    uiux: 'ux-ui-design-system',
    'ui-ux': 'ux-ui-design-system',
    'product-design': 'ux-ui-design-system',
  };
  const resolvedSlug = projectAliases[slug] || slug;

  return fallbackPortfolioProjects.map(normalizeProject).find((project) => project.slug === resolvedSlug);
}
