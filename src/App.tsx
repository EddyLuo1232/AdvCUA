import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Demo } from './components/Demo';
import { ThreatModel } from './components/ThreatModel';
import { Abstract, Dataset, Evaluation, Results, Conclusion } from './components/Sections';
import { Footer } from './components/Footer';
import { DigitalRainBackground } from './components/DigitalRainBackground';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <DigitalRainBackground density={0.03} flickerSpeed={0.08} />
      <Navigation />
      <Hero />
      <ThreatModel />
      <Demo />
      <Abstract />
      <Dataset />
      <Evaluation />
      <Results />
      <Conclusion />
      <Footer />
    </ThemeProvider>
  );
}

export default App;