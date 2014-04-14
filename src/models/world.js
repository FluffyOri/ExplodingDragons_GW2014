var EventEmitter = require("../../lib/events-emitter.js");

var World = function World()
{
    this.gameObjects = [];

    this.render = function()
    {
        this.trigger("before:render");

    }

    this.run = function()
    {
        this.render();
    }
}

EventEmitter.mixins(World.prototype);

module.exports = new World();