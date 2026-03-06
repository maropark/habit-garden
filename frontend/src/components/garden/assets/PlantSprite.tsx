import React from 'react';

export type PlantType = 'sunflower' | 'rose' | 'tulip' | 'succulent' | 'herb' | 'tree' | 'cactus' | 'daisy' | 'lavender';
export type PlantColor = 'yellow' | 'pink' | 'red' | 'white' | 'purple' | 'orange' | 'blue' | 'green';
export type GrowthStage = 'seed' | 'sprout' | 'growing' | 'blooming' | 'mature';

interface PlantSpriteProps {
  plantType: PlantType;
  plantColor: PlantColor;
  growthStage: GrowthStage;
  isWatered: boolean;
  size?: number;
}

const COLOR_MAP: Record<PlantColor, { stem: string; petal: string; center: string }> = {
  yellow: { stem: '#228B22', petal: '#FFD700', center: '#8B4513' },
  pink: { stem: '#228B22', petal: '#FF69B4', center: '#FFD700' },
  red: { stem: '#228B22', petal: '#DC143C', center: '#FFD700' },
  white: { stem: '#228B22', petal: '#FFFAFA', center: '#FFD700' },
  purple: { stem: '#228B22', petal: '#9370DB', center: '#FFD700' },
  orange: { stem: '#228B22', petal: '#FF8C00', center: '#8B4513' },
  blue: { stem: '#228B22', petal: '#4169E1', center: '#FFD700' },
  green: { stem: '#228B22', petal: '#32CD32', center: '#8B4513' },
};

const getStageDimensions = (stage: GrowthStage): { width: number; height: number; y: number } => {
  switch (stage) {
    case 'seed':
      return { width: 24, height: 24, y: 8 };
    case 'sprout':
      return { width: 32, height: 40, y: 0 };
    case 'growing':
      return { width: 40, height: 56, y: -8 };
    case 'blooming':
      return { width: 48, height: 72, y: -16 };
    case 'mature':
      return { width: 56, height: 88, y: -24 };
  }
};

const SeedSprite: React.FC<{ colors: Record<string, string> }> = ({ colors }) => (
  <g>
    <ellipse cx="12" cy="18" rx="6" ry="8" fill={colors.stem} />
    <ellipse cx="12" cy="10" rx="4" ry="5" fill="#8B4513" />
  </g>
);

const SproutSprite: React.FC<{ colors: Record<string, string> }> = ({ colors }) => (
  <g>
    <rect x="14" y="24" width="4" height="12" fill={colors.stem} />
    <ellipse cx="16" cy="24" rx="8" ry="6" fill={colors.stem} />
    <ellipse cx="12" cy="20" rx="4" ry="3" fill="#90EE90" />
    <ellipse cx="20" cy="20" rx="4" ry="3" fill="#90EE90" />
  </g>
);

const GrowingSprite: React.FC<{ type: PlantType; colors: Record<string, string> }> = ({ type, colors }) => {
  if (type === 'cactus') {
    return (
      <g>
        <rect x="12" y="16" width="16" height="32" rx="8" fill={colors.stem} />
        <rect x="6" y="24" width="8" height="4" rx="2" fill={colors.stem} />
        <rect x="26" y="20" width="8" height="4" rx="2" fill={colors.stem} />
        <rect x="6" y="32" width="8" height="4" rx="2" fill={colors.stem} />
        <rect x="26" y="28" width="8" height="4" rx="2" fill={colors.stem} />
      </g>
    );
  }
  if (type === 'succulent') {
    return (
      <g>
        <ellipse cx="20" cy="40" rx="12" ry="8" fill={colors.stem} />
        <ellipse cx="20" cy="32" rx="10" ry="7" fill={colors.stem} />
        <ellipse cx="20" cy="26" rx="8" ry="5" fill={colors.stem} />
        <ellipse cx="20" cy="22" rx="5" ry="3" fill="#90EE90" />
      </g>
    );
  }
  return (
    <g>
      <rect x="17" y="32" width="6" height="20" fill={colors.stem} />
      <ellipse cx="20" cy="32" rx="10" ry="8" fill={colors.stem} />
      <ellipse cx="14" cy="26" rx="6" ry="4" fill="#90EE90" />
      <ellipse cx="26" cy="26" rx="6" ry="4" fill="#90EE90" />
      <ellipse cx="20" cy="20" rx="5" ry="3" fill="#90EE90" />
    </g>
  );
};

const BloomingSprite: React.FC<{ type: PlantType; colors: Record<string, string> }> = ({ type, colors }) => {
  if (type === 'sunflower') {
    return (
      <g>
        <rect x="18" y="40" width="4" height="24" fill={colors.stem} />
        <rect x="14" y="32" width="12" height="12" fill="#228B22" />
        <circle cx="20" cy="38" r="10" fill={colors.center} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx={20 + Math.cos(angle * Math.PI / 180) * 12}
            cy={38 + Math.sin(angle * Math.PI / 180) * 12}
            rx="6"
            ry="3"
            fill={colors.petal}
            transform={`rotate(${angle}, 20, 38)`}
          />
        ))}
      </g>
    );
  }
  if (type === 'rose') {
    return (
      <g>
        <rect x="18" y="44" width="4" height="20" fill={colors.stem} />
        <rect x="14" y="40" width="12" height="6" fill="#228B22" />
        <circle cx="20" cy="36" r="10" fill={colors.petal} />
        <circle cx="18" cy="34" r="4" fill={colors.center} />
        <circle cx="22" cy="35" r="3" fill={colors.petal} />
        <circle cx="20" cy="32" r="3" fill={colors.petal} />
      </g>
    );
  }
  if (type === 'tulip') {
    return (
      <g>
        <rect x="18" y="44" width="4" height="20" fill={colors.stem} />
        <ellipse cx="20" cy="30" rx="10" ry="14" fill={colors.petal} />
        <ellipse cx="16" cy="32" rx="4" ry="8" fill={colors.petal} />
        <ellipse cx="24" cy="32" rx="4" ry="8" fill={colors.petal} />
        <ellipse cx="20" cy="26" rx="3" ry="4" fill={colors.center} />
      </g>
    );
  }
  if (type === 'daisy') {
    return (
      <g>
        <rect x="18" y="44" width="4" height="20" fill={colors.stem} />
        <circle cx="20" cy="32" r="8" fill={colors.center} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx={20 + Math.cos(angle * Math.PI / 180) * 10}
            cy={32 + Math.sin(angle * Math.PI / 180) * 10}
            rx="5"
            ry="3"
            fill={colors.petal}
            transform={`rotate(${angle}, 20, 32)`}
          />
        ))}
      </g>
    );
  }
  if (type === 'lavender') {
    return (
      <g>
        <rect x="18" y="44" width="4" height="20" fill={colors.stem} />
        <rect x="14" y="20" width="12" height="24" fill="#228B22" />
        <ellipse cx="16" cy="18" rx="4" ry="3" fill={colors.petal} />
        <ellipse cx="20" cy="14" rx="4" ry="3" fill={colors.petal} />
        <ellipse cx="24" cy="18" rx="4" ry="3" fill={colors.petal} />
        <ellipse cx="18" cy="24" rx="3" ry="2" fill={colors.petal} />
        <ellipse cx="22" cy="24" rx="3" ry="2" fill={colors.petal} />
      </g>
    );
  }
  return (
    <g>
      <rect x="17" y="44" width="6" height="20" fill={colors.stem} />
      <circle cx="20" cy="30" r="12" fill={colors.petal} />
      <circle cx="20" cy="30" r="6" fill={colors.center} />
    </g>
  );
};

const MatureSprite: React.FC<{ type: PlantType; colors: Record<string, string> }> = ({ type, colors }) => {
  if (type === 'tree') {
    return (
      <g>
        <rect x="22" y="56" width="12" height="28" fill="#8B4513" />
        <circle cx="28" cy="36" r="20" fill={colors.petal} />
        <circle cx="20" cy="44" r="14" fill={colors.petal} />
        <circle cx="36" cy="44" r="14" fill={colors.petal} />
        <circle cx="28" cy="28" r="12" fill={colors.petal} />
      </g>
    );
  }
  if (type === 'cactus') {
    return (
      <g>
        <rect x="18" y="32" width="20" height="52" rx="10" fill={colors.stem} />
        <rect x="8" y="40" width="12" height="6" rx="3" fill={colors.stem} />
        <rect x="36" y="36" width="12" height="6" rx="3" fill={colors.stem} />
        <rect x="8" y="52" width="12" height="6" rx="3" fill={colors.stem} />
        <rect x="36" y="48" width="12" height="6" rx="3" fill={colors.stem} />
        <rect x="8" y="64" width="12" height="6" rx="3" fill={colors.stem} />
        <circle cx="28" cy="44" r="3" fill="#FF69B4" />
        <circle cx="24" cy="56" r="3" fill="#FF69B4" />
      </g>
    );
  }
  if (type === 'succulent') {
    return (
      <g>
        <ellipse cx="28" cy="70" rx="16" ry="10" fill={colors.stem} />
        <ellipse cx="28" cy="60" rx="14" ry="9" fill={colors.stem} />
        <ellipse cx="28" cy="50" rx="12" ry="8" fill={colors.stem} />
        <ellipse cx="28" cy="42" rx="10" ry="6" fill={colors.stem} />
        <ellipse cx="28" cy="36" rx="7" ry="4" fill="#90EE90" />
      </g>
    );
  }
  return (
    <g>
      <rect x="22" y="56" width="6" height="28" fill={colors.stem} />
      <rect x="18" y="48" width="14" height="10" fill="#228B22" />
      <circle cx="28" cy="32" r="16" fill={colors.petal} />
      <circle cx="28" cy="32" r="8" fill={colors.center} />
    </g>
  );
};

const ThirstyOverlay: React.FC<{ size: number }> = ({ size }) => (
  <g opacity="0.6">
    <path
      d={`M${size * 0.3} ${size * 0.4} Q${size * 0.5} ${size * 0.3} ${size * 0.7} ${size * 0.4}`}
      stroke="#8B4513"
      strokeWidth="2"
      fill="none"
    />
    <path
      d={`M${size * 0.2} ${size * 0.6} Q${size * 0.5} ${size * 0.5} ${size * 0.8} ${size * 0.6}`}
      stroke="#8B4513"
      strokeWidth="2"
      fill="none"
    />
  </g>
);

export const PlantSprite: React.FC<PlantSpriteProps> = ({
  plantType,
  plantColor,
  growthStage,
  isWatered,
  size = 64,
}) => {
  const colors = COLOR_MAP[plantColor] || COLOR_MAP.yellow;
  const dims = getStageDimensions(growthStage);
  
  const svgSize = Math.max(size, dims.width + 16, dims.height + 16);
  const offsetX = (svgSize - dims.width) / 2;
  const offsetY = svgSize - dims.height - dims.y;

  const getSprite = () => {
    switch (growthStage) {
      case 'seed':
        return <SeedSprite colors={colors} />;
      case 'sprout':
        return <SproutSprite colors={colors} />;
      case 'growing':
        return <GrowingSprite type={plantType} colors={colors} />;
      case 'blooming':
        return <BloomingSprite type={plantType} colors={colors} />;
      case 'mature':
        return <MatureSprite type={plantType} colors={colors} />;
    }
  };

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      style={{ overflow: 'visible' }}
    >
      <g transform={`translate(${offsetX}, ${offsetY})`}>
        {getSprite()}
        {!isWatered && <ThirstyOverlay size={svgSize} />}
      </g>
    </svg>
  );
};

export const PLANT_TYPES: PlantType[] = [
  'sunflower', 'rose', 'tulip', 'succulent', 'herb', 'tree', 'cactus', 'daisy', 'lavender'
];

export const PLANT_COLORS: PlantColor[] = [
  'yellow', 'pink', 'red', 'white', 'purple', 'orange', 'blue', 'green'
];

export const GROWTH_STAGES: GrowthStage[] = ['seed', 'sprout', 'growing', 'blooming', 'mature'];
