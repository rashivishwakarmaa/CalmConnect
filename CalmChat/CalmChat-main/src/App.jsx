// import React, { useState } from "react";

// const App = () => {
// 	const [messages, setMessages] = useState([]);
// 	const [input, setInput] = useState("");
// 	const [loading, setLoading] = useState(false);

// 	const sendMessage = async () => {
// 		if (!input.trim()) return;

// 		const newMessages = [...messages, { sender: "user", text: input }];
// 		setMessages(newMessages);
// 		setInput("");
// 		setLoading(true);

// 		try {
// 			const res = await fetch("http://localhost:5000/chat", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({ message: input }),
// 			});
// 			const data = await res.json();
// 			if (data.reply) {
// 				setMessages([
// 					...newMessages,
// 					{ sender: "bot", text: data.reply },
// 				]);
// 			}
// 		} catch (error) {
// 			console.error("Error:", error);
// 		}
// 		setLoading(false);
// 	};

// 	const handleKeyPress = (e) => {
// 		if (e.key === "Enter") sendMessage();
// 	};

// 	return (
// 		<div className="calmchat-container">
// 			<div className="chat-header">CalmChat</div>
// 			<div className="chat-box">
// 				{messages.map((msg, idx) => (
// 					<div key={idx} className={`message ${msg.sender}`}>
// 						{msg.text}
// 					</div>
// 				))}
// 				{loading && <div className="message bot">Typing...</div>}
// 			</div>
// 			<div className="chat-input">
// 				<input
// 					value={input}
// 					onChange={(e) => setInput(e.target.value)}
// 					onKeyDown={handleKeyPress}
// 					placeholder="Ask me anything..."
// 				/>
// 				<button onClick={sendMessage}>Send</button>
// 			</div>
// 		</div>
// 	);
// };

// export default App;














import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'Hello! I\'m CalmChat, your mental health support companion. How are you feeling today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = {
          role: 'bot',
          content: data.reply,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'bot',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="chat-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-container">
          {/* Header */}
          <div className="chat-header">
            <div className="header-content">
              <div className="bot-avatar">🧘</div>
              <div className="header-text">
                <h2>CalmChat</h2>
                <p className="status">
                  <span className="status-dot"></span>
                  Online
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.role === 'bot' && (
                  <div className="message-avatar">🧘</div>
                )}
                <div className="message-content">
                  <p>{message.content}</p>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot-message">
                <div className="message-avatar">🧘</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form className="chat-input-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="chat-input"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="send-button"
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>

          {/* Disclaimer */}
          <div className="chat-disclaimer">
            <p>⚠️ This is a support chatbot, not a replacement for professional help.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;