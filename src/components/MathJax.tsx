import React, { useEffect, useRef } from 'react';

interface MathJaxProps {
  children: string;
  display?: boolean;
  className?: string;
}

declare global {
  interface Window {
    MathJax: any;
  }
}

export const MathJax: React.FC<MathJaxProps> = ({ children, display = false, className }) => {
  const mathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.MathJax && mathRef.current) {
      // Clear any existing content
      mathRef.current.innerHTML = display ? `$$${children}$$` : `$${children}$`;
      
      // Typeset the math with proper error handling
      if (window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([mathRef.current]).catch((err: any) => {
          console.error('MathJax typesetting failed:', err);
        });
      } else if (window.MathJax.Hub && window.MathJax.Hub.Queue) {
        // Fallback for older MathJax versions
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, mathRef.current]);
      } else {
        console.warn('MathJax typeset method not available');
      }
    }
  }, [children, display]);

  return (
    <div 
      ref={mathRef} 
      className={className}
      style={{ 
        display: display ? 'block' : 'inline',
        textAlign: display ? 'center' : 'inherit'
      }}
    >
      {display ? `$$${children}$$` : `$${children}$`}
    </div>
  );
};

export default MathJax;

