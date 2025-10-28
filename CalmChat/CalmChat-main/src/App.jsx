import React, { useState } from "react";

const App = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	const sendMessage = async () => {
		if (!input.trim()) return;

		const newMessages = [...messages, { sender: "user", text: input }];
		setMessages(newMessages);
		setInput("");
		setLoading(true);

		try {
			const res = await fetch("http://localhost:5000/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: input }),
			});
			const data = await res.json();
			if (data.reply) {
				setMessages([
					...newMessages,
					{ sender: "bot", text: data.reply },
				]);
			}
		} catch (error) {
			console.error("Error:", error);
		}
		setLoading(false);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") sendMessage();
	};

	return (
		<div className="calmchat-container">
			<div className="chat-header">CalmChat</div>
			<div className="chat-box">
				{messages.map((msg, idx) => (
					<div key={idx} className={`message ${msg.sender}`}>
						{msg.text}
					</div>
				))}
				{loading && <div className="message bot">Typing...</div>}
			</div>
			<div className="chat-input">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyPress}
					placeholder="Ask me anything..."
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
		</div>
	);
};

export default App;
