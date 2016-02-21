var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext('2d');

const FIELD_C = 16;
const FIELD_R = 25;
const BlockSize = 25;

var pX=0;
var pY=0;

var spawnX = 7;
var spawnY = 2;

var GridArray = [];
var positionX;
var positionY;

var currentBrick = 1;
var currentBrickNumberOfStates = 2;
var state = 1;
var color;
var bricks;

document.addEventListener('keydown', keyPressed);

//Start game
spawnNew();
var game = setInterval(gameTick,700);

// Main function
function gameTick() {
	if (canMove()) {
		pY++;
	} else {
		freeze();
		spawnNew();
	}
	updateFigure();
	drawArray();
}

//Work with array - start
	//Create array
	for (var c=0; c<FIELD_C; c++) {
		GridArray[c] = [];
		for (var r=0; r<FIELD_R; r++) {
			GridArray[c][r]={x:0,y:0,valuez:0,colorVal:"black"};
		}
	}


	//Fill array
	for (var c=0; c<FIELD_C; c++) {
		for (var r=0; r<FIELD_R; r++) {
			positionX = c*BlockSize;
			positionY = r*BlockSize;
			GridArray[c][r].x = positionX;
			GridArray[c][r].y = positionY;
		}
	}

	for (var c=0; c<FIELD_C; c++) {
		for (var r=FIELD_R-3; r<FIELD_R; r++) {
			GridArray[c][r].valuez = 3;
		}
	}
	for (var c=FIELD_C-3; c<FIELD_C; c++) {
		for (var r=0; r<FIELD_R; r++) {
			GridArray[c][r].valuez = 3;
		}
	}
	for (var c=0; c<3; c++) {
		for (var r=0; r<FIELD_R; r++) {
			GridArray[c][r].valuez = 3;
		}
	}
// Work with array - finish

function keyPressed (evt) {
	if (evt.keyCode == 37) {
		if (checkBorderL()) {
			eval4(state,0,0,0);
			pX--;
			eval4(state,0,0,1);

		}
	}
	if (evt.keyCode == 39) {
		if (checkBorderR()) {
			eval4(state,0,0,0);
			pX++;
			eval4(state,0,0,1);
		}
	}
	if (evt.keyCode == 38) {
		var t = state;
		if (canRotate()) {
			eval4(t,0,0,0);
			eval4(state,0,0,1);
		}
	}
	if (evt.keyCode == 40) {
		
		if (canMove()) {
			eval4(state,0,0,0);
			pY++;
			eval4(state,0,0,1);
		} else {
			freeze();
			spawnNew();
		}
	}
	drawArray();	
}

function spawnNew() {
	pX = 0;
	pY = 0;

	var toChoose = Figures.length;
	currentBrick = Math.floor(Math.random()*toChoose);
	currentBrickNumberOfStates = Object.keys(Figures[currentBrick]).length -2;
	state = Math.floor(Math.random()*currentBrickNumberOfStates)+1;
	color = Figures[currentBrick].color;
	bricks = Object.keys(Figures[currentBrick][state]).length;
	alert(bricks);
}

function freeze() {
	eval4(state,0,0,2);
	colorTiles();
	checkLine();
	checkLose();
}

function canMove() { 
	if ( check4(0,1,2) || check4(0,1,3) ) {
		return false;
	} else {
		return true;
	}
}

function canRotate() {
	var s = state;
	state++;
	if (state == currentBrickNumberOfStates+1) {
		state = 1;
	}
	if ( check4(0,0,2) || check4(0,0,3) ) {
		state = s;
		return false;
	} else {
		return true;
	}
}

function checkBorderL() {
	if ( check4(-1,0,2) || check4(-1,0,3) ) {
		return false;
	} else {
		return true;
	}
}

function checkBorderR() {
	if ( check4(1,0,2) || check4(1,0,3) ) {
		return false;
	} else {
		return true;
	}
}

function checkLine() {
	for (var r=1; r<FIELD_R-3; r++) {
		var count=0;
		for (var c=3; c<FIELD_C-3; c++) {
			if (GridArray[c][r].valuez == 2) {
				count++;
			}
		}
		if (count == 10) {
			deleteLine(r);
		}
	}
}

function deleteLine(l) {
	for (var c=3; c<FIELD_C-3; c++) {
		for (var m=l; m>=1; m--) {
			GridArray[c][m].valuez = GridArray[c][m-1].valuez;
			GridArray[c][m].colorVal = GridArray[c][m-1].colorVal;
			colorRect(GridArray[c][m].x+1,GridArray[c][m].y+1, BlockSize-2,BlockSize-2,0,GridArray[c][m].colorVal);				
		}
		GridArray[c][0].valuez = 0;
	}
	
}

function checkLose() {
	for (var c=3; c<FIELD_C-3; c++) {
		if (GridArray[c][3].valuez == 2) {
			clearInterval(game);
			alert("You lost!");	
		}
	}
}

function updateFigure() {
		eval4(state,0,-1,0);
		eval4(state,0,0,1);
}

// Misc functions

function eval4(m,addSomeX,addSomeY,varToEval) {
	for (var i=1; i<=bricks; i++) {
		GridArray[spawnX+pX+addSomeX+Figures[currentBrick][m][i].x][spawnY+pY+addSomeY+Figures[currentBrick][m][i].y].valuez = varToEval;	
	}
}

function check4(addSomeX,addSomeY,varToCheck) {
	for (var i=1; i<=bricks; i++) {
		if (GridArray[spawnX+pX+addSomeX+Figures[currentBrick][state][i].x][spawnY+pY+addSomeY+Figures[currentBrick][state][i].y].valuez == varToCheck) {
			return true;
		}
	}
	return false;
}

function colorTiles() {
	for (var i=1; i<=bricks; i++) {
		GridArray[spawnX+pX+Figures[currentBrick][state][i].x][spawnY+pY+Figures[currentBrick][state][i].y].colorVal = color;
	}	
}
function drawHoodStatic() {
	for (var c=0; c<FIELD_C; c++) {
		for (var r=0; r<3; r++) {
			colorRect(GridArray[c][r].x,GridArray[c][r].y, BlockSize,BlockSize,0,"black");
		}
	}
	for (var c=0; c<FIELD_C; c++) {
		for (var r=2; r<FIELD_R; r++) {
			if (GridArray[c][r].valuez == 3) {
				colorRect(GridArray[c][r].x,GridArray[c][r].y, BlockSize,BlockSize,0,"black");
			}
		}
	}

	canvasContext.strokeStyle="white";
	canvasContext.strokeRect(BlockSize*3-1,BlockSize*2-1,(FIELD_C-6)*BlockSize+2,(FIELD_R-5)*BlockSize+2);
}

drawHoodStatic();

function drawArray() {
	for (var c=0; c<FIELD_C; c++) {
		for (var r=2; r<FIELD_R; r++) {
			if (GridArray[c][r].valuez == 0) {
				colorRect(GridArray[c][r].x,GridArray[c][r].y, BlockSize,BlockSize,0,"black");
			} else if (GridArray[c][r].valuez == 1) {
				colorRect(GridArray[c][r].x+1,GridArray[c][r].y+1, BlockSize-2,BlockSize-2,0,color);
			}
		}
	}
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight,angle,fillColor) {
	canvasContext.save();
	canvasContext.fillStyle = fillColor;
	canvasContext.translate(topLeftX+boxWidth/2,topLeftY+boxHeight/2);
	canvasContext.rotate(angle);
	canvasContext.fillRect(-boxWidth/2,-boxHeight/2, boxWidth,boxHeight);
	canvasContext.restore();
}