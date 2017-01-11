var ctx;
var c;

function draw() {
	ctx.beginPath();
	ctx.arc(50, 50, 10, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}
setInterval(draw, 10);

function init(){
ctx = c.getContext("2d");
c=document.getElementById("myCanvas");
}