import { useState }import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const fetchOgImage = async () => {
    try {
      const response = await axios.get('/api/og-image', {
        params: { url, apiKey },
      });
      setImageUrl(response.data.imageUrl);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      setImageUrl('');
    }
  };

  return (
    <div>
      <h1>Open Graph Image Downloader</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={fetchOgImage}>Fetch Image</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Open Graph Image" style={{ maxWidth: '100%' }} />}
    </div>
  );
}￼Enter
