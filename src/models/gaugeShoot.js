//requirements
var c      = require("../config/constantes");
var world  = require("../world");
var input  = require("../controllers/inputs");
var addRenderSystem = require("../modules/render");
var Player = require("../models/player");

var Gauge = function Gauge(params)
{
    this.playerID      = params.playerID;
    this.position      = params.position;
    this.size          = params.size  || { width : 8, height : 50 };
    this.color         = params.color || "red";
    this.focusedPlayer = world.find("playerID", this.playerID);
    this.attackLimit   = this.focusedPlayer.attackLimit;

    this.run = function()
    {
        this.followPlayer();
        this.updateInfos();
        this.drawSquare();
        // this.render();
    }

    this.followPlayer = function()
    {
        this.position
        {
            x : (this.focusedPlayer[0].position.x + this.focusedPlayer[0].size.width/2) - this.focusedPlayer[0].vecDir.x * this.size.width /2;
            y : (this.focusedPlayer[0].position.y + this.focusedPlayer[0].size.height/2) - this.focusedPlayer[0].vecDir.y * this.size.height /2;
        }
    }

    this.updateInfos = function()
    {
        this.attackLimit = this.focusedPlayer.attackLimit;
    }

    this.render = function()
    {
        
    }
}

addRenderSystem(Gauge.prototype);

module.exports = Gauge;