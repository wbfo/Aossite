
import React from 'react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active Prospects', value: '42', delta: '+12%', icon: 'fa-users', color: 'text-blue-500' },
    { label: 'Total Audits', value: '128', delta: '+5%', icon: 'fa-clipboard-check', color: 'text-emerald-500' },
    { label: 'Blueprints Generated', value: '18', delta: '+22%', icon: 'fa-wand-sparkles', color: 'text-purple-500' },
    { label: 'Closed Deals', value: '3', delta: '0%', icon: 'fa-handshake', color: 'text-amber-500' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Agency Overview</h2>
        <p className="text-slate-400">Welcome back, Operator. System scan complete. 4 high-value opportunities detected.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center ${stat.color}`}>
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <span className={`text-xs font-bold ${stat.delta.startsWith('+') ? 'text-green-500' : 'text-slate-500'}`}>
                {stat.delta}
              </span>
            </div>
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</h3>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-sm">Recent Activity</h3>
              <button className="text-xs text-blue-500 hover:underline">View all</button>
            </div>
            <div className="divide-y divide-slate-800">
              {[
                { type: 'audit', biz: 'The Coffee Lab', action: 'Audit Completed', time: '2 hours ago' },
                { type: 'blueprint', biz: 'Apex Logistics', action: 'Website Blueprint Generated', time: '5 hours ago' },
                { type: 'lead', biz: 'Eco-Green Landscaping', action: 'Lead Scoped from Smart Dump', time: 'Yesterday' },
              ].map((activity, i) => (
                <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-800/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${activity.type === 'audit' ? 'bg-blue-500' : activity.type === 'blueprint' ? 'bg-purple-500' : 'bg-emerald-500'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{activity.biz}</p>
                    <p className="text-xs text-slate-500">{activity.action}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">{activity.time}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-blue-600/5 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                <i className="fa-solid fa-bolt-lightning text-blue-400 text-xl"></i>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white">Operator Insight</h4>
                <p className="text-sm text-slate-400 mt-1">
                  Lead <span className="text-blue-400">"The Coffee Lab"</span> has an obsolete branding profile and 404s on their service page. 
                  High conversion probability for <strong>Branding Modernization</strong>.
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
                Action Now
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h3 className="font-bold text-sm mb-4">Pipeline Distribution</h3>
            <div className="space-y-4">
              {[
                { label: 'Prospects', count: 12, color: 'bg-slate-700' },
                { label: 'Leads', count: 8, color: 'bg-blue-700' },
                { label: 'Qualified', count: 5, color: 'bg-indigo-700' },
                { label: 'Outreach', count: 14, color: 'bg-amber-700' },
                { label: 'Closed', count: 3, color: 'bg-green-700' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-white">{item.count}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${(item.count / 42) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-800 rounded-xl p-5">
            <h3 className="font-bold text-sm mb-2 text-white">Smart Dump Tip</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Paste LinkedIn profiles or Yelp pages directly into the Smart Dump to extract lead signals instantly.
            </p>
            <button className="w-full bg-slate-800 border border-slate-700 hover:border-slate-500 text-white text-xs font-bold py-2 rounded-lg transition-all">
              Try it now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
