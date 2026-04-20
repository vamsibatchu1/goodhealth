import React, { useState, useRef, useEffect } from 'react';
import { X, MessageSquare, Send, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatOverlay({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your GoodHealth AI. Ask me about your health metrics, uploaded documents, or nutrition data.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, data]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Is the GEMINI_API_KEY configured?' }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '380px',
      height: '550px',
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      overflow: 'hidden',
      fontFamily: 'inherit'
    }}>
      {/* Chat Header */}
      <div style={{
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-secondary)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <MessageSquare size={16} />
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Chat with Health Assistant</span>
        </div>
        <button onClick={onClose} style={{ 
          color: 'var(--text-muted)', 
          background: 'var(--bg-primary)', 
          borderRadius: '50%', 
          width: '24px', 
          height: '24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <X size={14} />
        </button>
      </div>

      {/* Chat Messages */}
      <div style={{
        flex: 1,
        padding: '0 1.25rem 1rem 1.25rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative'
      }}>
        
        <div style={{ textAlign: 'center', margin: '0.5rem 0 1rem 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '90%'
          }}>
            <div style={{
              background: msg.role === 'user' ? 'var(--bg-primary)' : 'transparent',
              padding: msg.role === 'user' ? '0.75rem 1rem' : '0',
              borderRadius: msg.role === 'user' ? '16px' : '0',
              fontSize: '0.9375rem',
              lineHeight: 1.5,
              color: 'var(--text-primary)'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div style={{
        padding: '0.5rem 1rem 1rem 1rem',
        background: 'var(--bg-secondary)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '0.5rem 1rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share feedback or ask a question"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.9375rem'
            }}
          />
          <button 
            onClick={handleSend}
            style={{ 
              color: input.trim() ? 'var(--text-primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
