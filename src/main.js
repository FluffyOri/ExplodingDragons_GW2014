$(function() {
    //requirements
    var c      = require("./config/constantes");
    var world  = require("./world");
    var images = require("./config/images");
    var input  = require("./controllers/inputs");
    var loader = require("./controllers/loader");
    var Player = require("./models/player");
    var prefabs = require("./config/prefabs");

    function initMenu()
    {
        world.state = "menu";
        defineCanvas();

        world.on("gamepad connected", function(gamepadID) {
            world.create(new Player(
            {
                id : world.gameObjects.length,
                tag : "player",
                playerID : gamepadID,
                spritesheet : world.manifest.images[prefabs.players[gamepadID].spritesheet],
                anims : c.ANIMATIONS[prefabs.players[gamepadID].anims],
                position : { x : c.CANVAS_WIDTH / 4 + gamepadID * c.CANVAS_WIDTH / 2 - 48, y : c.CANVAS_HEIGHT - 150 },
                size : { width : 96, height : 96 },
                speed : 3
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

    loader(initMenu);
});