$(function() {
    //requirements
    var c         = require("./config/constantes");
    var world     = require("./world");
    var images    = require("./config/images");
    var input     = require("./controllers/inputs");
    var loader    = require("./controllers/loader");
    var Player    = require("./models/player");
    var Decor     = require("./models/decor");
    var LightShip = require("./models/light_ship");
    var Generator = require("./models/generator");
    var prefabs   = require("./config/prefabs");

    function initMenu()
    {
        world.state = "menu";
        defineCanvas();

        world.on("gamepad connected", function(gamepadID) {
            world.create(new Player(
            {
                tag               : "player",
                playerID          : gamepadID,
                spritesheet       : world.manifest.images[prefabs.players[gamepadID].spritesheet],
                spritesheetBullet : world.manifest.images[prefabs.players[gamepadID].spritesheetBullet],
                anims             : c.ANIMATIONS[prefabs.players[gamepadID].anims],
                position          : { x : c.CANVAS_WIDTH / 4 + gamepadID * c.CANVAS_WIDTH / 2 - 48, y : c.CANVAS_HEIGHT - 150 },
                size              : { width : 96, height : 96 },
                speed             : 3,
                attackDelay       : 250
            }));

            if (world.find("tag", "player").length >= 1)
            {
                // $("#menuScreen").fadeOut(function() {
                //     $("#gameScreen").fadeIn(function() {
                //         initGame();                        
                //     });
                // });
                
                $("#menuScreen").hide();
                $("#gameScreen").show()
                initGame();
            }
        });

        input.startPollingGamepads();
    }

    function initGame()
    {
        world.state = "ingame";

        setGenerators();

        requestAnimationFrame(gameloop);
    }

    //looping at 60 frames per second
    function gameloop()
    {
        world.run();
        requestAnimationFrame(gameloop);
    }

    //set canvas size and return his context
    function defineCanvas()
    {
        var canvas      = document.getElementById("mainCanvas");
        var context     = canvas.getContext("2d");
        canvas.width    = c.CANVAS_WIDTH;
        canvas.height   = c.CANVAS_HEIGHT;

        var bgBuffer    = document.createElement("canvas");
        var bgContext   = bgBuffer.getContext("2d");
        bgBuffer.width  = c.GAME_WIDTH;
        bgBuffer.height = c.GAME_HEIGHT;

        world.on("before:render", function() {
            context.clearRect(0, 0, c.CANVAS_WIDTH, c.CANVAS_HEIGHT);
        });

        world.context   = context;
        world.bgBuffer  = bgBuffer;
        world.bgContext = bgContext;
    }

    function setGenerators()
    {
        //islands
        world.create(new Generator({
            delayInterval : { min : 1000, max : 5000 },
            sides : ["right"],
            objectClass : Decor,
            objectParams : {
                speed : 0.5,
                size : { width : 100, height : 100 },
                spritesheet : world.manifest.images["islands.png"],
                spriteSize : { width : 500, height : 500 },
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

    loader(initMenu);
});