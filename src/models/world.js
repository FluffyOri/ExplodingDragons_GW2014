var EventEmitter = require("../../lib/events-emitter.js");

var World = function World()
{

}

EventEmitter.mixins(World.prototype);

module.exports = new World();