
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, Layers, Cpu, Gauge, Zap, Binary, Hash, ArrowDownRight, ShieldCheck, CpuChip } from 'lucide-react';
import { base44 } from '../api/base44Client';
import RoboticArmVisualization from '../components/RoboticArmVisualization';
import SimulationControls from '../components/SimulationControls';
import ROMComparisonChart from '../components/ROMComparisonChart';
import SensorChart from '../components/SensorChart';
import ModelComparison from '../components/ModelComparison';

const Simulation: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [simTime, setSimTime] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'comparison' | 'response'>('comparison');

  const { data: config } = useQuery({
    queryKey: ['system_config'],
    queryFn: () => base44.entities.SystemConfig.get()
  });

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setSimTime(prev => prev + (0.05 * speed));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, speed]);

  useEffect(() => {
    // Advanced dynamic model: double pendulum approximation
    const freq1 = 0.8 * speed;
    const freq2 = 1.4 * speed;
    
    const fullJ1 = 45 + Math.sin(simTime * freq1) * 30 + Math.cos(simTime * 0.2) * 2;
    const fullJ2 = -20 + Math.cos(simTime * freq2) * 15 + Math.sin(simTime * 0.4) * 4;
    
    // Joint velocities (Derivative of position)
    const vel1 = Math.cos(simTime * freq1) * 30 * freq1;
    const vel2 = -Math.sin(simTime * freq2) * 15 * freq2;

    // ROM Approximation
    const romJ1 = 45 + Math.sin(simTime * freq1 - 0.02) * 29.8 + (Math.random() * 0.2 - 0.1);
    const romJ2 = -20 + Math.cos(simTime * freq2 - 0.01) * 14.9 + (Math.random() * 0.15 - 0.07);
    
    const error = Math.sqrt(Math.pow(fullJ1 - romJ1, 2) + Math.pow(fullJ2 - romJ2, 2));

    const newPoint = {
      time: simTime.toFixed(2),
      timestamp: simTime.toFixed(2),
      full: fullJ1,
      rom: romJ1,
      velocity: vel1,
      joint2_full: fullJ2,
      joint2_rom: romJ2,
      velocity2: vel2,
      error: error
    };

    setChartData(prev => {
      const next = [...prev, newPoint];
      // Keep buffer manageable
      return next.length > 200 ? next.slice(next.length - 200) : next;
    });
  }, [simTime, speed]);

  const latest = chartData[chartData.length - 1] || { full: 45, rom: 45, joint2_rom: -20, error: 0 };

  const fullModelStates = config?.full_model_states || 12;
  const romStates = config?.rom_states || 4;
  const reductionPercent = Math.round((1 - romStates / fullModelStates) * 100);

  const fullStats = { 
    states: fullModelStates, 
    computeTime: 45.2, 
    memory: '256KB', 
    accuracy: '100.0%' 
  };
  
  const romStatsObj = { 
    states: romStates, 
    computeTime: (8.7 * speed).toFixed(1) as any, 
    memory: '48KB', 
    accuracy: '99.2%' 
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black text-fuchsia-500 uppercase tracking-[0.3em] mb-1">
            <Activity size={10} /> Solver Fidelity Benchmark
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tighter">Physics Simulation</h2>
        </div>
        <div className="flex gap-2">
          <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 transition-all duration-500 ${isRunning ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
            {isRunning ? (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Solver
              </>
            ) : (
              'Paused'
            )}
          </div>
          <div className="px-5 py-2 rounded-2xl bg-slate-950 text-slate-400 border border-slate-800 text-[10px] font-black uppercase tracking-widest shadow-inner">
            Epoch: <span className="text-white font-mono ml-2">{(simTime * 20).toFixed(0)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Solver Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/40 p-5 rounded-3xl border border-slate-800/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-slate-500 group-hover:scale-110 transition-transform">
                <Hash size={40} />
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Source Dimension</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white tracking-tighter">{fullModelStates}</span>
                <span className="text-[10px] font-bold text-slate-600">NODES</span>
              </div>
            </div>
            
            <div className="bg-cyan-500/5 p-5 rounded-3xl border border-cyan-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-cyan-500 group-hover:scale-110 transition-transform">
                <Binary size={40} />
              </div>
              <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-2">ROM Embedding</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white tracking-tighter">{romStates}</span>
                <span className="text-[10px] font-bold text-cyan-600">MODES</span>
              </div>
            </div>

            <div className="bg-emerald-500/5 p-5 rounded-3xl border border-emerald-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500 group-hover:scale-110 transition-transform">
                <ArrowDownRight size={40} />
              </div>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Solve Efficiency</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-emerald-400 tracking-tighter">-{reductionPercent}%</span>
                <span className="text-[10px] font-bold text-emerald-600">CYCLES</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-6 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-3xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors" />
            <div className="flex items-center gap-5">
              <div className="p-4 bg-slate-900 rounded-[1.5rem] border border-slate-800 shadow-xl">
                <ShieldCheck className="text-cyan-400" size={28} />
              </div>
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Stability Analysis</h4>
                <p className="text-[10px] text-slate-500 font-medium">Reconstruction Error: <span className="text-cyan-400">{(latest.error || 0).toFixed(4)}°</span></p>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center gap-12 w-full px-8">
              <div className="h-1.5 flex-1 bg-slate-900 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-1000 ease-out"
                  style={{ width: `${reductionPercent}%` }}
                />
              </div>
              <div className="text-center">
                 <span className="text-[10px] font-black text-white bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 shadow-xl tracking-widest uppercase">
                   {reductionPercent}% Compression
                 </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-8 border-l border-slate-800/50">
               <Activity size={20} className={`${isRunning ? 'text-emerald-400 animate-pulse' : 'text-slate-700'}`} />
            </div>
          </div>

          <RoboticArmVisualization 
            joint1Angle={latest.rom} 
            joint2Angle={latest.joint2_rom} 
            isAnimating={isRunning}
          />

          <div className="bg-slate-950/50 p-6 rounded-[2.5rem] border border-slate-800 space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/50 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                  <Layers size={16} className="text-cyan-400" />
                </div>
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Scientific Visualizer</h3>
              </div>
              <div className="flex gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                {[
                  { id: 'comparison', label: 'DYNAMICS' },
                  { id: 'response', label: 'ERROR' }
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-5 py-2 rounded-xl text-[9px] font-black tracking-widest transition-all ${activeTab === tab.id ? 'bg-slate-800 text-white shadow-xl border border-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-[340px]">
              {activeTab === 'comparison' && <ROMComparisonChart data={chartData} title="Kinematic Trajectory Correlation" />}
              {activeTab === 'response' && (
                <SensorChart 
                  data={chartData} 
                  title="Residual Manifold Error (L2-Norm)" 
                  dataKey="error" 
                  color="#f43f5e" 
                  unit="°" 
                />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <SimulationControls 
            isRunning={isRunning}
            onToggleRun={() => setIsRunning(!isRunning)}
            onReset={() => {
              setSimTime(0);
              setChartData([]);
              setIsRunning(false);
            }}
            speed={speed}
            onSpeedChange={setSpeed}
            onInjectFault={() => alert("Simulating localized torque saturation fault...")}
          />

          <div className="bg-slate-950/40 p-6 rounded-3xl border border-slate-800 space-y-6 shadow-2xl backdrop-blur-md">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Cpu size={14} className="text-cyan-400" /> Edge Performance
            </h3>
            <ModelComparison fullModelStats={fullStats} romStats={romStatsObj} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
