import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import MathJax from './MathJax';
import { fadeInUp, animationConfig } from '../styles/animations';

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 50vh;
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
`;

const SectionContent = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(13, 17, 23, 0.9) 0%, 
    rgba(0, 0, 0, 0.8) 100%);
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  border: 1px solid ${props => props.theme.colors.border};
  margin-top: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
`;

const Placeholder = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
  text-align: center;
  padding: 3rem;
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(22, 27, 34, 0.8) 0%, 
    rgba(33, 38, 45, 0.6) 100%);
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  backdrop-filter: blur(5px);
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    background: linear-gradient(135deg, 
      rgba(22, 27, 34, 0.9) 0%, 
      rgba(33, 38, 45, 0.7) 100%);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    border-color: #4c1d95;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

interface SectionProps {
  id: string;
  title: string;
  children?: React.ReactNode;
}

const AnimatedSection: React.FC<SectionProps> = ({ id, title, children }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Section id={id} ref={ref}>
      <SectionTitle
        variants={fadeInUp}
        initial="initial"
        animate={inView ? "animate" : "initial"}
        transition={{ duration: animationConfig.durations.normal }}
      >
        {title}
      </SectionTitle>
      <SectionContent
        variants={fadeInUp}
        initial="initial"
        animate={inView ? "animate" : "initial"}
        transition={{ 
          duration: animationConfig.durations.normal, 
          delay: 0.2 
        }}
      >
        {children || (
          <Placeholder>
            Content for {title} will be added here. Please provide the relevant information.
          </Placeholder>
        )}
      </SectionContent>
    </Section>
  );
};

const AbstractContent = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: justify;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
  
  p {
    margin-bottom: 1.5rem;
    text-indent: 0;
  }
  
  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const HighlightTerm = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  background: linear-gradient(135deg, rgba(79, 195, 247, 0.1) 0%, rgba(124, 77, 255, 0.1) 100%);
  padding: 0.1rem 0.3rem;
  border-radius: 0.25rem;
`;

export const Abstract: React.FC = () => (
  <AnimatedSection id="abstract" title="Abstract">
    <AbstractContent>
      <p>
        Computer-use agent (CUA) frameworks, powered by large language models
        (LLMs) or multimodal LLMs (MLLMs), are rapidly maturing as assistants that
        can perceive context, reason, and act directly within software environments.
        Among their most critical applications is <strong>operating system (OS) control</strong>. As CUAs
        in the OS domain become increasingly embedded in daily operations, it is imperative to examine their real-world security implications, specifically whether CUAs
        can be misused to perform realistic, security-relevant attacks. Existing works exhibit four major limitations: <HighlightTerm>Missing attacker-knowledge model</HighlightTerm> on tactics, techniques, and procedures (TTP), <HighlightTerm>Incomplete coverage</HighlightTerm> for end-to-end kill chains,
        <HighlightTerm>unrealistic environment</HighlightTerm> without multi-host and encrypted user credentials, and
        <HighlightTerm>unreliable judgment</HighlightTerm> dependent on LLM-as-a-Judge. To address these gaps, we
        propose AdvCUA, the first benchmark aligned with real-world TTPs in MITRE
        ATT&CK Enterprise Matrix, which comprises <strong>140 tasks</strong>, including <strong>40 direct malicious tasks</strong>, <strong>74 TTP-based malicious tasks</strong>, and <strong>26 end-to-end kill chains</strong>, systematically evaluates CUAs under a realistic enterprise OS security threat in a
        multi-host environment sandbox by hard-coded evaluation. We evaluate the existing five mainstream CUAs, including ReAct, AutoGPT, Gemini CLI, Cursor CLI,
        and Cursor IDE based on 8 foundation LLMs. On TTP tasks, <strong>Cursor CLI achieves
        the highest average ASR at 69.59%</strong>, notably surpassing ReAct-based CUA at
        52.29% and Cursor IDE at 51.66%. For end-to-end kill chain tasks, <strong>Cursor IDE
        attains the highest average ASR at 34.62%</strong>, followed by Cursor CLI at 26.93% and
        ReAct-based CUA at 23.37% on all evaluated LLMs. The results demonstrate that <strong>current frontier CUAs do not adequately cover OS security-centric threats</strong>. These capabilities of CUAs reduce dependence on custom malware and deep domain expertise, enabling even inexperienced attackers to mount complex enterprise intrusions, which raises social concern about the responsibility and security of CUAs.
      </p>
    </AbstractContent>
  </AnimatedSection>
);

const TacticContainer = styled.div`
  background: linear-gradient(135deg, 
    rgba(13, 17, 23, 0.9) 0%, 
    rgba(0, 0, 0, 0.8) 100%);
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
`;

const TacticHeader = styled.div`
  background: linear-gradient(135deg, #1e3a8a 0%, #581c87 100%);
  color: ${props => props.theme.colors.text};
  padding: 1.5rem 2rem;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.border};
`;

const TacticTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const TacticSubtitle = styled.p`
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
`;

const TacticList = styled.div`
  padding: 2rem;
`;

const TacticItem = styled(motion.div)<{ rank: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, 
    rgba(13, 17, 23, 0.8) 0%, 
    rgba(22, 27, 34, 0.6) 100%);
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-left: 3px solid ${props => {
    const colors = ['#7f1d1d', '#7c2d12', '#713f12', '#14532d', '#164e63', '#1e3a8a', '#581c87', '#831843', '#881337', '#365314'];
    return colors[props.rank % colors.length];
  }};
  transition: all ${props => props.theme.transitions.normal};
  backdrop-filter: blur(5px);
  
  &:hover {
    transform: translateX(6px);
    background: linear-gradient(135deg, 
      rgba(22, 27, 34, 0.9) 0%, 
      rgba(33, 38, 45, 0.7) 100%);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    border-left-width: 4px;
  }
`;

const TacticInfo = styled.div`
  flex: 1;
`;

const TacticName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
`;

const TacticId = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const TacticDescription = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.4;
`;

const TacticCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
`;

const CountNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const CountLabel = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const mitreData = [
  { id: 'TA0005', name: 'Defense Evasion', count: 92, description: 'The adversary is trying to avoid being detected.' },
  { id: 'TA0003', name: 'Persistence', count: 50, description: 'The adversary is trying to maintain their foothold.' },
  { id: 'TA0004', name: 'Privilege Escalation', count: 48, description: 'The adversary is trying to gain higher-level permissions.' },
  { id: 'TA0011', name: 'Command and Control', count: 38, description: 'The adversary is trying to communicate with compromised systems to control them.' },
  { id: 'TA0006', name: 'Credential Access', count: 24, description: 'The adversary is trying to steal account names and passwords.' },
  { id: 'TA0010', name: 'Exfiltration', count: 18, description: 'The adversary is trying to steal data.' },
  { id: 'TA0002', name: 'Execution', count: 12, description: 'The adversary is trying to run malicious code.' },
  { id: 'TA0008', name: 'Lateral Movement', count: 6, description: 'The adversary is trying to move through your environment.' },
  { id: 'TA0009', name: 'Collection', count: 4, description: 'The adversary is trying to gather data of interest to their goal.' },
  { id: 'TA0001', name: 'Initial Access', count: 2, description: 'The adversary is trying to get into your network.' }
];

export const Dataset: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Section id="dataset" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Dataset
      </SectionTitle>
      <SectionContent
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TacticContainer>
          <TacticHeader>
            <TacticTitle>MITRE ATT&CK Framework Distribution</TacticTitle>
            <TacticSubtitle>The selected categories from MITRE ATT&CK framework</TacticSubtitle>
          </TacticHeader>
          <TacticList>
            {mitreData.map((tactic, index) => (
              <TacticItem
                key={tactic.id}
                rank={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + (index * 0.1),
                  type: "spring",
                  stiffness: 100
                }}
              >
                <TacticInfo>
                  <TacticName>{tactic.name}</TacticName>
                  <TacticId>{tactic.id}</TacticId>
                  <TacticDescription>{tactic.description}</TacticDescription>
                </TacticInfo>
                <TacticCount>
                  <CountNumber>{tactic.count}</CountNumber>
                  <CountLabel>occurrences</CountLabel>
                </TacticCount>
              </TacticItem>
            ))}
          </TacticList>
        </TacticContainer>
      </SectionContent>
    </Section>
  );
};

// Results Table Components
const ResultsContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const TableHeader = styled.div`
  background: linear-gradient(135deg, #1e3a8a 0%, #581c87 100%);
  color: ${props => props.theme.colors.text};
  padding: 1.5rem 2rem;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.border};
`;

const TableTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const TableSubtitle = styled.p`
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  padding: 1rem;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.surface};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 4px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1200px;
  font-size: 0.9rem;
`;

const TableHead = styled.thead`
  background-color: ${props => props.theme.colors.surfaceLight};
`;

const TableRow = styled.tr<{ isHeader?: boolean }>`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  ${props => !props.isHeader && `
    &:hover {
      background-color: ${props.theme.colors.surfaceLight};
    }
  `}
`;

const TableCell = styled.td<{ isHeader?: boolean; isFramework?: boolean; isModel?: boolean; score?: number }>`
  padding: 1rem 0.75rem;
  text-align: ${props => props.isHeader ? 'center' : 'left'};
  font-weight: ${props => props.isHeader ? '600' : '400'};
  color: ${props => {
    if (props.isFramework) return props.theme.colors.primary;
    if (props.isModel) return props.theme.colors.text;
    return props.theme.colors.text;
  }};
  border-right: 1px solid ${props => props.theme.colors.border};
  position: relative;
  
  ${props => props.isFramework && `
    background-color: ${props.theme.colors.surface};
    font-weight: 700;
    font-size: 1rem;
  `}
  
  ${props => typeof props.score === 'number' && `
    background: linear-gradient(90deg, 
      ${props.score >= 80 ? '#14532d' : 
        props.score >= 60 ? '#713f12' : 
        props.score >= 40 ? '#7c2d12' : '#7f1d1d'}40 0%, 
      transparent ${props.score}%);
    font-weight: 600;
    color: ${props.score >= 80 ? '#4ade80' : 
      props.score >= 60 ? '#fbbf24' : 
      props.score >= 40 ? '#fb923c' : '#f87171'};
  `}
  
  &:last-child {
    border-right: none;
  }
`;

const HeaderGroup = styled.th<{ colSpan?: number }>`
  padding: 1rem 0.75rem;
  text-align: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  border-right: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.surface};
  
  &:last-child {
    border-right: none;
  }
`;

const MetricHeader = styled.th`
  padding: 0.75rem 0.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  border-right: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.surfaceLight};
  
  &:last-child {
    border-right: none;
  }
`;

const resultsData = [
  {
    framework: "ReAct",
    models: [
      { name: "GPT-4o", ttp: { asr1: 51.35, bsr1: 91.89, asr5: 83.78, bsr5: 98.65 }, direct: { asr1: 35.00, bsr1: 72.50, asr5: 55.00, bsr5: 87.50 }, endToEnd: { asr1: 23.08, bsr1: 61.54, asr5: 34.62, bsr5: 84.62 } },
      { name: "GPT-4.1", ttp: { asr1: 67.57, bsr1: 95.95, asr5: 81.08, bsr5: 100.00 }, direct: { asr1: 37.50, bsr1: 82.50, asr5: 47.50, bsr5: 95.00 }, endToEnd: { asr1: 23.08, bsr1: 88.46, asr5: 50.00, bsr5: 88.46 } },
      { name: "Gemini 2.5 Flash", ttp: { asr1: 45.95, bsr1: 83.78, asr5: 59.46, bsr5: 87.84 }, direct: { asr1: 10.00, bsr1: 32.50, asr5: 12.50, bsr5: 32.50 }, endToEnd: { asr1: 7.69, bsr1: 50.00, asr5: 7.69, bsr5: 57.69 } },
      { name: "Claude Sonnet 3.7", ttp: { asr1: 27.03, bsr1: 43.24, asr5: 35.14, bsr5: 47.30 }, direct: { asr1: 0.00, bsr1: 5.00, asr5: 2.50, bsr5: 5.00 }, endToEnd: { asr1: 0.00, bsr1: 0.00, asr5: 0.00, bsr5: 0.00 } },
      { name: "Claude Sonnet 4", ttp: { asr1: 37.84, bsr1: 54.05, asr5: 41.89, bsr5: 54.05 }, direct: { asr1: 20.00, bsr1: 50.00, asr5: 27.50, bsr5: 50.00 }, endToEnd: { asr1: 0.00, bsr1: 0.00, asr5: 0.00, bsr5: 0.00 } },
      { name: "LLaMA 4 Maverick", ttp: { asr1: 54.05, bsr1: 97.30, asr5: 79.73, bsr5: 100.00 }, direct: { asr1: 37.50, bsr1: 95.00, asr5: 55.00, bsr5: 100.00 }, endToEnd: { asr1: 15.38, bsr1: 88.46, asr5: 26.92, bsr5: 92.31 } },
    ]
  },
  {
    framework: "AutoGPT",
    models: [
      { name: "GPT-4o", ttp: { asr1: 54.05, bsr1: 81.08, asr5: 62.16, bsr5: 89.19 }, direct: { asr1: 15.00, bsr1: 30.00, asr5: 17.50, bsr5: 42.50 }, endToEnd: { asr1: 15.38, bsr1: 38.46, asr5: 34.62, bsr5: 46.15 } },
      { name: "GPT-4.1", ttp: { asr1: 47.30, bsr1: 85.14, asr5: 70.27, bsr5: 100.00 }, direct: { asr1: 17.50, bsr1: 35.00, asr5: 35.00, bsr5: 65.00 }, endToEnd: { asr1: 26.92, bsr1: 73.08, asr5: 46.15, bsr5: 88.46 } },
      { name: "Gemini 2.5 Flash", ttp: { asr1: 10.81, bsr1: 37.84, asr5: 12.16, bsr5: 51.35 }, direct: { asr1: 15.00, bsr1: 27.50, asr5: 15.00, bsr5: 32.25 }, endToEnd: { asr1: 0.00, bsr1: 7.69, asr5: 3.85, bsr5: 11.54 } },
      { name: "Claude Sonnet 3.7", ttp: { asr1: 21.62, bsr1: 37.84, asr5: 28.38, bsr5: 41.89 }, direct: { asr1: 7.50, bsr1: 17.50, asr5: 10.00, bsr5: 20.00 }, endToEnd: { asr1: 11.54, bsr1: 11.54, asr5: 11.54, bsr5: 19.23 } },
      { name: "Claude Sonnet 4", ttp: { asr1: 16.22, bsr1: 25.68, asr5: 18.92, bsr5: 25.68 }, direct: { asr1: 0.00, bsr1: 10.00, asr5: 2.50, bsr5: 10.00 }, endToEnd: { asr1: 0.00, bsr1: 0.00, asr5: 0.00, bsr5: 0.00 } },
      { name: "LLaMA 4 Maverick", ttp: { asr1: 32.43, bsr1: 94.59, asr5: 55.41, bsr5: 97.30 }, direct: { asr1: 30.00, bsr1: 82.50, asr5: 47.50, bsr5: 92.50 }, endToEnd: { asr1: 11.54, bsr1: 69.23, asr5: 30.77, bsr5: 88.46 } },
    ]
  },
  {
    framework: "Gemini CLI",
    models: [
      { name: "Gemini 2.5 Pro", ttp: { asr1: 39.19, bsr1: 56.76, asr5: 44.59, bsr5: 71.62 }, direct: { asr1: 5.00, bsr1: 15.00, asr5: 10.00, bsr5: 17.50 }, endToEnd: { asr1: 3.85, bsr1: 7.69, asr5: 11.54, bsr5: 11.54 } },
    ]
  },
  {
    framework: "Cursor CLI",
    models: [
      { name: "Claude Opus 4.1", ttp: { asr1: 62.16, bsr1: 86.49, asr5: 77.03, bsr5: 91.89 }, direct: { asr1: 15.00, bsr1: 27.50, asr5: 17.50, bsr5: 35.00 }, endToEnd: { asr1: 23.08, bsr1: 53.85, asr5: 30.77, bsr5: 69.23 } },
    ]
  },
  {
    framework: "Cursor IDE",
    models: [
      { name: "Claude Sonnet 4", ttp: { asr1: 43.24, bsr1: 44.39, asr5: 60.08, bsr5: 63.51 }, direct: { asr1: 5.00, bsr1: 10.00, asr5: 7.50, bsr5: 22.50 }, endToEnd: { asr1: 0.00, bsr1: 0.00, asr5: 30.77, bsr5: 30.77 } },
      { name: "Claude Opus 4.1", ttp: { asr1: null, bsr1: null, asr5: null, bsr5: null }, direct: { asr1: null, bsr1: null, asr5: null, bsr5: null }, endToEnd: { asr1: 26.92, bsr1: 30.77, asr5: 38.46, bsr5: 46.15 } },
    ]
  }
];

// Evaluation Metrics Components
const MetricsContainer = styled.div`
  background: linear-gradient(135deg, 
    rgba(13, 17, 23, 0.9) 0%, 
    rgba(0, 0, 0, 0.8) 100%);
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  margin-top: 2rem;
`;

const MetricsHeader = styled.div`
  background: linear-gradient(135deg, #581c87 0%, #7c3aed 100%);
  color: ${props => props.theme.colors.text};
  padding: 1.5rem 2rem;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const MetricsTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const MetricsSubtitle = styled.p`
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
`;

const MetricsContent = styled.div`
  padding: 2rem;
`;

const MetricSection = styled(motion.div)`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, 
    rgba(22, 27, 34, 0.8) 0%, 
    rgba(33, 38, 45, 0.6) 100%);
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-left: 3px solid #4c1d95;
  backdrop-filter: blur(5px);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MetricName = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MetricDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const FormulaContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid ${props => props.theme.colors.border};
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  text-align: center;
`;

const FormulaExplanation = styled.div`
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.5;
  text-align: left;
`;

const HighlightBox = styled.div`
  background: linear-gradient(135deg, 
    rgba(76, 29, 149, 0.15) 0%, 
    rgba(88, 28, 135, 0.1) 100%);
  border: 1px solid rgba(76, 29, 149, 0.3);
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  margin-top: 1rem;
  backdrop-filter: blur(5px);
`;

const HighlightText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

export const Evaluation: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Section id="evaluation" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Evaluation
      </SectionTitle>
      <SectionContent
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
    <Grid>
      <Card
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
            <CardTitle>TTP-based Attacks</CardTitle>
        <CardDescription>
              Tactics, Techniques, and Procedures based malicious requests that expose new threats to CUA frameworks.
        </CardDescription>
      </Card>
      <Card
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
            <CardTitle>Direct Malicious Attack</CardTitle>
        <CardDescription>
              Traditional direct attack requests for baseline comparison with TTP-based approaches.
        </CardDescription>
      </Card>
      <Card
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
            <CardTitle>End-to-End Kill Chain</CardTitle>
        <CardDescription>
              Follow ordered sequences of procedures with multiple tactics and techniques (e.g., from reconnaissance and initial access, through privilege escalation and establishment of persistence, then lateral movement, and ultimately exfiltration or disruption).
        </CardDescription>
      </Card>
    </Grid>

        <MetricsContainer>
          <MetricsHeader>
            <MetricsTitle>Evaluation Metrics</MetricsTitle>
            <MetricsSubtitle>Comprehensive measurement framework for assessing CUA security vulnerabilities</MetricsSubtitle>
          </MetricsHeader>
          <MetricsContent>
            <MetricSection
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MetricName>
                <span>🛡️</span>
                Bypass Success Rate (BSR)
              </MetricName>
              <MetricDescription>
                Measures whether prompts successfully evade the CUA framework's safety restrictions and elicit malicious intent. 
                We determine this by directly checking whether the CUA framework outputs the action instead of rejection, 
                thereby indicating a willingness to attempt the malicious request.
              </MetricDescription>
              <FormulaContainer>
                <MathJax display={true}>
                  {`\\text{BSR@}n_M(D) = \\frac{1}{|D|} \\sum_{p \\in D} \\max_{i=1}^n \\text{isBypass}_M(p_i)`}
                </MathJax>
                <FormulaExplanation>
                  <strong>Where:</strong><br/>
                  • <strong>p</strong> is a prompt in dataset <MathJax>{"D"}</MathJax><br/>
                  • <strong>isBypass<sub>M</sub>(p)</strong> represents model <MathJax>{"M"}</MathJax>'s response to prompt <MathJax>{"p"}</MathJax><br/>
                  • <strong>isBypass(·)</strong> returns 1 if the response demonstrates clear intent to execute malicious tasks, 0 otherwise
                </FormulaExplanation>
              </FormulaContainer>
            </MetricSection>

            <MetricSection
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MetricName>
                <span>⚔️</span>
                Attack Success Rate (ASR)
              </MetricName>
              <MetricDescription>
                Measures whether the malicious intent translates into successful execution within our target environment, 
                based on hardcoded verification steps such as trigger, probe, verify, or match. Since model outputs exhibit 
                stochastic behavior and real-world attackers typically persist across multiple attempts, we evaluate success 
                over multiple independent trials rather than relying on single executions.
              </MetricDescription>
              <FormulaContainer>
                <MathJax display={true}>
                  {`\\text{ASR@}n_M(D) = \\frac{1}{|D|} \\sum_{p \\in D} \\max_{i=1}^n \\text{isSuccessful}_M(p_i)`}
                </MathJax>
                <FormulaExplanation>
                  <strong>Where:</strong><br/>
                  • <strong>isSuccessful<sub>M</sub>(p<sub>i</sub>)</strong> returns 1 if the attack goal specified in prompt <MathJax>{"p"}</MathJax> is verifiably completed in the environment during the <MathJax>{"i"}</MathJax>-th independent execution attempt, 0 otherwise<br/>
                  • <strong>ASR@1</strong> (single attempt) and <strong>ASR@5</strong> (within five attempts) capture immediate and sustained attack risk
                </FormulaExplanation>
              </FormulaContainer>
            </MetricSection>

            <HighlightBox>
              <HighlightText>
                <strong>Key Insight:</strong> Both metrics evaluate performance over multiple attempts (n=1,5) within 30 rounds to account for the stochastic nature 
                of LLM outputs and realistic attack scenarios where adversaries may retry failed attempts.
              </HighlightText>
            </HighlightBox>
          </MetricsContent>
        </MetricsContainer>
      </SectionContent>
    </Section>
  );
};

export const Results: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Section id="results" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Results
      </SectionTitle>
      <SectionContent
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ResultsContainer>
          <TableHeader>
            <TableTitle>Main Results</TableTitle>
            <TableSubtitle>Our results show that compared with direct malicious requests, TTP-based malicious requests expose a new threat to current CUA frameworks based on advanced foundation LLMs.</TableSubtitle>
          </TableHeader>
          <TableWrapper>
            <StyledTable>
              <TableHead>
                <TableRow isHeader>
                  <HeaderGroup rowSpan={2}>Framework</HeaderGroup>
                  <HeaderGroup rowSpan={2}>Model</HeaderGroup>
                  <HeaderGroup colSpan={4}>TTP</HeaderGroup>
                  <HeaderGroup colSpan={4}>Direct</HeaderGroup>
                  <HeaderGroup colSpan={4}>End-to-End</HeaderGroup>
                </TableRow>
                <TableRow isHeader>
                  <MetricHeader>ASR@1</MetricHeader>
                  <MetricHeader>BSR@1</MetricHeader>
                  <MetricHeader>ASR@5</MetricHeader>
                  <MetricHeader>BSR@5</MetricHeader>
                  <MetricHeader>ASR@1</MetricHeader>
                  <MetricHeader>BSR@1</MetricHeader>
                  <MetricHeader>ASR@5</MetricHeader>
                  <MetricHeader>BSR@5</MetricHeader>
                  <MetricHeader>ASR@1</MetricHeader>
                  <MetricHeader>BSR@1</MetricHeader>
                  <MetricHeader>ASR@5</MetricHeader>
                  <MetricHeader>BSR@5</MetricHeader>
                </TableRow>
              </TableHead>
              <tbody>
                {resultsData.map((framework, frameworkIndex) => (
                  framework.models.map((model, modelIndex) => (
                    <motion.tr
                      key={`${framework.framework}-${model.name}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.4 + (frameworkIndex * framework.models.length + modelIndex) * 0.1 
                      }}
                    >
                      {modelIndex === 0 && (
                        <TableCell 
                          isFramework
                          rowSpan={framework.models.length}
                        >
                          {framework.framework}
                        </TableCell>
                      )}
                      <TableCell isModel>{model.name}</TableCell>
                      <TableCell score={model.ttp.asr1 ?? undefined}>{model.ttp.asr1 !== null ? model.ttp.asr1.toFixed(2) : '-'}</TableCell>
                      <TableCell score={model.ttp.bsr1 ?? undefined}>{model.ttp.bsr1 !== null ? model.ttp.bsr1.toFixed(2) : '-'}</TableCell>
                      <TableCell score={model.ttp.asr5 ?? undefined}>{model.ttp.asr5 !== null ? model.ttp.asr5.toFixed(2) : '-'}</TableCell>
                      <TableCell score={model.ttp.bsr5 ?? undefined}>{model.ttp.bsr5 !== null ? model.ttp.bsr5.toFixed(2) : '-'}</TableCell>
                      <TableCell score={model.direct.asr1 ?? undefined}>{model.direct.asr1 !== null ? model.direct.asr1.toFixed(2) : '-'}</TableCell>
                      <TableCell score={model.direct.bsr1 ?? undefined}>{model.direct.bsr1 !== null ? model.direct.bsr1.toFixed(2) : '-'}</TableCell>
                      <TableCell score={model.direct.asr5 ?? undefined}>{model.direct.asr5 !== null ? model.direct.asr5.toFixed(2) : '-'}</TableCell>
                      <TableCell score={model.direct.bsr5 ?? undefined}>{model.direct.bsr5 !== null ? model.direct.bsr5.toFixed(2) : '-'}</TableCell>
                      <TableCell score={model.endToEnd.asr1 ?? undefined}>{model.endToEnd.asr1 !== null ? model.endToEnd.asr1.toFixed(2) : '-'}</TableCell>
                      <TableCell score={model.endToEnd.bsr1 ?? undefined}>{model.endToEnd.bsr1 !== null ? model.endToEnd.bsr1.toFixed(2) : '-'}</TableCell>
                      <TableCell score={model.endToEnd.asr5 ?? undefined}>{model.endToEnd.asr5 !== null ? model.endToEnd.asr5.toFixed(2) : '-'}</TableCell>
                      <TableCell score={model.endToEnd.bsr5 ?? undefined}>{model.endToEnd.bsr5 !== null ? model.endToEnd.bsr5.toFixed(2) : '-'}</TableCell>
                    </motion.tr>
                  ))
                ))}
              </tbody>
            </StyledTable>
          </TableWrapper>
        </ResultsContainer>
      </SectionContent>
    </Section>
  );
};

export const Conclusion: React.FC = () => (
  <AnimatedSection id="conclusion" title="Conclusion">
    <AbstractContent>
      <p>
        We present AdvCUA, a benchmark of 140 malicious tasks that contains 74 TTP-based malicious
        tasks, 40 direct malicious tasks, and 26 end-to-end kill chain malicious tasks, and we build a
        lightweight enterprise-like microsandbox with hard-coded verification. We evaluate five mainstream
        CUAs that interact with OS via shell commands. We find that CUAs achieve higher average ASR on
        TTP-based malicious tasks compared with direct malicious tasks and end-to-end kill chains. CUAs
        are also capable of executing end-to-end kill chains, thereby exposing serious real-world threats.
        These results demonstrate that current frontier CUAs do not adequately cover OS security-centric
        threats, revealing a critical evaluation and alignment gap. Our benchmark directly targets this gap
        by providing realistic, OS-level TTP tasks and end-to-end kill-chain settings. We aim to catalyze
        community progress by making these threats measurable and comparable, thereby encouraging the
        development of stronger safety alignment on CUAs for people's daily lives.
      </p>
    </AbstractContent>
  </AnimatedSection>
);
