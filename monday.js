export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY2NDU5NTIyMiwiYWFpIjoxMSwidWlkIjo2MDc0MzQ5NiwiaWFkIjoiMjAyNi0wNS0yOVQxNDowMzo0Ny45MjVaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTYxOTU1NjYsInJnbiI6InVzZTEifQ.u35YRjIc8AwN0fMQso44-RnphvwOACXR1XV4IStgnXk',
        'API-Version': '2024-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
