// Next.js API route for deleting a user
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const USERS_PATH = path.join(process.cwd(), 'data', 'users.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { id } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_PATH, 'utf-8'));
    const filtered = users.filter((u: any) => u.id !== id);
    fs.writeFileSync(USERS_PATH, JSON.stringify(filtered, null, 2));
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete user' });
  }
}
