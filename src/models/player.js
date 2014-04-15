//requirements
var c     = require("../config/constantes");
var world = require("../world");
var input = require("../controllers/inputs");
var addRenderSystem = require("../modules/render");

var Player = function Player(params)
{
    this.id        = params.id;
    this.tag       = params.tag;
    this.playerID  = params.playerID;
    this.gamepad   = input.gamepads[this.playerID];
    this.position  = params.position   || { x : 0, y : 0 };
    this.size      = params.size       || { width : 50, height : 50 };
    this.speed     = params.speed      || 10;
    this.dashSpeed = params.dashSpeed  || 10;
    this.zIndex    = params.zIndex     || 0;
    this.context   = params.context    || world.context;
    this.angle     = params.startAngle || 0;

    this.spritesheet = params.spritesheet;
    this.spriteSize  = params.spriteSize || { width : 128, height : 128 };
    this.anims       = params.anims;
    this.activeAnim  = this.anims[params.activeAnim] || this.anims['fly'];

    if (this.playerID === 1)
    {
        this.frameNum = 2;
    }

    this.run = function()
    {
        this.rotate();
        this.move();
        this.dash();
        this.limits();
        this.shoot();
        this.animate();
    }
}

Player.prototype.rotate = function()
{
    var axisX = input.getAxis("RIGHT_HORIZONTAL", this.playerID);
    var axisY = input.getAxis("RIGHT_VERTICAL", this.playerID);

    if ((axisX < -c.ANALOG_DEAD || axisX > c.ANALOG_DEAD) || (axisY < -c.ANALOG_DEAD || axisY > c.ANALOG_DEAD))
    {
        this.angle = (Math.atan2(input.getAxis("RIGHT_HORIZONTAL", this.playerID), input.getAxis("RIGHT_VERTICAL", this.playerID)) - Math.PI/2) * -1;  
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

    if (axisX < -c.ANALOG_DEAD || axisX > c.ANALOG_DEAD)
    {
        this.position.x += this.speed * axisX;
    }

    if (axisY < -c.ANALOG_DEAD || axisY > c.ANALOG_DEAD)
    {
        this.position.y += this.speed * axisY;
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
    if (input.getKeyDown("LB"))
    {
        this.position.x += Math.sin(this.angle) * this.dashSpeed;
        this.position.y += - Math.cos(this.angle) * this.dashSpeed;
    }

    if (input.getKeyDown("RB"))
    {
        this.position.x += - Math.sin(this.angle) * this.dashSpeed;
        this.position.y += Math.cos(this.angle) * this.dashSpeed;
    }
}

Player.prototype.shoot = function()
{
    
}

addRenderSystem(Player.prototype);

module.exports = Player;