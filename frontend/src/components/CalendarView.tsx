import React, { useEffect, useState } from 'react';
import { gardenApi, GardenDay, GardenResponse } from '../services';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const PLANT_COLORS: Record<string, string> = {
  yellow: '#F9C74F',
  pink: '#FFB7C5',
  red: '#E07A5F',
  white: '#F5F5F5',
  purple: '#9D8DF1',
  orange: '#FB8500',
  blue: '#7EC8E3',
  green: '#90BE6D',
};

export const CalendarView: React.FC = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [garden, setGarden] = useState<GardenResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const loadGarden = async () => {
    setLoading(true);
    try {
      const data = await gardenApi.getMonth(month, year);
      setGarden(data);
    } catch (e) {
      console.error('Failed to load garden:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGarden();
  }, [month, year]);

  const prevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const getDaysInMonth = (m: number, y: number) => {
    return new Date(y, m, 0).getDate();
  };

  const getFirstDayOfMonth = (m: number, y: number) => {
    return new Date(y, m - 1, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);

  const renderCalendarDays = () => {
    const cells = [];
    
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} style={styles.dayCell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayData = garden?.days.find(d => {
        const dDate = new Date(d.date);
        return dDate.getDate() === day;
      });

      const isToday = today.getDate() === day && 
                      today.getMonth() + 1 === month && 
                      today.getFullYear() === year;

      const wateredHabits = dayData?.habits.filter(h => {
        const lastWatered = h.last_watered_at ? new Date(h.last_watered_at) : null;
        const dayDate = new Date(year, month - 1, day);
        return lastWatered && lastWatered.toDateString() === dayDate.toDateString();
      }) || [];

      cells.push(
        <div
          key={day}
          style={{
            ...styles.dayCell,
            ...(isToday ? styles.todayCell : {}),
          }}
        >
          <span style={styles.dayNumber}>{day}</span>
          <div style={styles.habitDots}>
            {wateredHabits.slice(0, 4).map((habit, idx) => (
              <span
                key={idx}
                style={{
                  ...styles.habitDot,
                  backgroundColor: PLANT_COLORS[habit.plant_color] || '#90BE6D',
                }}
              />
            ))}
            {wateredHabits.length > 4 && (
              <span style={styles.moreIndicator}>+{wateredHabits.length - 4}</span>
            )}
          </div>
        </div>
      );
    }

    return cells;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={prevMonth} style={styles.navButton}>←</button>
        <h2 style={styles.title}>{MONTHS[month - 1]} {year}</h2>
        <button onClick={nextMonth} style={styles.navButton}>→</button>
      </div>

      <div style={styles.weekdays}>
        {WEEKDAYS.map(day => (
          <div key={day} style={styles.weekday}>{day}</div>
        ))}
      </div>

      {loading ? (
        <p style={styles.loading}>Loading garden...</p>
      ) : (
        <div style={styles.calendar}>
          {renderCalendarDays()}
        </div>
      )}

      <div style={styles.legend}>
        <p style={styles.legendTitle}>Habit completion</p>
        <div style={styles.legendItems}>
          <span style={styles.legendItem}>● Watered</span>
          <span style={styles.legendItem}>○ Not watered</span>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '1.5rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.5rem',
    color: '#4a3b2e',
    margin: 0,
  },
  navButton: {
    background: 'none',
    border: '1px solid #d4c4b0',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    color: '#4a3b2e',
    fontSize: '1rem',
  },
  weekdays: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    marginBottom: '0.5rem',
  },
  weekday: {
    textAlign: 'center',
    fontSize: '0.85rem',
    color: '#8b7355',
    padding: '0.5rem 0',
  },
  calendar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.25rem',
  },
  dayCell: {
    aspectRatio: '1',
    padding: '0.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  todayCell: {
    backgroundColor: 'rgba(144, 190, 109, 0.2)',
    border: '2px solid #90BE6D',
  },
  dayNumber: {
    fontSize: '0.85rem',
    color: '#4a3b2e',
    fontWeight: 500,
  },
  habitDots: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2px',
    justifyContent: 'center',
    marginTop: '2px',
  },
  habitDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  moreIndicator: {
    fontSize: '0.65rem',
    color: '#8b7355',
  },
  loading: {
    textAlign: 'center',
    color: '#8b7355',
    padding: '2rem',
  },
  legend: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '0.75rem',
  },
  legendTitle: {
    fontSize: '0.9rem',
    color: '#8b7355',
    margin: '0 0 0.5rem 0',
  },
  legendItems: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.85rem',
    color: '#4a3b2e',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
};
