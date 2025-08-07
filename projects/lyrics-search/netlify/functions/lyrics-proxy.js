const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { artist, title } = event.queryStringParameters;

  const backendURL = `https://triple-m-backends.onrender.com/lyrics?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`;

  try {
    const response = await fetch(backendURL);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' })
    };
  }
};
