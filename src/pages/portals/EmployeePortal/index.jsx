import { useMemo, useState } from 'react';
import {
  Activity,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock3,
  Code2,
  FileCode2,
  FileText,
  FolderKanban,
  GitPullRequest,
  HelpCircle,
  Home,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Shield,
  Timer,
  Users,
  Wrench,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: Home, active: true },
  { label: 'My Tasks', icon: CheckCircle2, badge: 12 },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Time Tracking', icon: Clock3 },
  { label: 'Code Repositories', icon: Code2 },
  { label: 'Documents', icon: FileText },
  { label: 'Knowledge Base', icon: BookOpen },
  { label: 'Requests', icon: Inbox, badge: 3 },
  { label: 'IT Support', icon: Wrench },
  { label: 'My Team', icon: Users },
  { label: 'Calendar', icon: Calendar },
  { label: 'Reports', icon: LayoutDashboard },
  { label: 'Settings', icon: Settings },
];

const quickAccess = ['Company Wiki', 'Dev Guidelines', 'API Docs', 'System Status'];

const stats = [
  { label: 'My Tasks', value: '12', note: 'Pending Tasks', icon: GitPullRequest, tone: 'orange' },
  { label: 'Task Completed', value: '28', note: 'This Month', icon: CheckCircle2, tone: 'emerald' },
  { label: 'Hours Tracked', value: '142h', note: 'This Month', icon: Timer, tone: 'blue' },
  { label: 'Active Projects', value: '4', note: 'In Progress', icon: Calendar, tone: 'sky' },
  { label: 'Upcoming Deadlines', value: '5', note: 'This Week', icon: Calendar, tone: 'red' },
];

const tasks = [
  ['Fix login bug', 'Mobile App', 'High', 'Due Today'],
  ['Create dashboard UI', 'Admin Panel', 'Medium', 'May 10'],
  ['API Integration', 'Backend', 'High', 'May 12'],
  ['Code Review', 'Web Application', 'Low', 'May 14'],
  ['Update documentation', 'Frontend', 'Low', 'May 16'],
];

const projects = [
  ['Kreonix Website Redesign', 75, 'bg-blue-500'],
  ['Mobile Banking App', 60, 'bg-sky-500'],
  ['Admin Dashboard', 90, 'bg-emerald-500'],
  ['AI Analytics Platform', 40, 'bg-indigo-500'],
];

const timeBars = [6, 7, 8, 5.5, 6, 0, 0];
const gitBars = [0.6, 6, 6, 5, 4, 0.5, 0];

const systems = [
  ['VPN', 'Operational', 'emerald'],
  ['Email Service', 'Operational', 'emerald'],
  ['Cloud Server', 'Operational', 'emerald'],
  ['CI/CD Pipeline', 'Maintenance', 'amber'],
  ['Monitoring', 'Operational', 'emerald'],
];

const activities = [
  ['Sophia Lee commented on your code', '2m ago'],
  ['Pull request #234 was merged', '1h ago'],
  ['Deployment to staging completed', '2h ago'],
  ['New task assigned by Liam Smith', '3h ago'],
  ['Documentation updated in Confluence', '5h ago'],
];

const announcements = [
  ['System Maintenance', 'Scheduled maintenance on May 12, 10:00 PM - 12:00 AM'],
  ['New Dev Environment', 'React 18 environment is now available'],
  ['Security Update', 'Please update your password regularly.'],
];

const events = [
  ['08', 'May', 'Sprint Planning', '10:00 AM - 11:00 AM'],
  ['10', 'May', 'Project Standup', '09:30 AM - 10:00 AM'],
  ['15', 'May', 'Code Review Session', '03:00 PM - 04:00 PM'],
  ['17', 'May', 'Demo Day', '11:00 AM - 12:00 PM'],
];

const linkNames = ['GitLab', 'Jira', 'Confluence', 'Figma', 'Postman', 'AWS Console', 'Slack', 'VS Code'];

const toneClasses = {
  orange: 'from-orange-500/20 to-orange-500/5 text-orange-300 border-orange-400/20',
  emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-300 border-emerald-400/20',
  blue: 'from-blue-500/20 to-blue-500/5 text-blue-300 border-blue-400/20',
  sky: 'from-sky-500/20 to-sky-500/5 text-sky-300 border-sky-400/20',
  red: 'from-red-500/20 to-red-500/5 text-red-300 border-red-400/20',
};

const priorityClasses = {
  High: 'text-red-300',
  Medium: 'text-amber-300',
  Low: 'text-emerald-300',
};

const statusClasses = {
  emerald: 'text-emerald-300',
  amber: 'text-amber-300',
};

function Card({ children, className = '' }) {
  return (
    <section className={`rounded-lg border border-blue-400/15 bg-[#061b31]/82 shadow-2xl shadow-black/20 ${className}`}>
      {children}
    </section>
  );
}

function Header({ title, action = 'View All', onAction }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <button onClick={onAction} className="text-xs font-semibold text-blue-300">{action}</button>
    </div>
  );
}

function Avatar({ name }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-gradient-to-br from-orange-200 to-blue-500 text-xs font-bold text-slate-950">
      {name.split(' ').map((part) => part[0]).join('')}
    </span>
  );
}

function MiniBars({ values, color = 'bg-blue-500' }) {
  return (
    <div className="flex h-32 items-end justify-between gap-3 border-b border-blue-400/10 px-2">
      {values.map((value, index) => (
        <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
          <span className="text-[10px] text-slate-400">{value ? `${value}h` : ''}</span>
          <div className={`w-5 rounded-t ${color}`} style={{ height: `${value * 12}px` }} />
          <span className="text-[10px] text-slate-500">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
        </div>
      ))}
    </div>
  );
}

export default function EmployeePortal() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(9);
  const [taskData, setTaskData] = useState(tasks.map((task, index) => [...task, index === 4]));
  const [projectData, setProjectData] = useState(projects);
  const [activityData, setActivityData] = useState(activities);
  const [systemData, setSystemData] = useState(systems);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [linkMessage, setLinkMessage] = useState('');
  const [trackedHours, setTrackedHours] = useState(32.75);
  const [panelMessage, setPanelMessage] = useState('');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredTasks = useMemo(() => taskData.filter((task) => task.join(' ').toLowerCase().includes(normalizedQuery)), [normalizedQuery, taskData]);
  const filteredProjects = useMemo(() => projectData.filter((project) => project.join(' ').toLowerCase().includes(normalizedQuery)), [normalizedQuery, projectData]);
  const completedTasks = taskData.filter((task) => task[4]).length;
  const pendingTasks = taskData.length - completedTasks;

  const completeTask = (title) => {
    setTaskData((current) => current.map((task) => (
      task[0] === title ? [task[0], task[1], task[2], task[3], !task[4]] : task
    )));
    setActivityData((current) => [[`${title} status updated`, 'now'], ...current]);
  };

  const logHour = () => {
    setTrackedHours((hours) => Number((hours + 1).toFixed(2)));
    setActivityData((current) => [['Logged 1 hour to workspace', 'now'], ...current]);
  };

  const toggleSystem = (name) => {
    setSystemData((current) => current.map((system) => (
      system[0] === name
        ? [system[0], system[1] === 'Operational' ? 'Maintenance' : 'Operational', system[1] === 'Operational' ? 'amber' : 'emerald']
        : system
    )));
  };

  return (
    <div className="flex min-h-screen bg-[#020b16] text-slate-100">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-blue-400/10 bg-[#031324] p-6 lg:flex">
        <div className="mb-10 flex items-center gap-3">
          <div className="text-5xl font-black text-blue-500">K</div>
          <div>
            <p className="text-xl font-bold tracking-wide text-white">KREONIX</p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white">Technologies</p>
          </div>
        </div>
        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon, badge }) => (
            <button key={label} onClick={() => { setActiveNav(label); setPanelMessage(`${label} section selected.`); }} className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${activeNav === label ? 'bg-blue-600/60 text-white shadow-lg shadow-blue-950/40' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
              <Icon size={17} />
              <span className="min-w-0 flex-1">{label}</span>
              {badge && <span className="rounded-full bg-blue-500/40 px-2 py-0.5 text-xs text-blue-100">{badge}</span>}
            </button>
          ))}
        </nav>
        <div className="mt-7 border-t border-blue-400/10 pt-5">
          <p className="mb-3 text-sm text-slate-400">Quick Access</p>
          <div className="space-y-1">
            {quickAccess.map((item) => <button key={item} onClick={() => setPanelMessage(`${item} opened from quick access.`)} className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-white/5"><FileCode2 size={16} />{item}</button>)}
          </div>
        </div>
        <Card className="mt-auto p-4">
          <p className="text-sm font-semibold text-white">IT Assistant</p>
          <p className="mt-2 text-xs text-slate-400">Get help with tools, docs or IT issues</p>
          <button onClick={() => setAssistantOpen((current) => !current)} className="mt-4 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white">Ask IT Assistant</button>
          {assistantOpen && <p className="mt-3 rounded bg-blue-500/15 p-2 text-xs text-blue-100">You have {pendingTasks} pending tasks and {systemData.filter((system) => system[1] !== 'Operational').length} systems needing attention.</p>}
        </Card>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_34%),linear-gradient(135deg,#03172b,#03101e_45%,#020b16)] p-4 sm:p-6">
        <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">IT Employee Portal</h1>
            <p className="mt-5 text-2xl font-bold text-white">Welcome back, Alex!</p>
            <p className="mt-1 text-sm text-slate-400">Here is your workspace overview.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex h-11 w-full items-center gap-3 rounded-lg border border-blue-400/15 bg-white/5 px-4 text-sm text-slate-400 sm:w-96">
              <Search size={16} />
              <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-white outline-none" placeholder="Search projects, tasks, docs..." />
            </label>
            <MessageSquare size={18} className="text-slate-300" />
            <button onClick={() => setNotificationCount(0)} className="relative text-slate-300"><Bell size={20} />{notificationCount > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-blue-500 px-1 text-[10px] font-bold text-white">{notificationCount}</span>}</button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">Alex Johnson</p>
                <p className="text-xs text-slate-400">Frontend Developer</p>
              </div>
              <Avatar name="Alex Johnson" />
            </div>
          </div>
        </header>
        {panelMessage && <div className="mb-4 rounded-lg border border-blue-400/15 bg-blue-500/10 p-3 text-sm text-blue-100">{panelMessage}</div>}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stats.map(({ label, value, note, icon: Icon, tone }) => (
            <Card key={label} className={`bg-gradient-to-br p-5 ${toneClasses[tone]}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-300">{label}</p>
                  <p className="mt-3 text-3xl font-bold text-white">{label === 'My Tasks' ? pendingTasks : label === 'Task Completed' ? completedTasks + 28 : label === 'Hours Tracked' ? `${Math.round(trackedHours)}h` : value}</p>
                  <p className="mt-3 text-xs text-slate-400">{note}</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10"><Icon size={20} /></span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_1.2fr]">
          <Card className="p-5">
            <Header title="My Tasks" onAction={() => setPanelMessage(`${filteredTasks.length} tasks visible.`)} />
            <div className="space-y-4">
              {filteredTasks.map(([title, area, priority, date, done]) => (
                <div key={title} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 text-xs">
                  <button onClick={() => completeTask(title)} className={`h-4 w-4 rounded border ${done ? 'border-emerald-300 bg-emerald-400' : 'border-blue-400 bg-blue-500/20'}`} />
                  <div className="min-w-0">
                    <p className={`truncate text-sm font-semibold ${done ? 'text-slate-500 line-through' : 'text-white'}`}>{title}</p>
                    <p className="truncate text-xs text-slate-400">{area}</p>
                  </div>
                  <span className={`font-semibold ${priorityClasses[priority]}`}>{priority}</span>
                  <span className={date === 'Due Today' ? 'text-red-300' : 'text-slate-300'}>{date}</span>
                  <button onClick={() => completeTask(title)} className="rounded bg-blue-500/20 px-2 py-1 text-blue-100">{done ? 'Reopen' : 'Done'}</button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <Header title="My Projects" onAction={() => setPanelMessage(`${filteredProjects.length} projects visible.`)} />
            <div className="space-y-5">
              {filteredProjects.map(([name, progress, color]) => (
                <div key={name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-500/15 text-blue-300"><FolderKanban size={18} /></span>
                  <div className="min-w-0">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-white">{name}</p>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-900/80"><div className={`h-2.5 rounded-full ${color}`} style={{ width: `${progress}%` }} /></div>
                  </div>
                  <span className="text-sm font-semibold text-white">{progress}%</span>
                  <input type="range" min="0" max="100" value={progress} onChange={(event) => setProjectData((current) => current.map((project) => project[0] === name ? [project[0], Number(event.target.value), project[2]] : project))} className="col-span-3 h-1 accent-blue-400" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1fr_0.9fr]">
          <Card className="p-5">
            <Header title="Time Tracking" action="This Week" onAction={() => setPanelMessage('Time tracking filtered to this week.')} />
            <p className="text-3xl font-bold text-white">{Math.floor(trackedHours)}h {Math.round((trackedHours % 1) * 60)}m</p>
            <p className="mt-1 text-xs text-slate-400">Total Tracked</p>
            <button onClick={logHour} className="mt-3 rounded bg-blue-600 px-3 py-2 text-xs font-semibold text-white">Log 1 Hour</button>
            <MiniBars values={timeBars} />
          </Card>
          <Card className="p-5">
            <Header title="Git Activity" action="This Week" onAction={() => setPanelMessage('Git activity filtered to this week.')} />
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Commits', 24],
                ['Pull Requests', 6],
                ['Code Reviews', 8],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-white/5 p-3 text-center">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="mt-2 text-2xl font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
            <MiniBars values={gitBars} color="bg-sky-500" />
          </Card>
          <Card className="p-5">
            <Header title="System Status" onAction={() => setPanelMessage(`${systemData.length} systems checked.`)} />
            <div className="space-y-4">
              {systemData.map(([name, status, tone]) => (
                <button key={name} onClick={() => toggleSystem(name)} className="flex w-full items-center justify-between gap-4 text-left text-sm">
                  <span className="flex items-center gap-2 text-slate-300"><Shield size={15} />{name}</span>
                  <span className={`text-xs font-semibold ${statusClasses[tone]}`}>{status}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr_0.9fr]">
          <Card className="p-5">
            <Header title="Recent Activity" onAction={() => setPanelMessage(`${activityData.length} activity entries loaded.`)} />
            <div className="space-y-4">
              {activityData.map(([text, time], index) => (
                <div key={text} className="flex items-center gap-3 text-sm">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-500/20 text-blue-300">{index + 1}</span>
                  <p className="min-w-0 flex-1 truncate text-slate-300">{text}</p>
                  <span className="text-xs text-slate-500">{time}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <Header title="IT Announcements" onAction={() => setPanelMessage(`${announcements.length} announcements loaded.`)} />
            <div className="space-y-3">
              {announcements.map(([title, text]) => (
                <div key={title} className="grid grid-cols-[auto_1fr] gap-3 rounded-lg bg-white/5 p-3">
                  <Activity className="text-blue-300" size={20} />
                  <div><p className="text-sm font-semibold text-white">{title}</p><p className="text-xs text-slate-400">{text}</p></div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <Header title="Upcoming Events" action="View Calendar" onAction={() => setPanelMessage('Calendar opened for upcoming IT events.')} />
            <div className="space-y-3">
              {events.map(([day, month, title, time]) => (
                <div key={`${day}-${title}`} className="grid grid-cols-[auto_1fr] gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-500/15 text-center"><span className="text-lg font-bold text-white">{day}</span><span className="text-[10px] uppercase text-slate-400">{month}</span></span>
                  <div><p className="text-sm font-semibold text-white">{title}</p><p className="text-xs text-slate-400">{time}</p></div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="mt-5 p-5">
          <p className="mb-4 text-sm text-slate-400">Useful Links</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
            {linkNames.map((name) => (
              <button key={name} onClick={() => setLinkMessage(`${name} opened.`)} className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 text-left text-sm text-white hover:bg-white/10">
                <Code2 size={18} className="text-blue-300" /> {name}
              </button>
            ))}
          </div>
          {linkMessage && <p className="mt-4 rounded bg-blue-500/15 p-3 text-sm text-blue-100">{linkMessage}</p>}
        </Card>
      </main>
    </div>
  );
}
