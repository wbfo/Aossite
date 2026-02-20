
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { chatWithOperator } from '../services/geminiService';

const OperatorChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Operator active. Paste a lead URL, dump content, or audit file to begin detection.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await chatWithOperator(
      messages.map(m => ({ role: m.role, content: m.content })),
      input
    );

    const assistantMessage: Message = {
      role: 'assistant',
      content: response,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  return (
    <div className="w-96 bg-[#0f172a] border-l border-slate-800 flex flex-col h-screen shrink-0">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-headset text-blue-500"></i>
          <span className="font-bold text-sm tracking-tight">OPERATOR AI</span>
        </div>
        <button className="text-slate-500 hover:text-white transition-colors">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-xl p-3 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
            }`}>
              <div className="whitespace-pre-wrap prose prose-invert prose-sm">
                {msg.content}
              </div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">
              {msg.role === 'user' ? 'Operator' : 'AI'} • {msg.timestamp}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-1 items-center p-2">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Command Operator..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none min-h-[44px] max-h-32"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 bottom-2 w-8 h-8 flex items-center justify-center text-blue-500 disabled:text-slate-600 hover:bg-slate-700 rounded-md transition-all"
          >
            <i className="fa-solid fa-arrow-up-long"></i>
          </button>
        </div>
        <p className="text-[10px] text-slate-500 mt-2 text-center">
          Type <code className="bg-slate-800 px-1 rounded">blueprint</code> to generate assets for active lead.
        </p>
      </div>
    </div>
  );
};

export default OperatorChat;
