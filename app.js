const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const circleBtn = document.getElementById("jsCircle");

const INITINAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITINAL_COLOR;
ctx.fillStyle = INITINAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let circle = false;
let circleX;
let circleY;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if (!filling && !circle) {
		if (!painting) {
			ctx.beginPath();
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
			ctx.stroke();
		}
	}
}

function handleColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(event) {
	const size = event.target.value;
	ctx.lineWidth = size;
}

function handleModeClick() {
	if (filling === true) {
		filling = false;
		mode.innerText = "Fill";
	} else {
		filling = true;
		mode.innerText = "Paint";
	}
}

function handleCanvasClick() {
	if (filling) {
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}

function handleCM(event) {
	event.preventDefault();
}

function handleSaveClick() {
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "PaintJS[🎨]";
	link.click();
}

function handleCircleClick() {
	if (circle === true) {
		circle = false;
		circleBtn.innerText = "Circle";
	} else {
		circle = true;
		circleBtn.innerText = "Paint";
	}
}

function circleInit(event) {
	if (circle) {
		ctx.beginPath();
		circleX = event.offsetX;
		circleY = event.offsetY;
	}
}

function circlePainting(event) {
	if (circle) {	
		const x = circleX - event.offsetX;
		const y = circleY - event.offsetY;
		const result = Math.sqrt(Math.abs(x * x) + Math.abs(y * y));
		ctx.arc(circleX, circleY, result, 0, 2 * Math.PI);
		ctx.stroke();
	}
}

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleCM);
	canvas.addEventListener("mousedown", circleInit);
	canvas.addEventListener("mouseup", circlePainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
	range.addEventListener("input", handleRangeChange);
}

if (mode) {
	mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
	saveBtn.addEventListener("click", handleSaveClick);
}

if (circleBtn) {
	circleBtn.addEventListener("click", handleCircleClick);
}