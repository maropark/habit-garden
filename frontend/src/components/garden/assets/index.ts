/**
 * Garden Assets - ARROA Pixel Art System
 * Stardew Valley-inspired sprite library for Habit Garden
 */

// Plant sprites (replaces old PlantSprite.tsx)
export { 
  PlantSprite, 
  PLANT_TYPES, 
  PLANT_COLORS, 
  GROWTH_STAGES 
} from './PlantSprites';
export type { PlantType, PlantColor, GrowthStage } from './PlantSprites';

// Tool icons (replaces old ToolIcon.tsx)
export {
  ToolIcon,
  TOOL_INFO,
  TOOL_TYPES
} from './Tools';
export type { ToolType } from './Tools';

// Date plaque component
export { DatePlaque } from './DatePlaque';

// Re-export types from both modules for convenience
import type { PlantType, PlantColor, GrowthStage } from './PlantSprites';
import type { ToolType } from './Tools';


