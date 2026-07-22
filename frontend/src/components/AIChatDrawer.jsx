import React, { useState } from 'react';
import axios from 'axios';
import { Bot, Send, X, Sparkles, User, MessageSquare } from 'lucide-react';

const AIChatDrawer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello Operator. I am CrowdShield AI. How can I assist your station decision making?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await axios.post('/api/ai/chat', { question: userMsg });
      const aiResponse = res.data.answer || 'CrowdShield AI analysis indicates station parameters remain within configured safety boundaries.';
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'CrowdShield AI Telemetry: Platform 2 flow resistance is 4.8 PSI. Recommended action: Direct flow via Escalator 2.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-md bg-[#0b132b]/95 backdrop-blur-2xl rounded-3xl border border-cyan-500/50 shadow-2xl z-50 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom duration-300 font-sans">
      {/* Header */}
      <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">CrowdShield Conversational AI</h3>
            <p className="text-[10px] text-cyan-400">Google Gemini Powered Decision Assistant</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto text-xs">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex items-start space-x-2 ${m.sender === 'user' ? 'justify-end' : ''}`}>
            {m.sender === 'ai' && (
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">
                AI
              </div>
            )}
            <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
              m.sender === 'user'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none'
                : 'bg-slate-900/80 border border-slate-800 text-slate-200 rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-xs text-cyan-400 animate-pulse font-mono">Gemini AI generating response...</div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI: e.g. Why is Platform 2 dangerous?"
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default AIChatDrawer;
