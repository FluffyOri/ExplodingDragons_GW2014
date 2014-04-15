//requirements
var c     = require("../config/constantes");
var world = require("../world");
var input = require("../controllers/inputs");
var addRenderSystem = require("../modules/render");

var Bullet = function Bullet(params)
{
    this.playerID = params.playerID;
    this.position = params.position;
    this.size     = params.size       || { width : 5, height : 5 };
    this.image    = params.image      || null;
    this.color    = params.color      || "red";
    this.speed    = params.speed      || 10;
    this.zIndex   = params.zIndex     || 0;
    this.context  = params.context    || world.context;
    this.angle    = params.startAngle || 0;

    this.run = function()
    {
        this.move();
        this.drawSquare();
    }
}

Bullet.prototype.move = function()
{
    this.position.x += Math.cos(this.angle) * this.speed;
    this.position.y += Math.sin(this.angle) * this.speed;
}

addRenderSystem(Bullet.prototype);

module.exports = Bullet;