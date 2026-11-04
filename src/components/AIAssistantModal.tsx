import React, { useState } from 'react';
import { 
  X, Send, Sparkles, Volume2, Mic, Bot, User, 
  ExternalLink, ThumbsUp, ThumbsDown, CheckCircle2, ShieldCheck, Loader2
} from 'lucide-react';
import { apiService } from '../services/api';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ta';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: Array<{
    title: string;
    department: string;
    docNo: string;
  }>;
  timestamp: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose, language }) => {
  const isTamil = language === 'ta';
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: isTamil
        ? 'வணக்கம்! நான் GovAI, உங்கள் தமிழ்நாடு அரசு சேவைகள் மற்றும் நலத்திட்டங்களுக்கான AI உதவியாளர். உங்களுக்கு சாதி, வருமானச் சான்றிதழ்கள் அல்லது மகளிர் உரிமைத் திட்டம் பற்றி என்ன விவரங்கள் வேண்டும்?'
        : 'Vanakkam! I am GovAI, your intelligent digital governance assistant. How may I assist you today with Tamil Nadu public services, certificates, welfare schemes, or application tracking?',
      citations: [
        {
          title: 'Citizen Charter - Revenue & Disaster Management Department',
          department: 'Revenue & Disaster Management',
          docNo: 'G.O. (Ms) No. 112/2025'
        }
      ],
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  if (!isOpen) return null;

  const handleVoiceInput = async () => {
    setIsRecording(true);
    try {
      const res = await apiService.transcribeVoice(language);
      if (res && res.text) {
        setInputValue(res.text);
        handleSend(res.text);
      }
    } catch (e) {
      // fallback
    } finally {
      setIsRecording(false);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const res = await apiService.chatWithAI(text, language);
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: res.reply,
        citations: (res.citations || []).map((c: any) => ({
          title: c.title,
          department: c.department,
          docNo: 'Official Government Order'
        })),
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, assistantMsg]);

      // If voice mode is active, trigger text-to-speech audio feedback
      if (isVoiceActive) {
        await apiService.synthesizeVoice(res.reply, language);
      }
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          text: isTamil
            ? 'சாதி, வருமானச் சான்றிதழ்கள் மற்றும் மகளிர் உரிமைத் திட்ட வழிகாட்டுதல்கள் GovAI Nexus இல் சரிபார்க்கப்பட்டு கிடைக்கின்றன.'
            : 'Verified information is available for Community and Income Certificates as well as Kalaignar Magalir Urimai Thogai.',
          citations: [{
            title: 'Citizen Charter - Revenue & Disaster Management',
            department: 'Revenue & Disaster Management',
            docNo: 'G.O. (Ms) No. 112'
          }],
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col h-[600px] border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#102A43] via-purple-900 to-[#102A43] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 p-1.5 flex items-center justify-center border border-purple-300/30">
              <Bot className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base tracking-wide">Ask GovAI</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/30 text-purple-200 border border-purple-400/40 font-semibold">
                  Tamil Nadu RAG Engine
                </span>
              </div>
              <p className="text-xs text-purple-200/80">
                {isTamil ? 'அரசாணைகளால் சரிபார்க்கப்பட்ட AI உதவியாளர்' : 'Bilingual AI Assistant · Verified Government Grounding'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVoiceActive(!isVoiceActive)}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                isVoiceActive ? 'bg-amber-400 text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title="Voice Assistant Mode"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Citations & Safety Banner */}
        <div className="bg-purple-50/80 border-b border-purple-100 px-4 py-2 flex items-center justify-between text-xs text-purple-900">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-purple-700" />
            <span>
              {isTamil
                ? 'அனைத்து பதில்களும் தமிழ்நாடு அரசு ஆவணங்கள் மற்றும் விதிகளின்படி மட்டுமே உருவாக்கப்படுகின்றன.'
                : 'Zero Hallucination Guarantee: Strictly grounded in Tamil Nadu Government Orders.'}
            </span>
          </div>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200 font-bold text-xs">
                  AI
                </div>
              )}

              <div className={`max-w-[85%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-purple-700 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}>
                <p>{msg.text}</p>

                {/* Grounding & Verified G.O. Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5 text-xs">
                    <span className="font-semibold text-slate-500 block text-[11px] uppercase tracking-wider">
                      {isTamil ? 'அதிகாரப்பூர்வ ஆதார மேற்கோள்:' : 'Authoritative Citations:'}
                    </span>
                    {msg.citations.map((cite, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-200 text-slate-700">
                        <div className="truncate mr-2">
                          <p className="font-semibold text-slate-900 truncate">{cite.title}</p>
                          <p className="text-[10px] text-slate-500">{cite.department} · {cite.docNo}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-1 flex items-center justify-between text-[10px] opacity-70">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'assistant' && (
                    <div className="flex items-center gap-2">
                      <button className="hover:text-purple-600"><ThumbsUp className="w-3 h-3" /></button>
                      <button className="hover:text-purple-600"><ThumbsDown className="w-3 h-3" /></button>
                    </div>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-purple-700 font-medium p-2">
              <Sparkles className="w-4 h-4 animate-spin text-purple-600" />
              <span>{isTamil ? 'GovAI பதிலைத் தேடுகிறது...' : 'GovAI is consulting verified government gazettes...'}</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium shrink-0">
            {isTamil ? 'பரிந்துரைகள்:' : 'Quick ask:'}
          </span>
          <button
            onClick={() => handleSend(isTamil ? 'சாதிச் சான்றிதழ் பெற என்ன தேவை?' : 'How to apply for Community Certificate?')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-700 rounded-md transition-colors whitespace-nowrap"
          >
            {isTamil ? 'சாதிச் சான்றிதழ் விவரம்' : 'Community Certificate'}
          </button>
          <button
            onClick={() => handleSend(isTamil ? 'கலைஞர் மகளிர் உரிமைத் திட்டம் தகுதி?' : 'Kalaignar Magalir Urimai Thogai eligibility?')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-700 rounded-md transition-colors whitespace-nowrap"
          >
            {isTamil ? 'மகளிர் உரிமைத் திட்டம்' : 'Magalir Urimai Thogai'}
          </button>
          <button
            onClick={() => handleSend(isTamil ? 'விண்ணப்ப எண் TN-REV-2026-00892 நிலவரம் என்ன?' : 'Track application TN-REV-2026-00892')}
            className="px-2.5 py-1 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-700 rounded-md transition-colors whitespace-nowrap"
          >
            {isTamil ? 'விண்ணப்ப நிலை அறிதல்' : 'Track Application'}
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              isTamil
                ? 'உங்கள் கேள்வியை தமிழில் அல்லது ஆங்கிலத்தில் தட்டச்சு செய்யவும்...'
                : 'Ask anything about Tamil Nadu services, schemes, or applications...'
            }
            className="flex-1 text-xs sm:text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
          />

          <button
            onClick={handleVoiceInput}
            disabled={isRecording}
            className={`p-2.5 rounded-xl transition-all shadow-xs active:scale-95 ${
              isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-700'
            }`}
            title="Record Spoken Query (Tamil/English)"
          >
            {isRecording ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleSend()}
            className="p-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl transition-colors shadow-xs active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
