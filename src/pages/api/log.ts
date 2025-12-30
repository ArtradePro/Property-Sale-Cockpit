import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { level = 'info', message = '' } = req.body || {};
  // Simple server-side log
  console[level](`[LOG] ${message}`);
  res.status(200).json({ status: 'ok' });
}
