//requirements
var c               = require("../config/constantes");
var world           = require("../world");
var input           = require("../controllers/inputs");
var addRenderSystem = require("../modules/render");
var Bullet          = require("../models/bullet");
var EXPLOSION       = require("../models/explosion");
var EventEmitter    = require("../../lib/events-emitter.js");

var Player = function Player(params)
{
    this.id                = world.gameObjects.length;
    this.tag               = params.tag;
    this.layer             = "player";
    this.playerID          = params.playerID;
    this.gamepad           = input.gamepads[this.playerID];
    this.position          = params.position         || { x : 0, y : 0 };
    this.size              = params.size             || { width : 50, height : 50 };
    this.speed             = params.speed            || 10;
    this.zIndex            = params.zIndex           || 1000;
    this.context           = params.context          || world.context;
    this.angle             = params.startAngle       || 0;
    this.vecDir            = { x : Math.cos(this.angle), y : Math.sin(this.angle) };
    
    this.attackLimit       = params.attackLimit      || 100;
    this.attackDelay       = params.attackDelay      || 100;
    this.prevShot          = 0;
    
    this.hitPoints         = params.hitPoints        || 10;
    this.maxHitPoints      = this.hitPoints;
    this.shielded          = false;
    this.respawnRange      = params.respawnRange     || 200;
    this.explosionSize     = params.explosionSize    || 150;

    this.dashSpeed         = params.dashSpeed        || 100;
    this.dashDelay         = params.dashDelay        || 5000;
    this.prevDash          = 0;
    
    this.spritesheet       = params.spritesheet;
    this.spritesheetBullet = params.spritesheetBullet;
    this.spriteSize        = params.spriteSize || { width : 128, height : 128 };
    this.anims             = params.anims;
    this.activeAnim        = this.anims[params.activeAnim] || this.anims['idle'];
    this.animY             = this.activeAnim["animY"];

    // this.createGauge();

    this.colliderPadding   = params.colliderPadding || 20;

    if (this.playerID === 1)
    {
        this.frameNum = 2;
    }

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

    this.shield();

    this.run = function()
    {
        this.rotate();
        this.move();
        this.dash();
        this.limits();
        this.shoot();
        this.collisions();
        this.animate();
    }
}

// Player.prototype.createGauge = function()
// {
//     world.create(new Gauge({playerID : this.playerID}));
// }

Player.prototype.rotate = function()
{
    var axisX = input.getAxis("RIGHT_HORIZONTAL", this.playerID);
    var axisY = input.getAxis("RIGHT_VERTICAL", this.playerID);

    if ((axisX < -c.ANALOG_DEAD || axisX > c.ANALOG_DEAD) || (axisY < -c.ANALOG_DEAD || axisY > c.ANALOG_DEAD))
    {
        this.angle  = (Math.atan2(axisX, axisY) - Math.PI/2) * -1;
        this.vecDir = { x : Math.cos(this.angle), y : Math.sin(this.angle) };
    }
}

Player.prototype.move = function()
{
    this.prevPos = 
    {
        x : this.position.x,
        y : this.position.y
    }

    var axisX = input.getAxis("LEFT_HORIZONTAL", this.playerID);
    var axisY = input.getAxis("LEFT_VERTICAL", this.playerID);

    this.moving = false;

    if (axisX < -c.ANALOG_DEAD || axisX > c.ANALOG_DEAD)
    {
        this.position.x += this.speed * axisX;
        this.moving = true;
    }

    if (axisY < -c.ANALOG_DEAD || axisY > c.ANALOG_DEAD)
    {
        this.position.y += this.speed * axisY;
        this.moving = true;
    }

    if (!this.shielded)
    {
        if (this.moving)
        {
            this.trigger("set animation", "fly");
        }
        else
        {
            this.trigger("set animation", "idle");
        }        
    }
}

Player.prototype.limits = function()
{
    if (this.position.x < 0 || this.position.x + this.size.width > c.GAME_WIDTH)
    {
        this.position.x = this.prevPos.x;
    }
    if (this.position.y < 0 || this.position.y + this.size.height > c.GAME_HEIGHT)
    {        
        this.position.y = this.prevPos.y;
    }
}

Player.prototype.dash = function()
{
    var datTime = new Date().getTime();

    if (datTime - this.prevDash > this.dashDelay)
    {
        if (input.getKeyDown("LB", this.playerID))
        {
            this.position.x += Math.sin(this.angle) * this.dashSpeed;
            this.position.y += - Math.cos(this.angle) * this.dashSpeed;
            this.prevDash = new Date().getTime();
        }
    
        if (input.getKeyDown("RB", this.playerID))
        {
            this.position.x += - Math.sin(this.angle) * this.dashSpeed;
            this.position.y += Math.cos(this.angle) * this.dashSpeed;
            this.prevDash = new Date().getTime();
        }
    }
}

Player.prototype.shoot = function()
{
    if (input.getButtonDown("Fire", this.playerID) && !this.shielded)
    {
        var datTime = new Date().getTime();

        this.animY = this.activeAnim["animY"] + 256;

        if (datTime - this.prevShot > this.attackDelay)
        {

            if (this.moving)
            {
                var canonDistance = this.size.width / 2;
            }
            else
            {
                var canonDistance = this.size.width / 2 - 10;
            }

            world.create(new Bullet(
                {
                    playerID : this.playerID,
                    position : { 
                        x : (this.position.x + this.size.width / 2)  + this.vecDir.x * canonDistance - 20,
                        y : (this.position.y + this.size.height / 2) + this.vecDir.y * canonDistance - 10
                    },
                    size : { width : 40, height : 20 },
                    layer : this.layer,
                    startAngle : this.angle,
                    spritesheet : this.spritesheetBullet,
                    speed : 20,
                    anims : c.ANIMATIONS["BULLET_FIRE"],
                }));
    
            this.prevShot = new Date().getTime();
            this.attackLimit -= 10;
        }
    }
    else
    {
        this.animY = this.activeAnim["animY"];
    }
}

Player.prototype.collisions = function()
{
    for (var i = 0; i < world.gameObjects.length; i++)
    {
        var other = world.gameObjects[i];

        if (other.layer === "enemy" || (other.layer === "player" && other.playerID !== this.playerID))
        {
            if (other.position.x + other.size.width  > this.position.x + this.colliderPadding &&
                other.position.x < this.position.x + this.size.width - this.colliderPadding  &&
                other.position.y + other.size.width > this.position.y + this.colliderPadding &&
                other.position.y < this.position.y + this.size.width - this.colliderPadding)
            {
                if (!this.shielded)
                {
                    this.hitPoints -= other.damage;                    
                }
                if (other.layer === "enemy")
                {
                    other.dead = true;
                    world.create(new EXPLOSION({
                        position : { x : other.position.x, y : other.position.y },
                        size : { width  : other.size.width, height : other.size.width },
                        zIndex : this.zIndex+1,
                        spritesheet : world.manifest.images["dragon_explosion.png"],
                        anims  : c.ANIMATIONS["EXPLOSION"],
                        spriteSize : { width : 380, height : 380 }
                    }));
                }

                if (this.isDead())
                {
                    this.respawn();
                }
            }
        }
    }
}

Player.prototype.respawn = function()
{
    world.create(new EXPLOSION({
        position : { x : this.position.x - this.explosionSize/2, y : this.position.y - this.explosionSize/2 },
        size : { width  : this.size.width + this.explosionSize, height : this.size.width + this.explosionSize },
        zIndex : this.zIndex+1,
        spritesheet : world.manifest.images["dragon_explosion.png"],
        anims  : c.ANIMATIONS["EXPLOSION"],
        spriteSize : { width : 380, height : 380 }
    }));

    this.hitPoints = this.maxHitPoints;

    //random respawn pos : TO DO

    this.shield();
}

Player.prototype.shield = function()
{
    this.shielded = true;
    this.trigger("set animation", "shield");
    var self = this;
    setTimeout(function() {
        self.shielded = false;
        self.trigger("set animation", (this.moving) ? "fly" : "idle");
    }, 3000);
}

Player.prototype.isDead = function()
{
    if (this.hitPoints <= 0)
        return true;
}

EventEmitter.mixins(Player.prototype);
addRenderSystem(Player.prototype);

module.exports = Player;