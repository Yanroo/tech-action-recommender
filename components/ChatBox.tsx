import React, { useState, FormEvent } from 'react';
import Message from './Message';

interface ChatBoxProps {
  messages: Array<{ role: string, content: string }>;
  onNewMessage: (message: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onNewMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (e: FormEvent) => {
    e.preventDefault(); // Prevents the default form submission behavior
    onNewMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="chat-box">
      <div>
        {messages.map((message, index) => (
          <Message key={index} role={message.role} content={message.content} />
        ))}
      </div>
      {/* Wrap the input and button in a form element */}
      <form onSubmit={sendMessage} className="flex mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border p-2"
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
