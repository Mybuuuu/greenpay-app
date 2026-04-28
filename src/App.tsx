import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Exchange from './pages/Exchange';
import Rewards from './pages/Rewards';
import History from './pages/History';
import Education from './pages/Education';
import Profile from './pages/Profile';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Protected app routes - simplified for demo */}
        <Route path="/app">
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="exchange" element={<Exchange />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="history" element={<History />} />
          <Route path="education" element={<Education />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
