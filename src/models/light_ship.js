//requirements
var c               = require("../config/constantes");
var world           = require("../world");
var addRenderSystem = require("../modules/render");
var Bullet          = require("../models/bullet");
var EventEmitter    = require("../../lib/events-emitter.js");

var LightShip = function LightShip(params)
{
    this.id                = world.gameObjects.length;
    this.tag               = params.tag;
    this.destructible      = true;
    this.playerID          = -1;
    this.position          = params.position         || { x : 0, y : 0 };
    this.size              = params.size             || { width : 50, height : 50 };
    this.speed             = params.speed            || 6;
    this.zIndex            = params.zIndex           || 500;
    this.context           = params.context          || world.context;
    this.angle             = params.angle            || 0;
    this.direction         = { x : Math.cos(this.angle), y : Math.sin(this.angle) };
    
    this.attackDelay       = params.attackDelay      || 100;
    this.prevShot          = 0;
    
    this.spritesheet       = params.spritesheet;
    this.spritesheetBullet = params.spritesheetBullet;
    this.spriteSize        = params.spriteSize || { width : 128, height : 128 };
    this.anims             = params.anims;
    this.activeAnim        = this.anims[params.activeAnim] || this.anims['fly'];
    this.animY             = this.activeAnim["animY"];

    console.log(this.direction);
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
        this.move();
        this.limits();
        this.shoot();
        this.animate();
    }
}

LightShip.prototype.move = function()
{
    this.position.x += this.direction.x * this.speed;
    this.position.y += this.direction.y * this.speed;
}

LightShip.prototype.limits = function()
{
    // if (this.position.x < 0 || this.position.x + this.size.width > c.GAME_WIDTH ||
    //     this.position.y < 0 || this.position.y + this.size.height > c.GAME_HEIGHT)
    // {
    //     this.angle += Math.PI;        
    //     this.direction = { x : Math.cos(this.angle), y : Math.sin(this.angle) };
    // }
}

LightShip.prototype.shoot = function()
{
    var datTime = new Date().getTime();

    this.animY = this.activeAnim["animY"] + 128;

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
                    x : (this.position.x + this.size.width / 2)  + this.direction.x * canonDistance - 32,
                    y : (this.position.y + this.size.height / 2) + this.direction.y * canonDistance - 5
                },
                size : { width : 64, height : 10 },
                startAngle : this.angle,
                spritesheet : this.spritesheetBullet,
                spriteSize : { width : 128, height : 18 },
                anims : c.ANIMATIONS["BULLET_ENEMY"],
            }));

        this.prevShot = new Date().getTime();
        this.attackLimit -= 10;
    }
}

EventEmitter.mixins(LightShip.prototype);
addRenderSystem(LightShip.prototype);

module.exports = LightShip;