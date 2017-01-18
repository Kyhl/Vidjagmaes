var ctx;
var mc;
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
var brickRowCount;
var brickColumnCount;
var brickWidth;
var brickHeight;
var brickPadding;
var brickOffsetTop;
var brickOffsetLeft;
var bricks;

function draw() {
	
	ctx.clearRect(0,0,mc.width,mc.height);
	drawBall();
	drawPaddle();
	drawBricks();
	
	if(x + dx > mc.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
	if(y + dy < ballRadius) {
		dy= -dy;
	} else if(y + dy > mc.height-ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth){
			dy = -dy;
		}
		else {
		alert("GAME OVER");
		document.location.reload();
		}
}
	
	x += dx;
	y += dy;
	
	if(rightPressed){
		paddleX += 2;
	}
	else if(leftPressed){
		paddleX -= 2;
	}
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();	
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, mc.height-paddleHeight+5, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();	
	ctx.closePath();
	}
	
function moveleft(){
	document.addEventListener("touchstart", move, false);
	document.addEventListener("touchend", stopmove, false);
}

function move(){
	kx = event.touches[0].pageX;
	ky = event.touches[0].pageY;
	if(kx > mc.width/2){
		rightPressed = true;
	}
	else if(kx < mc.width/2){
		leftPressed = true;
	}
}

function stopmove(){
	if(kx > mc.width/2){
		rightPressed = false;
	}
	else if(kx < mc.width/2){
		leftPressed = false;
	}
}



	
function init(){
mc=document.getElementById("myCanvas");
ctx = mc.getContext("2d");
x=mc.width/2;
y=mc.height-30;
ballRadius=10;
dx=0;
dy=-4;
paddleHeight= 10;
paddleWidth = 75;
paddleX = (mc.width-paddleWidth)/2;
rightPressed = false;
leftPressed = false;
brickRowCount = 3;
brickColumnCount = 5;
brickWidth = 75;
brickHeight = 20;
brickPadding = 10;
brickOffsetTop = 30;
brickOffsetLeft = 30;
bricks = [];
	for(c=0; c<brickColumnCount; c++) {
		bricks[c] = [];
		for(r=0; r<brickRowCount; r++){
			bricks[c][r] = { x: 0, y: 0 };
		}
	}
}

function end(e){
	e.preventDefault();
	ctx.moveTo(0,0)
}

function drawBricks(){
	
	for(c=0; c < brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x = 0;
			bricks[c][r].y = 0;
			ctx.beginPath();
			ctx.rect(0, 0, brickWidth, brickHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}
	}
}

setInterval(draw, 10);