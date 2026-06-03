import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Database,
  FileText,
  FolderKanban,
  Gauge,
  Home,
  LineChart,
  MessageSquare,
  Plus,
  Search,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

const metrics = [
  { label: 'Total Projects', value: '24', change: '12%', icon: FolderKanban, tone: 'blue' },
  { label: 'Active Sprints', value: '8', change: '8%', icon: Zap, tone: 'cyan' },
  { label: 'Revenue (This Month)', value: 'Rs12,45,000', change: '18.6%', icon: CircleDollarSign, tone: 'blue' },
  { label: 'Team Utilization', value: '87%', change: '7%', icon: Users, tone: 'violet' },
  { label: 'Completion Rate', value: '68%', change: '15%', icon: TrendingUp, tone: 'indigo' },
];

const navItems = [
  { label: 'Dashboard', icon: Home, active: true },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Tasks', icon: CheckCircle2 },
  { label: 'Timeline', icon: Calendar },
  { label: 'Resources', icon: Users },
  { label: 'Clients', icon: Briefcase },
  { label: 'CRM', icon: Database },
  { label: 'Finance', icon: CircleDollarSign },
  { label: 'Reports', icon: FileText },
  { label: 'Risks', icon: AlertTriangle },
  { label: 'AI Assistant', icon: Sparkles },
];

const shortcuts = [
  ['Alpha Project', 'bg-violet-500'],
  ['Mobile Redesign', 'bg-green-500'],
  ['Marketing Site', 'bg-orange-500'],
  ['CRM Integration', 'bg-blue-500'],
  ['UI/UX Overhaul', 'bg-amber-500'],
];

const deals = [
  ['New Leads', 320, 'bg-blue-500'],
  ['Qualified', 210, 'bg-green-500'],
  ['Proposal Sent', 156, 'bg-amber-500'],
  ['Negotiation', 92, 'bg-violet-500'],
  ['Won', 52, 'bg-pink-500'],
];

const financeBars = [13, 9, 14, 10, 15, 11, 12, 9, 11, 8];

const clientSegments = [
  { label: 'Active', value: 46, color: '#22c55e' },
  { label: 'On Hold', value: 12, color: '#f59e0b' },
  { label: 'Completed', value: 7, color: '#3b82f6' },
  { label: 'Lost', value: 3, color: '#ef4444' },
];

const timeline = [
  { name: 'Alpha Project', dates: 'May 20 - Jun 10', start: 10, width: 20, color: 'from-sky-500 to-blue-500', progress: '80%' },
  { name: 'Mobile Redesign', dates: 'May 25 - Jun 30', start: 22, width: 38, color: 'from-blue-500 to-indigo-500', progress: '60%' },
  { name: 'CRM Integration', dates: 'Jun 01 - Aug 15', start: 40, width: 42, color: 'from-emerald-500 to-green-500', progress: '40%' },
  { name: 'Marketing Site', dates: 'May 28 - Jul 05', start: 20, width: 36, color: 'from-orange-500 to-amber-400', progress: '70%' },
  { name: 'UI/UX Overhaul', dates: 'Jun 10 - Aug 20', start: 50, width: 35, color: 'from-pink-500 to-violet-500', progress: '30%' },
];

const teams = [
  { name: 'Design Team', members: '8 Members', value: 60, color: 'bg-blue-500' },
  { name: 'Development Team', members: '15 Members', value: 75, color: 'bg-green-500' },
  { name: 'QA Team', members: '6 Members', value: 90, color: 'bg-orange-500' },
  { name: 'Marketing Team', members: '5 Members', value: 50, color: 'bg-violet-500' },
];

const taskStats = [
  { label: 'Completed', value: 128, color: '#22c55e' },
  { label: 'In Progress', value: 64, color: '#3b82f6' },
  { label: 'To Do', value: 45, color: '#facc15' },
  { label: 'Backlog', value: 23, color: '#8b5cf6' },
];

const priorityStats = [
  { label: 'High', value: 78, color: '#ef4444' },
  { label: 'Medium', value: 112, color: '#f59e0b' },
  { label: 'Low', value: 70, color: '#3b82f6' },
];

const projectStatus = [
  { label: 'On Track', value: 12, color: '#22c55e' },
  { label: 'At Risk', value: 6, color: '#f59e0b' },
  { label: 'Delayed', value: 4, color: '#ef4444' },
  { label: 'Completed', value: 2, color: '#3b82f6' },
];

const feed = [
  ['Sarah Johnson', 'Completed API Integration', '2m ago', 'bg-green-400'],
  ['Michael Chen', 'Uploaded Figma Design', '15m ago', 'bg-amber-400'],
  ['Emily Davis', 'Client approved Homepage', '1h ago', 'bg-blue-400'],
  ['David Wilson', 'New Bug Report Added', '2h ago', 'bg-orange-500'],
  ['Jessica Lee', 'Sprint Planning Updated', '3h ago', 'bg-green-400'],
];

const events = [
  ['21', 'May', '10:00 AM', 'Client Meeting', 'Project Alpha'],
  ['22', 'May', '02:00 PM', 'Sprint Planning', 'Mobile Redesign'],
  ['23', 'May', '04:00 PM', 'Team Review', 'CRM Integration'],
  ['24', 'May', '11:00 AM', 'Design Review', 'Marketing Site'],
];

const trusted = ['TechCorp', 'Innova', 'Global Enterprises', 'Creative Studio', 'CloudNet'];

const toneClasses = {
  blue: 'from-blue-500/25 to-blue-500/5 text-blue-300 border-blue-400/20',
  cyan: 'from-cyan-500/25 to-cyan-500/5 text-cyan-300 border-cyan-400/20',
  violet: 'from-violet-500/25 to-violet-500/5 text-violet-300 border-violet-400/20',
  indigo: 'from-indigo-500/25 to-indigo-500/5 text-indigo-300 border-indigo-400/20',
};

function Card({ children, className = '' }) {
  return <section className={`rounded-lg border border-blue-400/15 bg-[#061b31]/82 shadow-2xl shadow-black/20 ${className}`}>{children}</section>;
}

function Header({ title, action = 'View All', onAction }) {
  if (action === '') {
    return (
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
    );
  }

  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <button onClick={onAction} className="text-xs font-semibold text-blue-300">{action}</button>
    </div>
  );
}

function Avatar({ name, size = 'h-8 w-8' }) {
  return (
    <span className={`grid ${size} shrink-0 place-items-center rounded-full border border-white/10 bg-gradient-to-br from-orange-200 to-blue-500 text-[10px] font-bold text-slate-950`}>
      {name.split(' ').map((part) => part[0]).join('')}
    </span>
  );
}

function Donut({ value, subtitle, segments, total }) {
  const radius = 39;
  const circumference = 2 * Math.PI * radius;
  const segmentTotal = total || segments.reduce((sum, segment) => sum + segment.value, 0);
  let offset = 0;

  return (
    <div className="relative grid h-28 w-28 place-items-center">
      <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
        <circle cx="55" cy="55" r={radius} fill="none" stroke="#132a44" strokeWidth="13" />
        {segments.map((segment) => {
          const dash = (segment.value / segmentTotal) * circumference;
          const circle = <circle key={segment.label} cx="55" cy="55" r={radius} fill="none" stroke={segment.color} strokeWidth="13" strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={-offset} />;
          offset += dash + 4;
          return circle;
        })}
      </svg>
      <div className="absolute text-center">
        <p className="text-xl font-bold text-white">{value}</p>
        <p className="text-[10px] text-slate-400">{subtitle}</p>
      </div>
    </div>
  );
}

function TinyBars({ values }) {
  return (
    <div className="flex h-32 items-end justify-between gap-3 border-b border-blue-400/10 px-3">
      {values.map((value, index) => (
        <div key={`${value}-${index}`} className="flex flex-1 items-end justify-center gap-1">
          <div className="w-3 rounded-t bg-green-500" style={{ height: `${value * 6}px` }} />
          <div className="w-3 rounded-t bg-red-500" style={{ height: `${Math.max(4, (value - 3) * 6)}px` }} />
        </div>
      ))}
    </div>
  );
}

export default function ProjectManagementPortal() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState(timeline);
  const [teamData, setTeamData] = useState(teams);
  const [assistantInput, setAssistantInput] = useState('');
  const [activity, setActivity] = useState(feed);
  const [notifications, setNotifications] = useState(8);
  const [panelMessage, setPanelMessage] = useState('');
  const [analysisOpen, setAnalysisOpen] = useState(false);

  const filteredProjects = useMemo(() => projects.filter((project) => project.name.toLowerCase().includes(searchQuery.toLowerCase())), [projects, searchQuery]);
  const utilization = Math.round(teamData.reduce((sum, team) => sum + team.value, 0) / teamData.length);

  const addProject = () => {
    const next = `New Project ${projects.length + 1}`;
    setProjects((current) => [{ name: next, dates: 'Jun 20 - Jul 18', start: 48, width: 24, color: 'from-cyan-500 to-blue-500', progress: '20%' }, ...current]);
    setActivity((current) => [['John Parker', `Created ${next}`, 'now', 'bg-blue-400'], ...current]);
    setNotifications((count) => count + 1);
  };

  const sendAssistant = (event) => {
    event.preventDefault();
    if (!assistantInput.trim()) return;
    setActivity((current) => [['AI Assistant', `Analyzed: ${assistantInput}`, 'now', 'bg-violet-400'], ...current]);
    setAssistantInput('');
  };

  return (
    <div className="flex min-h-screen bg-[#020b16] text-slate-100">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-blue-400/10 bg-[#031324] p-4 lg:flex">
        <div className="mb-8 flex items-center gap-3">
          <div className="text-5xl font-black text-blue-500">K</div>
          <div>
            <p className="text-lg font-bold tracking-wide text-white">KREONIX</p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white">Arena</p>
          </div>
        </div>
        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => { setActiveNav(label); setPanelMessage(`${label} section selected.`); }} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${activeNav === label ? 'bg-blue-600/70 text-white shadow-lg shadow-blue-950/40' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>
        <div className="mt-6 border-t border-blue-400/10 pt-4">
          <div className="mb-3 flex items-center justify-between text-xs uppercase text-slate-500">
            <span>Shortcuts</span><ChevronDown size={13} />
          </div>
          <div className="space-y-2">
            {shortcuts.map(([label, color]) => <button key={label} onClick={() => { setSearchQuery(label); setPanelMessage(`${label} shortcut opened.`); }} className="flex w-full items-center gap-2 text-left text-xs text-slate-300"><span className={`h-5 w-5 rounded ${color}`} />{label}</button>)}
          </div>
        </div>
        <Card className="mt-auto p-4">
          <p className="text-sm font-semibold text-white">Upgrade to Pro</p>
          <p className="mt-2 text-xs text-slate-400">Get advanced analytics, custom reports and AI insights.</p>
          <button onClick={() => setPanelMessage('Pro analytics preview enabled for this dashboard.')} className="mt-4 w-full rounded-md bg-blue-600 py-2 text-xs font-semibold text-white">Upgrade Now</button>
        </Card>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_34%),linear-gradient(135deg,#03172b,#03101e_45%,#020b16)] p-3 sm:p-4">
        <header className="mb-3 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Good Morning, John!</h1>
            <p className="mt-1 text-xs text-slate-400">Here is what is happening with your projects today.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex h-9 w-full items-center gap-2 rounded-lg border border-blue-400/15 bg-white/5 px-3 text-xs text-slate-400 sm:w-80">
              <Search size={15} />
              <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-white outline-none" placeholder="Search projects, tasks, teams..." />
            </label>
            <button onClick={addProject} className="flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white"><Plus size={15} />New</button>
            <button onClick={() => setNotifications(0)} className="relative text-slate-300"><Bell size={18} />{notifications > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[10px] text-white">{notifications}</span>}</button>
            <Calendar size={18} className="text-slate-300" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">John Parker</p>
                <p className="text-xs text-slate-400">Project Manager</p>
              </div>
              <Avatar name="John Parker" />
            </div>
          </div>
        </header>
        {panelMessage && <div className="mb-3 rounded-lg border border-blue-400/15 bg-blue-500/10 p-3 text-sm text-blue-100">{panelMessage}</div>}

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {metrics.map(({ label, value, change, icon: Icon, tone }) => (
            <Card key={label} className={`bg-gradient-to-br p-4 ${toneClasses[tone]}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-300">{label}</p>
                  <p className="mt-2 text-2xl font-bold text-white">{label === 'Team Utilization' ? `${utilization}%` : value}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-emerald-300"><ArrowUpRight size={12} />{change} <span className="text-slate-400">from last month</span></p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500/20"><Icon size={18} /></span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-[1fr_1fr_1fr_0.68fr]">
          <Card className="border-yellow-400/80 p-4 xl:col-span-3">
            <div className="grid gap-4 xl:grid-cols-3">
              <section>
                <Header title="CRM Overview" action="" />
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Total Deals 156', 'Won Deals 92', 'Conversion Rate 58.9%'].map((item) => <div key={item} className="rounded bg-white/5 p-2 text-white">{item}</div>)}
                </div>
                <div className="mt-4 space-y-2">
                  {deals.map(([label, value, color], index) => <div key={label} className={`h-6 rounded ${color}`} style={{ width: `${92 - index * 13}%` }} title={`${label}: ${value}`} />)}
                </div>
                <button onClick={() => setPanelMessage('CRM deal pipeline expanded.')} className="mt-3 text-xs text-blue-300">View All Deals</button>
              </section>
              <section>
                <Header title="Finance Overview" action="" />
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Total Income Rs48,75,000', 'Total Expenses Rs21,30,000', 'Net Profit Rs27,45,000'].map((item) => <div key={item} className="rounded bg-white/5 p-2 text-white">{item}</div>)}
                </div>
                <TinyBars values={financeBars} />
                <button onClick={() => setPanelMessage('Financial report generated for this month.')} className="mt-3 text-xs text-blue-300">View Financial Report</button>
              </section>
              <section>
                <Header title="Client Overview" action="" />
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Total Clients 68', 'Active Clients 46', 'Satisfaction 4.6/5'].map((item) => <div key={item} className="rounded bg-white/5 p-2 text-white">{item}</div>)}
                </div>
                <div className="mt-4 flex items-center gap-5">
                  <Donut value="68" subtitle="Total" segments={clientSegments} total={68} />
                  <div className="space-y-2 text-xs">
                    {clientSegments.map((item) => <p key={item.label} className="flex items-center gap-2 text-slate-300"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />{item.label} {item.value}</p>)}
                  </div>
                </div>
              </section>
            </div>
          </Card>

          <aside className="row-span-4 space-y-3">
            <Card className="p-4">
              <Header title="Activity Feed" action="See all" onAction={() => setPanelMessage(`${activity.length} activities loaded.`)} />
              <div className="space-y-4">
                {activity.slice(0, 5).map(([name, action, time, status]) => (
                  <div key={`${name}-${action}-${time}`} className="flex items-start gap-3">
                    <span className="relative"><Avatar name={name} /><span className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ${status}`} /></span>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-white">{name}</p><p className="truncate text-xs text-slate-400">{action}</p></div>
                    <span className="text-[10px] text-slate-500">{time}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><Sparkles size={16} className="text-violet-300" />AI Project Assistant <span className="rounded bg-violet-500/30 px-2 py-0.5 text-[10px]">BETA</span></h3>
              <div className="rounded-lg bg-blue-500/10 p-4 text-sm text-slate-300"><p className="font-semibold text-white">Hi John!</p><p className="mt-2">I have analyzed your projects and found some insights for you.</p></div>
              <div className="mt-3 rounded-lg bg-slate-950/50 p-4 text-xs text-slate-300">
                <p className="mb-2 font-semibold text-white">Top Recommendations</p>
                <p>3 projects are at risk of delay</p><p>Team Dev is over-allocated</p><p>5 tasks are blocking progress</p>
                <button onClick={() => setAnalysisOpen((current) => !current)} className="mt-4 rounded bg-blue-600 px-3 py-2 text-white">View Detailed Analysis</button>
                {analysisOpen && <p className="mt-3 rounded bg-blue-500/10 p-2 text-blue-100">Current utilization is {utilization}% across {teamData.length} teams.</p>}
              </div>
              <form onSubmit={sendAssistant} className="mt-3 flex h-9 items-center gap-2 rounded-lg border border-blue-400/15 bg-slate-950/60 px-3">
                <input value={assistantInput} onChange={(event) => setAssistantInput(event.target.value)} className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none" placeholder="Ask me anything..." />
                <button type="submit" className="text-violet-300"><Send size={14} /></button>
              </form>
            </Card>
          </aside>
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-[1.1fr_1fr]">
          <Card className="p-4">
            <Header title="Project Timeline (Gantt)" action="View Full Timeline" onAction={() => setPanelMessage(`${filteredProjects.length} timeline rows visible.`)} />
            <div className="mb-2 grid grid-cols-[1fr_0.9fr_2.5fr_auto] gap-3 text-[10px] font-semibold text-slate-400"><span>Project</span><span>Dates</span><span>May - Sep</span><span /></div>
            <div className="space-y-3">
              {filteredProjects.map((project) => (
                <div key={project.name} className="grid grid-cols-[1fr_0.9fr_2.5fr_auto] items-center gap-3 text-xs">
                  <span className="truncate text-white">{project.name}</span><span className="truncate text-slate-400">{project.dates}</span>
                  <div className="relative h-4 rounded bg-slate-900"><div className={`absolute top-0 h-4 rounded bg-gradient-to-r ${project.color}`} style={{ left: `${project.start}%`, width: `${project.width}%` }} /></div>
                  <span className="text-white">{project.progress}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <Header title="Team Allocation" onAction={() => setPanelMessage(`Average team utilization is ${utilization}%.`)} />
            <div className="space-y-4">
              {teamData.map((team) => (
                <div key={team.name} className="grid grid-cols-[1fr_2fr_auto] items-center gap-3">
                  <div className="flex items-center gap-3"><div className="flex -space-x-2"><Avatar name="A B" /><Avatar name="C D" /></div><div><p className="text-sm font-semibold text-white">{team.name}</p><p className="text-xs text-slate-500">{team.members}</p></div></div>
                  <div className="h-2.5 rounded bg-slate-900"><div className={`h-2.5 rounded ${team.color}`} style={{ width: `${team.value}%` }} /></div>
                  <input type="number" min="0" max="100" value={team.value} onChange={(event) => setTeamData((current) => current.map((item) => item.name === team.name ? { ...item, value: Math.min(100, Math.max(0, Number(event.target.value) || 0)) } : item))} className="h-7 w-14 rounded border border-blue-400/15 bg-slate-950 px-2 text-right text-xs text-white outline-none" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-4">
          {[
            ['Tasks Overview', '260', 'Total Tasks', taskStats],
            ['Tasks by Priority', '260', 'Total', priorityStats],
            ['Projects by Status', '24', 'Total', projectStatus],
          ].map(([title, value, subtitle, segments]) => (
            <Card key={title} className="p-4">
              <Header title={title} onAction={() => setPanelMessage(`${title} details opened.`)} />
              <div className="flex items-center gap-5"><Donut value={value} subtitle={subtitle} segments={segments} /><div className="space-y-2 text-xs">{segments.map((item) => <p key={item.label} className="flex items-center gap-2 text-slate-300"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />{item.label} {item.value}</p>)}</div></div>
            </Card>
          ))}
          <Card className="p-4">
            <Header title="Upcoming Events" action="View Calendar" onAction={() => setPanelMessage('Calendar opened with upcoming project events.')} />
            <div className="space-y-3">{events.map(([day, month, time, title, project]) => <div key={`${day}-${title}`} className="grid grid-cols-[auto_auto_1fr] gap-3 text-xs"><span className="grid h-10 w-10 place-items-center rounded bg-blue-500/15 text-center"><span className="font-bold text-white">{day}</span><span className="text-[9px] uppercase text-slate-400">{month}</span></span><span className="text-slate-300">{time}</span><span><p className="font-semibold text-white">{title}</p><p className="text-slate-500">{project}</p></span></div>)}</div>
          </Card>
        </div>

        <Card className="mt-3 p-3">
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400"><span>Our Trusted Clients</span>{trusted.map((name) => <span key={name} className="flex items-center gap-2"><BarChart3 size={15} className="text-blue-400" />{name}</span>)}<span>+12 more</span></div>
        </Card>
      </main>
    </div>
  );
}
