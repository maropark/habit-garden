import React, { useState } from 'react';
import { GardenToday } from './components/garden/GardenToday';
import { CalendarView } from './components/CalendarView';

type View = 'today' | 'calendar';

const App: React.FC = () => {
  const [view, setView] = useState<View>('today');

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.titleArea}>
          <h1 style={styles.title}>🌱 ARROA</h1>
          <p style={styles.subtitle}>Your Habit Garden</p>
        </div>
        
        <nav style={styles.nav}>
          <button
            onClick={() => setView('today')}
            style={{
              ...styles.navButton,
              ...(view === 'today' ? styles.navButtonActive : {}),
            }}
          >
            🌸 Today
          </button>
          <button
            onClick={() => setView('calendar')}
            style={{
              ...styles.navButton,
              ...(view === 'calendar' ? styles.navButtonActive : {}),
            }}
          >
            📅 Calendar
          </button>
        </nav>
      </header>

      <main style={styles.main}>
        {view === 'today' ? <GardenToday /> : <CalendarView />}
      </main>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    fontFamily: "'Courier New', monospace",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: 'rgba(30, 50, 30, 0.95)',
    borderBottom: '3px solid #3d5c32',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  titleArea: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '24px',
    margin: 0,
    color: '#C5E1A5',
    letterSpacing: '3px',
  },
  subtitle: {
    fontSize: '12px',
    color: '#8BC34A',
    margin: 0,
    letterSpacing: '1px',
  },
  nav: {
    display: 'flex',
    gap: '8px',
  },
  navButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '2px solid #4a7c3f',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: 'rgba(45, 74, 34, 0.8)',
    color: '#AED581',
    fontFamily: "'Courier New', monospace",
    fontSize: '14px',
    transition: 'all 0.2s ease',
  },
  navButtonActive: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderColor: '#66BB6A',
  },
  main: {
    minHeight: 'calc(100vh - 80px)',
  },
};

export default App;
