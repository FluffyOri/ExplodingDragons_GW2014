//requirements
var c     = require("../config/constantes");
var world = require("../world");
var addRenderSystem = require("../modules/render");
var Ennemis = function Ennemis(params)
{
	this.position = params.position
	this.size = params.size
	this.speed = params.speed || 10;
	this.color = "green";
	this.x = params.x
	this.y = params.y
	// 1 = droite & -1 = gauche;
	this.direction = params.direction || 1;

	this.angle = params.startAngle || 0;
	this.run = function()
	{
		this.move(10,1);
		this.drawSquare();
	}
}
Ennemis.prototype.move = function()
{
	this.x += this.speed * this.direction;
	this.y += this.speed * this.direction;
}
addRenderSystem(Ennemis.prototype);

module.exports = Ennemis;