//requirements
var c         = require("../config/constantes");
var world     = require("../world");
var Decor     = require("../models/decor");
var LightShip = require("../models/light_ship");
var Kamikaze  = require("../models/Kamikaze");
var Zeppelin  = require("../models/Zeppelin");
var Generator = require("../models/generator");
var Boss      = require("../models/boss");

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
        delayInterval : { min : 1000, max : 6000 },
        sides : ["left", "right", "top", "bottom"],
        focusPlayer : true,        
        objectClass : Kamikaze,
        objectParams : {
            speed : 3,
            tag : "enemy_ship",
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
        delayInterval : { min : 15000, max : 25000 },
        sides : ["left", "right", "top", "bottom"],
        focusPlayer : true,        
        objectClass : Zeppelin,
        objectParams : {
            speed : 0.25,
            tag : "enemy_ship",
            attackDelay : 2500,
            marginInterval : 0,
            size : { width : 150, height : 150 },
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
        startDelay : 35000,
        delayInterval : { min : 10000, max : 20000 },
        sides : ["left", "right", "top", "bottom"],
        focusPlayer : true,        
        objectClass : LightShip,
        objectParams : {
            speed : 1,
            attackDelay : 5000,
            tag : "enemy_ship",
            marginInterval : 0,
            size : { width : 48, height : 48 },
            spritesheet : world.manifest.images["light_ship.png"],
            spritesheetBullet : world.manifest.images["enemy_bullet.png"],
            anims : c.ANIMATIONS["LIGHT_SHIP"],
            spriteSize : { width : 128, height : 128 },
            spritePos : { x : 0, y : 0 }
        }
    }));

    //boss
    setTimeout(function() {
        world.create(new Boss({
            position: {
                x : c.CANVAS_WIDTH+156,
                y : c.CANVAS_HEIGHT / 2 - 156
            },
            angle : Math.PI,
            speed : 4,
            hitPoints : 500,
            attackDelay : 1500,
            tag : "enemy_ship",
            type : "boss",
            marginInterval : 0,
            size : { width : 312, height : 312 },
            spritesheet : world.manifest.images["dark_dragon.png"],
            spritesheetBullet : world.manifest.images["dark_dragon_bullet.png"],
            anims : c.ANIMATIONS["BOSS"],
            spriteSize : { width : 480, height : 480 },
            spritePos : { x : 0, y : 0 }
            
        }));
        world.manifest.sounds.game.stop();
        world.manifest.sounds.boss.play();
        world.manifest.sounds.blackdragon.play();
    }, 150000);
}

function scheduler()
{
    world.on("new generator", function(tag) {
        
    });
}

module.exports = setGenerators;