export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const KEY = '5b175c43a781894d49be2c68ffc972da';
  const params = new URLSearchParams(req.query);
  const type = params.get('type');
  const sport = params.get('sport') || params.get('category') || 'football';
  const date = params.get('date');
  const status = params.get('status');
  const id = params.get('id');

  let url = '';

  if (type === 'detail' && id) {
    url = `https://api.sportsrc.org/?data=detail&category=${sport}&id=${id}`;
  } else if (status === 'inprogress') {
    url = `https://api.sportsrc.org/?data=matches&category=${sport}`;
  } else {
    url = `https://api.sportsrc.org/?data=matches&category=${sport}`;
  }

  try {
    const r = await fetch(url, {
      headers: {
        'X-API-KEY': KEY,
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });
    const text = await r.text();
    let data;
    try { data = JSON.parse(text); } catch(e) { data = { raw: text }; }
    return res.status(200).json(data);
  } catch(e) {
    return res.status(500).json({ status: false, message: e.message });
  }
}
