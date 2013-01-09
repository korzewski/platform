var keys = new Array();
var handleKeyDown = function(e){
	keys[e.keyCode] = true;
}
var handleKeyUp = function(e){
	keys[e.keyCode] = false;
}

window.addEventListener('keydown', handleKeyDown, true);
window.addEventListener('keyup', handleKeyUp, true);
