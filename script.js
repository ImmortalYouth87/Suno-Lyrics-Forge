function generateContent() {
  const titleInput = document.getElementById("title").value.trim();
  const promptText = document.getElementById("prompt").value.trim();

  if (!promptText) {
    alert("Please enter a prompt for the song.");
    return;
  }

  // Simulated generation (replace later with AI logic)
  const generatedTitle = titleInput || generateFakeTitle(promptText);
  const lyrics = generateFakeLyrics(promptText, generatedTitle);
  const style = generateFakeStyle(promptText, generatedTitle);

  document.getElementById("generatedTitle").innerText = titleInput ? `Title: ${titleInput}` : `Generated Title: ${generatedTitle}`;
  document.getElementById("lyricsOutput").innerText = lyrics;
  document.getElementById("styleOutput").innerText = style;
}

function generateFakeTitle(prompt) {
  return "Midnight Spell"; // later: actual AI logic
}

function generateFakeLyrics(prompt, title) {
  return `[Tag: Genre; Slutpop Hyperhouse]\n[Intro: Pads shimmer, kick fades in]\n(${title}… I whisper it like a curse)\n[Verse 1: Bass glides in, whisper vocals begin]\n(You said you'd love me forever...)`;
}

function generateFakeStyle(prompt, title) {
  return `A gritty and empowering slutpop track with hyperpop and house influences. It blends whispered vocals, bouncing club-ready production, and a raw sensual tone. Generated from prompt: "${prompt}".`;
}

function copyToClipboard(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}
