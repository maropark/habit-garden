import React from 'react';

// -----------------------------------------------------------------------------
// ARROA Pixel Art Sprite System - Stardew Valley Inspired
// Each plant type has unique visual identity at each growth stage
// -----------------------------------------------------------------------------

export type PlantType = 'sunflower' | 'rose' | 'tulip' | 'succulent' | 'herb' | 'tree' | 'cactus' | 'daisy' | 'lavender';
export type PlantColor = 'yellow' | 'pink' | 'red' | 'white' | 'purple' | 'orange' | 'blue' | 'green';
export type GrowthStage = 'seed' | 'sprout' | 'growing' | 'blooming' | 'mature';

interface PlantSpriteProps {
  plantType: PlantType;
  plantColor: PlantColor;
  growthStage: GrowthStage;
  isWatered: boolean;
  size?: number; // Display scale (default 64px)
}

// ARROA Color Palette (Stardew Valley inspired warm tones)
const COLORS: Record<PlantColor, { stem: string; leaf: string; petal: string; center: string }> = {
  yellow:   { stem: '#2E5D3B', leaf: '#8FBC8F', petal: '#FFD700', center: '#C19A00' },
  pink:     { stem: '#2E5D3B', leaf: '#98FB98', petal: '#FF69B4', center: '#FFB6C1' },
  red:      { stem: '#2E5D3B', leaf: '#CD5C5C', petal: '#DC143C', center: '#FF6347' },
  white:    { stem: '#2E5D3B', leaf: '#F5F5DC', petal: '#FFFACD', center: '#FFEBD5' },
  purple:   { stem: '#2E5D3B', leaf: '#DDA0DD', petal: '#9370DB', center: '#BA55D3' },
  orange:   { stem: '#2E5D3B', leaf: '#DEB887', petal: '#FF8C00', center: '#FFDAB9' },
  blue:     { stem: '#2E5D3B', leaf: '#B0E0E6', petal: '#4169E1', center: '#ADD8E6' },
  green:    { stem: '#2E5D3B', leaf: '#3CB371', petal: '#228B22', center: '#006400' },
};

// Base tile size for pixel art (Stardew Valley uses 32×32 tiles)
const TILE_SIZE = 32;
const SPRITE_DISPLAY_SIZE = 64; // Render at double the base size for crisp pixels

// Plant-specific shape definitions for each growth stage
const PLANT_SHAPES: Record<PlantType, Record<GrowthStage, (colors: Record<string, string>) => React.ReactNode>> = {
  sunflower: {
    seed: renderSunflowerSeed,
    sprout: renderSunflowerSprout,
    growing: renderSunflowerGrowing,
    blooming: renderSunflowerBlooming,
    mature: renderSunflowerMature,
  },
  rose: {
    seed: renderRoseSeed,
    sprout: renderRoseSprout,
    growing: renderRoseGrowing,
    blooming: renderRoseBlooming,
    mature: renderRoseMature,
  },
  tulip: {
    seed: renderTulipSeed,
    sprout: renderTulipSprout,
    growing: renderTulipGrowing,
    blooming: renderTulipBlooming,
    mature: renderTulipMature,
  },
  succulent: {
    seed: renderSucculentSeed,
    sprout: renderSucculentSprout,
    growing: renderSucculentGrowing,
    blooming: renderSucculentBlooming,
    mature: renderSucculentMature,
  },
  herb: {
    seed: renderHerbSeed,
    sprout: renderHerbSprout,
    growing: renderHerbGrowing,
    blooming: renderHerbBlooming,
    mature: renderHerbMature,
  },
  tree: {
    seed: renderTreeSeed,
    sprout: renderTreeSprout,
    growing: renderTreeGrowing,
    blooming: renderTreeBlooming,
    mature: renderTreeMature,
  },
  cactus: {
    seed: renderCactusSeed,
    sprout: renderCactusSprout,
    growing: renderCactusGrowing,
    blooming: renderCactusBlooming,
    mature: renderCactusMature,
  },
  daisy: {
    seed: renderDaisySeed,
    sprout: renderDaisySprout,
    growing: renderDaisyGrowing,
    blooming: renderDaisyBlooming,
    mature: renderDaisyMature,
  },
  lavender: {
    seed: renderLavenderSeed,
    sprout: renderLavenderSprout,
    growing: renderLavenderGrowing,
    blooming: renderLavenderBlooming,
    mature: renderLavenderMature,
  },
};

// ============================================================================
// SUNFLOWER RENDERERS
// ============================================================================

function renderSunflowerSeed(colors: Record<string, string>): React.ReactNode {
  return (
    <g transform="translate(0, 4)">
      {/* Brown soil mound */}
      <ellipse cx="16" cy="22" rx="8" ry={6} fill="#8B5A2B" />

      {/* Sunflower seed - teardrop shape */}
      <path d="M16 14 L14 18 L16 20 L18 18 Z" fill={colors.petal} opacity="0.8" />

      {/* Soil texture */}
      <path d="M12 22 L20 22 M14 20 L18 20" stroke="#654321" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}

function renderSunflowerSprout(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="14" y="16" width="4" height={20} fill={colors.stem} rx="1" stroke="#2E5D3B" strokeWidth="0.5" />

      {/* Two small oval leaves */}
      <ellipse cx="10" cy="20" rx="4" ry="2" fill={colors.leaf} transform="rotate(-20 10 20)" />
      <ellipse cx="22" cy="20" rx="4" ry="2" fill={colors.leaf} transform="rotate(20 22 20)" />
    </g>
  );
}

function renderSunflowerGrowing(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Tall stem */}
      <rect x="15" y="12" width="2" height={24} fill={colors.stem} rx="1" />

      {/* Large round bud */}
      <circle cx="16" cy="8" r={6} fill={colors.petal} opacity="0.9" />

      {/* Bud details */}
      <path d="M16 8 L16 2" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
      <path d="M16 8 L20 6" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
      <path d="M16 8 L12 6" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
    </g>
  );
}

function renderSunflowerBlooming(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="15" y="20" width="2" height={16} fill={colors.stem} rx="1" />

      {/* Large circular flower with many petals */}
      <circle cx="16" cy="10" r={10} fill={colors.petal} opacity="0.9" />

      {/* Petal details - many small lines radiating from center */}
      <g>
        {/* Outer petals */}
        <path d="M16 10 L16 0" stroke={colors.petal} strokeWidth="1" opacity="0.6" />
        <path d="M16 10 L22 4" stroke={colors.petal} strokeWidth="1" opacity="0.6" />
        <path d="M16 10 L10 4" stroke={colors.petal} strokeWidth="1" opacity="0.6" />
        <path d="M16 10 L16 20" stroke={colors.petal} strokeWidth="1" opacity="0.6" />
        <path d="M16 10 L20 14" stroke={colors.petal} strokeWidth="1" opacity="0.5" />
        <path d="M16 10 L12 14" stroke={colors.petal} strokeWidth="1" opacity="0.5" />
        <path d="M16 10 L14 18" stroke={colors.petal} strokeWidth="1" opacity="0.5" />
        <path d="M16 10 L18 14" stroke={colors.petal} strokeWidth="1" opacity="0.5" />
        
        {/* Inner petal details */}
        <path d="M16 10 L16 4" stroke={colors.petal} strokeWidth="1" opacity="0.4" />
        <path d="M16 10 L18 8" stroke={colors.petal} strokeWidth="1" opacity="0.4" />
        <path d="M16 10 L14 8" stroke={colors.petal} strokeWidth="1" opacity="0.4" />
        <path d="M16 10 L16 16" stroke={colors.petal} strokeWidth="1" opacity="0.4" />
        <path d="M16 10 L18 12" stroke={colors.petal} strokeWidth="1" opacity="0.3" />
        <path d="M16 10 L14 12" stroke={colors.petal} strokeWidth="1" opacity="0.3" />
      </g>

      {/* Brown center with seeds */}
      <circle cx="16" cy="10" r={4} fill={colors.center} />

      {/* Center details - small seed dots */}
      <circle cx="14" cy="8" r={0.5} fill={colors.petal} />
      <circle cx="18" cy="8" r={0.5} fill={colors.petal} />
      <circle cx="14" cy="12" r={0.5} fill={colors.petal} />
      <circle cx="18" cy="12" r={0.5} fill={colors.petal} />
      <circle cx="16" cy="8" r={0.5} fill={colors.petal} />
      <circle cx="16" cy="12" r={0.5} fill={colors.petal} />
    </g>
  );
}

function renderSunflowerMature(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Tall stem */}
      <rect x="15" y="24" width="2" height={20} fill={colors.stem} rx="1" />

      {/* Large open flower with seeds visible */}
      <circle cx="16" cy="12" r={12} fill={colors.petal} opacity="0.8" />

      {/* Flower details - texture and depth */}
      <path d="M16 12 L16 0" stroke={colors.petal} strokeWidth="1" opacity="0.5" />
      <path d="M16 12 L24 6" stroke={colors.petal} strokeWidth="1" opacity="0.5" />
      <path d="M16 12 L8 6" stroke={colors.petal} strokeWidth="1" opacity="0.5" />
      <path d="M16 12 L16 24" stroke={colors.petal} strokeWidth="1" opacity="0.5" />
      <path d="M16 12 L22 16" stroke={colors.petal} strokeWidth="1" opacity="0.4" />
      <path d="M16 12 L10 16" stroke={colors.petal} strokeWidth="1" opacity="0.4" />
      <path d="M16 12 L14 20" stroke={colors.petal} strokeWidth="1" opacity="0.4" />
      <path d="M16 12 L18 16" stroke={colors.petal} strokeWidth="1" opacity="0.4" />

      {/* Center seed area - dark with texture */}
      <circle cx="16" cy="12" r={6} fill={colors.center} />

      {/* Center details - seed texture */}
      <circle cx="14" cy="10" r={0.5} fill={colors.petal} opacity="0.7" />
      <circle cx="18" cy="10" r={0.5} fill={colors.petal} opacity="0.7" />
      <circle cx="14" cy="14" r={0.5} fill={colors.petal} opacity="0.7" />
      <circle cx="18" cy="14" r={0.5} fill={colors.petal} opacity="0.7" />
      <circle cx="12" cy="12" r={0.5} fill={colors.petal} opacity="0.7" />
      <circle cx="20" cy="12" r={0.5} fill={colors.petal} opacity="0.7" />
      <circle cx="16" cy="10" r={0.5} fill={colors.petal} opacity="0.7" />
      <circle cx="16" cy="14" r={0.5} fill={colors.petal} opacity="0.7" />
    </g>
  );
}

// ============================================================================
// ROSE RENDERERS
// ============================================================================

function renderRoseSeed(colors: Record<string, string>): React.ReactNode {
  return (
    <g transform="translate(0, 4)">
      {/* Brown soil mound */}
      <ellipse cx="16" cy="22" rx="8" ry={6} fill="#8B5A2B" />

      {/* Rose seed - small oval */}
      <ellipse cx="16" cy="18" rx="3" ry="2" fill={colors.petal} />

      {/* Soil texture */}
      <path d="M12 22 L20 22 M14 20 L18 20" stroke="#654321" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}

function renderRoseSprout(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="15" y="16" width="2" height={20} fill={colors.stem} rx="1" />

      {/* Two small leaves with serrated edges */}
      <path d="M15 16 L10 10 L15 8 Z" fill={colors.leaf} />
      <path d="M15 16 L20 10 L15 8 Z" fill={colors.leaf} />
    </g>
  );
}

function renderRoseGrowing(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Thorny stem */}
      <path d="M16 28 L16 12" stroke={colors.stem} strokeWidth="2" />

      {/* Thorns */}
      <path d="M16 24 L14 22" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M16 24 L18 22" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M16 20 L14 18" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M16 20 L18 18" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M16 16 L14 14" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M16 16 L18 14" stroke={colors.petal} strokeWidth="0.5" />

      {/* Leaf clusters */}
      <g transform="translate(10, 18)">
        <path d="M0 0 L-4 -4 L0 -8 Z" fill={colors.leaf} />
        <path d="M0 0 L4 -4 L0 -8 Z" fill={colors.leaf} />
      </g>
      <g transform="translate(22, 18)">
        <path d="M0 0 L-4 -4 L0 -8 Z" fill={colors.leaf} />
        <path d="M0 0 L4 -4 L0 -8 Z" fill={colors.leaf} />
      </g>
    </g>
  );
}

function renderRoseBlooming(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="15" y="20" width="2" height={16} fill={colors.stem} rx="1" />

      {/* Layered petals in spiral pattern */}
      <path d="M16 8 
               C12 4, 8 8, 8 12 
               C8 16, 12 20, 16 20 
               C20 20, 24 16, 24 12 
               C24 8, 20 4, 16 8 
               Z" fill={colors.petal} opacity="0.9" />

      {/* Inner petal layer */}
      <path d="M16 10 
               C14 8, 12 10, 12 12 
               C12 14, 14 16, 16 16 
               C18 16, 20 14, 20 12 
               C20 10, 18 8, 16 10 
               Z" fill={colors.petal} opacity="0.8" />

      {/* Center */}
      <circle cx="16" cy="12" r={2} fill={colors.center} />
    </g>
  );
}

function renderRoseMature(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Main stem */}
      <path d="M16 28 L16 12" stroke={colors.stem} strokeWidth="3" />

      {/* Thorns on main stem */}
      <path d="M16 24 L14 22" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M16 24 L18 22" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M16 20 L14 18" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M16 20 L18 18" stroke={colors.petal} strokeWidth="0.5" }
      <path d="M16 16 L14 14" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M16 16 L18 14" stroke={colors.petal} strokeWidth="0.5" />

      {/* Multiple roses */}
      <g transform="translate(8, 16)">
        <rect x="-1" y="0" width="2" height={12} fill={colors.stem} rx="1" />
        <path d="M0 0 C-2 -4, -6 0, -6 4 
                C-6 8, -2 12, 0 8 
                C2 12, 6 8, 6 4 
                C6 0, 2 -4, 0 0 Z" fill={colors.petal} opacity="0.8" />
        <circle cx="0" cy="4" r={1.5} fill={colors.center} />
      </g>

      <g transform="translate(24, 16)">
        <rect x="-1" y="0" width="2" height={12} fill={colors.stem} rx="1" />
        <path d="M0 0 C-2 -4, -6 0, -6 4 
                C-6 8, -2 12, 0 8 
                C2 12, 6 8, 6 4 
                C6 0, 2 -4, 0 0 Z" fill={colors.petal} opacity="0.8" />
        <circle cx="0" cy="4" r={1.5} fill={colors.center} />
      </g>
    </g>
  );
}

// ============================================================================
// TULIP RENDERERS
// ============================================================================

function renderTulipSeed(colors: Record<string, string>): React.ReactNode {
  return (
    <g transform="translate(0, 4)">
      {/* Brown soil mound */}
      <ellipse cx="16" cy="22" rx="8" ry={6} fill="#8B5A2B" />

      {/* Tulip seed - pointed teardrop */}
      <path d="M16 14 L14 18 L16 22 L18 18 Z" fill={colors.petal} />

      {/* Soil texture */}
      <path d="M12 22 L20 22 M14 20 L18 20" stroke="#654321" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}

function renderTulipSprout(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="15" y="16" width="2" height={20} fill={colors.stem} rx="1" />

      {/* Single leaf spear */}
      <path d="M15 16 L8 8 L15 4 Z" fill={colors.leaf} />
    </g>
  );
}

function renderTulipGrowing(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="15" y="12" width="2" height={24} fill={colors.stem} rx="1" />

      {/* Elongated leaf */}
      <path d="M15 16 L5 10 L15 4 Z" fill={colors.leaf} />
      <path d="M10 12 L8 10 L10 8 L12 10 Z" fill={colors.leaf} opacity="0.7" />
    </g>
  );
}

function renderTulipBlooming(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="15" y="20" width="2" height={16} fill={colors.stem} rx="1" />

      {/* Classic cup-shaped flower */}
      <path d="M16 4 
               Q12 8, 16 12 
               Q20 8, 16 4 
               Z" fill={colors.petal} />

      {/* Flower detail - subtle shading */}
      <path d="M16 4 
               Q14 6, 16 10 
               Q18 6, 16 4 
               Z" fill={colors.petal} opacity="0.8" />

      {/* Stem connection to flower */}
      <rect x="15" y="12" width="2" height={4} fill={colors.stem} />
    </g>
  );
}

function renderTulipMature(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem base */}
      <rect x="13" y="24" width="4" height={20} fill={colors.stem} rx="1" />

      {/* Multiple tulips at different heights */}
      <g transform="translate(6, 10)">
        <rect x="-1" y="0" width="2" height={20} fill={colors.stem} rx="1" />
        <path d="M0 0 
                Q-2 4, 0 8 
                Q2 4, 0 0 
                Z" fill={colors.petal} />
        <rect x="-1" y="8" width="2" height={4} fill={colors.stem} />
      </g>

      <g transform="translate(26, 4)">
        <rect x="-1" y="0" width="2" height={26} fill={colors.stem} rx="1" />
        <path d="M0 0 
                Q-2 6, 0 12 
                Q2 6, 0 0 
                Z" fill={colors.petal} />
        <rect x="-1" y="12" width="2" height={6} fill={colors.stem} />
      </g>

      <g transform="translate(16, -2)">
        <rect x="-1" y="0" width="2" height={14} fill={colors.stem} rx="1" />
        <path d="M0 0 
                Q-2 2, 0 4 
                Q2 2, 0 0 
                Z" fill={colors.petal} />
        <rect x="-1" y="4" width="2" height={4} fill={colors.stem} />
      </g>
    </g>
  );
}

// ============================================================================
// SUCCULENT RENDERERS
// ============================================================================

function renderSucculentSeed(colors: Record<string, string>): React.ReactNode {
  return (
    <g transform="translate(0, 4)">
      {/* Brown soil mound */}
      <ellipse cx="16" cy="22" rx="8" ry={6} fill="#8B5A2B" />

      {/* Succulent seed - small round */}
      <circle cx="16" cy="18" r={2.5} fill={colors.petal} />

      {/* Soil texture */}
      <path d="M12 22 L20 22 M14 20 L18 20" stroke="#654321" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}

function renderSucculentSprout(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem - very short */}
      <rect x="15" y="20" width="2" height={6} fill={colors.stem} rx="1" />

      {/* Tiny thick leaf */}
      <ellipse cx="16" cy="18" rx="4" ry="2" fill={colors.leaf} />
    </g>
  );
}

function renderSucculentGrowing(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Short stem */}
      <rect x="12" y="20" width="8" height={10} fill={colors.stem} rx="2" />

      {/* Rosette of plump leaves */}
      <ellipse cx="16" cy="16" rx="10" ry="6" fill={colors.leaf} opacity="0.9" />

      {/* Leaf details */}
      <path d="M6 16 L10 12 L16 8 L22 12 L26 16" fill="none" stroke={colors.leaf} strokeWidth="1" opacity="0.7" />
    </g>
  );
}

function renderSucculentBlooming(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Tall stalk */}
      <rect x="15" y="8" width="2" height={20} fill={colors.stem} rx="1" />

      {/* Rosette base */}
      <ellipse cx="16" cy="28" rx="12" ry="6" fill={colors.leaf} opacity="0.8" />

      {/* Small star flowers on stalk */}
      <polygon points="16,4 15,6 13,6 14,8 13,10 16,8 19,10 18,8 19,6 17,6"
               fill={colors.petal} />

      <polygon points="16,2 15,4 13,4 14,6 13,8 16,6 19,6 18,4 19,4 17,4"
               fill={colors.petal} opacity="0.8" />

      {/* Center of flowers */}
      <circle cx="16" cy="6" r={1} fill={colors.center} />
      <circle cx="16" cy="10" r={1} fill={colors.center} />
    </g>
  );
}

function renderSucculentMature(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Dense rosette of plump leaves */}
      <ellipse cx="16" cy="20" rx="14" ry="10" fill={colors.leaf} opacity="0.9" />

      {/* Outer leaves */}
      <ellipse cx="8" cy="16" rx="6" ry="4" fill={colors.leaf} opacity="0.7" transform="rotate(-30 8 16)" />
      <ellipse cx="24" cy="16" rx="6" ry="4" fill={colors.leaf} opacity="0.7" transform="rotate(30 24 16)" />
      <ellipse cx="16" cy="8" rx="10" ry="4" fill={colors.leaf} opacity="0.7" />
      <ellipse cx="16" cy="32" rx="10" ry="4" fill={colors.leaf} opacity="0.7" />

      {/* Inner leaves */}
      <ellipse cx="12" cy="16" rx="4" ry="3" fill={colors.leaf} />
      <ellipse cx="20" cy="16" rx="4" ry="3" fill={colors.leaf} />
      <ellipse cx="16" cy="12" rx="6" ry="2" fill={colors.leaf} />
      <ellipse cx="16" cy="28" rx="6" ry="2" fill={colors.leaf} />

      {/* Center */}
      <circle cx="16" cy="20" r={3} fill={colors.petal} opacity="0.6" />
    </g>
  );
}

// ============================================================================
// HERB RENDERERS
// ============================================================================

function renderHerbSeed(colors: Record<string, string>): React.ReactNode {
  return (
    <g transform="translate(0, 4)">
      {/* Brown soil mound */}
      <ellipse cx="16" cy="22" rx="8" ry={6} fill="#8B5A2B" />

      {/* Herb seed - small oval */}
      <ellipse cx="16" cy="18" rx="3" ry="2" fill={colors.petal} />

      {/* Soil texture */}
      <path d="M12 22 L20 22 M14 20 L18 20" stroke="#654321" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}

function renderHerbSprout(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="15" y="12" width="2" height={16} fill={colors.stem} rx="1" />

      {/* Two small leaves */}
      <path d="M15 14 L10 10 L15 6 Z" fill={colors.leaf} />
      <path d="M15 14 L20 10 L15 6 Z" fill={colors.leaf} />
    </g>
  );
}

function renderHerbGrowing(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Branching stem */}
      <path d="M16 28 L16 12" stroke={colors.stem} strokeWidth="3" />
      <path d="M16 20 L12 16" stroke={colors.stem} strokeWidth="2" />
      <path d="M16 20 L20 16" stroke={colors.stem} strokeWidth="2" />

      {/* Small leaves */}
      <circle cx="12" cy="16" r={3} fill={colors.leaf} />
      <circle cx="20" cy="16" r={3} fill={colors.leaf} />
      <circle cx="8" cy="12" r={2} fill={colors.leaf} />
      <circle cx="24" cy="12" r={2} fill={colors.leaf} />
      <circle cx="16" cy="8" r={2} fill={colors.leaf} />
    </g>
  );
}

function renderHerbBlooming(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Main stem */}
      <path d="M16 28 L16 12" stroke={colors.stem} strokeWidth="3" />

      {/* Branches */}
      <path d="M16 20 L12 16" stroke={colors.stem} strokeWidth="2" />
      <path d="M16 20 L20 16" stroke={colors.stem} strokeWidth="2" />
      <path d="M12 16 L8 12" stroke={colors.stem} strokeWidth="1" />
      <path d="M20 16 L24 12" stroke={colors.stem} strokeWidth="1" />

      {/* Small flower clusters */}
      <g transform="translate(8, 12)">
        <circle cx="0" cy="0" r={2} fill={colors.petal} />
        <circle cx="-2" cy="-2" r={1} fill={colors.petal} opacity="0.7" />
        <circle cx="2" cy="-2" r={1} fill={colors.petal} opacity="0.7" />
        <circle cx="0" cy="-4" r={1} fill={colors.petal} opacity="0.7" />
      </g>

      <g transform="translate(24, 12)">
        <circle cx="0" cy="0" r={2} fill={colors.petal} />
        <circle cx="-2" cy="-2" r={1} fill={colors.petal} opacity="0.7" />
        <circle cx="2" cy="-2" r={1} fill={colors.petal} opacity="0.7" />
        <circle cx="0" cy="-4" r={1} fill={colors.petal} opacity="0.7" />
      </g>

      <g transform="translate(16, 8)">
        <circle cx="0" cy="0" r={2} fill={colors.petal} />
        <circle cx="-2" cy="-2" r={1} fill={colors.petal} opacity="0.7" />
        <circle cx="2" cy="-2" r={1} fill={colors.petal} opacity="0.7" />
        <circle cx="0" cy="-4" r={1} fill={colors.petal} opacity="0.7" />
      </g>
    </g>
  );
}

function renderHerbMature(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Bushy plant ready for harvesting */}
      <g transform="translate(8, 20)">
        <path d="M0 0 L0 -12" stroke={colors.stem} strokeWidth="2" />
        <path d="M0 -6 L-4 -10" stroke={colors.stem} strokeWidth="1" />
        <path d="M0 -6 L4 -10" stroke={colors.stem} strokeWidth="1" />
        <circle cx="0" cy="-12" r={3} fill={colors.leaf} />
      </g>

      <g transform="translate(24, 20)">
        <path d="M0 0 L0 -12" stroke={colors.stem} strokeWidth="2" />
        <path d="M0 -6 L-4 -10" stroke={colors.stem} strokeWidth="1" />
        <path d="M0 -6 L4 -10" stroke={colors.stem} strokeWidth="1" />
        <circle cx="0" cy="-12" r={3} fill={colors.leaf} />
      </g>

      <g transform="translate(16, 8)">
        <path d="M0 0 L0 -16" stroke={colors.stem} strokeWidth="3" />
        <path d="M0 -8 L-4 -12" stroke={colors.stem} strokeWidth="1" />
        <path d="M0 -8 L4 -12" stroke={colors.stem} strokeWidth="1" />
        <path d="M0 -4 L-4 -8" stroke={colors.stem} strokeWidth="1" />
        <path d="M0 -4 L4 -8" stroke={colors.stem} strokeWidth="1" />
        <circle cx="0" cy="-16" r={4} fill={colors.leaf} />
      </g>

      {/* Harvest-ready indicators */}
      <path d="M4 28 L8 24" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
      <path d="M24 28 L20 24" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
    </g>
  );
}

// ============================================================================
// TREE RENDERERS
// ============================================================================

function renderTreeSeed(colors: Record<string, string>): React.ReactNode {
  return (
    <g transform="translate(0, 4)">
      {/* Brown soil mound */}
      <ellipse cx="16" cy="22" rx="8" ry={6} fill="#8B5A2B" />

      {/* Tree seed - acorn shape */}
      <path d="M16 14 L14 18 L16 22 L18 18 Z" fill={colors.petal} />
      <rect x="15" y="10" width="2" height="4" fill={colors.stem} />

      {/* Soil texture */}
      <path d="M12 22 L20 22 M14 20 L18 20" stroke="#654321" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}

function renderTreeSprout(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="15" y="12" width="2" height={16} fill={colors.stem} rx="1" />

      {/* Two leaves */}
      <ellipse cx="12" cy="14" rx="3" ry="2" fill={colors.leaf} />
      <ellipse cx="20" cy="14" rx="3" ry="2" fill={colors.leaf} />
    </g>
  );
}

function renderTreeGrowing(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Thin trunk */}
      <rect x="15" y="12" width="2" height={20} fill={colors.stem} rx="1" />

      {/* Leaf canopy */}
      <ellipse cx="16" cy="10" rx={12} ry={8} fill={colors.leaf} opacity="0.9" />

      {/* Canopy details */}
      <path d="M4 10 L12 4 L20 10 Z" fill={colors.leaf} opacity="0.6" />
      <path d="M10 4 L16 -2 L22 4 Z" fill={colors.leaf} opacity="0.5" />
    </g>
  );
}

function renderTreeBlooming(colors: Record<string, string>): React.ReactNode {
  // Many trees don't show flowers prominently, so similar to growing
  return renderTreeGrowing(colors);
}

function renderTreeMature(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Trunk */}
      <rect x="13" y="28" width="4" height={16} fill={colors.stem} rx="1" />

      {/* Main branches */}
      <path d="M13 28 L8 20" stroke={colors.stem} strokeWidth="3" />
      <path d="M19 28 L24 20" stroke={colors.stem} strokeWidth="3" />
      <path d="M15 24 L10 16" stroke={colors.stem} strokeWidth="2" />
      <path d="M17 24 L22 16" stroke={colors.stem} strokeWidth="2" />

      {/* Full leafy canopy */}
      <ellipse cx="16" cy="12" rx={18} ry={12} fill={colors.leaf} opacity="0.9" />

      {/* Canopy texture */}
      <path d="M-2 12 L6 4 L14 12 L6 20 Z" fill={colors.leaf} opacity="0.6" />
      <path d="M10 4 L16 -4 L22 4 L16 12 Z" fill={colors.leaf} opacity="0.5" />
    </g>
  );
}

// ============================================================================
// CACTUS RENDERERS
// ============================================================================

function renderCactusSeed(colors: Record<string, string>): React.ReactNode {
  return (
    <g transform="translate(0, 4)">
      {/* Brown soil mound */}
      <ellipse cx="16" cy="22" rx="8" ry={6} fill="#8B5A2B" />

      {/* Cactus seed - small oval */}
      <ellipse cx="16" cy="18" rx="3" ry="2" fill={colors.petal} />

      {/* Soil texture */}
      <path d="M12 22 L20 22 M14 20 L18 20" stroke="#654321" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}

function renderCactusSprout(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem - tiny paddle shape */}
      <rect x="14" y="16" width="4" height={8} fill={colors.stem} rx="1" />

      {/* Small spines */}
      <path d="M14 12 L12 10" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M18 12 L20 10" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M16 20 L16 18" stroke={colors.petal} strokeWidth="0.5" />
    </g>
  );
}

function renderCactusGrowing(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Main stem */}
      <rect x="14" y="12" width="4" height={24} fill={colors.stem} rx="1" />

      {/* Beginning arms */}
      <rect x="8" y="16" width={4} height={12} fill={colors.stem} rx="1" />
      <rect x="20" y="16" width={4} height={12} fill={colors.stem} rx="1" />

      {/* Spines */}
      <path d="M14 8 L12 6" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M18 8 L20 6" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M10 20 L8 18" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M22 20 L24 18" stroke={colors.petal} strokeWidth="0.5" />
    </g>
  );
}

function renderCactusBlooming(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Main stem */}
      <rect x="14" y="20" width="4" height={20} fill={colors.stem} rx="1" />

      {/* Arms */}
      <rect x="8" y="16" width={4} height={12} fill={colors.stem} rx="1" />
      <rect x="20" y="16" width={4} height={12} fill={colors.stem} rx="1" />

      {/* Flowers on stem tips */}
      <circle cx="16" cy="8" r={3} fill={colors.petal} />
      <circle cx="10" cy="24" r={2} fill={colors.petal} />
      <circle cx="22" cy="24" r={2} fill={colors.petal} />

      {/* Flower centers */}
      <circle cx="16" cy="8" r={1} fill={colors.center} />
      <circle cx="10" cy="24" r={0.5} fill={colors.center} />
      <circle cx="22" cy="24" r={0.5} fill={colors.center} />

      {/* Spines */}
      <path d="M14 8 L12 6" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M18 8 L20 6" stroke={colors.petal} strokeWidth="0.5" />
    </g>
  );
}

function renderCactusMature(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Multiple arms */}
      <rect x="12" y="28" width="8" height={16} fill={colors.stem} rx="2" />

      {/* Main tall stem */}
      <rect x="16" y="8" width="4" height={24} fill={colors.stem} rx="1" />

      {/* Left arm */}
      <rect x="4" y="16" width={4} height={20} fill={colors.stem} rx="1" />

      {/* Right arm */}
      <rect x="24" y="16" width={4} height={20} fill={colors.stem} rx="1" />

      {/* Additional smaller arms */}
      <rect x="8" y="24" width={4} height={8} fill={colors.stem} rx="1" />
      <rect x="20" y="24" width={4} height={8} fill={colors.stem} rx="1" />

      {/* Flowers */}
      <circle cx="16" cy="4" r={3} fill={colors.petal} />
      <circle cx="6" cy="20" r={2} fill={colors.petal} />
      <circle cx="26" cy="20" r={2} fill={colors.petal} />
      <circle cx="10" cy="28" r={1.5} fill={colors.petal} />
      <circle cx="22" cy="28" r={1.5} fill={colors.petal} />

      {/* Flower centers */}
      <circle cx="16" cy="4" r={1} fill={colors.center} />
      <circle cx="6" cy="20" r={0.5} fill={colors.center} />
      <circle cx="26" cy="20" r={0.5} fill={colors.center} />
      <circle cx="10" cy="28" r={0.5} fill={colors.center} />
      <circle cx="22" cy="28" r={0.5} fill={colors.center} />

      {/* Spines */}
      <path d="M16 8 L14 6" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M16 8 L18 6" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M4 20 L2 18" stroke={colors.petal} strokeWidth="0.5" />
      <path d="M28 20 L30 18" stroke={colors.petal} strokeWidth="0.5" />
    </g>
  );
}

// ============================================================================
// DAISY RENDERERS
// ============================================================================

function renderDaisySeed(colors: Record<string, string>): React.ReactNode {
  return (
    <g transform="translate(0, 4)">
      {/* Brown soil mound */}
      <ellipse cx="16" cy="22" rx="8" ry={6} fill="#8B5A2B" />

      {/* Daisy seed - small tear drop */}
      <path d="M16 14 L14 18 L16 22 L18 18 Z" fill={colors.petal} />

      {/* Soil texture */}
      <path d="M12 22 L20 22 M14 20 L18 20" stroke="#654321" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}

function renderDaisySprout(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="15" y="12" width="2" height={16} fill={colors.stem} rx="1" />

      {/* Two small leaves */}
      <ellipse cx="12" cy="14" rx="2" ry="1" fill={colors.leaf} />
      <ellipse cx="20" cy="14" rx="2" ry="1" fill={colors.leaf} />
    </g>
  );
}

function renderDaisyGrowing(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="15" y="12" width="2" height={20} fill={colors.stem} rx="1" />

      {/* Leaves */}
      <path d="M12 16 L8 12 L12 8 Z" fill={colors.leaf} />
      <path d="M20 16 L24 12 L20 8 Z" fill={colors.leaf} />
    </g>
  );
}

function renderDaisyBlooming(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="15" y="20" width="2" height={16} fill={colors.stem} rx="1" />

      {/* Classic daisy with white petals, yellow center */}
      <circle cx="16" cy="10" r={8} fill={colors.petal} opacity="0.9" />

      {/* Petal details */}
      <path d="M16 10 L16 2" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
      <path d="M16 10 L22 6" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
      <path d="M16 10 L10 6" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
      <path d="M16 10 L16 18" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
      <path d="M16 10 L20 14" stroke={colors.petal} strokeWidth="1" opacity="0.6" />
      <path d="M16 10 L12 14" stroke={colors.petal} strokeWidth="1" opacity="0.6" />
      <path d="M16 10 L14 16" stroke={colors.petal} strokeWidth="1" opacity="0.6" />
      <path d="M16 10 L18 14" stroke={colors.petal} strokeWidth="1" opacity="0.6" />

      {/* Yellow center (using center color regardless of plantColor for daisy authenticity) */}
      <circle cx="16" cy="10" r={4} fill="#FFD700" />
    </g>
  );
}

function renderDaisyMature(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem base */}
      <rect x="13" y="24" width="4" height={20} fill={colors.stem} rx="1" />

      {/* Multiple daisy flowers */}
      <g transform="translate(6, 12)">
        <rect x="-1" y="0" width="2" height={12} fill={colors.stem} rx="1" />
        <circle cx="0" cy="0" r={6} fill={colors.petal} opacity="0.9" />
        <path d="M0 0 L0 -6" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <path d="M0 0 L4 -2" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <path d="M0 0 L-4 -2" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <path d="M0 0 L2 -4" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <path d="M0 0 L-2 -4" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <circle cx="0" cy="0" r={3} fill="#FFD700" />
      </g>

      <g transform="translate(26, 8)">
        <rect x="-1" y="0" width="2" height={16} fill={colors.stem} rx="1" />
        <circle cx="0" cy="0" r={6} fill={colors.petal} opacity="0.9" />
        <path d="M0 0 L0 -6" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <path d="M0 0 L4 -2" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <path d="M0 0 L-4 -2" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <path d="M0 0 L2 -4" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <path d="M0 0 L-2 -4" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <circle cx="0" cy="0" r={3} fill="#FFD700" />
      </g>

      <g transform="translate(16, 0)">
        <rect x="-1" y="0" width="2" height={10} fill={colors.stem} rx="1" />
        <circle cx="0" cy="0" r={6} fill={colors.petal} opacity="0.9" />
        <path d="M0 0 L0 -6" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <path d="M0 0 L4 -2" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <path d="M0 0 L-4 -2" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <path d="M0 0 L2 -4" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <path d="M0 0 L-2 -4" stroke={colors.petal} strokeWidth="1" opacity="0.7" />
        <circle cx="0" cy="0" r={3} fill="#FFD700" />
      </g>
    </g>
  );
}

// ============================================================================
// LAVENDER RENDERERS
// ============================================================================

function renderLavenderSeed(colors: Record<string, string>): React.ReactNode {
  return (
    <g transform="translate(0, 4)">
      {/* Brown soil mound */}
      <ellipse cx="16" cy="22" rx="8" ry={6} fill="#8B5A2B" />

      {/* Lavender seed - small oval */}
      <ellipse cx="16" cy="18" rx="3" ry="2" fill={colors.petal} />

      {/* Soil texture */}
      <path d="M12 22 L20 22 M14 20 L18 20" stroke="#654321" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}

function renderLavenderSprout(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Stem */}
      <rect x="15" y="12" width="2" height={16} fill={colors.stem} rx="1" />

      {/* Two small leaves */}
      <rect x="12" y="14" width="4" height={2} fill={colors.leaf} />
      <rect x="20" y="14" width="4" height={2} fill={colors.leaf} />
    </g>
  );
}

function renderLavenderGrowing(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Thin stem */}
      <rect x="15" y="8" width="2" height={24} fill={colors.stem} rx="1" />

      {/* Narrow leaves */}
      <path d="M12 16 L8 20 L12 24 Z" fill={colors.leaf} />
      <path d="M20 16 L24 20 L20 24 Z" fill={colors.leaf} />
      <path d="M10 12 L6 16 L10 20 Z" fill={colors.leaf} opacity="0.8" />
      <path d="M22 12 L26 16 L22 20 Z" fill={colors.leaf} opacity="0.8" />
    </g>
  );
}

function renderLavenderBlooming(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Thin stem */}
      <rect x="15" y="16" width="2" height={20} fill={colors.stem} rx="1" />

      {/* Spike of small purple flowers */}
      <rect x="13" y="8" width="4" height={16} fill={colors.petal} rx="1" />

      {/* Flower details */}
      <rect x="14" y="10" width="2" height={2} fill={colors.petal} opacity="0.8" />
      <rect x="14" y="14" width="2" height={2} fill={colors.petal} opacity="0.8" />
      <rect x="14" y="18" width="2" height={2} fill={colors.petal} opacity="0.8" />

      {/* Narrow leaves on stem */}
      <path d="M12 24 L8 28 L12 32 Z" fill={colors.leaf} />
      <path d="M20 24 L24 28 L20 32 Z" fill={colors.leaf} />
    </g>
  );
}

function renderLavenderMature(colors: Record<string, string>): React.ReactNode {
  return (
    <g>
      {/* Bushy plant with multiple flower spikes */}
      <g transform="translate(8, 20)">
        <rect x="-1" y="0" width="2" height={12} fill={colors.stem} rx="1" />
        <rect x="0" y="0" width="4" height={8} fill={colors.petal} rx="1" />
        <rect x="0" y="10" width="4" height={2} fill={colors.petal} opacity="0.8" />
        <rect x="0" y="14" width="4" height={2} fill={colors.petal} opacity="0.8" />
      </g>

      <g transform="translate(24, 20)">
        <rect x="-1" y="0" width="2" height={12} fill={colors.stem} rx="1" />
        <rect x="0" y="0" width="4" height={8} fill={colors.petal} rx="1" />
        <rect x="0" y="10" width="4" height={2} fill={colors.petal} opacity="0.8" />
        <rect x="0" y="14" width="4" height={2} fill={colors.petal} opacity="0.8" />
      </g>

      <g transform="translate(16, 4)">
        <rect x="-1" y="0" width="2" height={20} fill={colors.stem} rx="1" />
        <rect x="0" y="0" width="4" height={16} fill={colors.petal} rx="1" />
        <rect x="0" y="8" width="4" height={2} fill={colors.petal} opacity="0.8" />
        <rect x="0" y="12" width="4" height={2} fill={colors.petal} opacity="0.8" />
        <rect x="0" y="16" width="4" height={2} fill={colors.petal} opacity="0.8" />
      </g>
    </g>
  );
}

// -----------------------------------------------------------------------------
// Main PlantSprite Component
// -----------------------------------------------------------------------------

export function PlantSprite({
  plantType,
  plantColor,
  growthStage,
  isWatered,
  size = SPRITE_DISPLAY_SIZE,
}: PlantSpriteProps) {
  const colors = COLORS[plantColor] || COLORS.yellow;

  // Calculate display dimensions based on stage and desired size
  let displayWidth: number;
  let displayHeight: number;
  let yOffset: number;

  switch(growthStage) {
    case 'seed':
      displayWidth = TILE_SIZE * 2;
      displayHeight = TILE_SIZE * 2;
      yOffset = -TILE_SIZE / 4;
      break;
    case 'sprout':
      displayWidth = TILE_SIZE * 2;
      displayHeight = TILE_SIZE * 2.5;
      yOffset = 0;
      break;
    case 'growing':
      displayWidth = TILE_SIZE * 2.2;
      displayHeight = TILE_SIZE * 2.8;
      yOffset = -TILE_SIZE / 3;
      break;
    case 'blooming':
      displayWidth = TILE_SIZE * 2.5;
      displayHeight = TILE_SIZE * 3;
      yOffset = -TILE_SIZE / 2;
      break;
    case 'mature':
      displayWidth = TILE_SIZE * 2.7;
      displayHeight = TILE_SIZE * 3.2;
      yOffset = -TILE_SIZE * 0.6;
      break;
  }

  const svgSize = Math.max(size, displayWidth + 16);

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      style={{ overflow: 'visible' }}
    >
      {/* Background circle for soft focus effect */}
      {!isWatered && (
        <circle cx="50%" cy="50%" r={size*0.4} fill="#F5E6D3" opacity="0.15" />
      )}

      {/* Sprite */}
      <g transform={`translate(${(svgSize - displayWidth) / 2}, ${svgSize - displayHeight - yOffset})`}>
        {renderSprite(colors, growthStage)}
      </g>

      {!isWatered && renderThirstyOverlay(svgSize)}
    </svg>
  );

  function renderSprite(colors: Record<string, string>, stage: GrowthStage): React.ReactNode {
    const plantRenderers = PLANT_SHAPES[plantType];
    if (plantRenderers && plantRenderers[stage]) {
      return plantRenderers[stage](colors);
    }
    return null;
  }

  function renderThirstyOverlay(size: number): React.ReactNode {
    return (
      <g>
        {/* Simple wilted leaf indicator */}
        <path
          d="M8 12 L4 8 L12 4 L16 8"
          stroke="#CD5C5C"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </g>
    );
  }
}
