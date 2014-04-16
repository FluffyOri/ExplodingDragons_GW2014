//requirements
var c         = require("../config/constantes");
var world     = require("../world");
var Decor     = require("../models/decor");
var LightShip = require("../models/light_ship");
var Generator = require("../models/generator");

function setGenerators()
{
    //islands
    world.create(new Generator({
        delayInterval : { min : 8000, max : 20000 },
        sides : ["right"],
        objectClass : Decor,
        objectParams : {
            speed : 0.4,
            size : { width : 200, height : 200 },
            spritesheet : world.manifest.images["islands.png"],
            spriteSize : { width : 250, height : 250 },
            spritePos : { x : 0, y : 0 }
        }
    }));

    //light ship
    world.create(new Generator({
        delayInterval : { min : 5000, max : 10000 },
        sides : ["left"],
        objectClass : LightShip,
        objectParams : {
            speed : 1,
            attackDelay : 2000,
            size : { width : 48, height : 48 },
            spritesheet : world.manifest.images["light_ship.png"],
            spritesheetBullet : world.manifest.images["enemy_bullet.png"],
            anims : c.ANIMATIONS["LIGHT_SHIP"],
            spriteSize : { width : 128, height : 128 },
            spritePos : { x : 0, y : 0 }
        }
    }));
}

module.exports = setGenerators;