// import { GoogleGenerativeAI } from "@google/generative-ai";

const btn = document.getElementById("sendBtn");

btn.addEventListener("click", generateContent);

const apikey = "AIzaSyD7GZt4R0X8LYvMeMzWfWLk8FuORCgpysw";
async function generateContent() {
    const userInput = document.getElementById("inp");
    const containor = document.getElementById("containor2");
    containor.classList.add("containor2");

    const card = document.getElementById("card");
    card.style.display = "none";
    if (!userInput.value) {
        return;
    }


    const content = document.getElementById("content");
    const div = document.createElement("div");
    div.innerHTML = `
               <div>
                        <div class="loading-text" id="loading">
                            Generating response
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
            `;
    content.appendChild(div);

    // containor.textContent = "Generating content...";
    setTimeout(() => {
        // Hide the loading animation
        document.getElementById("loading").style.display = "none";
        // Show the response content
        document.getElementById("response").style.display = "block";
    }, 3000);

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apikey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userInput.value }]
                }]
            }),
        });


        const data = await response.json();
        let result = data.candidates[0].content.parts[0].text;
        let str = result.split("**");
        // console.log(str);






        let responseArr = str;
        let newResponse;
        let pre;
        // console.log(pre);
        const fun = (index, nextWord) => {

            setTimeout(function() {
                pre = pre + nextWord;
            }, 75 * index); // Delay based on the index
        }

        for (let i = 0; i < responseArr.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArr[i];
            } else {
                newResponse += "<b>" + responseArr[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        // console.log(newResponse2);
        let newResponseArr = newResponse2.split(" ");
        // console.log(newResponseArr); // Log the array of words

        // Iterate over the array and add each word with a delay
        for (let j = 0; j < newResponseArr.length; j++) {
            const nextWord = newResponseArr[j];
            fun(j, nextWord + " "); // Add space after each word
        }
        // console.log(pre);


        const geminiContainor = document.createElement("div");
        geminiContainor.className = "gemini-containor";

        const geminiDIv = document.createElement("div");
        geminiDIv.className = "gemini";
        const img = document.createElement("img");
        img.src = "./IMG/ai-technology.png";
        geminiDIv.appendChild(img);


        const msg = document.createElement("div");
        msg.className = "message";
        const p = document.createElement("p");
        p.innerHTML = newResponse2;
        msg.appendChild(p);

        geminiContainor.appendChild(geminiDIv);
        geminiContainor.appendChild(msg);

        containor.appendChild(geminiContainor);


        userInput.value = '';



        if (response.ok) {

            containor.style.display = "block";

        } else {
            console.log("error");
        }
    } catch (error) {
        console.error("Error:", error);
        responseDiv.textContent = "Error communicating with the Gemini API.";
    }
};

const menu = document.getElementById("menu");
const inputSection = document.getElementById("inputSection");
menu.addEventListener("click", function() {
    // alert("he");
    const menuWidth = document.getElementById("menuWidth");
    if (menuWidth.style.width == "43px") {
        menuWidth.style.width = "185px";
        inputSection.style.display = "none";
    } else {
        menuWidth.style.width = "43px";
        inputSection.style.display = "flex";
    }

});

const about = document.getElementById("about");
about.addEventListener("click", function() {
    location.href = "http://localhost:3000/about";
})

const createNewChat = document.getElementById("create-new-chat");
createNewChat.addEventListener("click", function() {
    const url = 'http://localhost:3000/';
    window.open(url, '_blank');
})