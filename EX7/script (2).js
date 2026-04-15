let container = document.getElementById("container");

let wrongCount = 0;

function randomChar() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
}

function generateInitial() {
    let count = Math.floor(Math.random() * 3);
    let str = "";

    for (let i = 0; i < count; i++) {
        str += randomChar();
    }

    container.innerText = str;
}

function addNewChars() {
    let count = Math.floor(Math.random() * 3) + 1;
    let str = "";

    for (let i = 0; i < count; i++) {
        str += randomChar();
    }

    container.innerText += str;
}

function addBonusChars() {
    let str = "";
    for (let i = 0; i < 3; i++) {
        str += randomChar();
    }

    container.innerHTML += str;
}

window.onload = function () {
    generateInitial();
};

window.addEventListener("keyup", function (e) {

    let text = container.innerText;

    if (text.length > 0 && e.key === text[0]) {
        container.innerText = text.slice(1);
        wrongCount = 0;
    } else {
        wrongCount++;
    }

    addNewChars(); 

    if (wrongCount >= 3) {
        addBonusChars();
        wrongCount = 0;
    }
});