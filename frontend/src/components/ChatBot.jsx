 import { useState } from 'react';
import axios from 'axios';
import '../styles.css';

function ChatBot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Hi! I’m your fashion assistant. Ask me about orders, stock, or top products!' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updated = [...messages, { from: 'user', text: input }];
    setMessages(updated);

    let reply;

    try {
      const message = input.toLowerCase();

      if (message.includes('top') && message.includes('products')) {
        const res = await axios.get('http://localhost:5000/api/chatbot/top-products');
        const products = res.data;
        reply = "🛍️ Top 5 Sold Products:\n" + products.map((p, i) => `${i + 1}. ${p.name}`).join('\n');

      } else if (message.includes('order')) {
        const orderId = message.match(/\d+/)?.[0];
        if (orderId) {
          const res = await axios.get(`http://localhost:5000/api/chatbot/order-status/${orderId}`);
          const { status } = res.data;
          reply = status ? `📦 Order ${orderId} is currently *${status}*.` : '❌ Order not found.';
        } else {
          reply = '⚠️ Please provide a valid order ID.';
        }

      } else if (message.includes('stock') || message.includes('left') || message.includes('available')) {
        const cleaned = input.replace(/\?$/, '').trim(); // remove trailing ?
        const match = cleaned.match(/for\s+(.+?)(?:\s+(left|available|in stock))?$/i);
        const rawProduct = match?.[1] || input;

        const productName = rawProduct.trim();
        if (!productName) {
          reply = '⚠️ Please provide a product name.';
        } else {
          const encoded = encodeURIComponent(productName);
          const res = await axios.get(`http://localhost:5000/api/chatbot/stock/${encoded}`);
          const data = res.data;

          if (data?.error) {
            reply = `❌ ${data.error}`;
          } else {
            reply = `📦 ${data.remaining_stock} units left of "${data.product_name}".`;
          }
        }

      } else {
        reply = "🤖 Sorry, I didn't understand. Try asking about:\n- Top products\n- Order status (e.g., Order 12345)\n- Product stock (e.g., How many 'Classic T-Shirts' left?)";
      }

    } catch (error) {
      console.error(error);
      reply = '⚠️ Error connecting to server.';
    }

    setMessages(prev => [...prev, { from: 'bot', text: reply }]);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder='Try: "What is order status 12345?" or "How many Classic T-Shirts are left?"'
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;
