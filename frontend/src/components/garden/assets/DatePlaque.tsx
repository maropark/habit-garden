import React from 'react';

interface DatePlaqueProps {
  date: Date;
}

export const DatePlaque: React.FC<DatePlaqueProps> = ({ date }) => {
  const dayOfMonth = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  return (
    <div style={styles.container}>
      <svg width="280" height="100" viewBox="0 0 280 100" style={styles.svg}>
        <defs>
          <linearGradient id="woodGrain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="20%" stopColor="#A0522D" />
            <stop offset="40%" stopColor="#8B4513" />
            <stop offset="60%" stopColor="#A0522D" />
            <stop offset="80%" stopColor="#8B4513" />
            <stop offset="100%" stopColor="#A0522D" />
          </linearGradient>
          <linearGradient id="woodDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#654321" />
            <stop offset="100%" stopColor="#3E2723" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
          </filter>
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feOffset dx="1" dy="1" />
            <feGaussianBlur stdDeviation="2" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="black" floodOpacity="0.3" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>

        <g filter="url(#shadow)">
          <path
            d="M10 20 L20 5 L260 5 L270 20 L270 80 L260 95 L20 95 L10 80 Z"
            fill="url(#woodGrain)"
            stroke="#3E2723"
            strokeWidth="3"
          />
          <path
            d="M10 20 L20 5 L260 5 L270 20 L270 80 L260 95 L20 95 L10 80 Z"
            fill="none"
            stroke="#5D4037"
            strokeWidth="1"
            strokeDasharray="4 2"
          />
        </g>

        <g filter="url(#innerShadow)">
          <rect x="25" y="18" width="230" height="70" rx="4" fill="url(#woodDark)" />
        </g>

        <line x1="25" y1="50" x2="255" y2="50" stroke="#5D4037" strokeWidth="1" />
        <line x1="25" y1="52" x2="255" y2="52" stroke="#3E2723" strokeWidth="1" />

        <circle cx="50" cy="43" r="15" fill="#F5F5DC" stroke="#8B4513" strokeWidth="2" />
        <text
          x="50"
          y="48"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#3E2723"
          fontFamily="'Courier New', monospace"
        >
          {dayOfMonth}
        </text>

        <text
          x="50"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#D7CCC8"
          fontFamily="'Courier New', monospace"
        >
          {month}
        </text>

        <text
          x="165"
          y="42"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#D7CCC8"
          fontFamily="'Courier New', monospace"
          letterSpacing="2"
        >
          {date.toLocaleDateString('en-US', { weekday: 'uppercase' })}
        </text>

        <text
          x="165"
          y="65"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#F5F5DC"
          fontFamily="'Courier New', monospace"
        >
          {date.getFullYear()}
        </text>
      </svg>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.4))',
  },
};
