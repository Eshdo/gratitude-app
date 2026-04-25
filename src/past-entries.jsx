import { useState } from 'react';

export default function PastEntries({ nav, entries, setEntries }) {
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const filtered = entries.filter(e => {
    const q = search.toLowerCase();
    const matchText = !q || e.g1?.toLowerCase().includes(q) || e.g2?.toLowerCase().includes(q) ||
      e.g3?.toLowerCase().includes(q) || e.journal?.toLowerCase().includes(q);
    const matchDate = !filterDate || e.date?.toISOString().split('T')[0] === filterDate;
    return matchText && matchDate;
  });

  const deleteEntry = (i) => setEntries(entries.filter((_, idx) => idx !== i));

  const exportTxt = () => {
    const text = entries.map(e =>
      `Date: ${e.date?.toLocaleDateString()}\nGrateful for:\n• ${e.g1}\n• ${e.g2}\n• ${e.g3}\nJournal: ${e.journal}\n\n`
    ).join('---\n');
    const a = document.createElement('a');
    a.href = 'data:text/plain,' + encodeURIComponent(text);
    a.download = 'gratitude-entries.txt';
    a.click();
  };

  const groups = {};
  filtered.forEach((e) => {
    const key = e.date?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) || 'Unknown';
    if (!groups[key]) groups[key] = [];
    groups[key].push({ ...e, origIdx: entries.indexOf(e) });
  });

  const s = {
    wrap: { background: '#fffef7', minHeight: '100vh', padding: '20px 20px 40px' },
    title: { fontSize: 20, fontWeight: 700, marginBottom: 16 },
    searchInput: { width: '100%', padding: '11px 14px', border: '1.5px solid #ddd', borderRadius: 8, fontSize: 14, marginBottom: 10, outline: 'none' },
    dateFilter: { width: '100%', padding: '11px 14px', border: '1.5px solid #64b5f6', borderRadius: 8, fontSize: 14, marginBottom: 12, outline: 'none', background: '#e3f2fd', cursor: 'pointer' },
    clearBtn: { background: 'none', border: 'none', color: '#e8a020', fontSize: 13, cursor: 'pointer', marginBottom: 12, display: 'block' },
    exportBtn: { width: '100%', padding: '13px', background: '#e8a020', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', marginBottom: 20 },
    monthLabel: { fontWeight: 700, fontSize: 16, color: '#333', marginBottom: 10 },
    card: { background: '#fff', borderRadius: 12, padding: '14px', marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', position: 'relative' },
    cardDate: { fontWeight: 700, fontSize: 14, marginBottom: 4 },
    cardGrats: { fontSize: 13, color: '#444', marginBottom: 4 },
    cardJournal: { fontSize: 13, color: '#666' },
    deleteBtn: { position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#aaa' },
    backBtn: { background: 'none', border: 'none', color: '#4caf50', fontSize: 14, cursor: 'pointer', padding: '0 0 14px', display: 'block' },
    empty: { textAlign: 'center', color: '#aaa', marginTop: 40, fontSize: 14 },
  };

  return (
    <div style={s.wrap}>
      <button style={s.backBtn} onClick={() => nav('home')}>← Back</button>
      <div style={s.title}>📖 Past Gratitude Entries</div>

      <input style={s.searchInput} placeholder="🔍 Search by word..." value={search} onChange={e => setSearch(e.target.value)} />
      <input type="date" style={s.dateFilter} value={filterDate} onChange={e => setFilterDate(e.target.value)} />
      {filterDate && <button style={s.clearBtn} onClick={() => setFilterDate('')}>✕ Clear date filter</button>}

      <button style={s.exportBtn} onClick={exportTxt}>📤 Export to .txt</button>

      {entries.length === 0 && <div style={s.empty}>No entries yet. Start your first daily entry! 🌱</div>}
      {entries.length > 0 && filtered.length === 0 && <div style={s.empty}>No entries match your search.</div>}

      {Object.entries(groups).map(([month, items]) => (
        <div key={month}>
          <div style={s.monthLabel}>{month}</div>
          {items.map((e) => (
            <div key={e.origIdx} style={s.card}>
              <button style={s.deleteBtn} onClick={() => deleteEntry(e.origIdx)}>🗑️</button>
              <div style={s.cardDate}>{e.date?.toLocaleDateString()}</div>
              <div style={s.cardGrats}>
                <strong>Things I'm grateful for:</strong><br />
                {e.g1 && <span>• {e.g1}<br /></span>}
                {e.g2 && <span>• {e.g2}<br /></span>}
                {e.g3 && <span>• {e.g3}<br /></span>}
              </div>
              {e.journal && <div style={s.cardJournal}><strong>Journal:</strong> {e.journal}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
