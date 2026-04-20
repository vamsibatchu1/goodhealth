import React, { useState } from 'react';
import { X, Send, Bot, User, Paperclip } from 'lucide-react';

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
      width: '400px',
      height: '600px',
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      overflow: 'hidden'
    }}>
      {/* Chat Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-primary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
            <Bot size={18} color="white" />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>Health Assistant</h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-tertiary)' }}>● Online</span>
          </div>
        </div>
        <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
          <X size={20} />
        </button>
      </div>

      {/* Chat Messages */}
      <div style={{
        flex: 1,
        padding: '1.5rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        backgroundColor: 'var(--bg-secondary)'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            gap: '0.75rem',
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            maxWidth: '85%'
          }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: msg.role === 'user' ? 'var(--bg-primary)' : 'rgba(45, 91, 246, 0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              {msg.role === 'user' ? <User size={14} color="var(--text-primary)" /> : <Bot size={14} color="var(--accent-primary)" />}
            </div>
            <div style={{
              background: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-primary)',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              borderTopRightRadius: msg.role === 'user' ? 0 : 'var(--radius-md)',
              borderTopLeftRadius: msg.role === 'assistant' ? 0 : 'var(--radius-md)',
              fontSize: '0.875rem',
              lineHeight: 1.5,
              color: msg.role === 'user' ? '#fff' : 'var(--text-primary)'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div style={{
        padding: '1rem',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-full)',
          padding: '0.5rem'
        }}>
          <button style={{ padding: '0.5rem', color: 'var(--text-muted)' }}>
            <Paperclip size={18} />
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your health data..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.875rem'
            }}
          />
          <button 
            onClick={handleSend}
            style={{ 
              padding: '0.5rem', 
              background: 'var(--accent-primary)', 
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Send size={16} style={{ marginLeft: '-2px' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
