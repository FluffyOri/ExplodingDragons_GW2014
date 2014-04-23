//requirements
var c               = require("../config/constantes");
var world           = require("../world");
var addRenderSystem = require("../modules/render");
var EventEmitter    = require("../../lib/events-emitter.js");

var Decor = function Decor(params)
{
    this.id          = world.gameObjects.length;
    this.position    = params.position;
    this.size        = params.size       || { width : (Math.random() * 100) + 50, height : (Math.random() * 100) + 50 };
    this.speed       = params.speed      || Math.random() + 0.5;
    this.zIndex      = params.zIndex     || 0;
    this.context     = params.context    || world.context;
    this.direction   = { x : Math.cos(params.angle), y : Math.sin(params.angle) };
    this.spritesheet = params.spritesheet;
    this.angle       = Math.random()*4 - 1;
    this.nbFrames    = params.nbFrames;
    this.spriteSize  = params.spriteSize || { width : 250, height : 250 };
    this.spritePos   = { x : (Math.floor(Math.random()*this.nbFrames)) * this.spriteSize.width, y : 0 };

    this.run = function()
    {
        this.move();
        //this.limits();
        this.drawFrame();
    }
}

Decor.prototype.move = function()
{
    this.position.x += this.direction.x * this.speed;
    this.position.y += this.direction.y * this.speed;
}

Decor.prototype.isVisible = function()
{
    if (this.position.x > 0 && this.position.x + this.size.width  < c.CANVAS_WIDTH &&
        this.position.y > 0 && this.position.y + this.size.height < c.CANVAS_HEIGHT && !this.visible)
    {
        this.visible = true;
    }
}

Decor.prototype.limits = function()
{
    this.isVisible();

    if (this.visible)
    {
        if (this.position.x < 0 || this.position.x + this.size.width  > c.GAME_WIDTH ||
            this.position.y < 0 || this.position.y + this.size.height > c.GAME_HEIGHT)
        {
            this.dead = true;
        }        
    }
}

addRenderSystem(Decor.prototype);

module.exports = Decor;