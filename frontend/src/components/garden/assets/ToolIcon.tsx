import React from 'react';

export type ToolType = 'watering_can' | 'seed_bag' | 'hoe';

interface ToolIconProps {
  tool: ToolType;
  isActive?: boolean;
  onClick?: () => void;
  size?: number;
}

const TOOL_STYLES = {
  watering_can: {
    name: 'Watering Can',
    description: 'Water your plants',
  },
  seed_bag: {
    name: 'Seed Bag',
    description: 'Plant a new habit',
  },
  hoe: {
    name: 'Hoe',
    description: 'Track a measurable habit',
  },
};

export const ToolIcon: React.FC<ToolIconProps> = ({
  tool,
  isActive = false,
  onClick,
  size = 48,
}) => {
  const renderIcon = () => {
    switch (tool) {
      case 'watering_can':
        return (
          <g>
            <path
              d="M8 20 L8 28 L12 32 L28 32 L32 28 L32 20 L28 20 L28 24 L12 24 L12 20 Z"
              fill={isActive ? '#4FC3F7' : '#90A4AE'}
              stroke="#37474F"
              strokeWidth="2"
            />
            <path
              d="M32 22 Q38 22 40 18 Q42 14 38 12 Q34 10 30 14"
              fill="none"
              stroke="#37474F"
              strokeWidth="2"
            />
            <circle cx="10" cy="26" r="2" fill="#37474F" />
            <circle cx="14" cy="26" r="2" fill="#37474F" />
            <circle cx="18" cy="26" r="2" fill="#37474F" />
            <circle cx="22" cy="26" r="2" fill="#37474F" />
            <circle cx="26" cy="26" r="2" fill="#37474F" />
          </g>
        );
      case 'seed_bag':
        return (
          <g>
            <path
              d="M14 12 L20 6 L30 16 L34 28 L26 34 L16 34 L10 26 Z"
              fill={isActive ? '#81C784' : '#AED581'}
              stroke="#33691E"
              strokeWidth="2"
            />
            <path
              d="M16 14 L22 8 L28 14"
              fill="none"
              stroke="#33691E"
              strokeWidth="1"
            />
            <circle cx="20" cy="22" r="3" fill="#5D4037" />
            <circle cx="24" cy="26" r="2" fill="#5D4037" />
            <circle cx="18" cy="28" r="2" fill="#5D4037" />
            <path
              d="M22 6 L20 2 L24 2 L22 6"
              fill="#33691E"
              stroke="#33691E"
              strokeWidth="1"
            />
            <rect x="18" y="2" width="8" height="3" fill="#5D4037" rx="1" />
          </g>
        );
      case 'hoe':
        return (
          <g>
            <rect x="8" y="28" width="6" height="12" fill="#8D6E63" stroke="#3E2723" strokeWidth="1" />
            <path
              d="M11 28 L6 18 L8 16 L14 24 L16 22 L11 28 Z"
              fill={isActive ? '#FFB74D' : '#BCAAA4'}
              stroke="#3E2723"
              strokeWidth="2"
            />
            <path
              d="M7 19 L9 17 M10 21 L12 19 M13 23 L15 21"
              fill="none"
              stroke="#3E2723"
              strokeWidth="1"
            />
          </g>
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        filter: isActive ? 'drop-shadow(0 0 6px #FFD54F)' : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <g transform="translate(0, 0)">
        <rect
          x="2"
          y="2"
          width={size - 4}
          height={size - 4}
          rx="8"
          fill={isActive ? 'rgba(255, 213, 79, 0.3)' : 'rgba(255, 255, 255, 0.1)'}
          stroke={isActive ? '#FFD54F' : 'rgba(255, 255, 255, 0.3)'}
          strokeWidth="2"
        />
        {renderIcon()}
      </g>
    </svg>
  );
};

export const getToolInfo = (tool: ToolType) => TOOL_STYLES[tool];
