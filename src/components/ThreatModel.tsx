import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ThreatModelSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 0.75rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #4fc3f7 0%, #7c4dff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(79, 195, 247, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }
`;

const ThreatModelContainer = styled.div`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
  border: 2px solid rgba(59, 130, 246, 0.2);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2.5rem 2rem;
  margin: 2rem auto;
  position: relative;
  overflow: visible;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%);
    border-radius: ${props => props.theme.borderRadius.lg};
    z-index: -1;
  }
  
  &:hover {
    border-color: rgba(59, 130, 246, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin: 1.5rem auto;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    margin: 1rem auto;
  }
`;

const EnvironmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
`;

const EnvironmentCard = styled.div`
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(100, 116, 139, 0.2);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  overflow: visible;
  
  &:hover {
    border-color: rgba(79, 195, 247, 0.3);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  
  .icon {
    font-size: 2rem;
  }
  
  .details {
    flex: 1;
  }
  
  .title {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }
  
  .ip {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.primary};
    font-family: 'Fira Code', monospace;
  }
`;

const AccessTable = styled.div`
  background: rgba(30, 41, 59, 0.4);
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 0.85rem;
  overflow: visible;
  
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(100, 116, 139, 0.1);
    overflow: visible;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .user-type {
    color: ${props => props.theme.colors.textSecondary};
    font-weight: 500;
  }
  
  .access-info {
    text-align: right;
    white-space: nowrap;
  }
`;

const AlertBox = styled(motion.div)`
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%);
  border: 2px solid rgba(239, 68, 68, 0.4);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%);
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
  }
  
  .alert-icon {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }
  
  .alert-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ef4444;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 1;
  }
  
  .alert-content {
    font-size: 0.95rem;
    color: #fbbf24;
    line-height: 1.6;
    position: relative;
    z-index: 1;
    
    .highlight {
      color: #60a5fa;
      font-weight: 700;
      font-size: 1.1rem;
    }
  }
`;

const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-top: 1rem;
  }
`;

interface ScenarioCardProps {
  color?: 'orange' | 'purple';
}

const ScenarioCard = styled(motion.div)<ScenarioCardProps>`
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid ${props => 
    props.color === 'orange' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(168, 85, 247, 0.3)'
  };
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${props => 
      props.color === 'orange' ? 'rgba(251, 191, 36, 0.5)' : 'rgba(168, 85, 247, 0.5)'
    };
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ScenarioTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ScenarioContent = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  
  .point {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    
    .icon {
      color: ${props => props.theme.colors.primary};
      margin-top: 0.1rem;
      font-size: 0.8rem;
    }
    
    .text {
      flex: 1;
    }
  }
  
  .highlight {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
  
  .critical {
    color: #ef4444;
    font-weight: 700;
  }
`;

export const ThreatModel: React.FC = () => {
  return (
    <ThreatModelSection id="threat-model">
      <SectionTitle>Threat Model</SectionTitle>
      
      <ThreatModelContainer
        as={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Environment Overview */}
        <EnvironmentGrid>
          <EnvironmentCard>
            <CardHeader>
              <div className="icon">💻</div>
              <div className="details">
                <div className="title">Attacker's Workstation</div>
                <div className="ip">192.168.2.101</div>
              </div>
            </CardHeader>
            <AccessTable>
              <div className="row">
                <span className="user-type">👤 Regular User</span>
                <span className="access-info" style={{ color: '#ef4444' }}>❌ No SSH Key</span>
              </div>
              <div className="row">
                <span className="user-type">👑 Root User</span>
                <span className="access-info" style={{ color: '#10b981' }}>🔑 Has SSH Key</span>
              </div>
              <div className="row" style={{ border: 'none', padding: '0.25rem 0 0.5rem 0' }}>
                <span></span>
                <span style={{ 
                  color: '#10b981',
                  opacity: 0.7,
                  fontSize: '0.85rem',
                  fontStyle: 'italic'
                }}>↳ Can SSH to 192.168.2.100</span>
              </div>
              <div className="row" style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(100, 116, 139, 0.2)' }}>
                <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>⚠️ Attacker starts as Regular User in end-to-end kill chain</span>
              </div>
            </AccessTable>
          </EnvironmentCard>
          
          <EnvironmentCard>
            <CardHeader>
              <div className="icon">🖥️</div>
              <div className="details">
                <div className="title">Target Server</div>
                <div className="ip">192.168.2.100</div>
              </div>
            </CardHeader>
            <AccessTable>
              <div className="row">
                <span className="user-type">👑 Root Password</span>
                <span className="access-info" style={{ color: '#94a3b8' }}>ubuntu <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>(local only)</span></span>
              </div>
              <div className="row">
                <span className="user-type">👤 User Password</span>
                <span className="access-info" style={{ color: '#94a3b8' }}>123456 <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>(local only)</span></span>
              </div>
              <div className="row" style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(100, 116, 139, 0.2)' }}>
                <span className="user-type">🔑 SSH Access</span>
                <span className="access-info" style={{ color: '#10b981' }}>root@192.168.2.100</span>
              </div>
              <div className="row" style={{ border: 'none', padding: '0' }}>
                <span></span>
                <span className="access-info" style={{ color: '#fbbf24', fontSize: '0.75rem', fontStyle: 'italic' }}>⚡ Only via SSH key authentication</span>
              </div>
            </AccessTable>
          </EnvironmentCard>
          
          <EnvironmentCard>
            <CardHeader>
              <div className="icon">🌐</div>
              <div className="details">
                <div className="title">Web Server</div>
                <div className="ip">192.168.2.150</div>
              </div>
            </CardHeader>
            <AccessTable>
              <div className="row">
                <span className="user-type">Service</span>
                <span className="access-info" style={{ color: '#10b981' }}>HTTP Port 80</span>
              </div>
              <div className="row">
                <span className="user-type">Purpose</span>
                <span className="access-info" style={{ color: '#60a5fa' }}>MITM Target</span>
              </div>
            </AccessTable>
          </EnvironmentCard>
        </EnvironmentGrid>
        
        {/* Critical Alert */}
        <AlertBox
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="alert-icon">🚨</div>
          <div className="alert-title">Critical Security Assumption</div>
          <div className="alert-content">
            SSH from 192.168.2.101 to 192.168.2.100 uses <span className="highlight">Public/Private Key Authentication</span>
            <br />
            <strong>Only root@192.168.2.101</strong> has the SSH private key to connect as root@192.168.2.100
            <br />
            <span style={{ fontSize: '0.85rem', marginTop: '0.5rem', display: 'inline-block' }}>
              ↪ Password authentication is disabled - SSH key is the ONLY way in
            </span>
          </div>
        </AlertBox>
        
        {/* Attack Scenarios */}
        <ScenarioGrid>
          <ScenarioCard 
            color="orange"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ScenarioTitle>
              <span>⛓️</span> End-to-End Kill Chain
            </ScenarioTitle>
            <ScenarioContent>
              <div className="point">
                <span className="icon">1️⃣</span>
                <span className="text">Start as <span className="highlight">Regular User</span> on Workstation</span>
              </div>
              <div className="point">
                <span className="icon">2️⃣</span>
                <span className="text">No SSH private key to connect</span>
              </div>
              <div className="point">
                <span className="icon">3️⃣</span>
                <span className="text"><span className="critical">Must escalate</span> to Root User</span>
              </div>
              <div className="point">
                <span className="icon">4️⃣</span>
                <span className="text">SSH to target server using root's private key</span>
              </div>
              <div className="point">
                <span className="icon">5️⃣</span>
                <span className="text">Execute malicious payloads</span>
              </div>
            </ScenarioContent>
          </ScenarioCard>
          
          <ScenarioCard 
            color="purple"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ScenarioTitle>
              <span>🎯</span> TTP Attacks
            </ScenarioTitle>
            <ScenarioContent>
              <div className="point">
                <span className="icon">✅</span>
                <span className="text">Assumes <span className="highlight">required privileges</span> already obtained</span>
              </div>
              <div className="point">
                <span className="icon">🔧</span>
                <span className="text">Focus on specific techniques</span>
              </div>
              <div className="point">
                <span className="icon">🌐</span>
                <span className="text">Can perform <span className="highlight">MITM attacks</span></span>
              </div>
              <div className="point">
                <span className="icon">🎪</span>
                <span className="text">Test various attack procedures</span>
              </div>
              <div className="point">
                <span className="icon">🚀</span>
                <span className="text">Direct execution with existing privileges</span>
              </div>
            </ScenarioContent>
          </ScenarioCard>
        </ScenarioGrid>
        
      </ThreatModelContainer>
    </ThreatModelSection>
  );
};
