import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, 
    rgba(13, 17, 23, 0.95) 0%, 
    rgba(0, 0, 0, 0.9) 100%);
  backdrop-filter: blur(10px);
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 2rem 0;
  text-align: center;
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    margin-top: 3rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
    margin-top: 2rem;
  }
`;

const CitationSection = styled.div`
  max-width: 1000px;
  margin: 0 auto 3rem auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const CitationTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #4fc3f7 0%, #7c4dff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
`;

const CitationContainer = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(13, 17, 23, 0.9) 0%, 
    rgba(22, 27, 34, 0.8) 100%);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const CitationText = styled.pre`
  color: ${props => props.theme.colors.text};
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding-right: 4rem;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding-right: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding-right: 2.5rem;
    line-height: 1.5;
  }
`;

const CopyButton = styled(motion.button)<{ copied: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.copied 
    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    : 'linear-gradient(135deg, #1e3a8a 0%, #581c87 100%)'
  };
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    background: ${props => props.copied 
      ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
      : 'linear-gradient(135deg, #1e40af 0%, #6d28d9 100%)'
    };
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
    top: 0.75rem;
    right: 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 0.7rem;
    font-size: 0.8rem;
    top: 0.5rem;
    right: 0.5rem;
  }
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    letter-spacing: 0.3px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    letter-spacing: 0.2px;
  }
`;

const citationText = `@misc{luo2025codeagentendtoendhacker,
      title={Code Agent can be an End-to-end System Hacker: Benchmarking Real-world Threats of Computer-use Agent}, 
      author={Weidi Luo and Qiming Zhang and Tianyu Lu and Xiaogeng Liu and Bin Hu and Hung-Chun Chiu and Siyuan Ma and Yizhe Zhang and Xusheng Xiao and Yinzhi Cao and Zhen Xiang and Chaowei Xiao},
      year={2025},
      eprint={2510.06607},
      archivePrefix={arXiv},
      primaryClass={cs.CR},
      url={https://arxiv.org/abs/2510.06607}, 
}`;

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
  };

  return (
    <FooterContainer>
      <CitationSection>
        <CitationTitle>Citation</CitationTitle>
        <CitationContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <CitationText>{citationText}</CitationText>
          <CopyButton
            copied={copied}
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>
                <span>✓</span> Copied!
              </>
            ) : (
              <>
                <span>📋</span> Copy
              </>
            )}
          </CopyButton>
        </CitationContainer>
      </CitationSection>
      
      <FooterText>
        Computer-Used Agent Security Research
      </FooterText>
    </FooterContainer>
  );
};
