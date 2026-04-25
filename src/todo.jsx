import { useState } from 'react';

export default function Todo({ nav, todos, setTodos }) {
  const [input, setInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showCompleted, setShowCompleted] = useState(false);

  const formatDisplay = (val) => {
    const d = new Date(val + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });
  };

  const addTodo = () => {
    if (!input.trim()) return;
    const taskDate = new Date(selectedDate + 'T00:00:00');
    setTodos([...todos, { text: input.trim(), done: false, date: taskDate }]);
    setInput('');
  };

  const toggle = (i) => setTodos(todos.map((t, idx) => idx === i ? { ...t, done: !t.done } : t));
  const remove = (i) => setTodos(todos.filter((_, idx) => idx !== i));

  const visible = showCompleted ? todos.filter(t => t.done) : todos.filter(t => !t.done);

  const s = {
    wrap: { background: '#fffef7', minHeight: '100vh', padding: '20px 20px 40px' },
    backBtn: { background: 'none', border: 'none', color: '#4caf50', fontSize: 14, cursor: 'pointer', padding: '0 0 10px', display: 'block' },
    title: { fontSize: 20, fontWeight: 700, marginBottom: 16 },
    label: { fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 6 },
    input: { width: '100%', padding: '12px', border: '1.5px solid #ddd', borderRadius: 8, fontSize: 14, marginBottom: 10, outline: 'none' },
    datePicker: { width: '100%', padding: '11px 14px', border: '1.5px solid #64b5f6', borderRadius: 8, fontSize: 14, color: '#333', background: '#e3f2fd', outline: 'none', marginBottom: 6, cursor: 'pointer' },
    dateBadge: { background: '#64b5f6', color: '#fff', borderRadius: 8, padding: '10px', textAlign: 'center', fontWeight: 600, fontSize: 14, marginBottom: 10 },
    addBtn: { width: '100%', padding: '13px', background: '#e8a020', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', marginBottom: 16 },
    toggle: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, fontSize: 14, color: '#555' },
    switchTrack: (on) => ({ width: 44, height: 24, borderRadius: 12, background: on ? '#4caf50' : '#ccc', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }),
    switchThumb: (on) => ({ width: 20, height: 20, borderRadius: 10, background: '#fff', position: 'absolute', top: 2, left: on ? 22 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }),
    card: (done) => ({ background: done ? '#c8e6c9' : '#fff', borderRadius: 12, padding: '14px 50px 14px 14px', marginBottom: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', position: 'relative' }),
    cardText: (done) => ({ fontSize: 14, color: '#333', marginBottom: 4, textDecoration: done ? 'line-through' : 'none' }),
    cardDate: { fontSize: 12, color: '#e53935' },
    actions: { position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 4 },
    actionBtn: (color) => ({ background: '#f5f5f5', border: 'none', borderRadius: 8, width: 32, height: 28, cursor: 'pointer', fontSize: 14, color }),
    empty: { textAlign: 'center', color: '#aaa', marginTop: 30, fontSize: 14 },
  };

  return (
    <div style={s.wrap}>
      <button style={s.backBtn} onClick={() => nav('home')}>← Back</button>
      <div style={s.title}>📝 My To-Do List</div>

      <div style={s.label}>Add a Task:</div>
      <input style={s.input} placeholder="Enter task..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTodo()} />

      <div style={s.label}>Task Date:</div>
      <input type="date" style={s.datePicker} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
      <div style={s.dateBadge}>📅 {formatDisplay(selectedDate)}</div>

      <button style={s.addBtn} onClick={addTodo}>+ Add Task</button>

      <div style={s.toggle}>
        <span>Show Completed Only</span>
        <div style={s.switchTrack(showCompleted)} onClick={() => setShowCompleted(!showCompleted)}>
          <div style={s.switchThumb(showCompleted)} />
        </div>
      </div>

      {visible.length === 0 && <div style={s.empty}>{showCompleted ? 'No completed tasks yet' : 'No tasks! Add one above 🎉'}</div>}

      {visible.map((t) => {
        const origIdx = todos.indexOf(t);
        return (
          <div key={origIdx} style={s.card(t.done)}>
            <div style={s.cardText(t.done)}>{t.text}</div>
            <div style={s.cardDate}>📅 {t.date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</div>
            <div style={s.actions}>
              <button style={s.actionBtn('#e53935')} onClick={() => remove(origIdx)}>✕</button>
              <button style={s.actionBtn('#4caf50')} onClick={() => toggle(origIdx)}>✓</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
