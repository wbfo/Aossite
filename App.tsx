
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import OperatorChat from './components/OperatorChat';
import Dashboard from './components/Dashboard';
import SmartDump from './components/SmartDump';
import { WorkingArea } from './types';

const App: React.FC = () => {
  const [currentArea, setCurrentArea] = useState<WorkingArea>(WorkingArea.DASHBOARD);

  const renderContent = () => {
    switch (currentArea) {
      case WorkingArea.DASHBOARD:
        return <Dashboard />;
      case WorkingArea.SMART_DUMP:
        return <SmartDump />;
      case WorkingArea.PROSPECT:
      case WorkingArea.LEADS:
      case WorkingArea.SERVICES:
      case WorkingArea.PIPELINE:
      case WorkingArea.REPORTS:
      case WorkingArea.OUTREACH:
      case WorkingArea.SETTINGS:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <i className="fa-solid fa-hammer text-2xl"></i>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{currentArea.replace('_', ' ')} Work Area</h2>
            <p className="max-w-md">This module is part of the enterprise rollout. Use <strong>Dashboard</strong> or <strong>Smart Dump</strong> to demo core Operator logic.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] overflow-hidden">
      <Sidebar currentArea={currentArea} onNavigate={setCurrentArea} />
      
      <main className="flex-1 flex flex-col relative overflow-y-auto bg-slate-950/20">
        <div className="flex-1">
          {renderContent()}
        </div>
      </main>

      <OperatorChat />
    </div>
  );
};

export default App;
