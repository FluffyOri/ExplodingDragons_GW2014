//requirements
var c               = require("../config/constantes");
var world           = require("../world");
var addRenderSystem = require("../modules/render");
var EventEmitter    = require("../../lib/events-emitter.js");

var Collectible = function Collectible(params)
{
    this.id          = world.gameObjects.length;
    this.type        = params.type       || "shadow";
    this.position    = params.position;
    this.size        = params.size       || { width : (Math.random() * 100) + 50, height : (Math.random() * 100) + 50 };
    this.speed       = params.speed      || Math.random() + 0.5;
    this.zIndex      = params.zIndex     || 0;
    this.context     = params.context    || world.context;
    this.direction   = { x : Math.cos(params.angle), y : Math.sin(params.angle) };
    this.spritesheet = params.spritesheet;
    this.angle       = 0;
    this.nbFrames    = params.nbFrames;
    this.spriteSize  = params.spriteSize || { width : 250, height : 250 };
    this.spritePos   = { x : (Math.floor(Math.random()*this.nbFrames)) * this.spriteSize.width, y : 0 };

    this.run = function()
    {
        this.collisions();
        this.drawFrame();
    }
}

Collectible.prototype.collisions = function()
{
    for (var i = 0; i < world.gameObjects.length; i++)
    {
        var other = world.gameObjects[i];
        
        if (other.tag === "player")
        {
            if (this.position.x + this.size.width > other.position.x  && 
                this.position.x < other.position.x + other.size.width &&
                this.position.y + this.size.height > other.position.y && 
                this.position.y < other.position.y + other.size.height )
            {
                this.dead = true;
                other.shadowAbilityEnabled = true;
            }
        }

    }
}

addRenderSystem(Collectible.prototype);

module.exports = Collectible;