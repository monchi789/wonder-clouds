import React from 'react';

interface WaveProps {
  color?: string;
  height?: number;
  width?: number;
  position?: 'top' | 'bottom';
}

const Wave: React.FC<WaveProps> = ({ 
  color = '#3B82F6', 
  height = 150, 
  width = 1440, 
  position = 'bottom' 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={`w-full ${position === 'top' ? 'rotate-180' : ''}`}
      style={{ 
        fill: color, 
        transform: position === 'top' ? 'rotate(180deg)' : 'none' 
      }}
    >
      <path 
        d={`
          M0,0 
          C${width * 0.25},${height * 0.5} 
          ${width * 0.75},${height * 0.5} 
          ${width},0 
          L${width},${height} 
          L0,${height} 
          Z
        `}
      />
    </svg>
  );
};

export default Wave;