
import React from 'react';
import { Play, Pause, RotateCcw, Bug } from 'lucide-react';

interface SimulationControlsProps {
  isRunning: boolean;
  onToggleRun: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onInjectFault: () => void;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  isRunning, onToggleRun, onReset, speed, onSpeedChange, onInjectFault
}) => {
  return (
    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-8">
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Controls</h3>
        <div className="flex gap-3">
          <button 
            onClick={onToggleRun}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-200 font-bold ${
              isRunning 
              ? 'bg-amber-500 hover:bg-amber-600 text-amber-950' 
              : 'bg-emerald-500 hover:bg-emerald-600 text-emerald-950'
            }`}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
            {isRunning ? 'PAUSE' : 'START'}
          </button>
          <button 
            onClick={onReset}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Simulation Speed</h3>
          <span className="text-cyan-400 font-mono font-bold">{speed}x</span>
        </div>
        <input 
          type="range" 
          min="0.1" 
          max="5" 
          step="0.1" 
          value={speed} 
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Chaos Engineering</h3>
        <button 
          onClick={onInjectFault}
          className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl transition-all font-bold group"
        >
          <Bug size={20} className="group-hover:animate-bounce" />
          INJECT RANDOM FAULT
        </button>
        <p className="text-[10px] text-slate-500 text-center italic">Testing system resilience in digital twin environment</p>
      </div>
    </div>
  );
};

export default SimulationControls;
