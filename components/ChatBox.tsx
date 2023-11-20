import React, { useState } from 'react';
import Message from './Message';

interface ChatBoxProps {
  messages: Array<{ role: string, content: string }>;
  onNewMessage: (message: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onNewMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
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
      <div className="flex mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border p-2"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
