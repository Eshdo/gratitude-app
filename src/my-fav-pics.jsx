import { useRef } from 'react';

export default function MyFavPics({ nav, pics, setPics }) {
  const fileRef = useRef();

  const addPics = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPics(prev => [...prev, { src: ev.target.result, date: new Date(), caption: '' }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const updateCaption = (i, val) => setPics(pics.map((p, idx) => idx === i ? { ...p, caption: val } : p));
  const removePic = (i) => setPics(pics.filter((_, idx) => idx !== i));

  const s = {
    wrap: { background: '#fffef7', minHeight: '100vh', padding: '20px 20px 40px' },
    backBtn: { background: 'none', border: 'none', color: '#4caf50', fontSize: 14, cursor: 'pointer', padding: '0 0 10px', display: 'block' },
    title: { fontSize: 20, fontWeight: 700, marginBottom: 16 },
    addBtn: { width: '100%', padding: '14px', background: '#e8a020', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 20 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 },
    card: { background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'relative' },
    img: { width: '100%', aspectRatio: '4/3', objectFit: 'cover' },
    cardBody: { padding: '8px 10px' },
    dateText: { fontSize: 11, color: '#888', marginBottom: 4 },
    captionInput: { width: '100%', border: 'none', outline: 'none', fontSize: 12, color: '#555', background: 'transparent' },
    deleteBtn: { position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: 12, width: 24, height: 24, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    empty: { textAlign: 'center', color: '#aaa', marginTop: 40, fontSize: 14 },
  };

  return (
    <div style={s.wrap}>
      <button style={s.backBtn} onClick={() => nav('home')}>← Back</button>
      <div style={s.title}>📸 My Fav Pics</div>

      <button style={s.addBtn} onClick={() => fileRef.current.click()}>+ Add from Gallery</button>
      <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={addPics} />

      {pics.length === 0 && <div style={s.empty}>No pictures yet. Add your favourite moments! 🌸</div>}

      <div style={s.grid}>
        {pics.map((p, i) => (
          <div key={i} style={s.card}>
            <img src={p.src} alt="" style={s.img} />
            <button style={s.deleteBtn} onClick={() => removePic(i)}>✕</button>
            <div style={s.cardBody}>
              <div style={s.dateText}>{p.date?.toLocaleDateString()}</div>
              <input
                style={s.captionInput}
                placeholder="Add a caption..."
                value={p.caption}
                onChange={e => updateCaption(i, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
