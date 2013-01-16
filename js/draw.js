function reDrawShapes(){
	stage.update();
}
var shapeOnStage = new Array;
function drawShape(shapeArray){
	for(var j = 0; j < shapeArray.length; j++){
		shapeOnStage[j] = new createjs.Shape();
		for(var i = 0; i < shapeArray[j].length; i++){
			if(i == 0) shapeOnStage[j].graphics.beginFill('#ccc').moveTo(shapeArray[j][0].x, shapeArray[j][0].y);
			else{
				shapeOnStage[j].graphics.lineTo(shapeArray[j][i].x, shapeArray[j][i].y);
			}
		}
		shapeOnStage[j].x = shapeArray[j][0].offsetX;
		shapeOnStage[j].y = shapeArray[j][0].offsetY;
		//shapeOnStage[j].alpha = 0.3;
		shapeOnStage[j].id = j;
		
		stage.addChild(shapeOnStage[j]);
	}
	reDrawShapes();
}