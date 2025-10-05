import RealisticSimulation from './components/RealisticSimulation';

function App() {
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

        <main>
          <RealisticSimulation />
        </main>
      </div>
    </div>
  );
}

export default App;
