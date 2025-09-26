import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  z-index: 2;
  position: relative;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #4fc3f7 0%, #7c4dff 50%, #581c87 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.3;
  text-shadow: 0 0 20px rgba(79, 195, 247, 0.2);
`;

const AuthorInfo = styled(motion.div)`
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const Affiliation = styled.span`
  font-size: 0.9em;
  color: ${props => props.theme.colors.textSecondary};
`;


const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(motion.div)`
  padding: 1rem 2.5rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: 600;
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.mono};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all ${props => props.theme.transitions.normal};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  
  span {
    font-size: 1.2em;
    filter: drop-shadow(0 0 8px currentColor);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left ${props => props.theme.transitions.normal};
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #1e3a8a 0%, #581c87 100%);
  color: ${props => props.theme.colors.text};
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    background: linear-gradient(135deg, #1e40af 0%, #6d28d9 100%);
    box-shadow: 0 8px 25px rgba(30, 58, 138, 0.5);
    color: #ffffff;
  }
  
  span {
    animation: bounce 2s infinite;
  }
  
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
`;

const SecondaryButton = styled(Button)`
  background: linear-gradient(135deg, 
    rgba(22, 27, 34, 0.8) 0%, 
    rgba(33, 38, 45, 0.6) 100%);
  color: ${props => props.theme.colors.textSecondary};
  border: 2px solid ${props => props.theme.colors.border};
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, 
      rgba(30, 58, 138, 0.3) 0%, 
      rgba(88, 28, 135, 0.2) 100%);
    border-color: #4c1d95;
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 6px 20px rgba(79, 195, 247, 0.2);
  }
  
  &:nth-child(2) span {
    color: #fbbf24;
    animation: pageFlip 3s ease-in-out infinite;
  }
  
  &:nth-child(3) span {
    color: #34d399;
    animation: dataFlow 2.5s linear infinite;
  }
  
  @keyframes pageFlip {
    0%, 100% { transform: rotateY(0deg); }
    50% { transform: rotateY(180deg); }
  }
  
  @keyframes dataFlow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  gap: 3rem;
  justify-content: center;
  margin-top: 4rem;
  flex-wrap: wrap;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 0.25rem;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0.5;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 20% 80%, rgba(96, 165, 250, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(244, 114, 182, 0.1) 0%, transparent 50%);
    animation: rotate 30s linear infinite;
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection>
      <Background />
      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Computer-Use Agent Frameworks Can Expose Realistic Risks Through Tactics, Techniques, and Procedures
        </Title>
        
        <AuthorInfo
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AuthorName>Weidi Luo</AuthorName><sup>1</sup>, <AuthorName>Qiming Zhang</AuthorName><sup>2</sup>, <AuthorName>Tianyu Lu</AuthorName><sup>2</sup>, <AuthorName>Xiaogeng Liu</AuthorName><sup>3</sup>, <AuthorName>Bin Hu</AuthorName><sup>4</sup>, <AuthorName>Hung-Chun CHIU</AuthorName><sup>5</sup><br />
          <AuthorName>Siyuan Ma</AuthorName><sup>6</sup>, <AuthorName>Yizhe Zhang</AuthorName><sup>7</sup>, <AuthorName>Xusheng Xiao</AuthorName><sup>8</sup>, <AuthorName>Yinzhi Cao</AuthorName><sup>3</sup>, <AuthorName>Zhen Xiang</AuthorName><sup>1</sup>, <AuthorName>Chaowei Xiao</AuthorName><sup>3</sup><br /><br />
          <Affiliation><sup>1</sup>University of Georgia &nbsp;&nbsp; <sup>2</sup>University of Wisconsin–Madison &nbsp;&nbsp; <sup>3</sup>Johns Hopkins University</Affiliation><br />
          <Affiliation><sup>4</sup>University of Maryland, College Park &nbsp;&nbsp; <sup>5</sup>Hong Kong University of Science and Technology</Affiliation><br />
          <Affiliation><sup>6</sup>Chinese University of Hong Kong &nbsp;&nbsp; <sup>7</sup>Apple &nbsp;&nbsp; <sup>8</sup>Arizona State University</Affiliation>
        </AuthorInfo>
        
        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PrimaryButton as="button" onClick={() => scrollToSection('demo')}>
            <span>🎮</span> View Demo
          </PrimaryButton>
          <SecondaryButton as="a" href="https://huggingface.co/datasets/EddyLuo/AdvCUA" target="_blank">
            <span>🤗</span> Dataset
          </SecondaryButton>
          <SecondaryButton as="a" href="https://github.com/EddyLuo1232/VRAP" target="_blank">
            <span>🐙</span> Code
          </SecondaryButton>
        </ButtonGroup>
        
        <Stats
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Stat>
            <StatNumber>10</StatNumber>
            <StatLabel>Tactics</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>77</StatNumber>
            <StatLabel>Techniques</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>120</StatNumber>
            <StatLabel>Tasks</StatLabel>
          </Stat>
        </Stats>
      </HeroContent>
    </HeroSection>
  );
};
