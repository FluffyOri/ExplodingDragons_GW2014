//requirements
var c               = require("../config/constantes");
var utils           = require("../controllers/utils");
var scoreController = require("../controllers/scoreController");
var world           = require("../world");
var addRenderSystem = require("../modules/render");
var Bullet          = require("../models/bullet");
var EXPLOSION       = require("../models/explosion");
var EventEmitter    = require("../../lib/events-emitter.js");

var Kamikaze = function Kamikaze(params)
{
    this.id                = world.gameObjects.length;
    this.tag               = params.tag;
    this.layer             = "enemy";
    this.playerID          = -1;
    this.position          = params.position         || { x : 0, y : 0 };
    this.size              = params.size             || { width : 50, height : 50 };
    this.speed             = params.speed            || 8;
    this.zIndex            = params.zIndex           || 500;
    this.context           = params.context          || world.context;
    this.angle             = params.angle            || 0;
    this.moveDirection     = { x : Math.cos(this.angle), y : Math.sin(this.angle) };
    this.direction         = { x : Math.cos(this.angle), y : Math.sin(this.angle) };
    
    this.hitPoints         = params.hitPoints || 1;
    this.damage            = params.damage    || 5;

    this.spritesheet       = params.spritesheet;
    this.spriteSize        = params.spriteSize || { width : 128, height : 128 };
    this.anims             = params.anims;
    this.activeAnim        = this.anims[params.activeAnim] || this.anims['fly'];
    this.animY             = this.activeAnim["animY"];

    this.colliderPadding   = 0;
    this.visible           = false;

    this.counter = 0;
    this.scoreValue        = params.scoreValue || 10;
    this.lastAttackerID    = null;

    var self = this;
    this.on("set animation", function(name) {
        if (self.activeAnim != self.anims[name])
        {
            self.activeAnim  = self.anims[name];
            self.animY       = self.activeAnim["animY"];
            self.frameNum    = 0;
            self.frameCount  = 0;
            self.isAnimating = true;
        }
    });
    
    this.run = function()
    {
        this.counter++;
        if (this.counter > 5)
        {
            this.setFocus();
            this.counter = 0;            
        }
        this.move();
        this.limits();
        this.collisions();
        this.animate();
    }
}

Kamikaze.prototype.move = function()
{
    this.position.x += this.moveDirection.x * this.speed;
    this.position.y += this.moveDirection.y * this.speed;
}

Kamikaze.prototype.limits = function()
{
    this.isVisible();

    if (this.visible)
    {
        if (this.position.x < 0 || this.position.x + this.size.width  > c.GAME_WIDTH ||
            this.position.y < 0 || this.position.y + this.size.height > c.GAME_HEIGHT)
        {
            var angle = utils.getAngle(this.position, this.targetPos);
            this.moveDirection = { x : Math.cos(angle), y : Math.sin(angle) };
        }        
    }
}

Kamikaze.prototype.isVisible = function()
{
    if (this.position.x > 0 && this.position.x + this.size.width  < c.CANVAS_WIDTH &&
        this.position.y > 0 && this.position.y + this.size.height < c.CANVAS_HEIGHT && !this.visible)
    {
        this.visible = true;
    }
}

Kamikaze.prototype.setFocus = function()
{
    var players = world.find("tag", "player");
    for (var i = 0; i < players.length; i++)
    {
        var targetPos = 
        {
            x : players[i].position.x+15,
            y : players[i].position.y+15
        }

        if (i === 0)
        {
            this.targetPos = targetPos;
        }
        else
        {
            if (utils.getDistance(this.position, players[i].position) < utils.getDistance(this.position, this.targetPos))
            {
                this.targetPos = targetPos;
            }      
        }
    }

    this.angle = utils.getAngle(this.position, this.targetPos);    
    this.direction = { x : Math.cos(this.angle), y : Math.sin(this.angle) };
    this.moveDirection = { x : Math.cos(this.angle), y : Math.sin(this.angle) };
}

Kamikaze.prototype.collisions = function()
{
    for (var i = 0; i < world.gameObjects.length; i++)
    {
        var other = world.gameObjects[i];

        if (other.layer === "player")
        {
            if (this.position.x + this.size.width > other.position.x + other.colliderPadding  && 
                this.position.x < other.position.x + other.size.width - other.colliderPadding &&
                this.position.y + this.size.height > other.position.y + other.colliderPadding && 
                this.position.y < other.position.y + other.size.height - other.colliderPadding)
            {
                if (other.tag === "bullet")
                {
                    this.hitPoints -= other.damage;
                    
                    scoreController.addScoreTo(other.playerID, this.scoreValue);

                    scoreController.substractScoreToIA(this.scoreValue);       

                    other.dead = true;
                    world.create(new EXPLOSION({
                        position : { x : other.position.x, y : other.position.y },
                        size : { width  : other.size.width, height : other.size.width },
                        zIndex : this.zIndex + 1,
                        spritesheet : world.manifest.images["dragon_explosion.png"],
                        anims  : c.ANIMATIONS["EXPLOSION"],
                        spriteSize : { width : 380, height : 380 }
                    }));
                }
            }
        }
    }

    if (this.isDead())
    {        
        world.create(new EXPLOSION(
        {
            position : { x : this.position.x, y : this.position.y },
            size : { width  : this.size.width, height : this.size.width },
            zIndex : this.zIndex + 1,
            spritesheet : world.manifest.images["enemy_explosion.png"], //put enemy explosion image when fixed
            anims  : c.ANIMATIONS["EXPLOSION"],
            spriteSize : { width : 380, height : 380 }
        }));
        
        this.dead = true;
    }
}

Kamikaze.prototype.isDead = function()
{
    if (this.hitPoints <= 0)
    {
        return true;
    }
}

EventEmitter.mixins(Kamikaze.prototype);
addRenderSystem(Kamikaze.prototype);

module.exports = Kamikaze;