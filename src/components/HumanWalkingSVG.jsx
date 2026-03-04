import React, { useState, useEffect } from 'react';

// Animated walking human SVG with leg animation
export const HumanWalkingSVG = ({ x = 0, y = 0, size = 2, color = '#e11d48', walking = true }) => {
  const [legPhase, setLegPhase] = useState(0);

  useEffect(() => {
    if (!walking) return;
    
    const interval = setInterval(() => {
      setLegPhase(prev => (prev + 1) % 4);
    }, 200); // Speed of walking animation

    return () => clearInterval(interval);
  }, [walking]);

  // Leg positions based on phase
  const getLegPositions = () => {
    const phases = [
      { left: -0.15, right: 0.25, leftRot: -15, rightRot: 20 },  // Phase 0
      { left: -0.05, right: 0.15, leftRot: -5, rightRot: 10 },   // Phase 1
      { left: 0.15, right: -0.25, leftRot: 20, rightRot: -15 }, // Phase 2
      { left: 0.05, right: -0.15, leftRot: 10, rightRot: -5 },   // Phase 3
    ];
    return phases[legPhase];
  };

  const legs = getLegPositions();

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Head */}
      <circle cx={0} cy={-size * 0.9} r={size * 0.35} fill={color} />
      
      {/* Body */}
      <rect 
        x={-size * 0.2} 
        y={-size * 0.55} 
        width={size * 0.4} 
        height={size * 0.7} 
        rx={size * 0.1} 
        fill={color} 
      />
      
      {/* Left Leg */}
      <g transform={`translate(${legs.left * size}, ${size * 0.15}) rotate(${legs.leftRot})`}>
        <rect 
          x={-size * 0.08} 
          y={0} 
          width={size * 0.16} 
          height={size * 0.55} 
          rx={size * 0.05} 
          fill={color} 
        />
      </g>
      
      {/* Right Leg */}
      <g transform={`translate(${legs.right * size}, ${size * 0.15}) rotate(${legs.rightRot})`}>
        <rect 
          x={-size * 0.08} 
          y={0} 
          width={size * 0.16} 
          height={size * 0.55} 
          rx={size * 0.05} 
          fill={color} 
        />
      </g>
      
      {/* Left Arm */}
      <g transform={`translate(${-size * 0.35}, ${-size * 0.4}) rotate(${-legs.leftRot * 0.5})`}>
        <rect 
          x={-size * 0.06} 
          y={0} 
          width={size * 0.12} 
          height={size * 0.45} 
          rx={size * 0.04} 
          fill={color} 
        />
      </g>
      
      {/* Right Arm */}
      <g transform={`translate(${size * 0.35}, ${-size * 0.4}) rotate(${-legs.rightRot * 0.5})`}>
        <rect 
          x={-size * 0.06} 
          y={0} 
          width={size * 0.12} 
          height={size * 0.45} 
          rx={size * 0.04} 
          fill={color} 
        />
      </g>
    </g>
  );
};

