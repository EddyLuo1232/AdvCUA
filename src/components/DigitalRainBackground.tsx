import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const DigitalFlickerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`;

const DigitalFlickerCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  opacity: 0.4;
`;

interface DigitalCharacter {
  x: number;
  y: number;
  char: string;
  opacity: number;
  brightness: number;
  flickerSpeed: number;
  glitchChance: number;
  phase: number;
  maxOpacity: number;
  color: string;
  lastChange: number;
}

interface DigitalFlickerBackgroundProps {
  density?: number;
  flickerSpeed?: number;
}

export const DigitalRainBackground: React.FC<DigitalFlickerBackgroundProps> = ({ 
  density = 0.02, 
  flickerSpeed = 0.05 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const charactersRef = useRef<DigitalCharacter[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Digital characters including binary, hex, and special chars
    const binaryChars = '01';
    const hexChars = '0123456789ABCDEF';
    const specialChars = '@#$%^&*()_+-=[]{}|;:,.<>?~`';
    
    const fontSize = 16;
    const colors = [
      '#4fc3f7', // Primary blue
      '#7c4dff', // Purple
      '#00bcd4', // Cyan
      '#81c784', // Light green accent
    ];

    // Set canvas size and initialize characters
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeCharacters();
    };

    // Generate random character with weighted selection
    const getRandomChar = () => {
      const rand = Math.random();
      if (rand < 0.6) return binaryChars[Math.floor(Math.random() * binaryChars.length)];
      if (rand < 0.8) return hexChars[Math.floor(Math.random() * hexChars.length)];
      return specialChars[Math.floor(Math.random() * specialChars.length)];
    };

    // Initialize characters across the screen
    const initializeCharacters = () => {
      charactersRef.current = [];
      const cols = Math.floor(canvas.width / fontSize);
      const rows = Math.floor(canvas.height / fontSize);

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          if (Math.random() < density) {
            charactersRef.current.push({
              x: x * fontSize,
              y: y * fontSize,
              char: getRandomChar(),
              opacity: 0,
              brightness: Math.random() * 0.8 + 0.2,
              flickerSpeed: Math.random() * flickerSpeed + flickerSpeed * 0.5,
              glitchChance: Math.random() * 0.05 + 0.01,
              phase: Math.random() * Math.PI * 2,
              maxOpacity: Math.random() * 0.8 + 0.2,
              color: colors[Math.floor(Math.random() * colors.length)],
              lastChange: 0,
            });
          }
        }
      }
    };

    // Animation loop
    const animate = (currentTime: number) => {
      // Clear canvas completely for clean flicker effect
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      charactersRef.current.forEach(char => {
        // Update flicker phase
        char.phase += char.flickerSpeed;
        
        // Calculate flickering opacity using sine wave
        const flicker = (Math.sin(char.phase) + 1) / 2;
        char.opacity = char.maxOpacity * flicker * char.brightness;

        // Random character glitching
        if (Math.random() < char.glitchChance) {
          char.char = getRandomChar();
          // Sometimes change color on glitch
          if (Math.random() < 0.3) {
            char.color = colors[Math.floor(Math.random() * colors.length)];
          }
        }

        // Random position glitch for some characters
        let drawX = char.x;
        let drawY = char.y;
        if (Math.random() < 0.01) {
          drawX += (Math.random() - 0.5) * 4;
          drawY += (Math.random() - 0.5) * 4;
        }

        // Only draw if visible
        if (char.opacity > 0.05) {
          // Add glow effect for bright characters
          if (char.opacity > 0.6) {
            ctx.shadowColor = char.color;
            ctx.shadowBlur = 8;
          } else if (char.opacity > 0.3) {
            ctx.shadowColor = char.color;
            ctx.shadowBlur = 4;
          } else {
            ctx.shadowBlur = 0;
          }

          // Set color with opacity
          const hex = char.color.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${char.opacity})`;
          ctx.fillText(char.char, drawX, drawY + fontSize);
        }

        // Randomly spawn new characters or remove old ones
        if (Math.random() < 0.001) {
          char.phase = 0;
          char.maxOpacity = Math.random() * 0.8 + 0.2;
          char.flickerSpeed = Math.random() * flickerSpeed + flickerSpeed * 0.5;
        }
      });

      // Reset shadow
      ctx.shadowBlur = 0;

      // Randomly add new characters
      if (Math.random() < 0.02) {
        const cols = Math.floor(canvas.width / fontSize);
        const rows = Math.floor(canvas.height / fontSize);
        const newX = Math.floor(Math.random() * cols) * fontSize;
        const newY = Math.floor(Math.random() * rows) * fontSize;
        
        charactersRef.current.push({
          x: newX,
          y: newY,
          char: getRandomChar(),
          opacity: 0,
          brightness: Math.random() * 0.8 + 0.2,
          flickerSpeed: Math.random() * flickerSpeed + flickerSpeed * 0.5,
          glitchChance: Math.random() * 0.05 + 0.01,
          phase: 0,
          maxOpacity: Math.random() * 0.8 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          lastChange: currentTime,
        });
      }

      // Remove excess characters for performance
      if (charactersRef.current.length > 1000) {
        charactersRef.current = charactersRef.current.slice(0, 800);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [density, flickerSpeed]);

  return (
    <DigitalFlickerContainer>
      <DigitalFlickerCanvas ref={canvasRef} />
    </DigitalFlickerContainer>
  );
};

export default DigitalRainBackground;
