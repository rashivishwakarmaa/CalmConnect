import { useState, useRef, useEffect } from 'react';
import { chatUrl } from '../api';
import './ChatWidget.css';

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm CalmChat, your mental health support companion. How are you feeling today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: text, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);
    try {
      const res = await fetch(chatUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
        credentials: 'omit',
      });
      const data = await res.json().catch(() => ({}));
      const reply = data?.reply?.trim();
      if (res.ok && reply) {
        setMessages((prev) => [...prev, { role: 'bot', content: reply, timestamp: new Date() }]);
      } else {
        throw new Error(data?.error || 'No reply received');
      }
    } catch (err) {
      setMessages((prev) => [...prev, {
        role: 'bot',
        content: "I'm having trouble connecting. Please make sure the backend server is running (port 5000) and try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <button
        className="chat-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <div className="header-content">
              <div className="bot-avatar">🧘</div>
              <div className="header-text">
                <h2>CalmChat</h2>
                <p className="status"><span className="status-dot" /> Online</p>
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.role === 'user' ? 'user-message' : 'bot-message'}`}>
                {m.role === 'bot' && <div className="message-avatar">🧘</div>}
                <div className="message-content">
                  <p>{m.content}</p>
                  <span className="message-time">{formatTime(m.timestamp)}</span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message">
                <div className="message-avatar">🧘</div>
                <div className="message-content">
                  <div className="typing-indicator"><span /><span /><span /></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-input-form" onSubmit={sendMessage}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." disabled={isLoading} className="chat-input" />
            <button type="submit" disabled={isLoading || !input.trim()} className="send-button" aria-label="Send">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
          <div className="chat-disclaimer">
            <p>⚠️ Support chatbot only — not a replacement for professional help.</p>
          </div>
        </div>
      )}
    </>
  );
}
