//requirements
var c               = require("../config/constantes");
var utils           = require("../controllers/utils");
var world           = require("../world");
var addRenderSystem = require("../modules/render");
var Bullet          = require("../models/bullet");
var EXPLOSION       = require("../models/explosion");
var EventEmitter    = require("../../lib/events-emitter.js");

var Shadow = function Shadow(params)
{
    this.id                = world.gameObjects.length;
    this.type              = "shadow";
    this.tag               = params.tag;
    this.layer             = "enemy";
    this.playerID          = -1;
    this.position          = params.position         || { x : 0, y : 0 };
    this.size              = params.size             || { width : 50, height : 50 };
    this.speed             = params.speed            || 6;
    this.zIndex            = params.zIndex           || 500;
    this.context           = params.context          || world.context;
    this.angle             = params.angle            || 0;
    this.moveDirection     = { x : Math.cos(this.angle), y : Math.sin(this.angle) };
    this.direction         = { x : Math.cos(this.angle), y : Math.sin(this.angle) };
    
    this.attackDelay       = params.attackDelay      || 5000;
    this.prevShot          = 0;
    this.hitPoints         = params.hitPoints        || 2;
    this.damageBullet      = params.damageBullet     || 2;
    this.damage            = params.damage           || 100000;

    this.spritesheet       = params.spritesheet;
    this.spritesheetBullet = params.spritesheetBullet;
    this.spriteSize        = params.spriteSize       || { width : 128, height : 128 };
    this.anims             = params.anims;
    this.activeAnim        = this.anims[params.activeAnim] || this.anims['fly'];
    this.animY             = this.activeAnim["animY"];

    this.precision         = [ -10, -5, 0, 0, 0, 5, 10];
    this.colliderPadding   = 0;
    this.visible           = false;

    this.focusPlayerID     = params.focusPlayerID;
    this.focusPlayerPos    = world.find("tag", "player")[this.focusPlayerID].position;
    this.alliedPlayerID    = (this.focusPlayerID === 0) ? 1 : 0;

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

    setInterval(function() {
        self.dead = true;
    }, 5000); //timer shadow

    this.run = function()
    {
        this.setFocus();
        this.move();
        this.limits();        
        this.shoot();
        this.collisions();
        this.animate();
    }
}

Shadow.prototype.move = function()
{
    this.position.x += this.moveDirection.x * this.speed;
    this.position.y += this.moveDirection.y * this.speed;
}

Shadow.prototype.limits = function()
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

Shadow.prototype.isVisible = function()
{
    if (this.position.x > 0 && this.position.x + this.size.width  < c.CANVAS_WIDTH &&
        this.position.y > 0 && this.position.y + this.size.height < c.CANVAS_HEIGHT && !this.visible)
    {
        this.visible = true;
    }
}

Shadow.prototype.setFocus = function()
{
    //console.log(this.focusPlayerPos)
    this.angle = utils.getAngle(this.position, this.focusPlayerPos);    
    this.direction = { x : Math.cos(this.angle), y : Math.sin(this.angle) };
    this.moveDirection = { x : Math.cos(this.angle), y : Math.sin(this.angle) };
}

Shadow.prototype.shoot = function()
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
            var canonDistance = this.size.width / 2;
        }

        var randomAim = this.precision[Math.floor(Math.random() * this.precision.length)] * Math.PI/180;

        world.create(new Bullet(
        {
            playerID : this.playerID,
            position : { 
                x : (this.position.x + this.size.width / 2)  + this.direction.x * canonDistance - 20,
                y : (this.position.y + this.size.height / 2) + this.direction.y * canonDistance - 10
            },
            size : { width : 40, height : 20 },
            startAngle : this.angle + randomAim,
            speed : 10,
            damage : this.damageBullet,
            layer : this.layer,
            spritesheet : world.manifest.images["shadow_dragon_bullet.png"],
            spriteSize : { width : 290, height : 140 },
            anims : c.ANIMATIONS["BULLET_ENEMY"]
        }));

        this.prevShot = new Date().getTime();
        this.attackLimit -= 10;
    }
}

Shadow.prototype.collisions = function()
{
    if (this.isDead())
    {
        world.create(new EXPLOSION(
        {
            position : { x : this.position.x, y : this.position.y },
            size : { width  : this.size.width, height : this.size.width },
            zIndex : this.zIndex+1,
            spritesheet : world.manifest.images["enemy_explosion.png"], //put enemy explosion image when fixed
            anims  : c.ANIMATIONS["EXPLOSION"],
            spriteSize : { width : 380, height : 380 }
        }));
        
        this.dead = true;
    }
}

Shadow.prototype.isDead = function()
{
    if (this.hitPoints <= 0)
        return true;
}

EventEmitter.mixins(Shadow.prototype);
addRenderSystem(Shadow.prototype);

module.exports = Shadow;