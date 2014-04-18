//requirements
var c               = require("../config/constantes");
var prefabs         = require("../config/prefabs");
var world           = require("../world");
var addRenderSystem = require("../modules/render");
var EventEmitter    = require("../../lib/events-emitter.js");

var Bullet = function Bullet(params)
{
    this.id          = world.gameObjects.length;
    this.layer       = params.layer;
    this.tag         = params.tag || "bullet";
    this.playerID    = params.playerID;
    this.position    = params.position;
    this.size        = params.size       || { width : 5, height : 5 };
    this.color       = params.color      || "red";
    this.speed       = params.speed      || 25;
    this.zIndex      = params.zIndex     || 900;
    this.context     = params.context    || world.context;
    this.angle       = params.startAngle || 0;

    this.damage      = params.damage     || 1;
    this.hitPoints   = params.hitPoints  || 1;
    
    this.spritesheet = params.spritesheet;
    this.spriteSize  = params.spriteSize || { width : 290, height : 140 };
    this.anims       = params.anims;
    this.activeAnim  = this.anims[params.activeAnim] || this.anims['basic'];
    this.animY       = this.activeAnim["animY"];

    this.colliderPadding = 0;

    this.ShadowClass = params.shadowClass;

    this.run = function()
    {
        this.move();
        this.animate();
        this.limits();

        if (this.isDead())
        {
            this.dead = true;
        }
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

        this.shadowBulletProc();
    }
}

Bullet.prototype.isDead = function()
{
    if (this.hitPoints <= 0)
        return true;
}

Bullet.prototype.shadowBulletProc = function()
{
    if (this.tag === "shadowBullet")
    {
        world.create(new this.ShadowClass({            
            tag               : "enemy",
            playerID          : -1,
            spritesheet       : world.manifest.images[prefabs.players[this.playerID].spritesheet.replace(".png", "_shadow.png")],
            spritesheetBullet : world.manifest.images[prefabs.players[this.playerID].spritesheetBullet],
            anims             : c.ANIMATIONS[prefabs.players[this.playerID].anims],
            position          : { x : c.CANVAS_WIDTH / 2 - 48, y : c.CANVAS_HEIGHT / 2 - 48 },
            size              : { width : 96, height : 96 },
            speed             : 1,
            attackDelay       : 400,
            startAngle        : 0,
            focusPlayerID     : this.playerID
        }));
    }
}

EventEmitter.mixins(Bullet.prototype);
addRenderSystem(Bullet.prototype);

module.exports = Bullet;