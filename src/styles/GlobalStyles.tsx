import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.fonts.sans};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    overflow-x: hidden;
    position: relative;
    
    /* Add subtle scan line effect */
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${props => props.theme.effects.noise};
      pointer-events: none;
      z-index: 1;
      opacity: 0.02;
    }
  }

  code {
    font-family: ${props => props.theme.fonts.mono};
    background: ${props => props.theme.colors.surface};
    padding: 2px 6px;
    border-radius: 4px;
    color: ${props => props.theme.colors.primary};
  }

  pre {
    font-family: ${props => props.theme.fonts.mono};
    background: ${props => props.theme.colors.terminal.background};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    color: ${props => props.theme.colors.terminal.green};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    font-family: ${props => props.theme.fonts.display};
    text-shadow: 0 0 10px currentColor;
  }

  h1 {
    color: ${props => props.theme.colors.primary};
    text-shadow: ${props => props.theme.shadows.glowSm};
  }

  h2, h3 {
    color: ${props => props.theme.colors.textPrimary};
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: all ${props => props.theme.transitions.fast};
    position: relative;

    &:hover {
      color: ${props => props.theme.colors.accent};
      text-shadow: ${props => props.theme.shadows.glowSm};
    }
  }

  /* Custom scrollbar with cyber theme */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.border};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
    border-radius: 6px;
    border: 2px solid ${props => props.theme.colors.background};
    box-shadow: ${props => props.theme.shadows.glowSm};
  }

  ::-webkit-scrollbar-thumb:hover {
    box-shadow: ${props => props.theme.shadows.glow};
  }

  /* Selection styling */
  ::selection {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
  }

  ::-moz-selection {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
  }

  /* Glitch animation keyframes */
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }

  @keyframes scan {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100vw); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Utility classes */
  .glitch {
    animation: glitch 0.3s infinite;
  }

  .scan {
    animation: scan 2s infinite linear;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  .text-glow {
    text-shadow: ${props => props.theme.shadows.glow};
  }

  .text-primary {
    color: ${props => props.theme.colors.primary};
  }

  .text-secondary {
    color: ${props => props.theme.colors.secondary};
  }

  .text-accent {
    color: ${props => props.theme.colors.accent};
  }
`;
