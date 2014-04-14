//requirements
var c     = require("../config/constantes");
var world = require("../world");
var input = require("../controllers/inputs");
var addRenderSystem = require("../modules/render");

var Player = function Player(params)
{
    this.id       = params.id;
    this.playerID = params.playerID;
    this.gamepad  = input.gamepads[this.playerID];
    this.position = params.position || { x : 0, y : 0 };
    this.size     = params.size     || { width : 50, height : 50 };
    this.speed    = params.speed    || 10;
    
    this.context  = params.context  || world.context;
    this.color    = params.color    || "red";
    this.image    = params.image;
    
    this.angle    = params.startAngle || 0;

    this.run = function()
    {
        this.rotate();
        this.move();
        this.drawImage();
    }
}

Player.prototype.rotate = function()
{
    this.angle = Math.atan2(input.getAxis("RIGHT_HORIZONTAL", this.playerID), input.getAxis("RIGHT_VERTICAL", this.playerID));
}

Player.prototype.move = function()
{
    var axisX = input.getAxis("LEFT_HORIZONTAL", this.playerID);
    var axisY = input.getAxis("LEFT_VERTICAL", this.playerID);

    if (axisX < -c.ANALOG_DEAD || axisX > c.ANALOG_DEAD)
    {
        //this.position.x += this.speed * ((axisX > 0) ? 1 : -1);        
        this.position.x += this.speed * axisX;        
    }

    if (axisY < -c.ANALOG_DEAD || axisY > c.ANALOG_DEAD)
    {
        //this.position.y += this.speed * ((axisY > 0) ? 1 : -1);        
        this.position.y += this.speed * axisY;        
    }
}

addRenderSystem(Player.prototype);

module.exports = Player;