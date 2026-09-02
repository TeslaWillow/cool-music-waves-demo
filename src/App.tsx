// ./src/App.tsx
import React, { useState } from 'react';
import { AudioVisualizer } from '@teslawillow/cool-music-waves';
import { Play, Pause, Upload, Disc, Radio, Activity, Orbit, Box } from 'lucide-react';

type Mode = 'circular' | 'bars' | 'spectrumBars' | 'tunnel' | 'sphere3d';

export const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('sphere3d');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioSrc, setAudioSrc] = useState<string>('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3');
  const [color, setColor] = useState<string>('#00ffcc');

  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioElement) return;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAudioSrc(url);
    setIsPlaying(false);
  };

  const modes: { id: Mode; label: string; icon: React.ReactNode }[] = [
    { id: 'sphere3d', label: '3D Sphere', icon: <Orbit className="w-4 h-4" /> },
    { id: 'tunnel', label: 'WebGL Tunnel', icon: <Box className="w-4 h-4" /> },
    { id: 'circular', label: 'Circular Wave', icon: <Disc className="w-4 h-4" /> },
    { id: 'bars', label: 'Equalizer Bars', icon: <Radio className="w-4 h-4" /> },
    { id: 'spectrumBars', label: 'Spectrum', icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col justify-between p-6 md:p-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            cool-music-waves
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Interactive audio visualizer powered by Canvas 2D, WebGL, and Three.js
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.npmjs.com/package/@teslawillow/cool-music-waves"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-xs font-mono bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-lg transition-colors"
          >
            npm i @teslawillow/cool-music-waves
          </a>
        </div>
      </header>

      {/* Main Canvas Viewport */}
      <main className="my-8 flex-1 flex flex-col items-center justify-center relative">
        <div className="w-full max-w-5xl h-[500px] bg-zinc-950/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden relative group">
          <AudioVisualizer
            audioElement={audioElement}
            mode={mode}
            options={{ color, wireframe: true, FFT_SIZE: 512 }}
            className="w-full h-full"
          />

          {/* Overlay Controls inside Canvas */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md p-2 rounded-xl border border-zinc-800">
            <span className="text-xs text-zinc-400 px-2 font-medium">Color:</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-7 h-7 rounded-lg bg-transparent border-0 cursor-pointer"
            />
          </div>
        </div>
      </main>

      {/* Audio Player & Mode Controls */}
      <footer className="max-w-5xl w-full mx-auto flex flex-col gap-6">
        {/* Mode Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${mode === m.id
                ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-lg shadow-teal-500/10'
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
            >
              {m.icon}
              {m.label}
            </button>
          ))}
        </div>

        {/* Player Bar */}
        <div className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-md p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <audio
            ref={setAudioElement}
            src={audioSrc}
            onEnded={() => setIsPlaying(false)}
            crossOrigin="anonymous"
          />

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={togglePlay}
              className="p-3 bg-teal-400 hover:bg-teal-300 text-zinc-950 rounded-full transition-transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
            <div>
              <p className="text-sm font-medium text-zinc-200">Demo Track</p>
              <p className="text-xs text-zinc-500">Play/Pause to trigger real-time FFT frequency mapping</p>
            </div>
          </div>

          <label className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-medium cursor-pointer transition-colors w-full sm:w-auto justify-center">
            <Upload className="w-4 h-4" />
            <span>Upload MP3</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </footer>
    </div>
  );
};

export default App;