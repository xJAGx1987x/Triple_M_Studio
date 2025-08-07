function stripAllTimestamps(text) {
  return text
    .replace(/[\[<]\d{2}:\d{2}(?:\.\d{2,3})?[\]>]/g, '')
    .replace(/ +/g, ' ')
    .replace(/\n\s+/g, '\n')
    .trim();
}

function keepFirstTimestampOnly(text) {
  return text
    .split('\n')
    .map(line => {
      const matches = line.match(/[\[<]\d{2}:\d{2}(?:\.\d{2,3})?[\]>]/g);
      if (!matches) return line.trim(); // no timestamps at all

      const firstTimestamp = matches[0];

      // Remove ALL timestamps
      const cleanLine = line.replace(/[\[<]\d{2}:\d{2}(?:\.\d{2,3})?[\]>]/g, '');

      // Collapse extra spaces
      const normalized = cleanLine.replace(/\s+/g, ' ').trim();

      return `${firstTimestamp} ${normalized}`;
    })
    .join('\n');
}

function searchLyrics() {
  const artist = document.getElementById("artist").value.trim();
  const title = document.getElementById("title").value.trim();
  const strip = document.getElementById("strip-toggle").checked;

  const lyricsBox = document.getElementById("lyrics-display");
  lyricsBox.innerText = "🎵 Searching...";

  fetch(`https://triple-m-backends.onrender.com/lyrics?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`)
    .then(res => res.json())
    .then(data => {
      if (data.lyrics) {
        let lyrics = data.lyrics;
        lyrics = strip ? stripAllTimestamps(lyrics) : keepFirstTimestampOnly(lyrics);
        lyricsBox.innerText = lyrics;
      } else {
        lyricsBox.innerText = `⚠️ ${data.message || "Lyrics not found."}`;
      }
    })
    .catch(err => {
      console.error(err);
      lyricsBox.innerText = "🚨 Error fetching lyrics.";
    });
}

document.getElementById("search-button").addEventListener("click", searchLyrics);
