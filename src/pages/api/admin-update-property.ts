// Next.js API route for updating property details
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const PROPERTY_PATH = path.join(process.cwd(), 'data', 'property.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const updated = req.body;
    fs.writeFileSync(PROPERTY_PATH, JSON.stringify(updated, null, 2));
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update property' });
  }
}
