
import React from 'react';
import { WorkingArea } from '../types';

interface SidebarProps {
  currentArea: WorkingArea;
  onNavigate: (area: WorkingArea) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentArea, onNavigate }) => {
  const menuItems = [
    { id: WorkingArea.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-pie' },
    { id: WorkingArea.PROSPECT, label: 'Prospect', icon: 'fa-magnifying-glass' },
    { id: WorkingArea.LEADS, label: 'Leads', icon: 'fa-briefcase' },
    { id: WorkingArea.SERVICES, label: 'Services', icon: 'fa-cubes' },
    { id: WorkingArea.SMART_DUMP, label: 'Smart Dump', icon: 'fa-bolt' },
    { id: WorkingArea.PIPELINE, label: 'Pipeline', icon: 'fa-diagram-project' },
    { id: WorkingArea.REPORTS, label: 'Reports', icon: 'fa-file-lines' },
    { id: WorkingArea.OUTREACH, label: 'Outreach', icon: 'fa-paper-plane' },
    { id: WorkingArea.SETTINGS, label: 'Settings', icon: 'fa-gear' },
  ];

  return (
    <aside className="w-64 bg-[#020617] border-r border-slate-800 flex flex-col h-screen shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <i className="fa-solid fa-microchip text-white text-lg"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">AuditOS</h1>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-2">Operator Control</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentArea === item.id
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5`}></i>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-300">Operator Active</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            v2.4.0 Engine Connected <br/>
            Gemini 3.0 Pro Reasoning
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
