import React, { useState } from 'react';
import { TodayChecklist } from './components/TodayChecklist';
import { CalendarView } from './components/CalendarView';

type View = 'today' | 'calendar';

const App: React.FC = () => {
  const [view, setView] = useState<View>('today');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fdf6ec 0%, #f3e7dd 40%, #e8f0e4 100%)',
        fontFamily: '"Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#4a3b2e',
        paddingBottom: '5rem',
      }}
    >
      <header
        style={{
          textAlign: 'center',
          padding: '1.5rem',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🌱 Habit Garden</h1>
        <p style={{ color: '#8b7355', marginBottom: '1rem' }}>
          A cozy cottage-core habit space
        </p>
        
        <nav
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <button
            onClick={() => setView('today')}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '1rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              backgroundColor: view === 'today' ? '#90BE6D' : 'rgba(255, 255, 255, 0.7)',
              color: '#4a3b2e',
              transition: 'all 0.2s ease',
            }}
          >
            🌸 Today
          </button>
          <button
            onClick={() => setView('calendar')}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '1rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              backgroundColor: view === 'calendar' ? '#90BE6D' : 'rgba(255, 255, 255, 0.7)',
              color: '#4a3b2e',
              transition: 'all 0.2s ease',
            }}
          >
            📅 Calendar
          </button>
        </nav>
      </header>

      <main>
        {view === 'today' ? <TodayChecklist /> : <CalendarView />}
      </main>
    </div>
  );
};

export default App;
