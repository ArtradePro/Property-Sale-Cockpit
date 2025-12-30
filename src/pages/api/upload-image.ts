// Next.js API route for secure image upload to Cloudinary
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { uploadImage } from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Error parsing form data' });
    }
    const file = files.image;
    if (!file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    try {
      const result = await uploadImage(file.filepath);
      return res.status(200).json({ url: result.secure_url });
    } catch (error) {
      return res.status(500).json({ error: 'Image upload failed' });
    }
  });
}
