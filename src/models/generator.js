//requirements
var c               = require("../config/constantes");
var world           = require("../world");
var utils           = require("../controllers/utils");
var addRenderSystem = require("../modules/render");
var EventEmitter    = require("../../lib/events-emitter.js");

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var Generator = function Generator(params)
{
    this.zIndex         = 0;
    this.tag            = params.tag || null;
    this.sides          = params.sides;
    this.objectClass    = params.objectClass;
    this.objectParams   = params.objectParams;
    this.delayInterval  = params.delayInterval || 1000;
    this.delay          = params.startDelay || 0;
    this.marginInterval = params.marginInterval || 0;
    console.log(params.focusPlayer)
    this.focusPlayer    = params.focusPlayer;

    this.lastPop       = new Date().getTime();

    this.run = function()
    {
        this.popObject();
    }
}

Generator.prototype.popObject = function()
{
    var time = new Date().getTime();

    if (time - this.lastPop > this.delay)
    {
        var side = this.chooseSide();
        var objectParams = this.objectParams;
        
        switch (side)
        {
            case "left":
                objectParams.position = {
                    x : - objectParams.size.width,
                    y : randomIntFromInterval(- this.marginInterval, c.CANVAS_HEIGHT - objectParams.size.height/2 + this.marginInterval) 
                }
                objectParams.angle = 0;
            break;

            case "right":
                objectParams.position = {
                    x : c.CANVAS_WIDTH,
                    y : randomIntFromInterval(- this.marginInterval, c.CANVAS_HEIGHT - objectParams.size.height/2 + this.marginInterval)
                }
                objectParams.angle = Math.PI;
            break;

            case "top":
                objectParams.position = {
                    x : randomIntFromInterval(0, c.CANVAS_WIDTH - objectParams.size.width/2),
                    y : - objectParams.size.height
                }
                objectParams.angle = Math.PI/2;
            break;

            case "bottom":
                objectParams.position = {
                    x : randomIntFromInterval(0, c.CANVAS_WIDTH - objectParams.size.width/2),
                    y : c.CANVAS_HEIGHT
                }
                objectParams.angle = -Math.PI/2;
            break;
        }

        if (this.focusPlayer)
        {
            console.log("yolo")
            var players = world.find("tag", "player");
            var target = players[Math.floor(Math.random() * players.length)];

            objectParams.angle = utils.getAngle(objectParams.position, target.position);            
        }

        world.create(new this.objectClass(objectParams));

        this.lastPop = time;
        this.delay = this.scheduleNextPop();
    }

}

Generator.prototype.chooseSide = function()
{
    var rand = Math.floor(Math.random() * this.sides.length);
    return this.sides[rand];
}

Generator.prototype.scheduleNextPop = function()
{
    return randomIntFromInterval(this.delayInterval.min, this.delayInterval.max);
}

module.exports = Generator;