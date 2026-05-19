export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { type, id, source } = req.query;

  let url = '';

  if (type === 'matches') {
    url = 'https://streamed.su/api/matches/football/live';
  } else if (type === 'today') {
    url = 'https://streamed.su/api/matches/football/popular';
  } else if (type === 'stream' && id && source) {
    url = `https://streamed.su/api/stream/${source}/${id}`;
  } else if (type === 'stream' && id) {
    url = `https://streamed.su/api/stream/alpha/${id}`;
  } else {
    url = 'https://streamed.su/api/matches/football/live';
  }

  try {
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://streamed.su/',
        'Origin': 'https://streamed.su',
        'Accept': 'application/json'
      }
    });
    const text = await r.text();
    let data;
    try { data = JSON.parse(text); } catch(e) { data = { error: 'Parse error', raw: text.slice(0, 200) }; }
    return res.status(200).json(data);
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
