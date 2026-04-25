import { useState } from 'react';

export default function Trends({ nav, entries, todos }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () => {
    const next = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    const maxMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    if (next <= maxMonth) setViewDate(next);
  };

  const isCurrentMonth =
    viewDate.getFullYear() === today.getFullYear() &&
    viewDate.getMonth() === today.getMonth();

  const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const entryDates = new Set(entries.map(e => e.date?.toDateString()));

  // Real streak
  let streak = 0;
  const d = new Date(today);
  while (entryDates.has(d.toDateString())) {
    streak++;
    d.setDate(d.getDate() - 1);
  }

  // Entries in viewed month
  const thisMonthEntries = entries.filter(
    e => e.date?.getMonth() === viewDate.getMonth() && e.date?.getFullYear() === viewDate.getFullYear()
  );

  // Last 7 days chart (never future)
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (6 - i));
    const count = entries.filter(e => e.date?.toDateString() === day.toDateString()).length;
    return {
      label: day.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
      count,
    };
  });
  const maxCount = Math.max(...weekData.map(d => d.count), 1);

  // Top gratitude words (filter common stop words)
  const stopWords = new Set(['that','with','this','have','from','they','will','been','were','your','more','very','just','also','about','some','what']);
  const wordCount = {};
  entries.forEach(e => {
    [e.g1, e.g2, e.g3, e.journal].forEach(text => {
      text?.toLowerCase().split(/\s+/).forEach(w => {
        const clean = w.replace(/[^a-z]/g, '');
        if (clean.length > 3 && !stopWords.has(clean)) {
          wordCount[clean] = (wordCount[clean] || 0) + 1;
        }
      });
    });
  });
  const topWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]).slice(0, 10);

  // To-do stats from real data
  const allTodos = todos || [];
  const totalTodos = allTodos.length;
  const completedTodos = allTodos.filter(t => t.done).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  // Month picker — cap at current month
  const handleMonthInput = (e) => {
    if (!e.target.value) return;
    const [year, month] = e.target.value.split('-');
    const picked = new Date(parseInt(year), parseInt(month) - 1, 1);
    const maxMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    if (picked <= maxMonth) setViewDate(picked);
  };

  const monthInputVal = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}`;
  const maxMonthVal = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

  const s = {
    wrap: { background: '#fffef7', minHeight: '100vh', padding: '20px 20px 40px' },
    backBtn: { background: 'none', border: 'none', color: '#4caf50', fontSize: 14, cursor: 'pointer', padding: '0 0 10px', display: 'block' },
    title: { fontSize: 20, fontWeight: 700, marginBottom: 16 },
    card: { background: '#fff', borderRadius: 12, padding: '16px', marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
    statRow: { display: 'flex', gap: 10 },
    statBox: (color) => ({ flex: 1, background: color, borderRadius: 10, padding: '12px', textAlign: 'center' }),
    statNum: { fontSize: 22, fontWeight: 700, color: '#fff' },
    statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
    calHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    monthPicker: { border: '1.5px solid #64b5f6', borderRadius: 8, padding: '5px 8px', fontSize: 13, background: '#e3f2fd', outline: 'none', cursor: 'pointer' },
    navBtn: (disabled) => ({ background: 'none', border: 'none', fontSize: 18, cursor: disabled ? 'default' : 'pointer', color: disabled ? '#ccc' : '#4caf50' }),
    calGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: 2 },
    dayLabel: { fontSize: 11, color: '#999', fontWeight: 600, paddingBottom: 6 },
    dayCell: (hasEntry, isToday, isFuture) => ({
      fontSize: 13, padding: '5px 0', borderRadius: 6,
      background: isFuture ? 'transparent' : hasEntry ? '#c8e6c9' : 'transparent',
      color: isFuture ? '#ddd' : isToday ? '#e53935' : '#333',
      fontWeight: isToday ? 700 : 400,
    }),
    sectionTitle: { fontSize: 15, fontWeight: 700, marginBottom: 8 },
    streakNum: { fontSize: 28, fontWeight: 700, color: streak > 0 ? '#e8a020' : '#aaa' },
    streakSub: { fontSize: 12, color: '#888', marginTop: 4 },
    barWrap: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: 80 },
    bar: (h) => ({ width: '70%', background: '#e8a020', borderRadius: '3px 3px 0 0', height: `${Math.max(h, 2)}%`, minHeight: 3 }),
    barLabel: { fontSize: 9, color: '#999', textAlign: 'center', marginTop: 4, flex: 1 },
    progressBar: { height: 10, background: '#eee', borderRadius: 5, overflow: 'hidden', marginTop: 8 },
    progressFill: { height: '100%', background: '#4caf50', borderRadius: 5, width: completionRate + '%' },
    wordChip: { display: 'inline-block', background: '#c8e6c9', color: '#2e7d32', borderRadius: 16, padding: '4px 10px', fontSize: 12, fontWeight: 600, margin: '3px' },
    monthStat: { fontSize: 13, color: '#666', marginTop: 8 },
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div style={s.wrap}>
      <button style={s.backBtn} onClick={() => nav('home')}>Back</button>
      <div style={s.title}>Trends</div>

      {/* Summary stats */}
      <div style={{ ...s.card, padding: '12px' }}>
        <div style={s.statRow}>
          <div style={s.statBox('#4caf50')}>
            <div style={s.statNum}>{entries.length}</div>
            <div style={s.statLabel}>Total Entries</div>
          </div>
          <div style={s.statBox('#64b5f6')}>
            <div style={s.statNum}>{thisMonthEntries.length}</div>
            <div style={s.statLabel}>This Month</div>
          </div>
          <div style={s.statBox('#e8a020')}>
            <div style={s.statNum}>{streak}</div>
            <div style={s.statLabel}>Day Streak</div>
          </div>
        </div>
      </div>

      {/* Calendar — no future days highlighted */}
      <div style={s.card}>
        <div style={s.calHeader}>
          <button style={s.navBtn(false)} onClick={prevMonth}>&#9664;</button>
          <input type="month" style={s.monthPicker} value={monthInputVal} max={maxMonthVal} onChange={handleMonthInput} />
          <button style={s.navBtn(isCurrentMonth)} onClick={nextMonth}>&#9654;</button>
        </div>
        <div style={s.calGrid}>
          {days.map(d => <div key={d} style={s.dayLabel}>{d}</div>)}
          {Array(firstDay).fill(null).map((_, i) => <div key={'empty' + i} />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const dayDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), i + 1);
            const hasEntry = entryDates.has(dayDate.toDateString());
            const isToday = dayDate.toDateString() === today.toDateString();
            const isFuture = dayDate > today;
            return <div key={i} style={s.dayCell(hasEntry, isToday, isFuture)}>{i + 1}</div>;
          })}
        </div>
        <div style={s.monthStat}>
          {thisMonthEntries.length > 0
            ? `${thisMonthEntries.length} entr${thisMonthEntries.length === 1 ? 'y' : 'ies'} in ${monthName}`
            : `No entries in ${monthName} yet`}
        </div>
      </div>

      {/* Real streak with motivation */}
      <div style={s.card}>
        <div style={s.sectionTitle}>Current Streak</div>
        <div style={s.streakNum}>{streak} {streak === 1 ? 'day' : 'days'}</div>
        <div style={s.streakSub}>
          {streak === 0 && 'Add a daily entry to start your streak!'}
          {streak >= 1 && streak < 3 && 'Great start! Keep going'}
          {streak >= 3 && streak < 7 && "You're on a roll!"}
          {streak >= 7 && 'Amazing consistency!'}
        </div>
      </div>

      {/* Last 7 days chart — real data only */}
      <div style={s.card}>
        <div style={s.sectionTitle}>Last 7 Days</div>
        <div style={{ display: 'flex', gap: 4, height: 80 }}>
          {weekData.map((d, i) => (
            <div key={i} style={s.barWrap}>
              <div style={s.bar((d.count / maxCount) * 100)} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          {weekData.map((d, i) => <div key={i} style={s.barLabel}>{d.label}</div>)}
        </div>
      </div>

      {/* To-do progress */}
      {totalTodos > 0 && (
        <div style={s.card}>
          <div style={s.sectionTitle}>To-Do Progress</div>
          <div style={{ fontSize: 13, color: '#555' }}>
            {completedTodos} of {totalTodos} tasks done &middot; {pendingTodos} pending
          </div>
          <div style={s.progressBar}>
            <div style={s.progressFill} />
          </div>
          <div style={{ fontSize: 12, color: '#4caf50', marginTop: 6, fontWeight: 600 }}>
            {completionRate}% complete
          </div>
        </div>
      )}

      {/* Top gratitude words from real entries */}
      <div style={s.card}>
        <div style={s.sectionTitle}>Top Gratitude Words</div>
        {topWords.length === 0
          ? <div style={{ color: '#aaa', fontSize: 13 }}>Add entries to see your most used words!</div>
          : topWords.map(([w, c]) => (
            <span key={w} style={{ ...s.wordChip, fontSize: c > 3 ? 14 : 12 }}>
              {w} ({c})
            </span>
          ))
        }
      </div>
    </div>
  );
}
