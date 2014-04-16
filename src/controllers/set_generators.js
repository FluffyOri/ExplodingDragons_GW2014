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
        tag : "island_generator",
        delayInterval : { min : 9000, max : 20000 },
        startDelay : 0,
        sides : ["right"],
        objectClass : Decor,
        objectParams : {
            marginInterval : 50,
            speed : 0.4,
            size : { width : 200, height : 200 },
            spritesheet : world.manifest.images["islands.png"],
            spriteSize : { width : 250, height : 250 },
            spritePos : { x : 0, y : 0 }
        }
    }));

    //cloud foreground
    world.create(new Generator(
    {
        delayInterval : { min : 10000, max : 20000 },
        sides : ["right"],
        objectClass : Decor,
        objectParams : {
            size : { width : 150, height : 150 },
            zIndex : 10,
            marginInterval : 50,
            spritesheet : world.manifest.images["clouds_foreground.png"],
            spriteSize : { width : 250, height : 192 },
            spritePos : { x : 0, y : 0 }
        }
    }));

    //cloud 1st plan
    world.create(new Generator(
    {
        delayInterval : { min : 10000, max : 25000 },
        sides : ["right"],
        objectClass : Decor,
        objectParams : {
            size : { width : 150, height : 150 },
            zIndex : 2000,
            marginInterval : 50,
            spritesheet : world.manifest.images["clouds_first.png"],
            spriteSize : { width : 250, height : 192 },
            spritePos : { x : 0, y : 0 }
        }
    }));

    //light ship
    world.create(new Generator({
        startDelay : 0,
        delayInterval : { min : 500, max : 1000 },
        sides : ["left", "right", "top", "bottom"],
        objectClass : LightShip,
        objectParams : {
            focusPlayer : true,        
            marginInterval : 0,
            speed : 3,
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