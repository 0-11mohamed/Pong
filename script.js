let canvas = document.getElementById("monCanvas");
let ctx = canvas.getContext("2d");
const result = { best_score: 0, score: 0};

let x_joueur = canvas.width / 2 - 50;

let x_balle = canvas.width / 2;
let y_balle = canvas.height / 2;

let x_vitesse = 0;
let y_vitesse = +10; 

function drawCircle() {
    ctx.fillStyle = "red";
    ctx.arc(x_balle, y_balle, 15, 0, Math.PI * 2);
    ctx.fill();
    x_balle+= x_vitesse;
    y_balle+= y_vitesse;
}

function drawRectangle() {
    ctx.fillStyle = "black";
    ctx.fillRect(x_joueur, canvas.height - 50, 100, 20);
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangle();
    drawCircle();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && x_joueur > 0) {
        x_joueur -= 10;
    }
    if (event.key === "ArrowRight" && x_joueur < canvas.width - 100) {
        x_joueur += 10;
    }
    loop();
});

loop();