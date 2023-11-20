const sendMessageToOpenAI = async (messages: Array<{ role: string, content: string }>): Promise<string> => {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error communicating with server:', error);
    return 'Error processing your request.';
  }
};

export { sendMessageToOpenAI };
