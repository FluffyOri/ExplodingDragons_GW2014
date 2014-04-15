//requirements
var c     = require("../config/constantes");
var world = require("../world");
var addRenderSystem = require("../modules/render");
var Ennemis = function Ennemis(params)
{
	this.position = params.position;
	this.size = params.size || {width : 50, height :50};
	this.speed = params.speed || 10;
	this.color = "green";
	this.x = params.x
	this.y = params.y
	// 1 = droite & -1 = gauche;
	this.direction = params.direction || 1;
	this.context = params.context || world.context;
	this.color = params.color || "red";
	this.image = params.image;
	this.angle = params.startAngle || 0;
	
	this.run = function()
	{
		this.move();
		this.drawSquare();
		//this.kamikaze();
	}
}
Ennemis.prototype.move = function(){
	var positionTimeline = Math.sin((this.elapsedTime)/500);
	this.x = Math.sin(positionTimeline) * (c.CANVAS_HEIGHT/2 - this.frameHeight/2) + c.CANVAS_HEIGHT/2 - this.frameHeight/2
	this.y = c.CANVAS_WIDTH/2 + Math.cos(positionTimeline) * c.CANVAS_WIDTH/2 - this.frameWidth;
}
Ennemis.prototype.kamikaze = function(){
	var depart = this.cible;
	if (player.length < 0) {
		while (!player[this.cible]){
			this.cible --;
			if (this.cible < 0)
				this.cible = player.length -1;
			if (this.cible == depart){
				this.cible =-1;
				break;
			}
		}
	}
	else
		this.cible =-1;
	//On calcule l'angle de direction pour aller sur l'ennemi Cible
	if (this.cible >= 0){
		var angle = Math.atan2((player[this.cible].y + player[this.cible].frameHeight/2) - this.y,(player[this.cible].x + player[this.cible].frameHeight/2) - this.x)
		this.x += Math.cos(angle) * this.speed;
		this.y += Math.sin(angle) * this.speed
	}

}
addRenderSystem(Ennemis.prototype);

module.exports = Ennemis;