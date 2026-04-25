import { useState } from 'react';
import Index from './index-screen';
import DailyEntry from './daily-entry';
import PastEntries from './past-entries';
import Trends from './trends';
import Todo from './todo';
import MyFavPics from './my-fav-pics';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [entries, setEntries] = useState([]);
  const [todos, setTodos] = useState([]);
  const [pics, setPics] = useState([]);

  const nav = (s) => setScreen(s);

  return (
    <div style={{ maxWidth: 390, margin: '0 auto', minHeight: '100vh', background: '#fffef7', fontFamily: "'Segoe UI', sans-serif" }}>
      {screen === 'home'   && <Index nav={nav} entries={entries} />}
      {screen === 'daily'  && <DailyEntry nav={nav} entries={entries} setEntries={setEntries} />}
      {screen === 'past'   && <PastEntries nav={nav} entries={entries} setEntries={setEntries} />}
      {screen === 'trends' && <Trends nav={nav} entries={entries} todos={todos} />}
      {screen === 'todo'   && <Todo nav={nav} todos={todos} setTodos={setTodos} />}
      {screen === 'pics'   && <MyFavPics nav={nav} pics={pics} setPics={setPics} />}
    </div>
  );
}
