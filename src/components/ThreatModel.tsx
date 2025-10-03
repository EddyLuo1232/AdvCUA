import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ThreatModelSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
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
`;

const EnvironmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const EnvironmentCard = styled.div`
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(100, 116, 139, 0.2);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
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
  
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(100, 116, 139, 0.1);
    
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

const NetworkDiagram = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) auto minmax(200px, 1fr) minmax(200px, 1fr);
  gap: 1.25rem;
  margin: 3rem 0;
  align-items: center;
  padding: 0 1rem;
  position: relative;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0;
  }
`;

interface NetworkNodeProps {
  type?: 'workstation' | 'server' | 'connection';
  serverType?: 'web';
}

const NetworkNode = styled(motion.div)<NetworkNodeProps>`
  background: ${props => {
    switch(props.type) {
      case 'workstation':
        return 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)';
      case 'server':
        return props.serverType === 'web' 
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)';
      case 'connection':
        return 'none';
      default:
        return 'rgba(30, 41, 59, 0.6)';
    }
  }};
  border: ${props => props.type === 'connection' ? 'none' : '2px solid'};
  border-color: ${props => {
    switch(props.type) {
      case 'workstation':
        return 'rgba(59, 130, 246, 0.3)';
      case 'server':
        return props.serverType === 'web' 
          ? 'rgba(16, 185, 129, 0.3)'
          : 'rgba(239, 68, 68, 0.3)';
      default:
        return 'rgba(100, 116, 139, 0.3)';
    }
  }};
  border-radius: ${props => props.type === 'connection' ? '0' : props.theme.borderRadius.lg};
  padding: ${props => props.type === 'connection' ? '0' : '1.5rem'};
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  
  ${props => props.type !== 'connection' && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      border-color: ${props.type === 'workstation' ? 'rgba(59, 130, 246, 0.5)' : 
                     props.serverType === 'web' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'};
    }
  `}
`;

const NodeIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 0 20px rgba(79, 195, 247, 0.3));
`;

const NodeTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const NodeIP = styled.div`
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.75rem;
  font-weight: 500;
`;

const NodeDescription = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.5;
`;

const ConnectionArrow = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  opacity: 0.6;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
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
                <span className="access-info" style={{ color: '#10b981' }}>✅ Can Login</span>
              </div>
              <div className="row">
                <span className="user-type">👑 Root User</span>
                <span className="access-info" style={{ color: '#10b981' }}>✅ Can Login + Has SSH Key</span>
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
                <span className="user-type">From Root User</span>
                <span className="access-info" style={{ color: '#10b981' }}>🔑 SSH Key Authentication</span>
              </div>
              <div className="row">
                <span className="user-type">From Regular User</span>
                <span className="access-info" style={{ color: '#ef4444' }}>❌ No SSH Key - Cannot Connect</span>
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
            SSH to root@192.168.2.100 uses <span className="highlight">Public/Private Key Authentication</span>
            <br />
            Only the <strong>root user's private key</strong> can establish connection!
            <br />
            <span style={{ fontSize: '0.85rem', marginTop: '0.5rem', display: 'inline-block' }}>
              ↪ Regular users have NO SSH keys - They CANNOT connect at all
            </span>
          </div>
        </AlertBox>
        
        {/* Network Diagram */}
        <NetworkDiagram>
          <NetworkNode 
            type="workstation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NodeIcon>💻</NodeIcon>
            <NodeTitle>Workstation</NodeTitle>
            <NodeIP>192.168.2.101</NodeIP>
            <NodeDescription>
              CUA Framework Installed
              <br />
              <span style={{ color: '#10b981', fontSize: '0.75rem' }}>
                Root has SSH private key
              </span>
              <br />
              <span style={{ color: '#fbbf24', fontWeight: 600 }}>
                Attacker starts here as User
              </span>
            </NodeDescription>
          </NetworkNode>
          
          <NetworkNode 
            type="connection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ConnectionArrow>→</ConnectionArrow>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              SSH Key-Based Auth
            </div>
          </NetworkNode>
          
          <NetworkNode 
            type="server"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <NodeIcon>🖥️</NodeIcon>
            <NodeTitle>Target Server</NodeTitle>
            <NodeIP>192.168.2.100</NodeIP>
            <NodeDescription>
              Vulnerable System
              <br />
              <span style={{ color: '#ef4444', fontWeight: 600 }}>
                Requires Root Access
              </span>
            </NodeDescription>
          </NetworkNode>
          
          <NetworkNode 
            type="server"
            serverType="web"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <NodeIcon>🌐</NodeIcon>
            <NodeTitle>Web Server</NodeTitle>
            <NodeIP>192.168.2.150</NodeIP>
            <NodeDescription>
              HTTP Service
              <br />
              <span style={{ color: '#10b981', fontWeight: 600 }}>
                MITM Attack Target
              </span>
            </NodeDescription>
          </NetworkNode>
        </NetworkDiagram>
        
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
