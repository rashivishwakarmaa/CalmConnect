// Backend API URL - adjust if your backend runs on a different port
const API_URL = 'http://localhost:5000/chat';

// Chatbot elements
const chatBot = document.querySelector('.chatBot');
const chatbox = document.querySelector('.chatbox');
const textarea = document.querySelector('.chat-input textarea');
const sendBtn = document.getElementById('sendBTN');
const crossBtn = document.getElementById('cross');

// Chatbot toggle button (create if it doesn't exist)
let chatToggleBtn = null;

// Initialize chatbot
function initChatbot() {
    // Create toggle button if it doesn't exist
    if (!document.getElementById('chatToggleBtn')) {
        chatToggleBtn = document.createElement('button');
        chatToggleBtn.id = 'chatToggleBtn';
        chatToggleBtn.className = 'chat-toggle-button';
        chatToggleBtn.innerHTML = '💬';
        chatToggleBtn.setAttribute('aria-label', 'Toggle chat');
        document.body.appendChild(chatToggleBtn);
    } else {
        chatToggleBtn = document.getElementById('chatToggleBtn');
    }

    // Initially hide chatbot
    if (chatBot) {
        chatBot.style.display = 'none';
    }

    // Toggle chatbot visibility
    if (chatToggleBtn) {
        chatToggleBtn.addEventListener('click', () => {
            if (chatBot) {
                const isVisible = chatBot.style.display !== 'none';
                chatBot.style.display = isVisible ? 'none' : 'flex';
                chatToggleBtn.classList.toggle('active', !isVisible);
                // Focus on textarea when opening
                if (!isVisible && textarea) {
                    setTimeout(() => textarea.focus(), 100);
                }
            }
        });
    }

    // Close button functionality
    if (crossBtn) {
        crossBtn.addEventListener('click', cancel);
    }

    // Send button functionality
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    // Enter key to send message
    if (textarea) {
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

// Cancel/close chatbot
function cancel() {
    if (chatBot) {
        chatBot.style.display = 'none';
        if (chatToggleBtn) {
            chatToggleBtn.classList.remove('active');
        }
    }
}

// Send message to backend
async function sendMessage() {
    if (!textarea || !sendBtn) return;

    const userMessage = textarea.value.trim();
    if (!userMessage) return;

    // Disable input while sending
    textarea.disabled = true;
    sendBtn.disabled = true;

    // Add user message to chatbox
    addChatMessage(userMessage, 'outgoing');

    // Clear textarea
    textarea.value = '';

    // Show typing indicator
    const typingLi = document.createElement('li');
    typingLi.className = 'chat incoming';
    typingLi.innerHTML = `
        <p class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </p>
    `;
    chatbox.appendChild(typingLi);
    scrollToBottom();

    try {
        // Send request to backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        // Remove typing indicator
        chatbox.removeChild(typingLi);

        if (response.ok) {
            const data = await response.json();
            if (data.reply) {
                addChatMessage(data.reply, 'incoming');
            } else {
                addChatMessage('Sorry, I didn\'t receive a proper response. Please try again.', 'incoming');
            }
        } else {
            const errorData = await response.json().catch(() => ({}));
            addChatMessage(
                errorData.error || 'Sorry, I\'m having trouble connecting right now. Please make sure the backend server is running.',
                'incoming'
            );
        }
    } catch (error) {
        console.error('Error:', error);
        // Remove typing indicator
        if (chatbox.contains(typingLi)) {
            chatbox.removeChild(typingLi);
        }
        addChatMessage(
            'I apologize, but I\'m having trouble connecting to the server. Please make sure the backend is running on ' + API_URL,
            'incoming'
        );
    } finally {
        // Re-enable input
        textarea.disabled = false;
        sendBtn.disabled = false;
        textarea.focus();
    }
}

// Add message to chatbox
function addChatMessage(message, type) {
    const li = document.createElement('li');
    li.className = `chat ${type}`;
    
    const p = document.createElement('p');
    // Handle multi-line messages
    const lines = message.split('\n');
    lines.forEach((line, index) => {
        if (index > 0) {
            p.appendChild(document.createElement('br'));
        }
        p.appendChild(document.createTextNode(line));
    });
    
    li.appendChild(p);
    chatbox.appendChild(li);
    scrollToBottom();
}

// Scroll chatbox to bottom
function scrollToBottom() {
    if (chatbox) {
        chatbox.scrollTop = chatbox.scrollHeight;
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
