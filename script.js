function generateContent() {
  const titleInput = document.getElementById("title").value.trim();
  const userPrompt = document.getElementById("prompt").value.trim();

  if (!userPrompt) {
    alert("Please describe what your song is about.");
    return;
  }

  const genres = ['EDM', 'house', 'techno', 'hyperpop', 'slutpop'].join(', ');

  const fullPrompt = `
You are an expert songwriter and prompt engineer specializing in generating lyrics for AI music platforms like Suno.

Your task is to create a detailed, high-quality prompt that will be used by another AI (like ChatGPT, Gemini, or Claude) to generate song lyrics.

**Instructions for the final AI:**

1.  **Title:** ${titleInput ? `The song must be titled "${titleInput}".` : "Generate a unique and bold AI-style song title (maximum 5 words)."}

2.  **Lyrics Structure:**
    *   Generate full lyrics for a song based on the topic: "${userPrompt}".
    *   The lyrics must be in English.
    *   The structure should be conventional (e.g., Verse 1, Chorus, Verse 2, Chorus, Bridge, Chorus).
    *   Each line of the lyrics must be enclosed in (parentheses).
    *   Include bracketed tags for musical cues, like [Intro], [Verse], [Chorus], [Bridge], [Outro].
    *   Include bracketed tags for musical style and production, like [kick deepens, pads shimmer] or [vocal synth arpeggiates].

3.  **Style and Tone:**
    *   The overall genre is: **${genres}**.
    *   The tone should be raw, emotional, and avoid clichés.
    *   **Banned Words:** Do not use the words "rhythm", "beat", "echo", "shadow", or "whisper" in the lyrics.

4.  **Final Output Format:**
    The final output must be a single block of text containing only the title and the complete, formatted lyrics.

**Example of desired output format:**

(A song about a lonely star)
TITLE: Celestial Static
LYRICS:
[Intro: Ethereal pads and a slow, pulsing synth]
(Verse 1)
(In the velvet black, a single tear)
(A diamond lost, year after year)
(I trace the orbits, cold and vast)
(A future fading, a forgotten past)
(Chorus)
(I'm just celestial static, a silent scream)
(Lost in the fabric of a cosmic dream)
(A billion voices, I can't break through)
(Just a lonely flicker, in a sea of blue)
`;

  document.getElementById("promptOutput").innerText = fullPrompt;
}

function copyToClipboard(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
  });
}

// Make functions available in the global scope since we are not using a module loader
window.generateContent = generateContent;
window.copyToClipboard = copyToClipboard;
