
import React, { useState } from 'react';
import { analyzeSmartDump } from '../services/geminiService';

const SmartDump: React.FC = () => {
  const [content, setContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setIsProcessing(true);
    setResult(null);
    
    const analysis = await analyzeSmartDump(content);
    setResult(analysis);
    setIsProcessing(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Smart Dump</h2>
        <p className="text-slate-400">Paste unstructured data (emails, lists, social bios) to extract and organize business entities.</p>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Example: 'I found these three coffee shops in Seattle: Espresso Vivace (206-860-2722), Victrola Coffee, and Anchorhead. They all have bad websites except Anchorhead...'"
            className="w-full h-64 bg-slate-950 border border-slate-800 rounded-lg p-4 text-slate-300 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none"
          />
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><i className="fa-solid fa-check text-green-500"></i> Auto-splitting enabled</span>
              <span className="flex items-center gap-1"><i className="fa-solid fa-check text-green-500"></i> Signal extraction active</span>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isProcessing || !content.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all"
            >
              {isProcessing ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  Analyze & Split
                </>
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="border-t border-slate-800 bg-slate-950 p-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Operator Analysis</h3>
              <div className="flex gap-2">
                <button className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded-md border border-slate-700 transition-all">
                  Copy Output
                </button>
                <button className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md font-bold transition-all">
                  Confirm Lead Creation
                </button>
              </div>
            </div>
            <div className="prose prose-invert max-w-none prose-sm leading-relaxed text-slate-300 font-sans">
              <div className="whitespace-pre-wrap">{result}</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
          <h4 className="font-bold text-white text-sm mb-2"><i className="fa-solid fa-split text-blue-500 mr-2"></i> Entity Splitting</h4>
          <p className="text-xs text-slate-500">Identify separate businesses even in mashed-up text streams.</p>
        </div>
        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
          <h4 className="font-bold text-white text-sm mb-2"><i className="fa-solid fa-radar text-emerald-500 mr-2"></i> Signal Detection</h4>
          <p className="text-xs text-slate-500">Extract phone numbers, sentiment, and current tech stack indicators.</p>
        </div>
        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
          <h4 className="font-bold text-white text-sm mb-2"><i className="fa-solid fa-rocket text-purple-500 mr-2"></i> Instant Blueprinting</h4>
          <p className="text-xs text-slate-500">Ready-to-use prompts generated immediately upon detection.</p>
        </div>
      </div>
    </div>
  );
};

export default SmartDump;
