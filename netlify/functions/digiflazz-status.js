const crypto = require('crypto');
exports.handler = async (event) => {
  const { ref_id } = JSON.parse(event.body || '{}');
  const username = process.env.DIGIFLAZZ_USERNAME;
  const api_key = process.env.DIGIFLAZZ_API_KEY;
  const sign = crypto.createHash('md5').update(username + api_key + ref_id).digest('hex');
  try {
    const res = await fetch('https://api.digiflazz.com/v1/transaction', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, sign, ref_id, cmd: 'status' })
    });
    const data = await res.json();
    return { statusCode: 200, headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
