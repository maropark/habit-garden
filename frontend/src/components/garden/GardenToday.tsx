import React, { useEffect, useState, useCallback } from 'react';
import { gardenApi, TodayHabit, habitsApi } from '../../services';
import { AddHabitForm } from '../AddHabitForm';
import { PlantSprite } from './assets/PlantSprite';
import { ToolIcon, getToolInfo } from './assets/ToolIcon';
import { DatePlaque } from './assets/DatePlaque';
import type { ToolType, PlantType, PlantColor, GrowthStage } from './assets';

const WATERING_PER_STAGE: Record<GrowthStage, number> = {
  seed: 1,
  sprout: 3,
  growing: 7,
  blooming: 14,
  mature: 30,
};

interface GardenTodayProps {
  initialDate?: Date;
}

export const GardenToday: React.FC<GardenTodayProps> = ({ initialDate = new Date() }) => {
  const [habits, setHabits] = useState<TodayHabit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ToolType | null>(null);
  const [isWateringMode, setIsWateringMode] = useState(false);
  const [newHabitType, setNewHabitType] = useState<'binary' | 'quantitative'>('binary');

  const loadHabits = useCallback(async () => {
    try {
      const data = await gardenApi.getToday();
      setHabits(data.habits);
      setError(null);
    } catch (e) {
      setError('Failed to load garden');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  const handleToolClick = (tool: ToolType) => {
    if (selectedTool === tool) {
      setSelectedTool(null);
      setIsWateringMode(false);
      return;
    }

    setSelectedTool(tool);

    if (tool === 'watering_can') {
      setIsWateringMode(true);
      setShowAddForm(false);
    } else if (tool === 'seed_bag') {
      setIsWateringMode(false);
      setNewHabitType('binary');
      setShowAddForm(true);
    } else if (tool === 'hoe') {
      setIsWateringMode(false);
      setNewHabitType('quantitative');
      setShowAddForm(true);
    }
  };

  const handlePlantClick = async (habitId: number) => {
    if (!isWateringMode) return;

    const habit = habits.find(h => h.id === habitId);
    if (!habit || habit.is_watered) return;

    try {
      await habitsApi.water(habitId);
      await loadHabits();
    } catch (e) {
      console.error('Failed to water habit:', e);
    }

    setSelectedTool(null);
    setIsWateringMode(false);
  };

  const getGrowthProgress = (habit: TodayHabit): number => {
    const stage = habit.growth_stage as GrowthStage;
    const wateringsNeeded = WATERING_PER_STAGE[stage] || 30;
    const progress = habit.streak / wateringsNeeded;
    return Math.min(progress, 1);
  };

  const getPlantSize = (stage: GrowthStage): number => {
    switch (stage) {
      case 'seed': return 48;
      case 'sprout': return 56;
      case 'growing': return 64;
      case 'blooming': return 72;
      case 'mature': return 80;
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <p style={styles.loading}>Loading your garden...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <p style={styles.error}>{error}</p>
          <button onClick={loadHabits} style={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const wateredCount = habits.filter(h => h.is_watered).length;
  const thirstyCount = habits.filter(h => h.is_thirsty && !h.is_watered).length;

  return (
    <div style={styles.container}>
      <div style={styles.layout}>
        <div style={styles.toolSidebar}>
          <div style={styles.toolTitle}>TOOLS</div>
          <div style={styles.tools}>
            <div style={styles.toolWrapper}>
              <ToolIcon
                tool="watering_can"
                isActive={selectedTool === 'watering_can'}
                onClick={() => handleToolClick('watering_can')}
                size={52}
              />
              <span style={styles.toolLabel}>Water</span>
            </div>
            <div style={styles.toolWrapper}>
              <ToolIcon
                tool="seed_bag"
                isActive={selectedTool === 'seed_bag'}
                onClick={() => handleToolClick('seed_bag')}
                size={52}
              />
              <span style={styles.toolLabel}>New Habit</span>
            </div>
            <div style={styles.toolWrapper}>
              <ToolIcon
                tool="hoe"
                isActive={selectedTool === 'hoe'}
                onClick={() => handleToolClick('hoe')}
                size={52}
              />
              <span style={styles.toolLabel}>Track</span>
            </div>
          </div>
        </div>

        <div style={styles.mainArea}>
          <div style={styles.dateSection}>
            <DatePlaque date={initialDate} />
          </div>

          <div
            style={{
              ...styles.gardenCanvas,
              cursor: isWateringMode ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'><text y=\'24\' font-size=\'24\'>💧</text></svg>") 16 16, crosshair' : 'default',
            }}
          >
            {habits.length === 0 ? (
              <div style={styles.emptyGarden}>
                <div style={styles.emptyContent}>
                  <span style={styles.emptyIcon}>🌱</span>
                  <p style={styles.emptyText}>Your garden is empty!</p>
                  <p style={styles.emptySubtext}>Select a tool to plant your first seed</p>
                </div>
              </div>
            ) : (
              <div style={styles.plantsGrid}>
                {habits.map((habit) => {
                  const stage = habit.growth_stage as GrowthStage;
                  return (
                    <div
                      key={habit.id}
                      style={{
                        ...styles.plantSpot,
                        ...(isWateringMode && !habit.is_watered ? styles.plantSpotWaterable : {}),
                      }}
                      onClick={() => handlePlantClick(habit.id)}
                    >
                      <div style={styles.plantContainer}>
                        <PlantSprite
                          plantType={habit.plant_type as PlantType}
                          plantColor={habit.plant_color as PlantColor}
                          growthStage={stage}
                          isWatered={habit.is_watered}
                          size={getPlantSize(stage)}
                        />
                      </div>
                      <div style={styles.plantInfo}>
                        <span style={styles.plantName}>{habit.name}</span>
                        <div style={styles.plantStats}>
                          <span style={styles.streakBadge}>
                            🔥 {habit.streak}
                          </span>
                          <span style={styles.stageBadge}>
                            {stage.charAt(0).toUpperCase() + stage.slice(1)}
                          </span>
                        </div>
                        <div style={styles.progressBar}>
                          <div
                            style={{
                              ...styles.progressFill,
                              width: `${getGrowthProgress(habit) * 100}%`,
                              backgroundColor: habit.is_watered ? '#90BE6D' : '#F9C74F',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div style={styles.statusBar}>
            <span style={styles.statusText}>
              {wateredCount} watered
              {thirstyCount > 0 && (
                <span style={styles.thirstyText}> • {thirstyCount} thirsty</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {showAddForm && (
        <AddHabitForm
          onClose={() => {
            setShowAddForm(false);
            setSelectedTool(null);
          }}
          onAdded={() => {
            loadHabits();
            setShowAddForm(false);
            setSelectedTool(null);
          }}
          defaultIsBinary={newHabitType === 'binary'}
        />
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    backgroundColor: '#1a2f1a',
    backgroundImage: `
      linear-gradient(180deg, #0d1f0d 0%, #1a2f1a 30%, #2d4a22 100%)
    `,
    overflow: 'hidden',
  },
  layout: {
    display: 'flex',
    height: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  toolSidebar: {
    width: '100px',
    backgroundColor: 'rgba(30, 50, 30, 0.9)',
    borderRight: '3px solid #3d5c32',
    padding: '20px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
  },
  toolTitle: {
    color: '#8BC34A',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    marginBottom: '20px',
    fontFamily: "'Courier New', monospace",
  },
  tools: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  toolWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  toolLabel: {
    color: '#AED581',
    fontSize: '10px',
    fontFamily: "'Courier New', monospace",
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  mainArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  dateSection: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%)',
  },
  gardenCanvas: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundImage: `
      radial-gradient(ellipse at bottom, #3d5c32 0%, #2d4a22 50%, #1a2f1a 100%)
    `,
    position: 'relative',
  },
  plantsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '24px',
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  plantSpot: {
    backgroundColor: 'rgba(45, 74, 34, 0.8)',
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    border: '2px solid #4a7c3f',
    transition: 'all 0.2s ease',
  },
  plantSpotWaterable: {
    cursor: 'pointer',
    borderColor: '#81C784',
    boxShadow: '0 0 15px rgba(129, 199, 132, 0.3)',
  },
  plantContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80px',
  },
  plantInfo: {
    width: '100%',
    textAlign: 'center',
  },
  plantName: {
    color: '#E8F5E9',
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: "'Courier New', monospace",
    display: 'block',
    marginBottom: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  plantStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  streakBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    color: '#FF8A65',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontFamily: "'Courier New', monospace",
  },
  stageBadge: {
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
    color: '#64B5F6',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontFamily: "'Courier New', monospace",
  },
  progressBar: {
    height: '6px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
  statusBar: {
    padding: '12px 20px',
    backgroundColor: 'rgba(30, 50, 30, 0.9)',
    borderTop: '2px solid #3d5c32',
    textAlign: 'center',
  },
  statusText: {
    color: '#C5E1A5',
    fontSize: '14px',
    fontFamily: "'Courier New', monospace",
  },
  thirstyText: {
    color: '#FFB74D',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loading: {
    color: '#AED581',
    fontSize: '18px',
    fontFamily: "'Courier New', monospace",
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    gap: '20px',
  },
  error: {
    color: '#EF5350',
    fontSize: '16px',
    fontFamily: "'Courier New', monospace",
  },
  retryButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Courier New', monospace",
  },
  emptyGarden: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    minHeight: '300px',
  },
  emptyContent: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: 'rgba(45, 74, 34, 0.6)',
    borderRadius: '20px',
    border: '2px dashed #4a7c3f',
  },
  emptyIcon: {
    fontSize: '64px',
    display: 'block',
    marginBottom: '20px',
  },
  emptyText: {
    color: '#E8F5E9',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: "'Courier New', monospace",
    marginBottom: '10px',
  },
  emptySubtext: {
    color: '#AED581',
    fontSize: '14px',
    fontFamily: "'Courier New', monospace",
  },
};
