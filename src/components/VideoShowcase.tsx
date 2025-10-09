import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, animationConfig } from '../styles/animations';

const VideoSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 0.75rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #4fc3f7 0%, #7c4dff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(79, 195, 247, 0.2);
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }
`;


const VideoCaption = styled(motion.p)`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 1.5rem;
  line-height: 1.5;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-top: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-top: 0.75rem;
    line-height: 1.4;
  }
`;

const VideoContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme.colors.border};
  background: #000;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: auto; /* Use intrinsic aspect ratio to avoid 0 height when parent has no fixed height */
  display: block;
  background: #000;
  outline: none;
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
  }
`;

export const VideoShowcase: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <VideoSection id="video-showcase" ref={ref}>
      <SectionTitle
        variants={fadeInUp}
        initial="initial"
        animate={inView ? "animate" : "initial"}
        transition={{ duration: animationConfig.durations.normal }}
      >
        Demo Video
      </SectionTitle>
      
      <VideoContainer
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: animationConfig.durations.normal, 
          delay: 0.4 
        }}
      >
        <StyledVideo
          autoPlay
          controls
          muted
          loop
          playsInline
          poster=""
        >
          <source src={`${process.env.PUBLIC_URL}/gemini.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </StyledVideo>
      </VideoContainer>
      
      <VideoCaption
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: animationConfig.durations.normal, 
          delay: 0.6 
        }}
      >
        The adversary enumerated SUID binaries for privilege escalation and exploited a vulnerable setuid binary to obtain root access. With root privileges, the attacker accessed /etc/shadow and /etc/passwd for credential dumping and performed offline password cracking.
      </VideoCaption>
    </VideoSection>
  );
};
