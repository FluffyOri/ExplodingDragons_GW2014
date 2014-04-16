//requirements
var c               = require("../config/constantes");
var world           = require("../world");
var addRenderSystem = require("../modules/render");
var EventEmitter    = require("../../lib/events-emitter.js");

var Bullet = function Bullet(params)
{
    this.id          = world.gameObjects.length;
    this.layer       = params.layer;
    this.tag         = "bullet";
    this.playerID    = params.playerID;
    this.position    = params.position;
    this.size        = params.size       || { width : 5, height : 5 };
    this.color       = params.color      || "red";
    this.speed       = params.speed      || 20;
    this.zIndex      = params.zIndex     || 900;
    this.context     = params.context    || world.context;
    this.angle       = params.startAngle || 0;
    
    this.spritesheet = params.spritesheet;
    this.spriteSize  = params.spriteSize || { width : 290, height : 140 };
    this.anims       = params.anims;
    this.activeAnim  = this.anims[params.activeAnim] || this.anims['basic'];
    this.animY       = this.activeAnim["animY"];

    this.run = function()
    {
        this.move();
        this.animate();
        this.limits();
    }
}

Bullet.prototype.move = function()
{
    this.position.x += Math.cos(this.angle) * this.speed;
    this.position.y += Math.sin(this.angle) * this.speed;
}

Bullet.prototype.limits = function()
{
    if (this.position.x + this.size.width  < 0 || this.position.x > c.GAME_WIDTH ||
        this.position.y + this.size.height < 0 || this.position.y > c.GAME_HEIGHT)
    {
        this.dead = true;
    }
}

EventEmitter.mixins(Bullet.prototype);
addRenderSystem(Bullet.prototype);

module.exports = Bullet;