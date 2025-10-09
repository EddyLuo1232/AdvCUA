import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// Animation imports removed as not currently used

const Nav = styled(motion.nav)<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: ${props => props.scrolled 
    ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(13, 17, 23, 0.95) 100%)' 
    : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(15px)' : 'none'};
  transition: all ${props => props.theme.transitions.normal};
  border-bottom: ${props => props.scrolled 
    ? `1px solid ${props.theme.colors.borderBright}` 
    : 'none'};
  box-shadow: ${props => props.scrolled ? props.theme.shadows.glow : 'none'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${props => props.scrolled 
      ? `linear-gradient(90deg, transparent, ${props.theme.colors.primary}, transparent)` 
      : 'none'};
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(13, 17, 23, 0.95) 100%);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid ${props => props.theme.colors.borderBright};
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.display};
  color: ${props => props.theme.colors.primary};
  text-shadow: ${props => props.theme.shadows.glowSm};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    transform: scale(1.05);
    text-shadow: ${props => props.theme.shadows.glow};
  }
`;

const HackedLaptopIcon = styled.svg`
  width: 32px;
  height: 32px;
  fill: ${props => props.theme.colors.primary};
  filter: drop-shadow(${props => props.theme.shadows.glowSm});
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    filter: drop-shadow(${props => props.theme.shadows.glow});
    transform: rotate(-5deg);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 500;
  font-family: ${props => props.theme.fonts.mono};
  transition: all ${props => props.theme.transitions.fast};
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &::before {
    content: '> ';
    opacity: 0;
    transform: translateX(-10px);
    transition: all ${props => props.theme.transitions.fast};
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    text-shadow: ${props => props.theme.shadows.glowSm};
    
    &::before {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    
    &::before {
      content: '>> ';
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const GitHubButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.surface} 0%, ${props => props.theme.colors.surfaceLight} 100%);
  border: 1px solid ${props => props.theme.colors.borderBright};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.mono};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all ${props => props.theme.transitions.fast};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.effects.scan};
    transition: left ${props => props.theme.transitions.normal};
  }

  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.surfaceHover} 0%, ${props => props.theme.colors.surface} 100%);
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.glow};
    transform: translateY(-2px);
    
    &::before {
      left: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background: rgba(79, 195, 247, 0.1);
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.98) 0%, rgba(13, 17, 23, 0.98) 100%);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid ${props => props.theme.colors.borderBright};
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
`;

const MobileNavLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  font-weight: 500;
  font-family: ${props => props.theme.fonts.mono};
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 1rem 0.5rem;
  border-bottom: 1px solid rgba(100, 116, 139, 0.1);
  transition: all ${props => props.theme.transitions.fast};
  
  &:last-child {
    border-bottom: none;
  }

  &::before {
    content: '> ';
    opacity: 0;
    transform: translateX(-10px);
    transition: all ${props => props.theme.transitions.fast};
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    padding-left: 1rem;
    
    &::before {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const MobileGitHubButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.surface} 0%, ${props => props.theme.colors.surfaceLight} 100%);
  border: 1px solid ${props => props.theme.colors.borderBright};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.mono};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all ${props => props.theme.transitions.fast};
  text-decoration: none;

  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.surfaceHover} 0%, ${props => props.theme.colors.surface} 100%);
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
  }
`;

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <Nav
      scrolled={scrolled}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContainer>
        <Logo>
          <HackedLaptopIcon viewBox="0 0 512 512">
            {/* Laptop base */}
            <path d="M0 384h512v64c0 17.67-14.33 32-32 32H32c-17.67 0-32-14.33-32-32v-64z" fill="#2563eb"/>
            {/* Laptop screen frame */}
            <path d="M64 352V96c0-17.67 14.33-32 32-32h320c17.67 0 32 14.33 32 32v256H64z" fill="#1e40af"/>
            {/* Screen */}
            <path d="M96 128v192h320V128H96z" fill="#e5e7eb"/>
            {/* HACKED banner background */}
            <rect x="96" y="200" width="320" height="48" fill="#ef4444"/>
            {/* HACKED text */}
            <text x="256" y="232" fontSize="36" fontWeight="bold" textAnchor="middle" fill="#000">HACKED</text>
            {/* Browser elements */}
            <circle cx="376" cy="152" r="6" fill="#374151"/>
            <circle cx="396" cy="152" r="6" fill="#374151"/>
            <circle cx="356" cy="152" r="6" fill="#374151"/>
            {/* URL bar */}
            <rect x="96" y="168" width="320" height="16" fill="#374151" rx="8"/>
            {/* Laptop bottom details */}
            <rect x="32" y="400" width="96" height="32" fill="#6b7280" rx="16"/>
            <rect x="384" y="400" width="96" height="32" fill="#6b7280" rx="16"/>
            <rect x="240" y="416" width="32" height="16" fill="#9ca3af" rx="8"/>
          </HackedLaptopIcon>
          <span>AdvCUA</span>
        </Logo>
        
        <NavLinks>
          <NavLink onClick={() => scrollToSection('threat-model')}>Threat Model</NavLink>
          <NavLink onClick={() => scrollToSection('demo')}>Demo</NavLink>
          <NavLink onClick={() => scrollToSection('abstract')}>Abstract</NavLink>
          <NavLink onClick={() => scrollToSection('dataset')}>Dataset</NavLink>
          <NavLink onClick={() => scrollToSection('evaluation')}>Evaluation</NavLink>
          <NavLink onClick={() => scrollToSection('results')}>Results</NavLink>
          <NavLink onClick={() => scrollToSection('conclusion')}>Conclusion</NavLink>
          <GitHubButton href="https://github.com/EddyLuo1232/VRAP" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </GitHubButton>
        </NavLinks>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </NavContainer>
      
      <MobileMenu
        isOpen={mobileMenuOpen}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0, 
          y: mobileMenuOpen ? 0 : -20 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <MobileNavLink onClick={() => scrollToSection('threat-model')}>Threat Model</MobileNavLink>
        <MobileNavLink onClick={() => scrollToSection('demo')}>Demo</MobileNavLink>
        <MobileNavLink onClick={() => scrollToSection('abstract')}>Abstract</MobileNavLink>
        <MobileNavLink onClick={() => scrollToSection('dataset')}>Dataset</MobileNavLink>
        <MobileNavLink onClick={() => scrollToSection('evaluation')}>Evaluation</MobileNavLink>
        <MobileNavLink onClick={() => scrollToSection('results')}>Results</MobileNavLink>
        <MobileNavLink onClick={() => scrollToSection('conclusion')}>Conclusion</MobileNavLink>
        
        <MobileGitHubButton href="https://github.com/EddyLuo1232/VRAP" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          GitHub
        </MobileGitHubButton>
      </MobileMenu>
    </Nav>
  );
};
