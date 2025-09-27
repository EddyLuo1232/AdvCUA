// Animation configurations and reusable motion variants
import { Variants } from 'framer-motion';

// Common animation durations and easing - Restored original timing
export const animationConfig = {
  durations: {
    fast: 0.3,      // Restored original
    normal: 0.6,    // Restored original
    slow: 0.8,      // Restored original
  },
  easing: {
    smooth: "easeInOut",    // Restored original
    bounce: "easeOut",
    sharp: "easeIn",
  }
} as const;

// Reusable animation variants
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

export const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
};

export const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

// Staggered animation for lists - Optimized
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,  // Faster stagger
      delayChildren: 0.1      // Reduced initial delay
    }
  }
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: animationConfig.durations.normal,
      ease: animationConfig.easing.smooth
    }
  }
};

// Button hover effects - Restored original feel
export const buttonHover = {
  whileHover: { 
    scale: 1.02,    // Restored original scale
    y: -2,          // Restored original movement
    transition: { duration: 0.2 }
  },
  whileTap: { 
    scale: 0.98,    // Restored original tap effect
    transition: { duration: 0.1 }
  }
};

// Loading animation
export const loadingSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Terminal-specific animations
export const terminalAnimations = {
  roundContainer: {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.95 }
  },
  
  thoughtBlock: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 }
  },
  
  actionBlock: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 }
  },
  
  outputBlock: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 }
  },

  contentReveal: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' }
  }
};

// Terminal animation transitions - Restored original timing
export const terminalTransitions = {
  roundContainer: {
    duration: animationConfig.durations.slow,
    ease: animationConfig.easing.smooth
  },
  thoughtBlock: { 
    delay: 0.4,     // Restored original delay
    duration: animationConfig.durations.normal,
    type: "spring" as const,
    stiffness: 100
  },
  actionBlock: { 
    delay: 0.8,     // Restored original delay
    duration: animationConfig.durations.normal,
    type: "spring" as const,
    stiffness: 100
  },
  outputBlock: { 
    delay: 1.6,     // Restored original delay
    duration: animationConfig.durations.normal,
    type: "spring" as const,
    stiffness: 100
  },
  contentReveal: { 
    delay: 1.2,     // Restored original delay
    duration: 0.5   // Restored original
  }
};

// Progress bar animation
export const progressBar: Variants = {
  initial: { width: '0%' },
  animate: { 
    width: '100%',
    transition: { 
      duration: animationConfig.durations.fast 
    }
  }
};

// CSS Keyframe animations as styled-components
export const cssAnimations = {
  bounce: `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-3px);
      }
      60% {
        transform: translateY(-1px);
      }
    }
  `,
  
  pageFlip: `
    @keyframes pageFlip {
      0%, 100% { transform: rotateY(0deg); }
      50% { transform: rotateY(180deg); }
    }
  `,
  
  dataFlow: `
    @keyframes dataFlow {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  `,
  
  rotate: `
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
  
  spin: `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
};

// Animation properties - Optimized for performance
export const animationProps = {
  iconBounce: 'bounce 3s ease-out infinite',        // Slower, less frequent
  pageFlip: 'pageFlip 4s ease-in-out infinite',     // Slower
  dataFlow: 'dataFlow 3s ease-out infinite',        // Slower with easing
  backgroundRotate: 'rotate 60s linear infinite',   // Much slower background
  loadingSpin: 'spin 0.8s linear infinite'          // Slightly faster loading
};
