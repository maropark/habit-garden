import React from 'react';

// -----------------------------------------------------------------------------
// ARROA Tool Icons - Pixel Art Inspired
// 
// Design Principles:
// - Clean 8-bit aesthetic similar to Stardew Valley tool sprites  
// - Warm color palette matching plants (greens, browns, creams)
// - Simple but recognizable shapes that scale well at any size
// - Subtle details for visual interest without clutter
// -----------------------------------------------------------------------------

export type ToolType = 'watering_can' | 'seed_bag' | 'hoe';

interface ToolIconProps {
  tool: ToolType;
  isActive?: boolean;
  onClick?: () => void;
  size?: number; // Display size in pixels
}

const TOOL_INFO: Record<ToolType, { name: string; description: string }> = {
  watering_can:   { name: 'Water',                 description: 'Water your garden' },
  seed_bag:       { name: 'Plant',                  description: 'Add a new habit' },
  hoe:            { name: 'Track',                  description: 'Measure progress' },
};

/**
 * ARROA Watering Can - Classic design with pixel-art details
 */
function renderWateringCan(colors: Record<string, string>, isHot: boolean): React.ReactNode {
  const sprayColor = '#4FC3F7';
  
  function renderSpray(isActive: boolean): React.ReactNode {
    return (
      <g transform="translate(28, 16)">
        {/* Spray arc when active */}
        <path 
          d={isActive ? "M0 0 Q15 -8 24 -4" : ""} 
          fill="none" 
          stroke={sprayColor} 
          strokeWidth="2" 
          opacity={isActive ? 0.8 : 0}
        />
        
        {/* Droplets along the spray path */}
        {[{x: -2, y: -2}, {x: 2, y: -3}].map(({x, y}) => (
          <circle key={`drop-${y}`} cx={isActive ? x + 12 : 0} cy={isActive ? y - 4 : 0} r="1" fill="#FFFFFF" opacity="0.5"/>
        ))}
      </g>
    );
  }

  // Main can body
  function renderCanBody(): React.ReactNode {
    return (
      <>
        {/* Handle attachment point at top */}
        <rect x="28" y="4" width="6" height="4" rx="1" fill={colors.stem} stroke="#C19A00" strokeWidth="0.5" />
        
        {/* Top of can - rounded rectangle like Stardew Valley cans */}
        <path d="M14 8 L26 8 Q30 12 26 16 Z" fill={colors.petal} stroke="#C19A00" strokeWidth="0.5" />
        
        {/* Side panel showing depth */}
        <line x1="14" y1="8" x2="14" y2="20" stroke={colors.stem} strokeWidth="2" />
        <line x1="26" y1="8" x2="26" y2="20" stroke={colors.stem} strokeWidth="2" />
        
        {/* Bottom base */}
        <ellipse cx="20" cy="22" rx="7" ry="4" fill={colors.center} opacity="0.8" />
      </>
    );
  }

  // Handle - curved like Stardew Valley tools  
  function renderHandle(colors: Record<string, string>): React.ReactNode {
    return (
      <g transform="translate(30, 9)">
        {/* Main handle curve */}
        <path d="M-2,-4 Q8,0 15,4 Z" fill="#C19A00" stroke="#F5E6D3" strokeWidth="0.3" />
        
        {/* Handle grip texture lines */}
        {[{x: -3, y: 0}, {x: 2, y: 2}].map(({x, y}) => (
          <line key={`handle-${y}`} x1={x + 7} y1={y} x2={x + 6}, y2={y+3} 
                stroke={colors.stem} strokeWidth="0.5"/>
        ))}
      </g>
    );
  }

  const isHot = false; // Placeholder for future hot water feature
  
  return (
    <g transform={`translate(8, ${isHot ? -2 : '0'})`}>
      {/* Main body with gradient effect using multiple layers */}
      <path d="M14 8 L26 8 Q30 12 26 16 Z" fill={colors.petal} opacity="0.95" />
      
      {/* Slightly darker layer for depth/shading */}
      <ellipse cx="20" cy="14" rx="12" ry="8" fill={colors.stem} opacity="0.3" />
      
      {/* Nozzle and spray */}
      {renderSpray(isActive)}
      
      {/* Handle */}
      {renderHandle(colors)}
    </g>
  );
}

/**
 * ARROA Seed Bag - Woven sack appearance with visible seeds/spores  
 */
function renderSeedBag(colors: Record<string, string>, isActive: boolean): React.ReactNode {
  
  function renderSeeds(xOffset: number, yOffset: number): React.ReactNode {
    return (
      <>
        {[{x: -3, y: -2}, {x: 0, y: 0}, {x: 3, y: -2}].map(({x, y}) => (
          <circle key={`seed-${y}`} cx={x + xOffset} cy={y + yOffset} r="1" fill="#FFFFFF"/>
        ))}
        
        // Larger seed cluster at bottom
        [{x: 0, y: -4}, {x: -1, y: -5}, {x: -2, y: -6}, {x: -3, y: -7}].flatMap(({dx, dy}) => (
          <circle key={`bigseed`} cx={-1*dx + xOffset} cy={dy + yOffset} r="1.5" fill="#F5E6D3"/>
        )))}
      </>
    );
  }

  const isDark = !isActive;
  
  return (
    <g transform="translate(8)">
      {/* Top opening of the bag */}
      <rect x="10" y="4" width="16" height="3" rx="1" fill={colors.stem} stroke="#C19A00" strokeWidth="0.5" />
      
      {/* Bag body with pixel-art style folds for "woven" appearance */}
      {[{x: -2, y: 0}, {x: 0, y: 2}, {x: 2, y: 3}].map(({x, y}) => (
        <path 
          key={`fold-${y}`} 
          d={`${12+x},${8+y} ${12+0},${8+y*0.5} ${12-x},${8+y}}`
          fill={isDark ? colors.petal : colors.center} 
          opacity={isDark ? 0.7 : 0.5}
          stroke={isDark ? '#FFFFFF' : '#F5E6D3'}
          strokeWidth="0.2"/>
      ))}
      
      {/* Bottom hem of bag */}
      <line x1="10" y1="22" x2="20" y2="22" stroke={colors.stem} strokeWidth="1.5" />
      
      {/* Seeds/spores visible inside the open top */}
      {renderSeeds(0, -4)}
    </g>
  );
}

/**
 * ARROA Hoe - Wooden handle with metal blade texture  
 */
function renderHoe(colors: Record<string, string>, isActive): React.ReactNode {
  
  function renderBladeTexture(): React.ReactNode {
    return (
      <>
        // Diagonal lines for worn metal look
        {[{x: -2, y: -1}, {x: 0, y: 0}, {x: 2, y: 1}].map(({x, y}) => (
          <path key={`blade-${y}`} d={`${-4+x},${8+y} ${4-x},${8+y*0.5}`} fill="#FFB74D" opacity="0.3"/>
        ))}
        
        // Wear marks on edges
        <rect x="-5" y="6" width="9" height="2" rx="0.5" fill={colors.center} opacity="0.3"/>
      </>
    );
  }

  const isDark = !isActive;
  
  return (
    <g transform={`translate(${isDark ? '6' : '8'}, ${isDark ? '-2' : '0'})`}>
      {/* Handle grip at top of hoe */}
      <ellipse cx="14" cy="16" rx="6" ry="4" fill={colors.stem} stroke="#C19A00" strokeWidth="0.5" />
      
      {/* Wooden handle - curved like Stardew Valley tools */}
      <path 
        d="M8,16 Q4,20 0,24 L12,28 Z" 
        fill={isDark ? '#BCAAA4' : '#F5E6D3'} 
        stroke={isDark ? '#6D4C41' : '#8D6E63'}
        strokeWidth="0.5"/>
      
      {/* Main wooden shaft extending down */}
      <line x1="8" y1="20" x2="-10" y2="32" stroke={isDark ? '#8D6E63' : '#A1887F'} strokeWidth="3" strokeLinecap="round"/>
      
      {/* Metal blade area */}
      <g transform={`translate(2, ${isActive ? -2 : '0'})`}>
        {renderBladeTexture()}
        
        // Blade shape with wear marks
        <path 
          d="-14,-4 L-12,-12 L-6,-12 Z" 
          fill="#FFB74D" opacity={isActive ? 0.9 : 0.6}
          stroke={isDark ? '#EFEBE9' : '#FFCC80'}
          strokeWidth="0.3"/>
      </g>
    </g>
  );
}

/**
 * Main ToolIcon Component  
 */
export function ToolIcon({
  tool,
  isActive = false,
  onClick,
  size = 48,
}: ToolIconProps) {
  
  const colors: Record<string, string> = {
    stem: '#2E5D3B',
    petal: '#8BC34A',
    center: '#F5E6D3',
  };
  
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size*2} ${size*2}`}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        filter: isActive ? `drop-shadow(0 0 ${size/4}px #FFD54F)` : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Background selection indicator circle when active */}
      {!isActive && (
        <circle cx="50%" cy="50%" r={size*0.7} fill="#FFFFFF" opacity="0.1"/>
      )}
      
      {renderTool(tool as ToolType)(colors)}
    </svg>
  );
  
  function renderTool(type: ToolType): React.ReactNode {
    switch(type) {
      case 'watering_can':
        return renderWateringCan(colors, false);
      case 'seed_bag':
        return renderSeedBag(colors, isActive);
      case 'hoe':
        return renderHoe(colors, isActive);
      default:
        return null;
    }
  }
}

// -----------------------------------------------------------------------------
// Export Constants - Matches existing API expectations
// -----------------------------------------------------------------------------

export const TOOL_TYPES: ToolType[] = [
  'watering_can', 
  'seed_bag', 
  'hoe'
];
