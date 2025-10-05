import { useState } from 'react';
import { Target, Activity } from 'lucide-react';
import RealisticSimulation from './components/RealisticSimulation';

type Tab = 'game' | 'realistic';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('realistic');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            AstroSim
          </h1>
          <p className="text-slate-300 text-lg">
            Asteroid Bennu Impact Simulation
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('game')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'game'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Target size={20} />
            Defense Game
          </button>
          <button
            onClick={() => setActiveTab('realistic')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'realistic'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Activity size={20} />
            Realistic Simulation
          </button>
        </div>

        <main>
          {activeTab === 'game' && (
            <div className="text-center text-slate-300 p-12 bg-slate-800 rounded-lg">
              <Target size={64} className="mx-auto mb-4 text-blue-400" />
              <h2 className="text-2xl font-bold mb-2">Defense Game</h2>
              <p>This tab contains the interactive defense game.</p>
            </div>
          )}
          {activeTab === 'realistic' && <RealisticSimulation />}
        </main>
      </div>
    </div>
  );
}

export default App;
