import React, { useEffect, useState } from 'react';
import { gardenApi, TodayHabit, habitsApi } from '../services';

const PLANT_EMOJIS: Record<string, string> = {
  sunflower: '🌻',
  rose: '🌹',
  tulip: '🌷',
  succulent: '🪴',
  herb: '🌿',
  tree: '🌳',
  cactus: '🌵',
  daisy: '🌼',
  lavender: '💜',
};

const GROWTH_STAGES: Record<string, string> = {
  seed: '🌱',
  sprout: '🌿',
  growing: '🪴',
  blooming: '🌸',
  mature: '🌳',
};

export const TodayChecklist: React.FC = () => {
  const [habits, setHabits] = useState<TodayHabit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHabits = async () => {
    try {
      const data = await gardenApi.getToday();
      setHabits(data.habits);
      setError(null);
    } catch (e) {
      setError('Failed to load habits');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const handleWater = async (habitId: number) => {
    try {
      await habitsApi.water(habitId);
      await loadHabits();
    } catch (e) {
      console.error('Failed to water habit:', e);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>Loading your garden...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <p style={styles.error}>{error}</p>
      </div>
    );
  }

  const wateredCount = habits.filter(h => h.is_watered).length;
  const totalCount = habits.length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Today's Garden</h2>
        <p style={styles.subtitle}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <p style={styles.progress}>
          {wateredCount} of {totalCount} plants watered
        </p>
      </div>

      <div style={styles.habitsList}>
        {habits.length === 0 ? (
          <p style={styles.empty}>No habits yet. Plant some seeds! 🌱</p>
        ) : (
          habits.map(habit => (
            <div
              key={habit.id}
              style={{
                ...styles.habitCard,
                backgroundColor: habit.is_watered ? 'rgba(144, 190, 109, 0.15)' : 'rgba(255, 255, 255, 0.7)',
              }}
            >
              <div style={styles.habitInfo}>
                <span style={styles.plantEmoji}>
                  {habit.is_watered ? GROWTH_STAGES[habit.growth_stage] || '🌸' : PLANT_EMOJIS[habit.plant_type] || '🌱'}
                </span>
                <div>
                  <h3 style={styles.habitName}>{habit.name}</h3>
                  {habit.streak > 0 && (
                    <p style={styles.streak}>🔥 {habit.streak} day streak</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleWater(habit.id)}
                style={{
                  ...styles.waterButton,
                  backgroundColor: habit.is_watered ? '#90BE6D' : '#F9C74F',
                }}
              >
                {habit.is_watered ? '✓ Watered' : '💧 Water'}
              </button>
            </div>
          ))
        )}
      </div>

      {habits.length > 0 && wateredCount === totalCount && (
        <div style={styles.celebration}>
          <p>🎉 All plants watered today! Your garden is thriving!</p>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '1.5rem',
    maxWidth: '480px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.75rem',
    color: '#4a3b2e',
    marginBottom: '0.25rem',
  },
  subtitle: {
    color: '#8b7355',
    marginBottom: '0.5rem',
  },
  progress: {
    color: '#6b8e23',
    fontWeight: 600,
  },
  habitsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  habitCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: '1rem',
    transition: 'all 0.2s ease',
  },
  habitInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  plantEmoji: {
    fontSize: '2rem',
  },
  habitName: {
    fontSize: '1.1rem',
    color: '#4a3b2e',
    margin: 0,
  },
  streak: {
    fontSize: '0.85rem',
    color: '#e07a5f',
    margin: 0,
  },
  waterButton: {
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    fontWeight: 600,
    color: '#4a3b2e',
    transition: 'transform 0.1s ease',
  },
  loading: {
    textAlign: 'center',
    color: '#8b7355',
  },
  error: {
    textAlign: 'center',
    color: '#e07a5f',
  },
  empty: {
    textAlign: 'center',
    color: '#8b7355',
    padding: '2rem',
  },
  celebration: {
    marginTop: '1.5rem',
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: 'rgba(144, 190, 109, 0.2)',
    borderRadius: '1rem',
    color: '#4a7c23',
  },
};
