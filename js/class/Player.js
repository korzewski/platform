function Player(config){
	this.img = config.img;
	this.speed = 5;
	this.radius = 10;
	
	this.canJump = true;
	this.jumpPower = 5;
	
	this.bitmap = new createjs.Bitmap(this.img);
	this.bitmap.regX = 15;
	this.bitmap.regY = 16;
	
	/*
	this.hitArea = new createjs.Shape();
	this.hitArea.graphics.beginFill("#000").drawRect(-12, -12, 30, 30);
	this.bitmap.hitArea = this.hitArea;
	*/
	
	this.body = this.createBall(250, 30, 15, 'dynamic', false);
	this.updateBitmapPosition();
	
	stage.addChild(this.bitmap);
};

Player.prototype.updateBitmapPosition = function(){
	this.bitmap.x = this.body.GetWorldCenter().x * SCALE;
	this.bitmap.y = this.body.GetWorldCenter().y * SCALE;
	this.bitmap.rotation = this.body.GetAngle() * (180/Math.PI);
};

Player.prototype.setPosition = function(){
	var vel = this.body.GetLinearVelocity();
	if(keys[37]){
		vel.x = -this.speed;
	} else if(keys[39]){
		vel.x = this.speed;
	}
	if(keys[38]){
		if(this.canJump){
			vel.y = -this.jumpPower;
			this.canJump = false;
		}
	}
	this.updateBitmapPosition();
	this.checkCollision();
	
	focusCamera(this.body);
};

Player.prototype.checkCollision = function (){
	var collisionList = world.m_contactList;
	if(collisionList != null){
		this.canJump = true;
		//console.log('collision: true');
	} else{
		this.canJump = false;
		//console.log('collision: false');
	}
};

Player.prototype.createBall = function(posX, posY, radius, type, allowSleep){
    var fixDef = new b2FixtureDef;
    fixDef.density = 1;
    fixDef.friction = 1;
    fixDef.restitution = 0.4;

    fixDef.shape = new b2CircleShape(radius / SCALE);
    var bodyDef = new b2BodyDef;
    bodyDef.position.x = posX / SCALE;
    bodyDef.position.y = posY / SCALE;

    if (type == 'dynamic')
        bodyDef.type = b2Body.b2_dynamicBody;
    else if (type == 'kinematic')
        bodyDef.type = b2Body.b2_kinematicBody;

    if (allowSleep != null)
        bodyDef.allowSleep = allowSleep;

    var body = world.CreateBody(bodyDef);
    body.CreateFixture(fixDef);

    return body;
};