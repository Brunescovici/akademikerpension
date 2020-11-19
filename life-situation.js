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


//html accordion
function addAccordionEvents() {
    document.querySelectorAll(".accordion").forEach(accordion => {
        accordion.addEventListener("click", function () {
            this.querySelector(".accordion-descr").classList.toggle("open");
        })
    })
}


//fetch data for each new category page

let situations = [];

//get parameters from the URL (everything after the '?' mark)
const urlParams = new URLSearchParams(window.location.search);

//get only the 'id'
const id = urlParams.get('id');
console.log(id);

//fetch the data from wp
function fetchData() {
    fetch("//www.pacdesign.dk/CMS/wp-json/wp/v2/life_change")
        .then((resp) => resp.json())
        .then(function (data) {
            //to access the data outside
            situations = data;
            console.log(situations);
            createTemplate(id);
            addAccordionEvents();
        })
}

fetchData();

//create template and add stuff
function createTemplate(postId) {
    let heroTemplate = document.querySelector("#hero-temp");
    let clone = heroTemplate.content.cloneNode(true);

    //clone all
    situations.forEach(function (situation) {
        if (situation.id == postId) {
            clone.querySelector("#category-heading").innerHTML = situation.title.rendered;
            clone.querySelector("#hero-img-cat").src = situation.hero_image.guid;
            clone.querySelector("#acc1 .accordion-heading h4").textContent = situation.situation_1;
            clone.querySelector("#acc1 .accordion-descr").innerHTML = "<pre>" + situation.situation_1_descr + "</pre>";
            clone.querySelector("#acc2 .accordion-heading h4").textContent = situation.situation_2;
            clone.querySelector("#acc2 .accordion-descr").innerHTML = "<pre>" + situation.situation_2_descr + "</pre>";
            document.querySelector("main").appendChild(clone);

            document.querySelectorAll(".accordion").forEach(accordion => {
                if (accordion.querySelector(".accordion-heading h4").textContent == "") {
                    accordion.classList.add("hidden");
                }
                })
            }
        }
    )

}
