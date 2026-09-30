import { useEffect, useMemo, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';

const STORAGE_KEY = 'orbit-tasks-v1';
const INITIAL_DATE = '2026-09-24';
const starterTasks = [
  { id: 'roadmap', title: 'Review product roadmap', date: '2026-09-24', time: '09:30', category: 'Work', priority: 'high', important: true, completed: false },
  { id: 'deep-work', title: 'Deep work: dashboard polish', date: '2026-09-24', time: '13:00', category: 'Work', priority: 'urgent', important: true, completed: false },
  { id: 'weekly-update', title: 'Send weekly update', date: '2026-09-25', time: '10:00', category: 'Work', priority: 'medium', important: false, completed: false },
  { id: 'design-systems', title: 'Read design systems chapter', date: '2026-09-27', time: '16:00', category: 'Study', priority: 'medium', important: true, completed: false },
  { id: 'evening-run', title: 'Evening run', date: '2026-09-24', time: '18:30', category: 'Health', priority: 'low', important: false, completed: true },
  { id: 'dentist', title: 'Book dentist appointment', date: '2026-09-22', time: '', category: 'Personal', priority: 'low', important: false, completed: false },
];

const routeLabels = { '/': 'Overview', '/daily': 'Daily tasks', '/weekly': 'Weekly plan', '/monthly': 'Calendar', '/settings': 'Settings' };
const navItems = [
  { to: '/', icon: '⌂', label: 'Overview' },
  { to: '/daily', icon: '▣', label: 'Daily tasks' },
  { to: '/weekly', icon: '▦', label: 'Weekly plan' },
  { to: '/monthly', icon: '▤', label: 'Calendar' },
];
const categories = ['Work', 'Study', 'Personal', 'Health', 'Shopping', 'Other'];
const priorities = ['low', 'medium', 'high', 'urgent'];

function dateFromString(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function dateString(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function dateLabel(value, options = { month: 'short', day: 'numeric' }) {
  return dateFromString(value).toLocaleDateString('en-US', options);
}

function fullDate(value) {
  return dateFromString(value).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function shiftDate(value, amount) {
  const date = dateFromString(value);
  date.setDate(date.getDate() + amount);
  return dateString(date);
}

function TaskRow({ task, onToggle, onImportant, onDelete, onEdit }) {
  return (
    <div className={`task-row ${task.completed ? 'is-complete' : ''}`}>
      <button className={`check-button ${task.completed ? 'checked' : ''}`} onClick={() => onToggle(task.id)} aria-label="Toggle complete">
        {task.completed ? '✓' : ''}
      </button>
      <button className="task-copy" onClick={() => onEdit(task)}>
        <strong>{task.title}</strong>
        <span>{dateLabel(task.date)}{task.time ? ` · ${task.time}` : ''} <i>{task.category}</i></span>
      </button>
      <span className={`priority priority-${task.priority}`}>{task.priority}</span>
      <button className={`icon-button star-button ${task.important ? 'starred' : ''}`} onClick={() => onImportant(task.id)} aria-label="Toggle important" title="Toggle important">★</button>
      <button className="icon-button delete-button" onClick={() => onDelete(task.id)} aria-label="Delete task" title="Delete task">×</button>
    </div>
  );
}

function TaskModal({ task, initialDate, onClose, onSave }) {
  const [form, setForm] = useState(task || {
    title: '', description: '', date: initialDate, time: '', priority: 'low', category: 'Work', important: false, repeat: 'Does not repeat',
  });
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));

  function submit(event) {
    event.preventDefault();
    if (!form.title.trim()) return;
    onSave({ ...form, title: form.title.trim(), id: task?.id || crypto.randomUUID(), completed: task?.completed || false });
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <form className="task-modal" onSubmit={submit}>
        <div className="modal-heading">
          <div><p>{task ? 'Edit task' : 'New task'}</p><h2>What’s on your mind?</h2></div>
          <button type="button" className="icon-button close-button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <label className="field full-field">Title<input autoFocus name="title" value={form.title} onChange={update} placeholder="e.g. Prepare presentation" required /></label>
        <label className="field full-field">Description <span className="optional">Optional</span><textarea name="description" value={form.description || ''} onChange={update} placeholder="Add a little context..." rows="2" /></label>
        <div className="form-grid">
          <label className="field">Date<input type="date" name="date" value={form.date} onChange={update} required /></label>
          <label className="field">Time <span className="optional">Optional</span><input type="time" name="time" value={form.time || ''} onChange={update} /></label>
          <label className="field">Priority<select name="priority" value={form.priority} onChange={update}>{priorities.map((priority) => <option key={priority} value={priority}>{priority[0].toUpperCase() + priority.slice(1)}</option>)}</select></label>
          <label className="field">Category<select name="category" value={form.category} onChange={update}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
          <label className="field checkbox-field"><input type="checkbox" name="important" checked={form.important} onChange={update} /> Mark as important</label>
          <label className="field">Repeat<select name="repeat" value={form.repeat || 'Does not repeat'} onChange={update}>{['Does not repeat', 'Daily', 'Weekly', 'Monthly'].map((repeat) => <option key={repeat}>{repeat}</option>)}</select></label>
        </div>
        <div className="modal-actions"><button type="button" className="button button-quiet" onClick={onClose}>Cancel</button><button className="button button-primary">{task ? 'Save changes' : 'Create task'}</button></div>
      </form>
    </div>
  );
}

function App() {
  const location = useLocation();
  const [tasks, setTasks] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || starterTasks; } catch { return starterTasks; }
  });
  const [dark, setDark] = useState(() => localStorage.getItem('orbit-theme') === 'dark');
  const [modalTask, setModalTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [selectedDate, setSelectedDate] = useState(INITIAL_DATE);
  const [month, setMonth] = useState(() => dateFromString(INITIAL_DATE));

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('orbit-theme', dark ? 'dark' : 'light');
  }, [dark]);
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') { setModalOpen(false); setModalTask(null); }
      if (event.key.toLowerCase() === 'n' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) { event.preventDefault(); openNewTask(); }
      if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) { event.preventDefault(); document.querySelector('.search-input')?.focus(); }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const visibleTasks = useMemo(() => tasks.filter((task) => `${task.title} ${task.category} ${task.priority}`.toLowerCase().includes(search.toLowerCase())), [tasks, search]);
  const pageName = routeLabels[location.pathname] || 'Overview';

  function openNewTask(date = selectedDate) { setModalTask(null); setSelectedDate(date); setModalOpen(true); }
  function saveTask(task) {
    const isUpdate = tasks.some((item) => item.id === task.id);
    setTasks((current) => current.some((item) => item.id === task.id) ? current.map((item) => item.id === task.id ? task : item) : [...current, task]);
    setModalOpen(false); setModalTask(null);
    setToast(isUpdate ? 'Task updated' : 'Task created');
    window.setTimeout(() => setToast(''), 2400);
  }
  function toggleTask(id) { setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task)); }
  function toggleImportant(id) { setTasks((current) => current.map((task) => task.id === id ? { ...task, important: !task.important } : task)); }
  function deleteTask(id) { setTasks((current) => current.filter((task) => task.id !== id)); }
  function editTask(task) { setModalTask(task); setModalOpen(true); }
  const taskActions = { onToggle: toggleTask, onImportant: toggleImportant, onDelete: deleteTask, onEdit: editTask };

  function downloadTasks() {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' }));
    link.download = 'orbit-tasks.json'; link.click(); URL.revokeObjectURL(link.href);
  }

  function importTasks(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    file.text().then((text) => {
      const imported = JSON.parse(text);
      if (!Array.isArray(imported)) throw new Error('Expected a task list');
      setTasks(imported); setToast('Tasks imported');
    }).catch(() => setToast('Could not import that file'));
    event.target.value = '';
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand"><b>o</b> orbit<span>.</span></NavLink>
        <nav className="side-nav"><small>WORKSPACE</small>{navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><i>{item.icon}</i>{item.label}</NavLink>)}<small className="manage-label">MANAGE</small><NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><i>⚙</i>Settings</NavLink></nav>
        <div className="sidebar-bottom"><div className="focus-note"><b>✦</b><strong>Stay in orbit</strong><p>Small steps compound into big progress.</p></div><div className="profile"><span className="avatar">JD</span><span><strong>Jordan Davis</strong><small>Personal space</small></span><button className="icon-button profile-menu" aria-label="Profile options">•••</button></div></div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>{fullDate(INITIAL_DATE)}</span><i>/</i>{pageName}</div>
          <div className="top-actions"><label className="search-box"><span>⌕</span><input className="search-input" placeholder="Search tasks..." value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search tasks"/><kbd>/</kbd></label><button className="icon-button theme-toggle" onClick={() => setDark((value) => !value)} aria-label="Toggle theme" title="Toggle theme">{dark ? '☀' : '☾'}</button><button className="icon-button notification-button" onClick={() => setToast('You’re all caught up')} aria-label="Notifications" title="Notifications">♧</button><span className="avatar top-avatar">JD</span><button className="button button-primary top-new" onClick={() => openNewTask()}>+ New task</button></div>
        </header>
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Overview tasks={visibleTasks} actions={taskActions} onAdd={() => openNewTask(INITIAL_DATE)} />} />
            <Route path="/daily" element={<Daily tasks={visibleTasks} selectedDate={selectedDate} setSelectedDate={setSelectedDate} actions={taskActions} onAdd={() => openNewTask(selectedDate)} />} />
            <Route path="/weekly" element={<Weekly tasks={visibleTasks} selectedDate={selectedDate} setSelectedDate={setSelectedDate} onAdd={openNewTask} onEdit={editTask} />} />
            <Route path="/monthly" element={<Monthly tasks={visibleTasks} month={month} setMonth={setMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate} actions={taskActions} onAdd={() => openNewTask(selectedDate)} />} />
            <Route path="/settings" element={<Settings dark={dark} setDark={setDark} onExport={downloadTasks} onImport={importTasks} onClear={() => { if (window.confirm('Delete all tasks? This cannot be undone.')) setTasks([]); }} />} />
            <Route path="*" element={<Overview tasks={visibleTasks} actions={taskActions} onAdd={() => openNewTask(INITIAL_DATE)} />} />
          </Routes>
        </div>
      </main>
      {modalOpen && <TaskModal task={modalTask} initialDate={selectedDate} onClose={() => { setModalOpen(false); setModalTask(null); }} onSave={saveTask} />}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

function PageHeading({ eyebrow, title, description, onAdd }) {
  return <div className="page-heading"><div><p>{eyebrow}</p><h1>{title}</h1><span>{description}</span></div>{onAdd && <button className="button button-primary" onClick={onAdd}>+ Add task</button>}</div>;
}

function SectionTitle({ eyebrow, title, action }) {
  return <div className="section-title"><div>{eyebrow && <p>{eyebrow}</p>}<h2>{title}</h2></div>{action}</div>;
}

function Overview({ tasks, actions, onAdd }) {
  const complete = tasks.filter((task) => task.completed).length;
  const todayTasks = tasks.filter((task) => task.date === INITIAL_DATE);
  const todayComplete = todayTasks.filter((task) => task.completed).length;
  const important = tasks.filter((task) => task.important && !task.completed);
  const progress = Math.round((todayComplete / Math.max(todayTasks.length, 1)) * 100);
  const upcoming = [...tasks].filter((task) => !task.completed && task.date >= INITIAL_DATE).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)).slice(0, 4);
  const stats = [
    ['✦', 'Total tasks', tasks.length, 'Across your plan', 'stat-coral'],
    ['✓', 'Completed', complete, 'Keep the momentum', 'stat-green'],
    ['◒', 'In progress', tasks.length - complete, 'Ready when you are', 'stat-yellow'],
    ['!', 'Important', important.length, 'Worth your attention', 'stat-blue'],
  ];
  return <>
    <PageHeading eyebrow={fullDate(INITIAL_DATE)} title="Good morning, Jordan" description="Here’s your command center for a focused, balanced day." onAdd={onAdd} />
    <div className="stats-grid">{stats.map(([icon, label, value, note, tone]) => <div className="stat-card" key={label}><span className={`stat-icon ${tone}`}>{icon}</span><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></div>)}</div>
    <div className="overview-grid">
      <section className="panel momentum-panel"><div className="momentum-top"><div><p>Your momentum</p><h2>Today’s progress</h2></div><div className="progress-number">{progress}<small>%</small><span>done</span></div></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><strong>{todayComplete} of {todayTasks.length} tasks complete</strong><p className="muted-copy">A little progress goes a long way.</p><div className="momentum-footer"><span>● {todayTasks.length - todayComplete} remaining</span><span>● {todayComplete} completed</span><button className="text-button" onClick={onAdd}>Quick add +</button></div></section>
      <section className="panel upcoming-panel"><SectionTitle eyebrow="Coming up" title="Next on your radar" action={<NavLink className="text-link" to="/daily">View all →</NavLink>} />{upcoming.map((task) => <TaskRow key={task.id} task={task} {...actions} />)}{upcoming.length === 0 && <EmptyState>No tasks on your radar. Enjoy the space.</EmptyState>}</section>
      <section className="panel important-panel"><SectionTitle title="Important tasks" action={<NavLink className="text-link" to="/daily">See all →</NavLink>} /><div className="subheading-count">{important.length} tasks</div>{important.slice(0, 3).map((task) => <TaskRow key={task.id} task={task} {...actions} />)}</section>
      <section className="panel completed-panel"><SectionTitle title="Recently completed" /><div className="subheading-count">{complete} task{complete === 1 ? '' : 's'}</div>{tasks.filter((task) => task.completed).slice(0, 3).map((task) => <TaskRow key={task.id} task={task} {...actions} />)}</section>
    </div>
  </>;
}

function DateStepper({ value, onChange, label = 'Today' }) {
  return <div className="date-stepper"><button onClick={() => onChange(shiftDate(value, -1))} aria-label="Previous day">←</button><button onClick={() => onChange(INITIAL_DATE)}>{label}</button><button onClick={() => onChange(shiftDate(value, 1))} aria-label="Next day">→</button></div>;
}

function Daily({ tasks, selectedDate, setSelectedDate, actions, onAdd }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('time');
  const dayTasks = tasks.filter((task) => task.date === selectedDate).filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    if (filter === 'important') return task.important;
    if (filter === 'overdue') return !task.completed && task.date < INITIAL_DATE;
    return true;
  }).sort((a, b) => sort === 'priority' ? priorities.indexOf(b.priority) - priorities.indexOf(a.priority) : sort === 'created' ? String(b.id).localeCompare(String(a.id)) : (a.time || '99:99').localeCompare(b.time || '99:99'));
  return <>
    <PageHeading eyebrow="Daily focus" title="Today’s tasks" description="Make space for what matters most today." onAdd={onAdd} />
    <div className="toolbar panel"><DateStepper value={selectedDate} onChange={setSelectedDate} /><span>{dayTasks.length} tasks for this day</span></div>
    <div className="filter-toolbar"><div className="filter-tabs">{['all', 'pending', 'completed', 'important', 'overdue'].map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><select aria-label="Sort tasks" value={sort} onChange={(event) => setSort(event.target.value)}><option value="time">Sort: Time</option><option value="priority">Sort: Priority</option><option value="created">Sort: Created</option></select></div>
    <section className="panel task-list-panel">{dayTasks.map((task) => <TaskRow key={task.id} task={task} {...actions} />)}{dayTasks.length === 0 && <EmptyState>No tasks for {dateLabel(selectedDate)}. A clear calendar can be a good thing.</EmptyState>}</section>
  </>;
}

function Weekly({ tasks, selectedDate, setSelectedDate, onAdd, onEdit }) {
  const anchor = dateFromString(selectedDate);
  const monday = new Date(anchor); monday.setDate(anchor.getDate() - ((anchor.getDay() + 6) % 7));
  const weekDates = Array.from({ length: 7 }, (_, index) => { const day = new Date(monday); day.setDate(monday.getDate() + index); return dateString(day); });
  const weekTasks = tasks.filter((task) => weekDates.includes(task.date));
  const weekCompleted = weekTasks.filter((task) => task.completed).length;
  const weekProgress = Math.round((weekCompleted / Math.max(weekTasks.length, 1)) * 100);
  return <>
    <PageHeading eyebrow="Weekly rhythm" title="Your week, in view" description="A flexible map for the days ahead, with enough room to breathe." onAdd={() => onAdd(selectedDate)} />
    <div className="toolbar panel weekly-toolbar"><DateStepper value={selectedDate} onChange={setSelectedDate} label="This week" /><div className="week-progress">Week progress <strong>{weekProgress}%</strong><span><i style={{ width: `${weekProgress}%` }} /></span></div></div>
    <section className="week-grid">{weekDates.map((value) => { const day = dateFromString(value); const dayTasks = tasks.filter((task) => task.date === value); return <div className={`day-column ${value === INITIAL_DATE ? 'current-day' : ''}`} key={value}><div className="day-heading"><span>{day.toLocaleDateString('en-US', { weekday: 'short' })}</span><strong>{day.getDate()}</strong></div>{dayTasks.map((task) => <button className={`week-task ${task.completed ? 'is-complete' : ''}`} key={task.id} onClick={() => onEdit(task)}>{task.title}{task.important && <em> ★</em>}</button>)}<button className="add-day" onClick={() => onAdd(value)} aria-label={`Add task on ${dateLabel(value)}`}>+</button></div>; })}</section>
    <div className="week-summary panel"><div><span>Completed this week</span><strong>{weekCompleted}</strong></div><div><span>Pending</span><strong>{weekTasks.length - weekCompleted}</strong></div><div><span>Important</span><strong>{weekTasks.filter((task) => task.important).length}</strong></div><div><span>Overdue</span><strong>{weekTasks.filter((task) => !task.completed && task.date < INITIAL_DATE).length}</strong></div></div>
  </>;
}

function Monthly({ tasks, month, setMonth, selectedDate, setSelectedDate, actions, onAdd }) {
  const year = month.getFullYear(); const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1); const leadingDays = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = Array.from({ length: 42 }, (_, index) => index - leadingDays + 1);
  const selectedTasks = tasks.filter((task) => task.date === selectedDate);
  function moveMonth(amount) { setMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1)); }
  return <>
    <PageHeading eyebrow="Monthly overview" title="Calendar" description="See the shape of your month and keep important dates close." onAdd={onAdd} />
    <div className="calendar-layout">
      <section className="panel calendar-panel"><div className="calendar-heading"><button className="icon-button" onClick={() => moveMonth(-1)} aria-label="Previous month">←</button><h2>{month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2><button className="icon-button" onClick={() => moveMonth(1)} aria-label="Next month">→</button><button className="text-button" onClick={() => { setMonth(dateFromString(INITIAL_DATE)); setSelectedDate(INITIAL_DATE); }}>Today</button></div><div className="calendar-grid calendar-weekdays">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <span key={day}>{day}</span>)}</div><div className="calendar-grid">{cells.map((day, index) => { const inMonth = day > 0 && day <= daysInMonth; const value = inMonth ? dateString(new Date(year, monthIndex, day)) : ''; const dayTasks = inMonth ? tasks.filter((task) => task.date === value) : []; return <button disabled={!inMonth} key={index} className={`calendar-day ${value === selectedDate ? 'selected' : ''} ${value === INITIAL_DATE ? 'today' : ''}`} onClick={() => setSelectedDate(value)}><span>{inMonth ? day : ''}</span>{dayTasks.length > 0 && <i className="calendar-dots">{dayTasks.slice(0, 3).map((task) => <b key={task.id} className={task.completed ? 'dot-done' : ''} />)}</i>}</button>; })}</div></section>
      <section className="panel selected-day-panel"><div className="selected-day-heading"><div><p>Selected date</p><h2>{fullDate(selectedDate)}</h2></div><button className="button button-primary" onClick={onAdd}>+ Add</button></div>{selectedTasks.map((task) => <TaskRow key={task.id} task={task} {...actions} />)}{selectedTasks.length === 0 && <EmptyState>Nothing planned for this day.</EmptyState>}</section>
    </div>
  </>;
}

function Settings({ dark, setDark, onExport, onImport, onClear }) {
  return <>
    <PageHeading eyebrow="Preferences" title="Settings" description="Make orbit feel like your own workspace." />
    <section className="panel settings-panel"><div className="settings-block"><div><h2>Appearance</h2><p>Choose how orbit looks across your devices.</p></div><div className="appearance-options"><button className={!dark ? 'selected' : ''} onClick={() => setDark(false)}>Light {!dark && '✓'}</button><button className={dark ? 'selected' : ''} onClick={() => setDark(true)}>Dark {dark && '✓'}</button></div></div><hr/><div className="settings-block"><div><h2>Your data</h2><p>Take your tasks with you or start fresh.</p></div><div className="data-options"><button className="button button-quiet" onClick={onExport}>↓ Export JSON</button><label className="button button-quiet import-button">↑ Import JSON<input type="file" accept="application/json,.json" onChange={onImport} /></label><button className="button button-danger" onClick={onClear}>Clear all tasks</button></div></div><hr/><div className="settings-block shortcuts-block"><div><h2>Keyboard shortcuts</h2><p>N New task / Focus search Esc Close modal</p></div></div></section>
  </>;
}

function EmptyState({ children }) { return <div className="empty-state">{children}</div>; }

export default App;