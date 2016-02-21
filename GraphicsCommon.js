function drawBitmapCenteredWithRotation(useBitmap,atX,atY,withAng) {
	canvasContext.save();
	canvasContext.translate(atX,atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap,-useBitmap.width/2,-useBitmap.height/2);
	canvasContext.restore();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight,angle,fillColor) {
	canvasContext.save();
	canvasContext.fillStyle = fillColor;
	canvasContext.translate(topLeftX+boxWidth/2,topLeftY+boxHeight/2);
	canvasContext.rotate(angle);
	canvasContext.fillRect(-boxWidth/2,-boxHeight/2, boxWidth,boxHeight);
	canvasContext.restore();
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}