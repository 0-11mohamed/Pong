let canvas = document.getElementById("monCanvas");
let b_score = document.getElementById("best_score");
let a_score = document.getElementById("score");
let ctx = canvas.getContext("2d");

let score = 0;
let best_score = 0;

let chrono = window.setInterval(time_chrono, 1000);

let x_joueur = canvas.width / 2 - 50;

let x_balle = canvas.width / 2;
let y_balle = canvas.height / 2;

let x_vitesse = +5;
let y_vitesse = +5; 

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && x_joueur > 0) {
        x_joueur -= 30;
    }
    if (event.key === "ArrowRight" && x_joueur < canvas.width - 100) {
        x_joueur += 30;
    }
});

function drawCircle() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x_balle, y_balle, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawRectangle() {
    ctx.fillStyle = "black";
    ctx.fillRect(x_joueur, canvas.height - 30, 100, 20);
}

function mouvement(){
    x_balle+= x_vitesse;
    y_balle+= y_vitesse;
}

function perdu(){
    clearInterval(chrono);
    cancelAnimationFrame(id);
    if(score >= best_score){ 
        best_score = score;
        b_score.textContent = "Best score : " + best_score + "s";
    }
}

function resetGame() {
    clearInterval(chrono); 
    score = 0;
    a_score.textContent = "Score : 0s";
    x_joueur = canvas.width / 2 - 50;
    x_balle = canvas.width / 2;
    y_balle = canvas.height / 2;
    x_vitesse = 5;
    y_vitesse = 5;
    chrono = setInterval(time_chrono, 1000);
}

document.getElementById("btn_play").addEventListener("click", resetGame);

function collision(){
    if(x_balle + 15 >= x_joueur && x_balle - 15 <= x_joueur + 100 && y_balle + 15 >= canvas.height - 30 && y_balle + 15 <= canvas.height - 10) y_vitesse = -y_vitesse;

    if(y_balle - 15 > canvas.height) perdu();

    if(y_balle == 0) y_vitesse = -y_vitesse;

    if(x_balle + 15 >= canvas.width || x_balle - 15 <= 0)x_vitesse = -x_vitesse;
}

function time_chrono(){
    score++;
    a_score.textContent = "Score : " + score + "s";
}


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangle();
    drawCircle();
    mouvement();
    collision();
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);