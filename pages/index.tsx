import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import { sendMessageToOpenAI } from '../utils/openaiService';

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([]);

  const handleNewMessage = async (content: string) => {
    const userMessage = { role: 'user', content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    const openAIResponse = await sendMessageToOpenAI(newMessages);
    setMessages([...newMessages, { role: 'system', content: openAIResponse }]);
  };

  return (
    <div className="container mx-auto p-4">
      <ChatBox messages={messages} onNewMessage={handleNewMessage} />
    </div>
  );
};

export default Home;
