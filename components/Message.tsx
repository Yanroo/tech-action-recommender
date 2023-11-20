import React from 'react';

interface MessageProps {
  role: string;
  content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
  return (
    <div className={`message ${role === 'user' ? 'bg-blue-100' : 'bg-gray-100'} p-2 my-2 rounded`}>
      <p>{content}</p>
    </div>
  );
};

export default Message;
