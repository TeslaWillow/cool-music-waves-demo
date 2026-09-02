const Header: React.FC = () => {
    return (
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
    );
};

export default Header;