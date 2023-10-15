import { config } from "dotenv";
import OpenAI from "openai";
config();

const chatGPT = new OpenAI({
  apiKey: process.env.API_KEY, dangerouslyAllowBrowser: true
});

const form = document.getElementById('hackathon-form');
const themeInput = document.getElementById('theme');
const specializationsInput = document.getElementById('specializations');
const experienceInput = document.getElementById('experience');
const lengthInput = document.getElementById('length');
const outputDiv = document.querySelector('.generated__idea');

form.addEventListener('submit', async (event) => {

  //console.log("Hello World!");
  
  event.preventDefault();

  const theme = themeInput.value;
  const specializations = specializationsInput.value;
  const experience = experienceInput.value;
  const length = lengthInput.value;

  const message = `The theme of the hackathon is "${theme}", the specializations of the team members are "${specializations}", and the team has an "${experience}" experience level. The hackathon is "${length}" long, therefore the project must be completed in this timeframe. Come up with a hackathon project idea that fits all these criteria, and provide online resources that can assist them in their project.`;

  

  async function getAIResponse(userInput) {
    //console.log(message);
    const res = await chatGPT.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
    });
    console.log(res.choices[0].message.content);
    return res.choices[0].message.content;

    //const idea = response.data.choices[0].message.content;

    //outputDiv.innerHTML = `<p>${idea}</p>`;
  }
  

  getAIResponse(message)
  .then(response => {
      console.log("ai response");
      console.log(response);
      document.getElementById('aiResponse').innerHTML = response;
  })
  .catch(error => {
      console.error("An error occurred:", error);
  });

});

  

const menu = document.querySelector('#mobile-menu')
const menuLink = document.querySelector('.navbar__menu')

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLink.classList.toggle('active');
})

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} 