//requirements
var c               = require("../config/constantes");
var world           = require("../world");
var input           = require("../controllers/inputs");
var addRenderSystem = require("../modules/render");
var Bullet          = require("../models/bullet");
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
    
    this.dashSpeed         = params.dashSpeed        || 100;
    this.dashDelay         = params.dashDelay        || 5000;
    this.prevDash          = 0;
    
    // this.createGauge();
    
    this.spritesheet       = params.spritesheet;
    this.spritesheetBullet = params.spritesheetBullet;
    this.spriteSize        = params.spriteSize || { width : 128, height : 128 };
    this.anims             = params.anims;
    this.activeAnim        = this.anims[params.activeAnim] || this.anims['idle'];
    this.animY             = this.activeAnim["animY"];

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
//     world.create(new Gauge())
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

    if (this.moving)
    {
        this.trigger("set animation", "fly");
    }
    else
    {
        this.trigger("set animation", "idle");
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
    if (input.getButtonDown("Fire", this.playerID))
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
                        x : (this.position.x + this.size.width / 2)  + this.vecDir.x * canonDistance - 15,
                        y : (this.position.y + this.size.height / 2) + this.vecDir.y * canonDistance - 7
                    },
                    size : { width : 30, height : 14 },
                    layer : this.layer,
                    startAngle : this.angle,
                    spritesheet : this.spritesheetBullet,
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
            if (this.position.x + this.size.width  > other.position.x && this.position.x < other.position.x + other.size.width &&
                this.position.y + this.size.height > other.position.y && this.position.y < other.position.y + other.size.height)
            {
                console.log("hit by " + other.layer);
                if (other.layer === "enemy")
                {
                    other.dead = true;
                }
            }
        }
    }
}

EventEmitter.mixins(Player.prototype);
addRenderSystem(Player.prototype);

module.exports = Player;