/* --- have to be set up dynamically --- */
var screenWidth = 1000;
var screenHeight = 500;
var mapWidth, mapHeight;

var stage;
var player;
var world;

var MAP;

function init(){
	var mapName = 'map001';	
	loadMap(mapName);
}

function setupGame(){
	mapWidth = MAP[0][0].mapWidth;
	mapHeight = MAP[0][0].mapHeight;
	
	$('#screen')
	.css({
		width: screenWidth,
		height: screenHeight
	})
	.append('<canvas id="game" width="'+ screenWidth +'" height="'+ screenHeight +'"></canvas>');
	
	/* --- box2d --- */
	world = new b2World(new b2Vec2(0, 10), true);
	//initializeDebug();
	
	/* --- easeljs --- */
	stage = new createjs.Stage(document.getElementById('game'));
	
	player = new Player({x: 200, y: 50, img: IMAGE_CAT});
			
	createjs.Ticker.addListener(window);
	createjs.Ticker.setFPS(30);
}

function tick(){
	world.Step(1/30, 10, 10);
	//world.DrawDebugData();
	
	player.setPosition();
	stage.update();
}

function loadMap(mapName){
	
	$.ajax({
		url: 'php/load_map.php',
		type: 'post',
		data: {map_name: mapName},
		success: function(data){
			MAP = JSON.parse(data);
			
			setupGame();
			drawMap(MAP);
			
			console.log('map "'+ mapName +'.map" is loaded');
		},
		error: function(){
			alert('error - map is not working'); // have to be checked in php
		}
	});

}

function drawMap(newMap){
	for(var i = 0; i < newMap.length; i++){
		var offsetX = newMap[i][0].offsetX;
		var offsetY = newMap[i][0].offsetY;
		
		createEdgeShape(newMap[i], offsetX, offsetY);
	}
	drawShape(newMap);
}

function createEdgeShape(vertexArray, posX, posY, type) {
    var fixDef = new b2FixtureDef;
    fixDef.density = 1;
    fixDef.restitution = 0.3

    var bodyDef = new b2BodyDef;
    bodyDef.position.x = posX / SCALE;
    bodyDef.position.y = posY / SCALE;

    if (type == 'dynamic')
        bodyDef.type = b2Body.b2_dynamicBody;
    else if (type == 'kinematic')
        bodyDef.type = b2Body.b2_kinematicBody;

    var body = world.CreateBody(bodyDef);

    fixDef.shape = new b2PolygonShape;
    for (var i = 1; i < vertexArray.length; i++) {
        fixDef.shape.SetAsEdge(new b2Vec2(vertexArray[i - 1].x / SCALE, vertexArray[i - 1].y / SCALE), new b2Vec2(vertexArray[i].x / SCALE, vertexArray[i].y / SCALE));
        body.CreateFixture(fixDef);
    }

    return body;
}