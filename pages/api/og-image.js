import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const API_KEY = process.env.API_KEY;
  const apiKey = req.query.apiKey;
  
  if (apiKey !== API_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const url = req.query.url;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    const regex = /<meta property="og:image" content="([^"]+)"/;
    const match = html.match(regex);
    
    if (match) {
      const imageUrl = match[1];
      return res.json({ imageUrl });
    } else {
      return res.status(404).json({ error: 'Open Graph image not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}￼Enter
