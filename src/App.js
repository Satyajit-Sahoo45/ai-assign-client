import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HackSection from './Components/HackSection';
import StatsSection from './Components/StatsSection';
import HeroSection from './Components/HeroSection';
import Header from './Components/Header';
import ChallengesSection from './Components/ChallengesSection';
import ChallengeForm from './Components/ChallengeForm';
import Details from './Components/Details';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './Provider/AuthProvider';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <HackSection />
      <ChallengesSection />
    </div>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <Header /> {/* Header remains visible on all routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hackathon/:id" element={<AuthProvider> <Details /> </AuthProvider>} />

          <Route path="/create-hackathon" element={<AuthProvider><ChallengeForm /></AuthProvider>} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
