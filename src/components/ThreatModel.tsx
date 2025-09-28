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

const NetworkDiagram = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) auto minmax(200px, 1fr) minmax(200px, 1fr);
  gap: 1.25rem;
  margin: 2rem 0;
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

const NetworkNode = styled(motion.div)<{ type: 'workstation' | 'server' | 'webserver' | 'connection'; serverType?: 'target' | 'web' }>`
  background: ${props => {
    if (props.type === 'connection') return 'transparent';
    if (props.serverType === 'web') return 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.3) 100%)';
    return 'linear-gradient(135deg, rgba(30, 58, 138, 0.6) 0%, rgba(21, 94, 117, 0.6) 100%)';
  }};
  border: ${props => {
    if (props.type === 'connection') return 'none';
    if (props.serverType === 'web') return '2px solid rgba(16, 185, 129, 0.5)';
    return '2px solid rgba(59, 130, 246, 0.5)';
  }};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.type === 'connection' ? '0' : '2rem 1.5rem'};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: ${props => props.type === 'connection' ? 'auto' : '240px'};
  width: 100%;
  transition: all 0.3s ease;
  
  ${props => props.type !== 'connection' && `
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props.serverType === 'web' 
        ? '0 4px 16px rgba(16, 185, 129, 0.2)' 
        : '0 4px 16px rgba(59, 130, 246, 0.2)'};
      border-color: ${props.serverType === 'web' 
        ? 'rgba(16, 185, 129, 0.6)' 
        : 'rgba(59, 130, 246, 0.6)'};
    }
  `}
`;

const NodeIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 0.5rem;
`;

const NodeTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const NodeIP = styled.div`
  font-size: 0.9rem;
  color: #60a5fa;
  font-family: 'Consolas', 'Monaco', monospace;
`;

const NodeDescription = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 0.5rem;
  line-height: 1.4;
  word-wrap: break-word;
  max-width: 100%;
  padding: 0 0.5rem;
`;

const ConnectionArrow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  font-size: 3rem;
  position: relative;
  min-width: 120px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    transform: rotate(90deg);
    margin: 2rem 0;
  }
`;

const ThreatScenarios = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ScenarioCard = styled(motion.div)<{ color: 'orange' | 'purple' }>`
  background: ${props => props.color === 'orange' 
    ? 'rgba(251, 146, 60, 0.08)'
    : 'rgba(147, 51, 234, 0.08)'};
  border: 2px solid ${props => props.color === 'orange' 
    ? 'rgba(251, 146, 60, 0.3)' 
    : 'rgba(147, 51, 234, 0.3)'};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.color === 'orange' 
      ? 'rgba(251, 146, 60, 0.5)' 
      : 'rgba(147, 51, 234, 0.5)'};
    background: ${props => props.color === 'orange' 
      ? 'rgba(251, 146, 60, 0.12)'
      : 'rgba(147, 51, 234, 0.12)'};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.color === 'orange' ? '#fb923c' : '#9333ea'};
    opacity: 0.6;
  }
`;

const ScenarioTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ScenarioContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  
  ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }
  
  li {
    margin: 0.25rem 0;
  }
  
  .highlight {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
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
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            Network Access Control & Attack Surface
          </p>
          <p style={{ color: '#f87171', fontSize: '0.85rem', fontWeight: 600 }}>
            ⚠️ Only Root User on Workstation can SSH to root@192.168.2.100
          </p>
          <p style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            🌐 Web Server (192.168.2.150) - Independent target for MITM attacks
          </p>
        </div>
        
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
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
                Attacker: <span style={{ color: '#60a5fa', fontWeight: 600 }}>Regular User</span> or <span style={{ color: '#10b981', fontWeight: 600 }}>Root User</span>
              </div>
              <span style={{ color: '#fbbf24', fontWeight: 600, display: 'inline-block', marginTop: '0.25rem', fontSize: '0.7rem' }}>
                ⚠️ Kill Chain: Starts as Regular User
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
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#ef4444', fontWeight: 600 }}>
                SSH Access
              </div>
              <div style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '0.25rem' }}>
                Only Root User can access
              </div>
              <div style={{ fontSize: '0.7rem', color: '#fbbf24', marginTop: '0.25rem', fontStyle: 'italic' }}>
                root@192.168.2.100
              </div>
            </div>
          </NetworkNode>
          
          <NetworkNode 
            type="server"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <NodeIcon>🖥️</NodeIcon>
            <NodeTitle>Server</NodeTitle>
            <NodeIP>192.168.2.100</NodeIP>
            <NodeDescription>
              Target System
              <br />
              <span style={{ color: '#ef4444', fontWeight: 600 }}>root@192.168.2.100</span>
              <br />
              <span style={{ color: '#fbbf24', fontSize: '0.7rem', marginTop: '0.25rem', display: 'inline-block' }}>
                🔒 Root Access Only
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
              Independent Web Server
              <br />
              <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.75rem' }}>HTTP Service</span>
              <br />
              <span style={{ color: '#60a5fa', fontSize: '0.7rem', marginTop: '0.25rem', display: 'inline-block' }}>
                🕷️ MITM Attack Target
              </span>
            </NodeDescription>
          </NetworkNode>
        </NetworkDiagram>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem',
          marginBottom: '2rem',
          fontSize: '0.85rem',
          color: '#64748b'
        }}>
          <p style={{ fontStyle: 'italic' }}>
            💡 Note: The Web Server (192.168.2.150) is an independent service used for MITM attack demonstrations.
            <br />
            It operates separately from the main SSH attack path (Workstation → Server).
          </p>
        </div>
        
        <ThreatScenarios>
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
              <ul>
                <li>Workstation can have <span className="highlight">Regular User</span> or <span className="highlight">Root User</span></li>
                <li>Attacker starts as <span className="highlight">Regular User</span> without root permissions</li>
                <li>Must perform <span className="highlight">privilege escalation</span> to become Root User</li>
                <li>Only Root User on workstation can SSH to root@192.168.2.100</li>
                <li>Complete attack chain: Regular User → Root User → SSH → Target Server</li>
              </ul>
            </ScenarioContent>
          </ScenarioCard>
          
          <ScenarioCard 
            color="purple"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ScenarioTitle>
              <span>🎯</span> TTP (Tactics, Techniques, Procedures)
            </ScenarioTitle>
            <ScenarioContent>
              <ul>
                <li>Assumes attacker <span className="highlight">already has</span> required privileges</li>
                <li>May already be Root User on workstation or have necessary access</li>
                <li>Focuses on specific attack techniques and procedures</li>
                <li>Direct execution of targeted operations</li>
                <li>Can perform <span className="highlight">MITM attacks</span> between servers (192.168.2.100 ↔ 192.168.2.150)</li>
                <li>No privilege escalation needed - direct SSH to root@192.168.2.100</li>
              </ul>
            </ScenarioContent>
          </ScenarioCard>
        </ThreatScenarios>
      </ThreatModelContainer>
    </ThreatModelSection>
  );
};
