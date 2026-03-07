import React, { useState } from 'react';
import { habitsApi, HabitCreate, PlantTypeEnum, PlantColorEnum } from '../services';

const PLANT_TYPES = ['SUNFLOWER', 'ROSE', 'TULIP', 'SUCCULENT', 'HERB', 'TREE', 'CACTUS', 'DAISY', 'LAVENDER'] as const;
const PLANT_COLORS = ['YELLOW', 'PINK', 'RED', 'WHITE', 'PURPLE', 'ORANGE', 'BLUE', 'GREEN'] as const;

interface AddHabitFormProps {
  onClose: () => void;
  onAdded: () => void;
  defaultIsBinary?: boolean;
}

export const AddHabitForm: React.FC<AddHabitFormProps> = ({ onClose, onAdded, defaultIsBinary = true }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [plantType, setPlantType] = useState<keyof typeof PlantTypeEnum>('SUNFLOWER');
  const [plantColor, setPlantColor] = useState<keyof typeof PlantColorEnum>('YELLOW');
  const [isBinary, setIsBinary] = useState(defaultIsBinary);
  const [quantityTarget, setQuantityTarget] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await habitsApi.create({
        name,
        description: description || undefined,
        plant_type: plantType.toLowerCase() as any,
        plant_color: plantColor.toLowerCase() as any,
        is_binary: isBinary,
        quantity_target: quantityTarget,
      });
      onAdded();
      onClose();
    } catch (e) {
      setError('Failed to create habit');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>🌱 Plant a New Seed</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Habit Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Morning stretch"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Why this habit matters to you"
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Plant Type</label>
              <select
                value={plantType}
                onChange={e => setPlantType(e.target.value as keyof typeof PlantTypeEnum)}
                style={styles.select}
              >
                {PLANT_TYPES.map(t => (
                  <option key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</option>
                ))}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Plant Color</label>
              <select
                value={plantColor}
                onChange={e => setPlantColor(e.target.value as keyof typeof PlantColorEnum)}
                style={styles.select}
              >
                {PLANT_COLORS.map(c => (
                  <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isBinary}
                onChange={e => setIsBinary(e.target.checked)}
              />
              Binary habit (just done/not done)
            </label>
          </div>

          {!isBinary && (
            <div style={styles.field}>
              <label style={styles.label}>Target Quantity</label>
              <input
                type="number"
                min="1"
                value={quantityTarget}
                onChange={e => setQuantityTarget(Number(e.target.value))}
                style={styles.input}
              />
            </div>
          )}

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.buttons}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? 'Planting...' : '🌱 Plant Seed'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(74, 59, 46, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '1.5rem',
    padding: '1.5rem',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  title: {
    margin: '0 0 1.5rem 0',
    color: '#4a3b2e',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  row: {
    display: 'flex',
    gap: '1rem',
  },
  label: {
    fontSize: '0.9rem',
    color: '#8b7355',
    fontWeight: 600,
  },
  input: {
    padding: '0.75rem',
    borderRadius: '0.75rem',
    border: '1px solid #d4c4b0',
    fontSize: '1rem',
    color: '#4a3b2e',
  },
  select: {
    padding: '0.75rem',
    borderRadius: '0.75rem',
    border: '1px solid #d4c4b0',
    fontSize: '1rem',
    color: '#4a3b2e',
    backgroundColor: '#fff',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#4a3b2e',
    cursor: 'pointer',
  },
  error: {
    color: '#e07a5f',
    margin: 0,
    fontSize: '0.9rem',
  },
  buttons: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  cancelBtn: {
    flex: 1,
    padding: '0.75rem',
    borderRadius: '0.75rem',
    border: '1px solid #d4c4b0',
    backgroundColor: '#fff',
    color: '#8b7355',
    cursor: 'pointer',
    fontWeight: 600,
  },
  submitBtn: {
    flex: 1,
    padding: '0.75rem',
    borderRadius: '0.75rem',
    border: 'none',
    backgroundColor: '#90BE6D',
    color: '#4a3b2e',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '1rem',
  },
};
