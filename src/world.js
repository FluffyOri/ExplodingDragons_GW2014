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

    this.create = function(object)
    {
        this.gameObjects.push(object);
        this.trigger("new gameobject", object);
    }

    this.find = function(key, value)
    {
        var objects = [];
        for (var i = 0; i < this.gameObjects.length; i++)
        {
            if (this.gameObjects[i][key] === value)
            {
                objects.push(this.gameObjects[i]);
            }
        }

        return objects;
    }
}

EventEmitter.mixins(World.prototype);

var world = new World();
window.world = world; //debug

world.on("new gameobject", function() {
    world.gameObjects.sort(function(a, b) {
        return a.zIndex - b.zIndex;
    });
});

module.exports = world;