$(function() {
    //requirements
    var c             = require("./config/constantes");
    var world         = require("./world");
    var stats         = require("../lib/stats.js");
    var input         = require("./controllers/inputs");
    var loader        = require("./controllers/loader");
    var Player        = require("./models/player");
    var Decor         = require("./models/decor");
    var prefabs       = require("./config/prefabs");
    var setGenerators = require("./controllers/set_generators");
    var Ennemis       = require("./models/ennemis");
    var Collectible   = require("./models/collectible");
    var manageTime    = require("./config/manageTime");
    var Gauge         = require("./models/gaugeShoot.js");
    var ScoreIA       = require("./models/scoreIA.js");

    function initMenu()
    {
        world.state = "menu";
        defineCanvas();
        world.manifest.sounds.vent.play();
        world.manifest.sounds.game.play();

        world.on("gamepad connected", function(gamepadID) {
            if (world.nbPlayers < c.NB_PLAYERS)
            {
                world.nbPlayers++;
                world.create(new Player(
                {
                    tag               : "player",
                    playerID          : gamepadID,
                    spritesheet       : world.manifest.images[prefabs.players[gamepadID].spritesheet],
                    spritesheetBullet : world.manifest.images[prefabs.players[gamepadID].spritesheetBullet],
                    anims             : c.ANIMATIONS[prefabs.players[gamepadID].anims],
                    position          : { x : c.CANVAS_WIDTH / 4 + gamepadID * c.CANVAS_WIDTH / 2 - 48, y : c.CANVAS_HEIGHT / 2 - 48 },
                    size              : { width : 96, height : 96 },
                    zIndex            : 1000 + gamepadID,
                    speed             : 5,
                    colliderPadding   : 30,
                    attackDelay       : 400,
                    hitPoints         : 200,
                    startAngle        : gamepadID * Math.PI,
                    explosionSize     : 500
                }));

                // world.create(new Gauge({playerID : gamepadID}));

                if (world.find("tag", "player").length === c.NB_PLAYERS)
                {
                    $("#pendingIcon").fadeOut(500, function() {
                        $("#startButton").fadeIn(500);
                        requestAnimationFrame(pollStartGame);
                    })
                }
            }
        });
        //debug for 2 players
        //world.trigger("gamepad connected", 1);
        input.startPollingGamepads();
    }

    function pollStartGame()
    {
        var pucelle = true;
        if (input.getKeyPress("START"))
        {
            $("#menuScreen").fadeOut(100, function() {
                $("#gameScreen").fadeIn(100, function() {                        
                    initGame();
                });
            });
            pucelle = false;              
        }

        if(pucelle)
        {
            requestAnimationFrame(pollStartGame); 
        }
    }
    function initGame()
    {
        world.state = "ingame";
        setGenerators();

        setInterval(function() {
            if (world.find("type", "shadow").length === 0)
            {
                var players = world.find("tag", "player");
                for (var i = 0; i < players.length; i++)
                {
                    if (players[i].shadowAbilityEnabled)
                        return;
                }
                
                world.create(new Collectible({
                    type : "shadow",
                    position : {
                        x : c.CANVAS_WIDTH / 2 - 25, 
                        y : c.CANVAS_HEIGHT / 2 - 25, 
                    },
                    size : { width : 50, height : 50 },
                    nbFrames : 1,
                    zIndex : 999,
                    spritesheet : world.manifest.images["collectible_shadow.png"],
                    spriteSize : { width : 384, height : 384 },
                    spritePos : { x : 0, y : 0 }
                }));
                
            }
        }, 12500);

        initDecor();
        initScoreIA();
        world.sortGameobjects();
        setInterval(world.sortGameobjects, 1000);
        requestAnimationFrame(gameloop);
    }

    //looping at 60 frames per second
    function gameloop()
    {
        //stats.begin();
        world.run();
        //manageTime();
        //stats.end();

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

    function initDecor()
    {
        //island
        for (var i = 0; i < 750; i += 250)
        {
            world.create(new Decor(
            {
                nbFrames : 10,
                speed : 0.4,
                size : { width : 200, height : 200 },
                angle : Math.PI,
                position : { x : i, y : i},
                spritesheet : world.manifest.images["islands.png"],
                spriteSize : { width : 250, height : 250 },
                spritePos : { x : 0, y : 0 }
            }));
        }

        //clouds foreground
        for (var i = 0; i < 750; i += 250)
        {
            world.create(new Decor(
            {
                nbFrames : 10,
                size : { width : 200, height : 200 },
                zIndex : 10,
                angle : Math.PI,
                position : { x : i, y : i},
                spritesheet : world.manifest.images["clouds_foreground.png"],
                spriteSize : { width : 250, height : 250 },
                spritePos : { x : 0, y : 0 }
            }));
        }

        //clouds 1st
        for (var i = 0; i < 750; i += 250)
        {
            world.create(new Decor(
            {
                nbFrames : 10,
                size : { width : 200, height : 200 },
                zIndex : 2000,
                angle : Math.PI,
                position : { x : i, y : i},
                spritesheet : world.manifest.images["clouds_first.png"],
                spriteSize : { width : 250, height : 250 },
                spritePos : { x : 0, y : 0 }
            }));
        }
    }

    function initScoreIA()
    {
        world.create(new ScoreIA({ score : 5000 }));
    }

    loader(initMenu);
});