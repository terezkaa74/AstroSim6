import { useState } from 'react';
import { Activity, Mountain, Waves } from 'lucide-react';
import RealisticSimulation from './components/RealisticSimulation';
import LandImpact from './components/LandImpact';
import OceanImpact from './components/OceanImpact';

type Tab = 'simulation' | 'land' | 'ocean';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('simulation');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            AstroSim
          </h1>
          <p className="text-slate-300 text-lg">
            Asteroid Bennu Impact Simulation & Consequences
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'simulation'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Activity size={20} />
            Realistic Simulation
          </button>
          <button
            onClick={() => setActiveTab('land')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'land'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Mountain size={20} />
            Land Impact
          </button>
          <button
            onClick={() => setActiveTab('ocean')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'ocean'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Waves size={20} />
            Ocean Impact
          </button>
        </div>

        <main>
          {activeTab === 'simulation' && <RealisticSimulation />}
          {activeTab === 'land' && <LandImpact />}
          {activeTab === 'ocean' && <OceanImpact />}
        </main>
      </div>
    </div>
  );
}

export default App;
