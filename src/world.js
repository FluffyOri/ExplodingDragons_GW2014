var EventEmitter = require("../lib/events-emitter.js");

var World = function World()
{
    this.gameObjects = [];
    this.manifest = {};

    this.run = function()
    {
        this.trigger("before:render");

        for (var i = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].run();
        }
    }
}

EventEmitter.mixins(World.prototype);

module.exports = new World();