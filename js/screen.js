function focusCamera(object){
	var el = object.GetWorldCenter();
	var offsetX, offsetY;

	if(el.x * SCALE > screenWidth/2 && el.x * SCALE < mapWidth - screenWidth/2){
		offsetX = (screenWidth/2) - el.x * SCALE;
	}
	if(el.y * SCALE > screenHeight/2 && el.y * SCALE < mapHeight - screenHeight/2){
		offsetY = (screenHeight/2) - el.y * SCALE;
	}
	
	//console.log('offsetX: ' + offsetX + ' offsetY: ' + offsetY);
	if(offsetX != undefined) stage.x = offsetX;
	else stage.x = 0;
	if(offsetY != undefined) stage.y = offsetY;
	else stage.y = 0;
}