import { useState, useEffect } from 'react';

const quotes = [
  '"Little things make big days 🌻"',
  '"Gratitude turns what we have into enough 🌿"',
  '"Today is a gift. That\'s why it\'s called the present 🎁"',
  '"Bloom where you\'re planted 🌸"',
];

export default function Index({ nav, entries }) {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const s = {
    wrap: { padding: '40px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fffef7', minHeight: '100vh' },
    logo: { fontSize: 52, marginBottom: 4 },
    logoLabel: { fontSize: 13, color: '#888', fontWeight: 600, letterSpacing: 1, marginBottom: 16 },
    title: { fontSize: 22, fontWeight: 700, color: '#222', marginBottom: 4 },
    sub: { fontSize: 13, color: '#777', marginBottom: 10 },
    quote: { fontSize: 13, color: '#555', fontStyle: 'italic', marginBottom: 28, textAlign: 'center' },
    btnDaily: { width: '100%', padding: '15px', borderRadius: 10, border: 'none', background: '#c8e6c9', color: '#2e7d32', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 12 },
    btn: { width: '100%', padding: '15px', borderRadius: 10, border: 'none', background: '#4caf50', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 12 },
  };

  return (
    <div style={s.wrap}>
      <div style={s.logo}>🌻</div>
      <div style={s.logoLabel}>Gratitude Journal</div>
      <div style={s.title}>Daily Gratitude Journal</div>
      <div style={s.sub}>Reflect. Appreciate. Grow. 🌱</div>
      <div style={s.quote}>{quote}</div>

      <button style={s.btnDaily} onClick={() => nav('daily')}>✏️ Daily Entry</button>
      <button style={s.btn} onClick={() => nav('past')}>📖 Past Entries</button>
      <button style={s.btn} onClick={() => nav('trends')}>📈 Trends</button>
      <button style={s.btn} onClick={() => nav('todo')}>📝 To-Do List</button>
      <button style={s.btn} onClick={() => nav('pics')}>🖼️ My Fav Pics</button>
    </div>
  );
}
