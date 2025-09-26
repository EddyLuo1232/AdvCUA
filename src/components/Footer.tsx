import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, 
    rgba(13, 17, 23, 0.95) 0%, 
    rgba(0, 0, 0, 0.9) 100%);
  backdrop-filter: blur(10px);
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 2rem 0;
  text-align: center;
  margin-top: 4rem;
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: 500;
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>
        Computer-Used Agent Security Research
      </FooterText>
    </FooterContainer>
  );
};
