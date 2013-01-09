/* --- have to be set up dynamically --- */
var screenWidth = 500;
var screenHeight = 250;
var gameWidth = 1000;
var gameHeight = 500;

var stage;
var player;
var world;

function init(){
/* --- box2d --- */
	world = new b2World(new b2Vec2(0, 10), true);
	initializeDebug();
	
/* --- easeljs --- */
	stage = new createjs.Stage(document.getElementById('game'));
	
	loadMap();
	
	player = new Player({x: 200, y: 50, img: IMAGE_CAT});
			
	createjs.Ticker.addListener(window);
	createjs.Ticker.setFPS(30);
}

function tick(){
	world.Step(1/30, 10, 10);
	world.DrawDebugData();
	
	player.setPosition();
	stage.update();
}
var MAP;
function loadMap(){
	var load;
	load = localStorage.getItem('map');
	//alert(load);
	
	MAP = JSON.parse(load);
	drawMap(MAP);
}

function drawMap(newMap){
	for(var i = 0; i < newMap.length; i++){
		var offsetX = newMap[i][0].offsetX;
		var offsetY = newMap[i][0].offsetY;
		
		createEdgeShape(newMap[i], offsetX, offsetY);
	}
    
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