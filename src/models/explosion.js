//requirements
var c               = require("../config/constantes");
var world           = require("../world");
var utils           = require("../controllers/utils");
var addRenderSystem = require("../modules/render");
var EventEmitter    = require("../../lib/events-emitter.js");

var EXPLOSION = function EXPLOSION(params)
{
    this.id                = world.gameObjects.length;
    this.tag               = "EXPLOSION";
    this.position          = params.position         || { x : 0, y : 0 };
    this.size              = params.size             || { width : 50, height : 50 };    
    this.zIndex            = params.zIndex           || 750;
    this.context           = params.context          || world.context;

    this.spritesheet       = params.spritesheet;
    this.spritesheetBullet = params.spritesheetBullet;
    this.spriteSize        = params.spriteSize || { width : 128, height : 128 };
    this.anims             = params.anims;
    this.activeAnim        = this.anims[params.activeAnim] || this.anims['EXPLOSION'];
    this.animY             = this.activeAnim["animY"];

    this.run = function()
    {
        this.animate();
    }

    var self = this;
    this.on("end animation", function() {
        console.log("hue")
        self.dead = true;
    });
}

EventEmitter.mixins(EXPLOSION.prototype);
addRenderSystem(EXPLOSION.prototype);

module.exports = EXPLOSION;