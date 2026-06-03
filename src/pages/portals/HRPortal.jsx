import { useMemo, useState } from 'react';
import {
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronDown,
  ClipboardList,
  FileText,
  Gauge,
  HelpCircle,
  Home,
  LineChart,
  Megaphone,
  Search,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
  Wallet,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: Home, active: true },
  { label: 'Employees', icon: Users },
  { label: 'Attendance', icon: UserCheck },
  { label: 'Leaves', icon: Calendar },
  { label: 'Onboarding', icon: ClipboardList },
  { label: 'Payroll', icon: Wallet },
  { label: 'Recruitment', icon: Briefcase },
  { label: 'Performance', icon: Gauge },
  { label: 'Training & Dev.', icon: BookOpen },
  { label: 'Documents', icon: FileText },
  { label: 'Reports', icon: LineChart },
  { label: 'Policies', icon: ShieldCheck },
  { label: 'Help & Support', icon: HelpCircle },
];

const stats = [
  { label: 'Total Employees', value: '248', note: '12% from last month', icon: Users, tone: 'violet' },
  { label: 'Present Today', value: '198', note: '80% of total', icon: UserCheck, tone: 'emerald' },
  { label: 'On Leave', value: '28', note: '11% of total', icon: Briefcase, tone: 'orange' },
  { label: 'New Joiners', value: '9', note: '8% from last month', icon: UserPlus, tone: 'cyan' },
  { label: 'Open Requests', value: '15', note: 'Needs your action', icon: Calendar, tone: 'rose' },
];

const headcount = [
  ['IT', 85],
  ['Design', 32],
  ['Marketing', 28],
  ['Sales', 42],
  ['HR', 18],
  ['Finance', 15],
  ['Support', 28],
];

const leaves = [
  ['Casual Leave', 22],
  ['Sick Leave', 8],
  ['Earned Leave', 18],
  ['Maternity Leave', 4],
];

const leaveRequests = [
  ['John Carter', 'May 8 - May 10', 'Casual Leave', 'Pending'],
  ['Sophia Lee', 'May 9', 'Sick Leave', 'Pending'],
  ['Michael Chen', 'May 10 - May 14', 'Earned Leave', 'Approved'],
  ['Olivia Martinez', 'May 13 - May 18', 'Maternity Leave', 'Pending'],
];

const joiners = [
  ['James Anderson', 'UI/UX Designer', 'May 6, 2024'],
  ['Ava Patel', 'HR Executive', 'May 6, 2024'],
  ['Daniel Kim', 'DevOps Engineer', 'May 7, 2024'],
  ['Priya Sharma', 'Business Analyst', 'May 7, 2024'],
];

const birthdays = [
  ['Liam Smith', 'May 12'],
  ['Emma Wilson', 'May 18'],
  ['Noah Brown', 'May 22'],
  ['Sophia Lee', 'May 28'],
];

const reports = ['Headcount Report', 'Leave Report', 'Attendance Report', 'Payroll Summary'];

const announcements = [
  ['Policy Update', 'New Leave Policy effective from May 15', 'May 6, 2024'],
  ['Office Closure', 'Office will remain closed on May 13', 'May 5, 2024'],
  ['Health Checkup', 'Annual health checkup on May 20', 'May 4, 2024'],
];

const turnoverPoints = '0,72 43,42 86,55 129,28 172,44 215,18 258,39 301,16 344,31 387,21 430,50 473,43';

const toneClasses = {
  violet: 'from-violet-500/25 to-violet-500/5 text-violet-300 border-violet-400/20',
  emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-300 border-emerald-400/20',
  orange: 'from-orange-500/20 to-orange-500/5 text-orange-300 border-orange-400/20',
  cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-300 border-cyan-400/20',
  rose: 'from-rose-500/20 to-rose-500/5 text-rose-300 border-rose-400/20',
};

function Card({ children, className = '' }) {
  return (
    <section className={`rounded-lg border border-violet-400/15 bg-[#1b1028]/78 shadow-2xl shadow-black/20 ${className}`}>
      {children}
    </section>
  );
}

function Header({ title, action, onAction }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      {action && <button onClick={onAction} className="text-xs font-semibold text-violet-300">{action}</button>}
    </div>
  );
}

function Avatar({ name }) {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-gradient-to-br from-orange-200 to-violet-500 text-xs font-bold text-slate-950">
      {name.split(' ').map((part) => part[0]).join('')}
    </span>
  );
}

function Donut({ value }) {
  const segments = [
    ['#8b5cf6', 180],
    ['#60a5fa', 42],
    ['#fb7185', 26],
  ];
  let offset = 0;
  const circumference = 276.46;

  return (
    <div className="relative grid h-36 w-36 place-items-center">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r="44" fill="none" stroke="#2d1f3f" strokeWidth="13" />
        {segments.map(([color, amount]) => {
          const dash = (amount / 248) * circumference;
          const circle = <circle key={color} cx="60" cy="60" r="44" fill="none" stroke={color} strokeWidth="13" strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={-offset} />;
          offset += dash + 5;
          return circle;
        })}
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-xs text-slate-400">Total</p>
      </div>
    </div>
  );
}

export default function HRPortal() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(5);
  const [requests, setRequests] = useState(leaveRequests);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [reportMessage, setReportMessage] = useState('');
  const [eventVisible, setEventVisible] = useState(true);
  const [panelMessage, setPanelMessage] = useState('');
  const [turnoverRange, setTurnoverRange] = useState('This Year');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredRequests = useMemo(() => requests.filter((request) => request.join(' ').toLowerCase().includes(normalizedQuery)), [normalizedQuery, requests]);
  const filteredJoiners = useMemo(() => joiners.filter((item) => item.join(' ').toLowerCase().includes(normalizedQuery)), [normalizedQuery]);
  const filteredBirthdays = useMemo(() => birthdays.filter((item) => item.join(' ').toLowerCase().includes(normalizedQuery)), [normalizedQuery]);
  const filteredAnnouncements = useMemo(() => announcements.filter((item) => item.join(' ').toLowerCase().includes(normalizedQuery)), [normalizedQuery]);
  const openRequestCount = requests.filter((request) => request[3] === 'Pending').length;

  const updateRequestStatus = (name, nextStatus) => {
    setRequests((current) => current.map((request) => (
      request[0] === name ? [request[0], request[1], request[2], nextStatus] : request
    )));
    setNotifications((count) => count + 1);
  };

  return (
    <div className="flex min-h-screen bg-[#0e0716] text-slate-100">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-violet-400/10 bg-[#10091a] p-6 lg:flex">
        <div className="mb-10 flex items-center gap-3">
          <div className="text-5xl font-black text-blue-500">K</div>
          <div>
            <p className="text-xl font-bold tracking-wide text-white">KREONIX</p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white">Technologies</p>
          </div>
        </div>
        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => { setActiveNav(label); setPanelMessage(`${label} section selected.`); }} className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition ${activeNav === label ? 'bg-violet-600/70 text-white shadow-lg shadow-violet-900/40' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>
        <Card className="mt-auto p-4">
          <p className="text-sm font-semibold text-white">Upcoming Event</p>
          <div className="mt-4 flex items-center gap-3">
            <Calendar className="text-fuchsia-300" size={30} />
            <div>
              <p className="text-sm font-semibold text-white">Townhall Meeting</p>
              <p className="text-xs text-slate-400">May 10, 2024 | 11:00 AM</p>
            </div>
          </div>
          <button onClick={() => setEventVisible((current) => !current)} className="mt-4 w-full rounded-md bg-violet-500/40 py-2 text-sm font-semibold text-white">{eventVisible ? 'Hide Calendar' : 'View Calendar'}</button>
          {eventVisible && <p className="mt-3 rounded bg-white/5 p-2 text-xs text-slate-300">Calendar opened for May events.</p>}
        </Card>
        <Card className="mt-6 p-4">
          <p className="text-sm font-semibold text-white">HR Assistant</p>
          <p className="mt-1 text-xs text-slate-400">Powered by AI</p>
          <button onClick={() => setAssistantOpen((current) => !current)} className="mt-4 w-full rounded-md bg-violet-600 py-2 text-sm font-semibold text-white">Ask HR Assistant</button>
          {assistantOpen && <p className="mt-3 rounded bg-violet-500/15 p-2 text-xs text-violet-100">I found {openRequestCount} pending leave requests and {filteredJoiners.length} matching joiners.</p>}
        </Card>
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(88,28,135,0.32),transparent_35%),linear-gradient(135deg,#160c22,#100819_45%,#0b0611)] p-4 sm:p-6">
        <div className="-mx-4 mb-4 overflow-x-auto border-b border-violet-400/10 bg-[#10091a]/85 px-4 py-3 lg:hidden">
          <div className="flex min-w-max gap-2">
            {navItems.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => { setActiveNav(label); setPanelMessage(`${label} section selected.`); }}
                className={`flex h-10 items-center gap-2 rounded-lg px-3 text-xs font-semibold transition ${activeNav === label ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-300'}`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
        </div>

        <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">HR Portal</h1>
            <p className="mt-5 text-2xl font-bold text-white">Welcome back, Emma!</p>
            <p className="mt-1 text-sm text-slate-400">Here is what is happening in HR today.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex h-11 w-full items-center gap-3 rounded-lg border border-violet-400/15 bg-white/5 px-4 text-sm text-slate-400 sm:w-96">
              <Search size={16} />
              <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-white outline-none" placeholder="Search employees, requests, policies..." />
            </label>
            <button onClick={() => setNotifications(0)} className="relative text-slate-300"><Bell size={20} />{notifications > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">{notifications}</span>}</button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">Emma Johnson</p>
                <p className="text-xs text-slate-400">HR Manager</p>
              </div>
              <Avatar name="Emma Johnson" />
            </div>
          </div>
        </header>
        {panelMessage && <div className="mb-4 rounded-lg border border-violet-400/15 bg-violet-500/10 p-3 text-sm text-violet-100">{panelMessage}</div>}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stats.map(({ label, value, note, icon: Icon, tone }) => (
            <Card key={label} className={`bg-gradient-to-br p-5 ${toneClasses[tone]}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-300">{label}</p>
                  <p className="mt-3 text-3xl font-bold text-white">{label === 'Open Requests' ? openRequestCount : value}</p>
                  <p className="mt-3 text-xs text-emerald-300">+ {note}</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10"><Icon size={20} /></span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.35fr]">
          <Card className="p-5">
            <Header title="Employee Overview" action="View Details" onAction={() => setPanelMessage('Employee detail view opened.')} />
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <Donut value="248" />
              <div className="flex-1 space-y-4 text-sm">
                {[
                  ['Permanent', 180, 'bg-violet-400'],
                  ['Probation', 42, 'bg-blue-400'],
                  ['Contractual', 26, 'bg-red-400'],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-slate-300"><span className={`h-2.5 w-2.5 rounded-full ${color}`} />{label}</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <Header title="Department Wise Headcount" action="This Month" onAction={() => setPanelMessage('Headcount filtered to this month.')} />
            <div className="overflow-x-auto">
            <div className="flex h-52 min-w-[560px] items-end justify-between gap-4 border-b border-violet-400/10 px-3">
              {headcount.map(([label, value]) => (
                <div key={label} className="flex h-full flex-1 flex-col justify-end gap-2 text-center">
                  <span className="text-xs font-semibold text-white">{value}</span>
                  <div className="mx-auto w-7 rounded-t bg-gradient-to-t from-violet-700 to-violet-300" style={{ height: `${value}%` }} />
                  <span className="pb-2 text-[11px] text-slate-400">{label}</span>
                </div>
              ))}
            </div>
            </div>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.9fr_0.75fr]">
          <Card className="p-5">
            <Header title="Leave Overview" action="This Month" onAction={() => setPanelMessage(`${openRequestCount} leave requests need review this month.`)} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {leaves.map(([label, value]) => (
                <div key={label} className="rounded-lg bg-violet-500/10 p-3 text-center">
                  <p className="text-xl font-bold text-white">{value}</p>
                  <p className="text-[11px] text-slate-400">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              {filteredRequests.map(([name, date, type, status]) => (
                <div key={`${name}-${date}`} className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-lg bg-white/5 p-3 text-xs sm:grid-cols-[auto_1fr_auto_auto_auto] sm:bg-transparent sm:p-0">
                  <Avatar name={name} />
                  <span className="font-medium text-white">{name}</span>
                  <span className="col-span-2 text-slate-400 sm:col-span-1">{date} | {type}</span>
                  <span className={`rounded px-2 py-1 font-semibold ${status === 'Approved' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>{status}</span>
                  <button onClick={() => updateRequestStatus(name, status === 'Approved' ? 'Pending' : 'Approved')} className="rounded bg-violet-500/30 px-2 py-1 font-semibold text-violet-100">{status === 'Approved' ? 'Reopen' : 'Approve'}</button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <Header title="New Joiners" action="View All" onAction={() => setPanelMessage(`${filteredJoiners.length} joiners shown.`)} />
            <div className="space-y-4">
              {filteredJoiners.map(([name, role, date]) => (
                <div key={name} className="flex items-center gap-3">
                  <Avatar name={name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{name}</p>
                    <p className="truncate text-xs text-slate-400">{role}</p>
                  </div>
                  <span className="text-xs text-slate-400">{date}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <Header title="Birthdays This Month" />
            <div className="space-y-4">
              {filteredBirthdays.map(([name, date]) => (
                <div key={name} className="flex items-center gap-3">
                  <Avatar name={name} />
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs text-slate-400">{date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.6fr_1fr]">
          <Card className="p-5">
            <Header title="Performance Overview" action="This Quarter" onAction={() => setPanelMessage('Performance view switched to this quarter.')} />
            <div className="flex items-center gap-6">
              <Donut value="78%" />
              <div className="space-y-3 text-sm">
                {['Excellent 68', 'Good 112', 'Average 45', 'Needs Improvement 23'].map((item) => <p key={item} className="text-slate-300">{item}</p>)}
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <Header title="Quick Reports" />
            <div className="space-y-4">
              {reports.map((report) => <button key={report} onClick={() => setReportMessage(`${report} is ready to download.`)} className="flex w-full items-center gap-3 rounded-lg bg-white/5 p-3 text-left text-sm text-white"><FileText size={16} />{report}</button>)}
              {reportMessage && <p className="rounded bg-violet-500/15 p-3 text-xs text-violet-100">{reportMessage}</p>}
            </div>
          </Card>
          <Card className="p-5">
            <Header title="HR Announcements" />
            <div className="space-y-4">
              {filteredAnnouncements.map(([title, text, date]) => (
                <div key={title} className="grid grid-cols-[auto_1fr] gap-3 rounded-lg bg-white/5 p-3 sm:grid-cols-[auto_1fr_auto]">
                  <Megaphone className="text-fuchsia-300" size={18} />
                  <div><p className="text-sm font-semibold text-white">{title}</p><p className="text-xs text-slate-400">{text}</p></div>
                  <span className="col-span-2 text-xs text-slate-500 sm:col-span-1">{date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="mt-5 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Employee Turnover Rate</h3>
            <button onClick={() => setTurnoverRange((current) => current === 'This Year' ? 'This Quarter' : 'This Year')} className="flex items-center gap-1 rounded-md bg-white/5 px-3 py-1.5 text-xs text-slate-300">{turnoverRange} <ChevronDown size={13} /></button>
          </div>
          <svg viewBox="0 0 473 100" className="h-32 w-full sm:h-40">
            {[20, 40, 60, 80].map((line) => <line key={line} x1="0" x2="473" y1={line} y2={line} stroke="#3b224f" strokeWidth="1" />)}
            <path d={`M ${turnoverPoints}`} fill="none" stroke="#a855f7" strokeWidth="2.5" />
            <path d={`M ${turnoverPoints} L 473 100 L 0 100 Z`} fill="#7c3aed" opacity="0.12" />
          </svg>
        </Card>
      </main>
    </div>
  );
}
