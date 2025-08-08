import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0/dist/transformers.min.js';

// Singleton pattern to ensure the model is loaded only once.
class TextGenerationPipeline {
    static task = 'text-generation';
    static model = 'Xenova/distilgpt2';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

async function generateContent() {
    const titleInput = document.getElementById('title').value.trim();
    const promptText = document.getElementById('prompt').value.trim();

    if (!promptText) {
        alert('Please enter a prompt for the song.');
        return;
    }

    const fullPrompt = `Write raw, emotional song lyrics in the style of edm, house, or hyperpop about ${promptText}. Do not use clichés or common AI words like 'echo', 'shadow', or 'whisper'.`;

    // Show a loading indicator
    const lyricsOutput = document.getElementById('lyricsOutput');
    lyricsOutput.innerText = 'Generating... (Model is loading for the first time, this may take a moment)';

    try {
        // Get the pipeline instance
        const generator = await TextGenerationPipeline.getInstance((data) => {
            console.log('Loading progress:', data);
            if (data.status === 'progress') {
                 lyricsOutput.innerText = `Loading model... ${Math.round(data.progress)}%`;
            }
        });

        // Generate text
        const output = await generator(fullPrompt, {
            max_new_tokens: 250,
            num_return_sequences: 1,
            do_sample: true,
            top_k: 50,
            temperature: 0.9,
        });

        const generatedText = output[0].generated_text;

        // Display the output
        document.getElementById('generatedTitle').innerText = titleInput ? `Title: ${titleInput}` : `Generated Title: My AI Song`;
        lyricsOutput.innerText = generatedText;

    } catch (error) {
        console.error('Error generating content:', error);
        lyricsOutput.innerText = 'Failed to generate lyrics. See console for details.';
    }
}

function copyToClipboard(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

// Make functions available in the global scope
window.generateContent = generateContent;
window.copyToClipboard = copyToClipboard;
