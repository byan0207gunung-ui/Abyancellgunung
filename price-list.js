const crypto = require('crypto');
exports.handler = async () => {
  const username = process.env.DIGIFLAZZ_USERNAME;
  const api_key = process.env.DIGIFLAZZ_API_KEY;
  const sign = crypto.createHash('md5').update(username + api_key + 'pricelist').digest('hex');
  try {
    const res = await fetch('https://api.digiflazz.com/v1/price-list', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ cmd: 'prepaid', username, sign })
    });
    const data = await res.json();
    return { statusCode: 200, headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};