import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DemoSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
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

const SectionSubtitle = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const WarningText = styled.p`
  text-align: center;
  color: #ef4444;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const AttackTypeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AttackTypeButton = styled.button<{ active: boolean }>`
  padding: 1rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 2px solid ${props => props.active ? '#1e3a8a' : props.theme.colors.border};
  background: ${props => props.active 
    ? 'linear-gradient(135deg, rgba(30, 58, 138, 0.8) 0%, rgba(76, 29, 149, 0.6) 100%)' 
    : `linear-gradient(135deg, ${props.theme.colors.surface} 0%, ${props.theme.colors.surfaceLight} 100%)`};
  color: ${props => props.active ? props.theme.colors.text : props.theme.colors.text};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
  box-shadow: ${props => props.active ? '0 4px 20px rgba(30, 58, 138, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.active 
      ? '0 6px 25px rgba(30, 58, 138, 0.4)' 
      : '0 8px 25px rgba(79, 195, 247, 0.2)'};
    background: ${props => props.active 
      ? 'linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(76, 29, 149, 0.7) 100%)' 
      : `linear-gradient(135deg, ${props.theme.colors.surfaceLight} 0%, ${props.theme.colors.surfaceHover} 100%)`};
    
    &::before {
      transform: translateX(100%);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: transform 0.6s ease;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .attack-icon {
    font-size: 1.5rem;
    min-width: 1.5rem;
  }

  .attack-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .attack-name {
    font-size: 1rem;
    font-weight: 700;
  }

  .attack-description {
    font-size: 0.8rem;
    opacity: 0.85;
    line-height: 1.2;
  }
`;

const DemoContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  overflow: hidden;
`;

const DemoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const DemoInfo = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfoLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const InfoValue = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ControlButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.surfaceLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Terminal = styled.div`
  background-color: #1e1e1e;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 2rem;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  min-height: 400px;
  overflow-y: auto;
  position: relative;
`;

const TerminalContent = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  width: 100%;
`;

const RoundContainer = styled(motion.div)`
  margin-bottom: 1.5rem;
`;

const RoundHeader = styled(motion.div)`
  color: #60a5fa;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  text-align: center;
`;

const ThoughtBlock = styled(motion.div)`
  background-color: rgba(96, 165, 250, 0.1);
  border-left: 3px solid #60a5fa;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border-radius: 0 ${props => props.theme.borderRadius.sm} ${props => props.theme.borderRadius.sm} 0;
`;

const ActionBlock = styled(motion.div)`
  background-color: rgba(167, 139, 250, 0.1);
  border-left: 3px solid #a78bfa;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border-radius: 0 ${props => props.theme.borderRadius.sm} ${props => props.theme.borderRadius.sm} 0;
`;

const OutputBlock = styled(motion.div)`
  background-color: rgba(34, 197, 94, 0.1);
  border-left: 3px solid #22c55e;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border-radius: 0 ${props => props.theme.borderRadius.sm} ${props => props.theme.borderRadius.sm} 0;
  max-height: 200px;
  overflow-y: auto;
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: ${props => props.theme.colors.surface};
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%);
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
    border: 2px solid ${props => props.theme.colors.border};
    border-top: 2px solid ${props => props.theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const AttackerRequest = styled(motion.div)`
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
  border: 2px solid #ef4444;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '⚠️ ATTACKER REQUEST';
    position: absolute;
    top: 0.5rem;
    left: 1rem;
    font-size: 0.75rem;
    font-weight: 700;
    color: #ef4444;
    letter-spacing: 0.1em;
  }
`;

const RequestContent = styled.div`
  margin-top: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #fbbf24;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
`;

interface Round {
  number: number;
  thought: string;
  action: string;
  content: string;
  output: string;
}

interface DemoData {
  user_request: string;
  attempt: number;
  result: boolean;
  reason: string;
  cua_framework: string;
  model: string;
  token_usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  history: string;
  total_attempts?: number;
  successful_attempt?: number;
  total_token_usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  attack_type?: string;
  JSR?: boolean;
}

interface AttackType {
  id: string;
  name: string;
  description: string;
  icon: string;
  dataFile: string;
}

const attackTypes: AttackType[] = [
  {
    id: 'dns_spoofing',
    name: 'DNS Spoofing',
    description: 'DHCP + DNS spoofing attack demonstration',
    icon: '🌐',
    dataFile: `${process.env.PUBLIC_URL || ''}/demo.json`
  },
  {
    id: 'traffic_hijacking',
    name: 'Traffic Hijacking',
    description: 'Man-in-the-middle traffic interception',
    icon: '🕷️',
    dataFile: `${process.env.PUBLIC_URL || ''}/traffic_hijacking_demo.json`
  },
  {
    id: 'installer_packages',
    name: 'Installer Packages',
    description: 'Malicious installer packages execution',
    icon: '📦',
    dataFile: `${process.env.PUBLIC_URL || ''}/installer_packages_demo.json`
  },
  {
    id: 'udev_rules',
    name: 'Udev Rules',
    description: 'Device event persistence via udev rules',
    icon: '⚙️',
    dataFile: `${process.env.PUBLIC_URL || ''}/udev_rules_demo.json`
  }
];

const parseHistory = (history: string): Round[] => {
  const rounds: Round[] = [];
  // Split by Round headers and process each section
  const sections = history.split(/(?==== Round \d+ ===)/);
  
  sections.forEach(section => {
    const roundMatch = section.match(/=== Round (\d+) ===/);
    if (!roundMatch) return;
    
    const roundNumber = parseInt(roundMatch[1]);
    const roundContent = section;
    
    const thought = roundContent.match(/🧠 Agent thought: (.*?)(?=\n⚡|$)/s)?.[1]?.trim() || '';
    const action = roundContent.match(/⚡ Agent action: (.*?)(?=\n📝|\n💻|$)/s)?.[1]?.trim() || '';
    const content = roundContent.match(/📝 Agent content: (.*?)(?=\n💻|$)/s)?.[1]?.trim() || '';
    const output = roundContent.match(/💻 Environment output: ([\s\S]*?)(?=\n\n=== Round|$)/s)?.[1]?.trim() || '';
    
    rounds.push({
      number: roundNumber,
      thought,
      action,
      content,
      output
    });
  });
  
  return rounds;
};

export const Demo: React.FC = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [demoData, setDemoData] = useState<Round[]>([]);
  const [currentDemoInfo, setCurrentDemoInfo] = useState<DemoData | null>(null);
  const [showRequest, setShowRequest] = useState(true);
  const [selectedAttackType, setSelectedAttackType] = useState<string>('dns_spoofing');
  const [isLoading, setIsLoading] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const demoSectionRef = useRef<HTMLDivElement>(null);

  const loadDemoData = async (attackTypeId: string) => {
    setIsLoading(true);
    const attackType = attackTypes.find(type => type.id === attackTypeId);
    if (!attackType) return;

    try {
      const response = await fetch(attackType.dataFile);
      const data = await response.json();
      console.log('Loaded data:', data); // Debug log
      
      // Handle both array and object formats
      const demoItem: DemoData = Array.isArray(data) ? data[0] : data;
      const history = demoItem.history;
      
      if (!history) {
        console.error('No history found in data');
        return;
      }
      
      // Store complete demo info
      setCurrentDemoInfo(demoItem);
      
      const parsedRounds = parseHistory(history);
      console.log('Parsed rounds:', parsedRounds); // Debug log
      setDemoData(parsedRounds);
      
      // Reset demo state
      setCurrentRound(0);
      setShowRequest(true);
    } catch (error) {
      console.error('Error loading demo data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDemoData(selectedAttackType);
  }, [selectedAttackType]);

  useEffect(() => {
    // Auto-scroll terminal to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentRound]);

  const handlePrevious = () => {
    if (showRequest) {
      setShowRequest(false);
      return;
    }
    if (currentRound > 0) {
      setCurrentRound(prev => prev - 1);
    } else {
      setShowRequest(true);
    }
  };

  const handleNext = () => {
    if (showRequest) {
      setShowRequest(false);
      return;
    }
    if (currentRound < demoData.length - 1) {
      setCurrentRound(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentRound(0);
    setShowRequest(true);
    
    // Auto scroll to demo section
    if (demoSectionRef.current) {
      demoSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const progress = demoData.length > 0 ? 
    (showRequest ? 0 : ((currentRound + 1) / demoData.length) * 100) : 0;
  
  const currentAttackType = attackTypes.find(type => type.id === selectedAttackType);

  return (
    <DemoSection id="demo" ref={demoSectionRef}>
      <SectionTitle>Attack Demo</SectionTitle>
      <SectionSubtitle>
        Watch how the agent executes various cyber attacks through terminal interactions
      </SectionSubtitle>
      <WarningText>
        ⚠️ Dangerous Behavior - Do Not Imitate
      </WarningText>
      
      <AttackTypeSelector>
        {attackTypes.map((attackType) => (
          <AttackTypeButton
            key={attackType.id}
            active={selectedAttackType === attackType.id}
            onClick={() => setSelectedAttackType(attackType.id)}
            disabled={isLoading}
          >
            <span className="attack-icon">{attackType.icon}</span>
            <div className="attack-info">
              <div className="attack-name">{attackType.name}</div>
              <div className="attack-description">
                {attackType.description}
              </div>
            </div>
          </AttackTypeButton>
        ))}
      </AttackTypeSelector>
      
      <DemoContainer>
        <DemoHeader>
          <DemoInfo>
            <InfoItem>
              <InfoLabel>Attack Type</InfoLabel>
              <InfoValue>
                {currentAttackType?.icon} {currentAttackType?.name || 'Loading...'}
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>CUA Framework</InfoLabel>
              <InfoValue>
                {currentDemoInfo?.cua_framework || 'Loading...'}
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Model</InfoLabel>
              <InfoValue>
                {currentDemoInfo?.model || 'Loading...'}
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Steps</InfoLabel>
              <InfoValue>{currentRound + 1} / {demoData.length}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Status</InfoLabel>
              <InfoValue style={{ color: !showRequest && currentRound === demoData.length - 1 ? '#10b981' : '#f59e0b' }}>
                {showRequest ? 'Request' : currentRound === demoData.length - 1 ? 'Completed' : `Round ${currentRound + 1}`}
              </InfoValue>
            </InfoItem>
          </DemoInfo>
          
          <ControlButtons>
            <ControlButton 
              onClick={handlePrevious} 
              disabled={showRequest && currentRound === 0}
            >
              <span>⏮️</span> Previous
            </ControlButton>
            <ControlButton 
              onClick={handleNext} 
              disabled={!showRequest && currentRound === demoData.length - 1}
            >
              <span>⏭️</span> Next
            </ControlButton>
            <ControlButton onClick={handleReset}>
              <span>🔄</span> Reset
            </ControlButton>
          </ControlButtons>
        </DemoHeader>
        
        <Terminal ref={terminalRef}>
          <TerminalContent>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingIndicator key="loading">
                  Loading {currentAttackType?.name} demo...
                </LoadingIndicator>
              ) : showRequest && currentDemoInfo?.user_request ? (
                <AttackerRequest
                  key="attacker-request"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                >
                  <RequestContent>{currentDemoInfo.user_request}</RequestContent>
                </AttackerRequest>
              ) : demoData.length > 0 && !showRequest ? (
                <RoundContainer
                  key={`round-${currentRound}`}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.95 }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                >
                  <RoundHeader
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    === Round {demoData[currentRound].number} ===
                  </RoundHeader>
                  
                  <ThoughtBlock
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.4, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <strong>🧠 Agent thought:</strong> {demoData[currentRound].thought}
                  </ThoughtBlock>
                  
                  <ActionBlock
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.8, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <strong>⚡ Agent action:</strong> {demoData[currentRound].action}
                    {demoData[currentRound].content && demoData[currentRound].content !== 'None' && (
                      <motion.div 
                        style={{ marginTop: '0.5rem' }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                      >
                        <strong>📝 Content:</strong>
                        <SyntaxHighlighter 
                          language="bash" 
                          style={vscDarkPlus}
                          customStyle={{
                            margin: '0.5rem 0',
                            padding: '0.5rem',
                            fontSize: '0.875rem',
                            borderRadius: '4px'
                          }}
                        >
                          {demoData[currentRound].content}
                        </SyntaxHighlighter>
                      </motion.div>
                    )}
                  </ActionBlock>
                  
                  <OutputBlock
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 1.6, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <strong>💻 Environment output:</strong>
                    <motion.pre 
                      style={{ margin: '0.5rem 0', fontSize: '0.8rem' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2, duration: 0.5 }}
                    >
                      {demoData[currentRound].output || 'No output'}
                    </motion.pre>
                  </OutputBlock>
                </RoundContainer>
              ) : null}
            </AnimatePresence>
          </TerminalContent>
        </Terminal>
        
        <ProgressBar>
          <ProgressFill
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </ProgressBar>
      </DemoContainer>
    </DemoSection>
  );
};
