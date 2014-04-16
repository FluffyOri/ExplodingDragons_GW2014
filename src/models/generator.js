//requirements
var c               = require("../config/constantes");
var world           = require("../world");
var addRenderSystem = require("../modules/render");
var EventEmitter    = require("../../lib/events-emitter.js");

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var Generator = function Generator(params)
{
    this.zIndex        = 0;
    this.sides         = params.sides;
    this.objectClass   = params.objectClass;
    this.objectParams  = params.objectParams;
    this.delayInterval = params.delayInterval || 1000;
    this.delay         = 0;

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
                    y : randomIntFromInterval(0, c.CANVAS_HEIGHT - objectParams.size.height/2) 
                }
                objectParams.angle = 0;
            break;

            case "right":
                objectParams.position = {
                    x : c.CANVAS_WIDTH,
                    y : randomIntFromInterval(0, c.CANVAS_HEIGHT - objectParams.size.height/2)
                }
                objectParams.angle = Math.PI;
            break;

            case "top":
                objectParams.position = {
                    x : randomIntFromInterval(0, c.CANVAS_WIDTH - objectParams.size.width/2),
                    y : - objectParams.size.height
                }
                objectParams.angle = 3*Math.PI/2;
            break;
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