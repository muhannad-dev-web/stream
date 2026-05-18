export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const KEY = '5b175c43a781894d49be2c68ffc972da';
  const params = new URLSearchParams(req.query).toString();
  try {
    const r = await fetch(`https://api.sportsrc.org/v2/?${params}`, {
      headers: { 'X-API-KEY': KEY, 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
