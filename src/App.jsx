import React, { useState } from 'react';
import { Zap, Activity, Settings } from 'lucide-react';
import CircuitDiagram from './components/CircuitDiagram';
import DCBias from './components/DCBias';
import FrequencyResponse from './components/FrequencyResponse';

const App = () => {
  const [activeTab, setActiveTab] = useState('circuit');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
            RC Coupled CE Amplifier
          </h1>
          <p className="text-xl text-cyan-300">Interactive Circuit Analysis & Frequency Response</p>
          <p className="text-sm text-gray-300 mt-2">Experiment 6 - Transistor Amplifier Design</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {[
            { id: 'circuit', label: 'Circuit Diagram', icon: Zap },
            { id: 'dcbias', label: 'DC Bias', icon: Settings },
            { id: 'frequency', label: 'Frequency Response', icon: Activity }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          {activeTab === 'circuit' && <CircuitDiagram />}
          {activeTab === 'dcbias' && <DCBias />}
          {activeTab === 'frequency' && <FrequencyResponse />}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400">
          <p className="text-sm">Experiment 6: RC Coupled CE Transistor Amplifier Design</p>
          <p className="text-xs mt-2">Interactive Circuit Analyzer | Built with React & Recharts</p>
        </div>
      </div>
    </div>
  );
};

export default App;