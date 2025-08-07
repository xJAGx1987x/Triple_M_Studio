// netlify/functions/lyrics-proxy.js

export async function handler(event) {
  const { artist, title } = event.queryStringParameters;

  if (!artist || !title) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing artist or title" }),
    };
  }

  const backendUrl = `https://triple-m-backends.onrender.com/lyrics?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`;

  try {
    const response = await fetch(backendUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error", error: error.message }),
    };
  }
}
