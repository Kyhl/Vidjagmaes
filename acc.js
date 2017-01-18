var ctx;
var c;
var dx;
var dy;
var x;
var y;
var ballRadius;
var paddleHeight;
var paddleWidth;
var paddleX;
var kx;
var ky;
var rightPressed;
var leftPressed;

function draw() {
	
	ctx.clearRect(0,0,c.width,c.height);
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
	 if(x + dx > c.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > c.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
	x += dx;
	y += dy;
	paddle();
	if(rightPressed){
		paddleX += 2;
	}
	else if(leftPressed){
		paddleX -= 2;
	}
}

function moveleft(){
	document.addEventListener("touchstart", move, false);
	document.addEventListener("touchend", stopmove, false);
}

function move(){
	kx = event.touches[0].pageX;
	ky = event.touches[0].pageY;
	if(kx > c.width/2){
		rightPressed = true;
	}
	else if(kx < c.width/2){
		leftPressed = true;
	}
}

function stopmove(){
	if(kx > c.width/2){
		rightPressed = false;
	}
	else if(kx < c.width/2){
		leftPressed = false;
	}
}

setInterval(draw, 10);
function paddle(){
	ctx.beginPath();
	ctx.rect(paddleX, c.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();	
	ctx.closePath();
	}
	
function init(){
c=document.getElementById("myCanvas");
ctx = c.getContext("2d");
x=c.width/2;
y=c.height-30;
ballRadius=10;
dx=1;
dy=-4;
paddleHeight= 10;
paddleWidth = 75;
paddleX = (c.width-paddleWidth)/2;

rightPressed = false;
leftPressed = false;
}

function end(e){
	e.preventDefault();
	ctx.moveTo(0,0)
}