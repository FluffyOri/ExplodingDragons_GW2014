var c      = require("../config/constantes");
var world  = require("../world");
var input  = require("../controllers/inputs");
var Player = require("../models/player");

var bonus = function bonus(params)
{
    this.id 	  = params.id;
    this.position = params.position;|| {x : 0, y : 0 };
    this.type	  = params.type		|| null;
    this.color    = params.color    || "red";    
	this.size 	  = params.size     ||{ width : 50, height : 50 };
	this.context  = params.context  || world.context;

	this.run = function()

}

bonus.prototype.move=function(){
	this.x += this.speed * this.direction;
}

addRenderSystem(bonus.prototype);

module.exports = bonus;