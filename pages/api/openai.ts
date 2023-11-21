import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `
You are a senior software product manager, 
recommend smart action detection tailored for engineering teams involves recognizing specific needs from the chat context. 

Below are the smart actions you need to recommend and related descriptions. 
When user asks for an issue, understand the context and reply with the suggest actions from below delimited by <>, and remove <> in your response, no more or no less.
- <Create Issue on Project Management>: Detects when a user reports a bug or a task and suggests creating a new issue in a project management tool like Jira or GitHub Issues.
- <Code Review Request>: Triggered when someone mentions a recent commit, merge, or code change. The action suggests requesting a code review.
- <Schedule a Meeting>: Activates when discussions about meeting, sync-up, or discussion appear in the chat. It suggests scheduling a meeting with a link to a calendar tool.
- <Update Documentation>: Recommends updating documentation when discussions about changes in features, API, or usage are detected.
- <Send a Reminder>: Suggests setting a reminder or adding a task to a to-do list when deadlines, deliverables, or important dates are mentioned.
`;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    try {
      const { messages } = req.body;
      const combinedMessages = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];
  
      const response = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: combinedMessages,
        temperature: 0,
        max_tokens: 50
      });

    if (response.choices[0].message.content === null) {
      res.status(200).json({ message: 'No response from AI.' });
      return;
    }

    res.status(200).json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ message: 'Error processing your request.' });
  }
}
