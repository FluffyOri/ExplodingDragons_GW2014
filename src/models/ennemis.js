//requirements
var c     = require("../config/constantes");
var world = require("../world");
var addRenderSystem = require("../modules/render");

var Ennemis = function Ennemis(params)
{
    this.id                = world.gameObjects.length;
    this.tag               = params.tag;
    this.destructible      = true;
	this.x 				   = params.x;
	this.y                 = params.y;
	this.size 			   = params.size 		|| {width : 50, height :50};
	this.speed 			   = params.speed		|| 10;
	this.position 	   	   = {
								x : params.x,
								y : params.y
							}
	// 1 = droite & -1 = gauche;
	this.direction 	       = params.direction 	|| 1;
	this.context 	       = params.context 	|| world.context;
	this.color 		       = params.color 		|| "red";
	this.spritesheet       = params.image;
	this.angle 		       = params.startAngle  || 0;
	this.anims		       = params.anims;
	//this.activeAnim = //this.anims[params.activeAnim] || this.anims['fly'];
	this.firstPosition     = this.position;
	this.oriX              = params.x;
	this.oriY              = params.y;
	this.type              = params.type;
	this.spline = [];
	this.path = [];
	for (var i = 0 ; i < this.spline.length-4 ; i++){
		for (var t = 0; t < 1; t += 0.05) {
		    var ax = (-this.spline[i][0] + 3*this.spline[i+1][0] - 3*this.spline[i+2][0] + this.spline[i+3][0]) / 6;
		    var ay = (-this.spline[i][1] + 3*this.spline[i+1][1] - 3*this.spline[i+2][1] + this.spline[i + 3][1]) / 6;
		    var bx = (this.spline[i + 0][0] - 2*this.spline[i + 1][0] + this.spline[i + 2][0]) / 2;
		    var by = (this.spline[i + 0][1] - 2*this.spline[i + 1][1] + this.spline[i + 2][1]) / 2;
		    var cx = (-this.spline[i + 0][0] +this.spline[i + 2][0]) / 2;
		    var cy = (-this.spline[i + 0][1] +this.spline[i + 2][1]) / 2;
		    var dx = (this.spline[i + 0][0] + 4*this.spline[i + 1][0] + this.spline[i + 2][0]) / 6;
		    var dy = (this.spline[i + 0][1] + 4*this.spline[i + 1][1] + this.spline[i + 2][1]) / 6;
		    this.path.push([
		      ax*Math.pow(t, 3) + bx*Math.pow(t, 2) + cx*t + dx,
		      ay*Math.pow(t, 3) + by*Math.pow(t, 2) + cy*t + dy
		    ])
		    this.path.push([
		      ax*Math.pow(t+0.1, 3) + bx*Math.pow(t+0.1, 2) + cx*(t+0.1) + dx,
		      ay*Math.pow(t+0.1, 3) + by*Math.pow(t+0.1, 2) + cy*(t+0.1) + dy
		    ]);
		}
	}	
	this.run = function()
	{
		this.move();
		this.drawSquare();
		//this.kamikaze();
	}
}
Ennemis.prototype.move = function(){
	if (this.pathIndex < this.path.length){
	   	this.x =this.path[this.pathIndex][0] + this.oriX;
		this.y =this.path[this.pathIndex][1] + this.oriY;
	}
	this.pathIndex+=2;
	if (this.pathIndex >= this.path.length -3)
		return true
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