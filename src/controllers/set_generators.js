//requirements
var c         = require("../config/constantes");
var world     = require("../world");
var Decor     = require("../models/decor");
var LightShip = require("../models/light_ship");
var Kamikaze  = require("../models/Kamikaze");
var Zeppelin  = require("../models/Zeppelin");
var Generator = require("../models/generator");

function setGenerators()
{
    scheduler();

    //islands
    world.create(new Generator({
        tag : "island_generator",
        delayInterval : { min : 10000, max : 20000 },
        startDelay : 60000,
        sides : ["right"],
        objectClass : Decor,
        objectParams : {
            marginInterval : 50,
            nbFrames : 10,
            speed : 0.4,
            size : { width : 200, height : 200 },
            spritesheet : world.manifest.images["islands.png"],
            spriteSize : { width : 250, height : 250 },
            spritePos : { x : 0, y : 0 }
        }
    }));

    //Big Island
    world.create(new Generator({
        delayInterval : { min : 1000000000000000, max : 10000000000000000000000 },
        startDelay : 0,
        sides : ["right"],
        objectClass : Decor,
        objectParams : {
            marginInterval : 0,
            nbFrames : 2,
            speed : 0.4,
            size : { width : 500, height : 500 },
            spritesheet : world.manifest.images["islands_spe.png"],
            spriteSize : { width : 300, height : 300 },
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
            size : { width : 175, height : 175 },
            nbFrames : 10,
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
            size : { width : 200, height : 200 },
            nbFrames : 10,
            zIndex : 2000,
            marginInterval : 50,
            spritesheet : world.manifest.images["clouds_first.png"],
            spriteSize : { width : 250, height : 192 },
            spritePos : { x : 0, y : 0 }
        }
    }));

    //KAMIKAZE
    world.create(new Generator(
    {
        startDelay : 10000,
        delayInterval : { min : 500, max : 1500 },
        sides : ["left", "right", "top", "bottom"],
        focusPlayer : true,        
        objectClass : Kamikaze,
        objectParams : {
            speed : 7,
            marginInterval : 0,
            size : { width : 55, height : 55 },
            spritesheet : world.manifest.images["phoenix.png"],
            anims : c.ANIMATIONS["KAMIKAZE"],
            spriteSize : { width : 128, height : 128 },
            spritePos : { x : 0, y : 0 }
        }
    }));

    //ZEPPELINS
    world.create(new Generator(
    {
        startDelay : 60000,
        delayInterval : { min : 10000, max : 20000 },
        sides : ["left", "right", "top", "bottom"],
        focusPlayer : true,        
        objectClass : Zeppelin,
        objectParams : {
            speed : 0.5,
            attackDelay : 2500,
            marginInterval : 0,
            size : { width : 100, height : 100 },
            spritesheet : world.manifest.images["zeppelin.png"],
            spritesheetBullet : world.manifest.images["shoot_zeppelin.png"],
            anims : c.ANIMATIONS["ZEPPELIN"],
            spriteSize : { width : 128, height : 128 },
            spritePos : { x : 0, y : 0 }
        }
    }));

    //light ship
    world.create(new Generator(
    {
        startDelay : 45000,
        delayInterval : { min : 5000, max : 10000 },
        sides : ["left", "right", "top", "bottom"],
        focusPlayer : true,        
        objectClass : LightShip,
        objectParams : {
            speed : 2,
            attackDelay : 5000,
            marginInterval : 0,
            size : { width : 48, height : 48 },
            spritesheet : world.manifest.images["light_ship.png"],
            spritesheetBullet : world.manifest.images["enemy_bullet.png"],
            anims : c.ANIMATIONS["LIGHT_SHIP"],
            spriteSize : { width : 128, height : 128 },
            spritePos : { x : 0, y : 0 }
        }
    }));

}

function scheduler()
{
    world.on("new generator", function(tag) {
        console.log(tag);
    });
}

module.exports = setGenerators;