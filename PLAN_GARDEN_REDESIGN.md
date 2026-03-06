# ARROA Garden Today Page - Implementation Plan

## Overview
Transform the "Today" page from a web-like checklist to an old-school game-like garden interface.

---

## Phase 1: Asset Collection & Design System

### 1.1 Visual Style Definition
- **Theme**: Retro pixel-art game aesthetic (think Stardew Valley meets Tamagotchi)
- **Color Palette**:
  - Background: Earthy greens (#2d4a22, #3d5c32)
  - Wood tones: (#8b4513, #a0522d, #d2691e)
  - UI accents: (#f4d03f, #e74c3c)
  - Plant colors: Per existing plant_color field
- **Font**: Pixel-style font (will import from Google Fonts)

### 1.2 Asset Requirements
Since using external pixel art:
- **Plants**: 9 plant types × 5 growth stages = 45 unique plant visuals
  - Created as SVG pixel-art style components (self-contained, won't break)
- **Tools**: Watering can, Seed bag, Hoe (SVG icons)
- **Environment**: Wooden plaque, garden ground, sky background

### 1.3 Create Asset Components
- `src/components/garden/assets/PlantSprite.tsx` - Renders plant by type + stage
- `src/components/garden/assets/ToolIcon.tsx` - Tool icons
- `src/components/garden/assets/WoodenPlaque.tsx` - Date display

---

## Phase 2: Garden Layout & Core Components

### 2.1 New Component Structure
```
src/components/garden/
├── GardenToday.tsx        # Main container (replaces TodayChecklist)
├── GardenCanvas.tsx      # The garden area where plants live
├── ToolSidebar.tsx       # Left-side tool panel
├── DatePlaque.tsx        # Wooden plaque with date
├── PlantSpot.tsx         # Individual plant position in garden
└── assets/
    ├── PlantSprite.tsx   # Plant visual rendering
    ├── ToolIcon.tsx      # Tool SVGs
    └── WoodenPlaque.tsx  # Date plaque
```

### 2.2 Layout Specifications
```
┌─────────────────────────────────────────┐
│              TOOL SIDEBAR               │
│   [💧] [🌱] [🪴]    (vertical icons)    │
├─────────────────────────────────────────┤
│         ┌─────────────────────┐         │
│         │   WOODEN PLAQUE     │         │
│         │   "Wednesday        │         │
│         │    March 5, 2026"   │         │
│         └─────────────────────┘         │
│                                         │
│         ┌───┐ ┌───┐ ┌───┐               │
│         │🌻 │ │🌹 │ │🌷 │               │
│         └───┘ └───┘ └───┘               │
│         ┌───┐ ┌───┐ ┌───┐               │
│         │🌿 │ │🌳 │ │🌵 │               │
│         └───┘ └───┘ └───┘               │
│              GARDEN CANVAS              │
└─────────────────────────────────────────┘
```

---

## Phase 3: Plant Rendering System

### 3.1 Plant Data Enhancement
The backend already has:
- `plant_type` (sunflower, rose, etc.)
- `plant_color` (yellow, pink, etc.)
- `growth_stage` (seed, sprout, growing, blooming, mature)
- `is_watered` (today's status)
- `is_thirsty` (needs water)
- `streak` (consecutive days)

We'll add to frontend:
- `growth_progress` (0.0-1.0 progress to next stage)
- `position` (grid position in garden)

### 3.2 Plant Visual States
Each plant shows different visual based on:
1. **Growth Stage**: Seed → Sprout → Growing → Blooming → Mature
2. **Hydration**: Watered (happy) vs Thirsty (wilted/droopy)
3. **Plant Type**: Distinct shape for each type
4. **Color**: Tinted by plant_color

### 3.3 Grid Layout
- 3 columns × N rows (scrollable if many habits)
- Plants positioned deterministically by habit ID

---

## Phase 4: Tool Interactions

### 4.1 Tool Sidebar
Three tools displayed vertically:
1. **Watering Can** 💧 - Click to enter "watering mode"
2. **Seed Bag** 🌱 - Click to add new binary habit
3. **Hoe** 🪴 - Click to add new quantitative habit

### 4.2 Interaction Flow

**Watering Mode:**
1. User clicks watering can
2. Cursor changes to watering can
3. User clicks a plant in the garden
4. Plant gets watered (API call)
5. Visual feedback (sparkles, happy animation)
6. Exit watering mode

**Add Habit:**
1. User clicks seed bag or hoe
2. AddHabitForm opens (reuse existing)
3. After adding, plant appears in garden

### 4.3 Visual Feedback
- Hover: Tool highlight + tooltip
- Active: Selected tool has glow/border
- Action: Brief animation on plant

---

## Phase 5: Backend Enhancement (if needed)

### 5.1 API Enhancement
Current `/garden/today` returns `TodayHabit[]`. May need to add:
- `growth_progress: number` - For visual progress bars
- Consider: plant positions for garden layout

### 5.2 Implementation Decision
The frontend can calculate `growth_progress` from existing data:
```
progress = current_watering / waterings_needed_for_stage
```
No backend changes required initially!

---

## Phase 6: Testing & Polish

### 6.1 Features to Test
- [ ] All habits render in garden
- [ ] Plants show correct growth stage
- [ ] Watering works from garden
- [ ] Add habit works from tools
- [ ] Date plaque shows correct date
- [ ] Empty garden state (no habits)
- [ ] Many habits (scrollable)
- [ ] Mobile responsiveness

### 6.2 Polish Items
- [ ] Animations (water splash, plant growth)
- [ ] Sound effects (future milestone)
- [ ] Responsive layout
- [ ] Loading states

---

## Future Milestones (Post-MVP)

### Milestone 2: Drag-and-Drop
- Drag tools to plants to interact
- Drag plants to rearrange garden
- Requires: Drag-drop library, position storage

### Milestone 3: Richer Visuals
- Animated pixel art plants
- Seasonal themes
- Weather effects
- Day/night cycle

### Milestone 4: Gamification
- Achievements for plant milestones
- Garden decorations
- Experience points
- Level system

### Milestone 5: Audio
- Background music
- Sound effects for actions
- Ambient garden sounds

---

## Implementation Order

1. **Create asset components** (PlantSprite, ToolIcon, WoodenPlaque)
2. **Build GardenToday container**
3. **Add ToolSidebar with basic interactions**
4. **Implement PlantSpot with click-to-water**
5. **Wire up AddHabitForm to tools**
6. **Style with pixel-art aesthetic**
7. **Test and polish**

---

## Technical Notes

### Growth Stage Watering Requirements
```
SEED → SPROUT: 1 watering
SPROUT → GROWING: 3 waterings  
GROWING → BLOOMING: 7 waterings
BLOOMING → MATURE: 14 waterings
MATURE: max (30 waterings)
```

### Plant Types (9)
sunflower, rose, tulip, succulent, herb, tree, cactus, daisy, lavender

### Plant Colors (8)
yellow, pink, red, white, purple, orange, blue, green
