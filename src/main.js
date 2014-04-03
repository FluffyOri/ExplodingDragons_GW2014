$(function() {
    //requirements
    var c     = require("./config/constantes");
    var world = require("./models/world");
    var input = require("./controllers/controller-inputs");

    //init function
    function init()
    {
        defineCanvas();
        world.trigger("test");
        requestAnimationFrame(gameloop);
    }

    //looping at 60 frames per second
    function gameloop()
    {
        console.log(input.mousePosition)
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

        //clearRect

        world.context   = context;
        world.bgBuffer  = bgBuffer;
        world.bgContext = bgContext;
    }

    init();
});