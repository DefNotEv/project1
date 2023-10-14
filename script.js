import { config } from "dotenv";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

const form = document.getElementById('hackathon-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const theme = document.getElementById('theme').value;
    const specializations = document.getElementById('specializations').value;
    const experience = document.getElementById('experience').value;
    const length = document.getElementById('length').value;

    const userInput = `Theme: ${theme}, Specializations: ${specializations}, Experience: ${experience}, Length: ${length}`;

    getAIResponse(userInput)
        .then(response => {
            const outputTextElement = document.getElementById('output-text');
            outputTextElement.innerText = response; // Update the text content
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
});

// Define a function to send user input to the AI model
async function getAIResponse(userInput) {
    const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
    });
    const GPTResponse = res.choices[0].message.content;
    return GPTResponse;
}
