$(function() {

    //requirements
    var world  = require("./world");
    var c      = require("./config/constantes");
    var images = require("./config/images");
    var input  = require("./controllers/inputs");
    var loader = require("./controllers/loader");
    var Player = require("./models/player");
    var Ennemis= require("./models/ennemis");

    //init function
    function init()
    {
        defineCanvas();

        world.on("gamepad connected", function(gamepadID) {
            world.create(new Player(
            {
                id : world.gameObjects.length,
                tag : "player",
                playerID : gamepadID,
                spritesheet : world.manifest.images["red_dragon_anims.png"],
                anims : c.ANIMATIONS["RED_DRAGON"],
                position : { x : 150, y : 150 },
                size : { width : 64, height : 64 }
            }));
            world.gameObjects.push(new Ennemis(
            {
                x : 50,
                y :150,
                position :{ x : 400, y :400 }
            }));
        });
        
        input.startPollingGamepads();
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

    loader(init);
});