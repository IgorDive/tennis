"use strict"

var widthSVG = 900;
var heightSVG = 600;
var widthRectAll = 20;
var heightRectAll = 140;
var radius = 20;
var heightTopField = 40;
var amountFontSize = 40;
var amountLeft = 0;
var amountRight = 0;
var cx = widthSVG/2;
var cy = (heightSVG + heightTopField)/2;
var rly = (heightSVG + heightTopField - heightRectAll) / 2;
var rry = (heightSVG + heightTopField - heightRectAll) / 2;
var uri = "http://www.w3.org/2000/svg"
var inputPlace = document.querySelector("body");
var svg = document.createElementNS(uri, "svg");
var rect = document.createElementNS(uri, "rect");
var rectLeft = document.createElementNS(uri, "rect");
var rectRight = document.createElementNS(uri, "rect");
var circle = document.createElementNS(uri, "circle");
var textButton = document.createElementNS(uri, "text");
var input = document.createElementNS(uri, "rect");
var amount = document.createElementNS(uri, "text");
var radGrad = document.createElementNS(uri, "radialGradient");
var stopSt = document.createElementNS(uri, "stop");
var stopEnd = document.createElementNS(uri, "stop");
var linGrad = document.createElementNS(uri, "linearGradient");
var stopStLin = document.createElementNS(uri, "stop");
var stopEndLin = document.createElementNS(uri, "stop");
var timers = document.createElementNS(uri, "text");
var timerID;
var setTimeoutAll = 120000;
var setTimeoutD = setTimeoutAll / 1000;
var SpeedBall = 5;
var rightUp;
var leftUp;
var rightDown;
var leftDown;
var cornerStart;
var timer = true;

	svg.setAttribute("width", widthSVG);
	svg.setAttribute("height", heightSVG);
	svg.setAttribute("xmlns", uri);
	inputPlace.appendChild(svg);

	rect.setAttribute("x", 0);
	rect.setAttribute("y", heightTopField);
	rect.setAttribute("width", widthSVG);
	rect.setAttribute("height", heightSVG - heightTopField);
	rect.setAttribute("stroke", "green");
	rect.setAttribute("fill", "lightgray")
	svg.appendChild(rect);

	rectLeft.setAttribute("x", 0);
	rectLeft.setAttribute("y", rly);
	rectLeft.setAttribute("width", widthRectAll);
	rectLeft.setAttribute("height", heightRectAll);
	rectLeft.setAttribute("fill", "url(#q2)");
	svg.appendChild(rectLeft);

	rectRight.setAttribute("x", widthSVG - widthRectAll);
	rectRight.setAttribute("y", rry);
	rectRight.setAttribute("width", widthRectAll);
	rectRight.setAttribute("height", heightRectAll);
	rectRight.setAttribute("fill", "url(#q2)");
	svg.appendChild(rectRight);

	circle.setAttribute("cx", cx);
	circle.setAttribute("cy", cy);
	circle.setAttribute("r", radius);
	circle.setAttribute("fill", "url(#q1)");
	svg.appendChild(circle);	

	input.setAttribute("x", 0);
	input.setAttribute("y", 0);
	input.setAttribute("width", 100);
	input.setAttribute("height", 30);
	input.setAttribute("fill", "lightgray");
	svg.appendChild(input);

	textButton.setAttribute("x", 18);
	textButton.setAttribute("y", 22);
	textButton.style.cssText = "font:" + amountFontSize/2 + "px Arial;";
	textButton.textContent = "Старт!";
	textButton.style.cursor = "pointer";
	svg.appendChild(textButton);

	amount.setAttribute("x", widthSVG/2 - 2*amountFontSize/3);
	amount.setAttribute("y", heightTopField - 10);
	amount.style.cssText = "font:" + amountFontSize + "px Arial;";
	amount.textContent = amountLeft + ":" + amountRight;
	svg.appendChild(amount);

	timers.setAttribute("x", widthSVG/2 + 7*amountFontSize);
	timers.setAttribute("y", heightTopField - 15);
	timers.style.cssText = "font:" + amountFontSize/1.8 + "px Arial;";
	timers.textContent = "Осталось: " + setTimeoutD;
	svg.appendChild(timers);

	radGrad.setAttribute("id", "q1");
	radGrad.setAttribute("cx", "60%");
	radGrad.setAttribute("cy", "60%");
	svg.appendChild(radGrad);

	stopSt.setAttribute("offset", "0%");
	stopSt.setAttribute("stop-color", "white");
	radGrad.appendChild(stopSt);

	stopEnd.setAttribute("offset", "100%");
	stopEnd.setAttribute("stop-color", "#707070");
	radGrad.appendChild(stopEnd);

	linGrad.setAttribute("id", "q2");
	linGrad.setAttribute("x1", "0%");
	linGrad.setAttribute("y1", "0%");
	linGrad.setAttribute("x2", "60%");
	linGrad.setAttribute("y2", "0%");
	linGrad.setAttribute("spreadMethod", "reflect")
	svg.appendChild(linGrad);

	stopStLin.setAttribute("offset", "0%");
	stopStLin.setAttribute("stop-color", "black");
	linGrad.appendChild(stopStLin);

	stopEndLin.setAttribute("offset", "100");
	stopEndLin.setAttribute("stop-color", "white");
	linGrad.appendChild(stopEndLin);

	textButton.addEventListener("click", startGame, false);
	inputPlace.addEventListener("keydown", moverect, false);
	document.addEventListener("keyup", keysUp, true);
	
	requestAnimationFrame(actionRect);
	
	function startGame(e) {
		e = e || window.event;
		amountLeft = 0;
		amountRight = 0;
		cx = widthSVG / 2;
		cy = (heightSVG + heightTopField) / 2;
		//rly = (heightSVG + heightTopField - heightRectAll) / 2;
		//rry = (heightSVG + heightTopField - heightRectAll) / 2;
		cornerStart = ((2 * Math.PI * Math.random() - Math.PI) / 4) + Math.PI * ((Math.round(Math.random() * 1000) % 2)? 1: 0);
		requestAnimationFrame(actionBall);
		setInterval(function () {SpeedBall += 1;}, 30000);
		timerID = setInterval(function () {
			setTimeoutD -= 1; timers.textContent = "Осталось: " + setTimeoutD;
		}, 1000);
		setTimeout(function () {
			timer = false; 
			clearInterval(timerID); 
			setTimeoutD = setTimeoutAll / 1000;
			SpeedBall = 5; 
			setTimeout(function() {timer = true}, 0);
		}, setTimeoutAll);
	}

	function actionRect() {

		rectLeft.setAttribute("y", rly);
		rectRight.setAttribute("y", rry);
		
		if (timer) {
		requestAnimationFrame(actionRect);
		}
	}

	function actionBall() {
		circle.setAttribute("cx", cx);
		circle.setAttribute("cy", cy);
		amount.textContent = amountLeft + ":" + amountRight;

		moveBall();
		if (timer) {
		requestAnimationFrame(actionBall);
		}
	}

	function moveBall() {

		if (cy > (heightSVG - radius) || cy < (heightTopField + radius)) {
			cornerStart = - cornerStart; 
		}
		if (cx > (widthSVG - widthRectAll - radius)) { 
			cornerStart = Math.PI - cornerStart;
			if (cy > rry + heightRectAll && cy <= rry + heightRectAll + 10) {cornerStart -= Math.PI/9}
			if (cy < rry && cy >= rry - 10) {cornerStart += Math.PI/9}
			if ((cy > rry + heightRectAll + 10) || (cy < rry - 10)) {
				amountLeft += 1;
			}
		}
		if (cx < (widthRectAll + radius)) { 
			cornerStart = Math.PI - cornerStart;
			if (cy > rly + heightRectAll && cy <= rly + heightRectAll + 10) {cornerStart += Math.PI/9}
			if (cy < rly && cy >= rly - 10) {cornerStart -= Math.PI/9} 
			if ((cy > rly + heightRectAll + 10) || (cy < rly - 10)) {
				amountRight +=1;
			}
		}
		
		cx = cx + SpeedBall * Math.cos(cornerStart);
		cy = cy + SpeedBall * Math.sin(cornerStart);
	
	}

	function keysUp(e) {
		e = e || window.event;
		e.preventDefault();

		if (e.keyCode === 16) leftUp = false;
		if (e.keyCode === 17) leftDown = false;
		if (e.keyCode === 38) rightUp = false;
		if (e.keyCode === 40) rightDown = false; 
	}

	function moverect(e) {
		e = e || window.event;
		e.preventDefault();
		if (e.keyCode === 38) {	
			rightUp = true;	
			moveRightUp();
		}
		if (e.keyCode === 40) {
			rightDown = true;
			moveRightDown();
		}
		if (e.keyCode === 16) {
			leftUp = true;
			moveLeftUp();
		}
		if (e.keyCode === 17) {
			leftDown = true;
			moveLeftDown();
		}
	}

	function moveRightUp() {
		if (rightUp) {
			((rry - 5) < heightTopField)? rry = heightTopField: rry = rry - 5;
			//moveRightUp();
		}
	}
	function moveRightDown() {
		if (rightDown) {
			((rry + 5) > (heightSVG - heightRectAll))? rry = heightSVG - heightRectAll: rry = rry + 5;
			//moveRightDown();
		}
	}
	function moveLeftUp() {
		if (leftUp) {
			((rly - 5) < heightTopField)? rly = heightTopField: rly = rly - 5;
			//moveLeftUp();
		}
	}
	function moveLeftDown() {
		if (leftDown) {
			((rly + 5) > (heightSVG - heightRectAll))? rly = heightSVG - heightRectAll: rly = rly + 5;
			//moveLeftDown();
		}
	}