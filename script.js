//functions for the 'live-chat'
document.querySelector("#chat-icon").addEventListener("click", showChat);

function showChat() {
    this.classList.add("hidden");
    document.querySelector("#chat-box").classList.remove("hidden");
}

document.querySelector(".close").addEventListener("click", hideChat);

function hideChat() {
    document.querySelector("#chat-icon").classList.remove("hidden");
    document.querySelector("#chat-box").classList.add("hidden");
}

let chatTemplate = document.querySelector("#chat-template")

sendMessageBot("Hi, my name is Lina. How may I help you today?")

function sendMessageBot(message) {
    let clone = chatTemplate.content.cloneNode(true);
    clone.querySelector(".chat-p").textContent = message;
    document.querySelector(".chat-content").appendChild(clone);
}

document.querySelector(".send-btn").addEventListener("click", sendMessageUser);

function sendMessageUser() {
    let clone = chatTemplate.content.cloneNode(true);
    clone.querySelector(".chat-line").classList.add("user")
    clone.querySelector(".chat-p").textContent = document.querySelector("#user-input").value;
    document.querySelector(".chat-content").appendChild(clone);
    //clear input
    document.querySelector("#user-input").value = "";
}



//fetch the data for the front page

fetch("//www.pacdesign.dk/CMS/wp-json/wp/v2/box")
    .then(res => res.json())
    .then(data => showData(data));

function showData(data) {
    console.log(data);
    data.forEach(addBox);
}

function addBox(data) {
    const Template = document.querySelector("#box").content;
    const cloneBox = Template.cloneNode(true);

    cloneBox.querySelector(".category").textContent = data.box_type;
    cloneBox.querySelector(".box_title").textContent = data.headline;
    cloneBox.querySelector(".box_img").src = data.image.guid;

    const parentCont = document.querySelector("#boxes");
    parentCont.appendChild(cloneBox);
}
//


