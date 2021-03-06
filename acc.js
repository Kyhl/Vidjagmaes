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
var score;

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function init(){
mc=document.getElementById("myCanvas");
ctx = mc.getContext("2d");
x=mc.width/2;
y=mc.height-30;
ballRadius=10;
dx=randomIntFromInterval(-6,6);
dy=-3;
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
			bricks[c][r] = { x: 0, y: 0, status: 1 };
		}
	}
score = 0;
}

function collisionDetection(){
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			var b = bricks[c][r];
			if(b.status ==1){
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
				dy = -dy;
				b.status = 0;
				score++
					if(score == brickRowCount*brickColumnCount){
						alert("YOU WIN, NO LIFE XD XD!");
						document.location.reload();
					}
				}
			}
		}
	}
}
function draw() {
	
	if(dx>0 || dx<0){
	ctx.clearRect(0,0,mc.width,mc.height);
	drawBall();
	drawPaddle();
	drawBricks();
	collisionDetection();
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
		//alert("GAME OVER");
		document.location.reload();
		}
}
	
	x += dx;
	y += dy;
	
	if(rightPressed){
		paddleX += 4;
	}
	else if(leftPressed){
		paddleX -= 4;
	}
	drawScore();
	}
	else{
		document.location.reload();
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

function end(e){
	e.preventDefault();
	ctx.moveTo(0,0)
}

function drawBricks(){
	
	for(c=0; c < brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			if(bricks[c][r].status ==1){
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			ctx.beginPath();
			ctx.rect(brickX, brickY, brickWidth, brickHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
			}
		}
	}
}

function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
}
setInterval(draw, 10);