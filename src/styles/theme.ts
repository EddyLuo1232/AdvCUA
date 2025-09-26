export const theme = {
  colors: {
    // Cyber blue inspired colors
    primary: '#4fc3f7', // Cyber blue
    secondary: '#7c4dff', // Deep purple
    accent: '#00bcd4', // Cyan accent
    danger: '#ff5252', // Alert red
    success: '#4caf50', // Success green
    warning: '#ffa726', // Amber warning
    
    // Background layers for depth
    background: '#000000', // Pure black
    surface: '#0d1117', // GitHub dark
    surfaceLight: '#161b22', // Elevated surface
    surfaceHover: '#21262d', // Hover state
    
    // Text hierarchy
    text: '#ffffff', // Pure white
    textPrimary: '#4fc3f7', // Cyber blue text
    textSecondary: '#8b949e', // Muted gray
    textTertiary: '#6e7681', // Even more muted
    
    // Border and dividers
    border: '#30363d', // Subtle borders
    borderBright: '#4fc3f7', // Highlighted borders
    
    // Special effects
    glow: 'rgba(79, 195, 247, 0.5)', // Blue glow
    glowPurple: 'rgba(124, 77, 255, 0.5)', // Purple glow
    glowCyan: 'rgba(0, 188, 212, 0.5)', // Cyan glow
    
    // Terminal colors
    terminal: {
      background: '#0c0c0c',
      blue: '#4fc3f7',
      purple: '#7c4dff',
      cyan: '#00bcd4',
      red: '#ff5252',
      yellow: '#ffa726',
      green: '#4caf50',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.8)',
    md: '0 4px 6px rgba(0, 0, 0, 0.8)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.8)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.8)',
    // Glow effects
    glow: '0 0 20px rgba(79, 195, 247, 0.5)',
    glowSm: '0 0 10px rgba(79, 195, 247, 0.3)',
    glowLg: '0 0 30px rgba(79, 195, 247, 0.7)',
    glowPurple: '0 0 20px rgba(124, 77, 255, 0.5)',
    glowCyan: '0 0 20px rgba(0, 188, 212, 0.5)',
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  fonts: {
    mono: '"JetBrains Mono", "Fira Code", "Consolas", "Monaco", monospace',
    sans: '"Inter", "Roboto", "Segoe UI", sans-serif',
    display: '"Orbitron", "Exo 2", sans-serif',
  },
  effects: {
    scan: 'linear-gradient(90deg, transparent, rgba(79, 195, 247, 0.1), transparent)',
    noise: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
  },
};

export type Theme = typeof theme;
