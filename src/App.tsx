import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ScriptOptimizerApp from './pages/script-optimizer/App';
import { ArrowLeft } from 'lucide-react';

import CharacterGeneratorApp from './pages/character-generator/App';
function PlaceholderApp({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
        <p className="text-slate-600 mb-8">
          这里是预留的软件页面。请把您做好的代码发给我，我会替换掉这个页面！
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>返回总控台</span>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/script-optimizer" element={<ScriptOptimizerApp />} />
        <Route path="/character-generator" element={<CharacterGeneratorApp />} />
        <Route path="/app3" element={<PlaceholderApp title="示例软件 3" />} />
      </Routes>
    </BrowserRouter>
  );
}
