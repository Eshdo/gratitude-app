import { useState } from 'react';

export default function DailyEntry({ nav, entries, setEntries }) {
  const today = new Date();
  const toInputVal = (d) => d.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(toInputVal(today));
  const [g1, setG1] = useState('');
  const [g2, setG2] = useState('');
  const [g3, setG3] = useState('');
  const [journal, setJournal] = useState('');
  const [saved, setSaved] = useState(false);

  const formatDisplay = (val) => {
    const d = new Date(val + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });
  };

  const save = () => {
    if (!g1 && !g2 && !g3 && !journal) return;
    const entryDate = new Date(selectedDate + 'T00:00:00');
    setEntries([{ date: entryDate, g1, g2, g3, journal }, ...entries]);
    setSaved(true);
    setTimeout(() => { setSaved(false); nav('home'); }, 1200);
  };

  const s = {
    wrap: { background: '#fffef7', minHeight: '100vh', padding: '0 0 40px' },
    banner: { background: '#e8a020', color: '#fff', padding: '14px 20px', fontSize: 14, fontStyle: 'italic', textAlign: 'center' },
    body: { padding: '20px 20px' },
    label: { fontSize: 14, fontWeight: 700, color: '#333', marginBottom: 8 },
    section: { background: '#fff', borderRadius: 12, padding: '16px', marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
    datePicker: { width: '100%', padding: '11px 14px', border: '1.5px solid #64b5f6', borderRadius: 8, fontSize: 14, color: '#333', background: '#e3f2fd', outline: 'none', marginBottom: 8, cursor: 'pointer' },
    dateDisplay: { background: '#64b5f6', color: '#fff', borderRadius: 8, padding: '10px 16px', textAlign: 'center', fontWeight: 600, fontSize: 14 },
    input: { width: '100%', padding: '12px', border: '1.5px solid #ddd', borderRadius: 8, fontSize: 14, marginBottom: 10, outline: 'none', background: '#fff' },
    textarea: { width: '100%', padding: '12px', border: '1.5px solid #ddd', borderRadius: 8, fontSize: 14, marginBottom: 20, outline: 'none', background: '#fff', minHeight: 100, resize: 'vertical' },
    saveBtn: { width: '100%', padding: '15px', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' },
    backBtn: { background: 'none', border: 'none', color: '#4caf50', fontSize: 14, cursor: 'pointer', padding: '12px 0', display: 'block' },
  };

  return (
    <div style={s.wrap}>
      <div style={s.banner}>"Bloom where you're planted 🌸"</div>
      <div style={s.body}>
        <button style={s.backBtn} onClick={() => nav('home')}>← Back</button>

        <div style={s.section}>
          <div style={s.label}>📅 Entry Date:</div>
          <input
            type="date"
            style={s.datePicker}
            value={selectedDate}
            max={toInputVal(today)}
            onChange={e => setSelectedDate(e.target.value)}
          />
          <div style={s.dateDisplay}>{formatDisplay(selectedDate)}</div>
        </div>

        <div style={s.section}>
          <div style={s.label}>🙏 What are you grateful for?</div>
          <input style={s.input} placeholder="Gratitude #1" value={g1} onChange={e => setG1(e.target.value)} />
          <input style={s.input} placeholder="Gratitude #2" value={g2} onChange={e => setG2(e.target.value)} />
          <input style={s.input} placeholder="Gratitude #3" value={g3} onChange={e => setG3(e.target.value)} />
        </div>

        <div style={s.section}>
          <div style={s.label}>📓 Journal Entry</div>
          <textarea style={s.textarea} placeholder="Write your thoughts here..." value={journal} onChange={e => setJournal(e.target.value)} />
        </div>

        <button style={{ ...s.saveBtn, background: saved ? '#4caf50' : '#e8a020' }} onClick={save}>
          {saved ? '✅ Saved!' : '💾 Save Entry'}
        </button>
      </div>
    </div>
  );
}
