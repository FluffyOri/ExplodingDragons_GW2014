var images = require("../config/images");
var world  = require("../world");

var count = 0;
var nbImages = 0;
var init;

function loader(callback)
{
    init = callback;
    world.manifest.images = {};

    for (var i in images)
    {
        nbImages++;
        var img = new Image();
        img.src = images[i];
        img.onload = function() { count++; };
        var path = "assets/images/";
        world.manifest.images[images[i].replace(path, "")] = img;
    }
    world.sound= {};
    world.sound.shoot = new Howl({
        urls: ["assets/music/tire_dragon.mp3"],
        volume : 0.6,
        onload: function(){
            loader.soundLoaded++;
            if(loader.soundLoaded == loader.soundLength){
                run();
            }
        }
    })
    loading();
}

function loading()
{
    if (count >= nbImages)
    {
        // $("#loadingScreen").fadeOut(function() {
        //     $("#menuScreen").fadeIn(function() {
        //         init();                
        //     });
        // });
        // 
        $("#loadingScreen").hide();
        $("#menuScreen").show();
        init();

        return;
    }

    requestAnimationFrame(loading);
}

module.exports = loader;