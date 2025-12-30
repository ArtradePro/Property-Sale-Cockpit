// Next.js API route for sending user messages
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const MESSAGES_PATH = path.join(process.cwd(), 'data', 'messages.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { from, to, content } = req.body;
    if (
      !from ||
      !to ||
      !content ||
      typeof from !== 'string' ||
      typeof to !== 'string' ||
      typeof content !== 'string' ||
      content.length < 2 ||
      content.length > 1000
    ) {
      return res.status(400).json({ error: 'Invalid or missing fields' });
    }
    let messages = [];
    if (fs.existsSync(MESSAGES_PATH)) {
      messages = JSON.parse(fs.readFileSync(MESSAGES_PATH, 'utf-8'));
    }
    messages.push({ from, to, content, createdAt: new Date().toISOString() });
    fs.writeFileSync(MESSAGES_PATH, JSON.stringify(messages, null, 2));
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
