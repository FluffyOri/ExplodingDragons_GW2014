var images = require("../config/images");
var sounds = require("../config/sounds");
var world  = require("../world");

var count = 0;
var nbAssets = 0;
var init;

function loader(callback)
{
    init = callback;
    world.manifest.images = {};
    world.manifest.sounds = {};

    for (var i in images)
    {
        var img = new Image();
        img.src = images[i];
        img.onload = function() { count++; };
        var path = "assets/images/";
        world.manifest.images[images[i].replace(path, "")] = img;
    }

    world.manifest.sounds.shoot = new Howl({
        urls: [sounds["tire_dragon.mp3"]],
        volume : 0.2,
        onload: function(){
            count++;
        }
    });

    world.manifest.sounds.game = new Howl({
        urls: [sounds["musique_projet_gameweek.mp3"]],
        loop: true,
        volume : 0.1,
        onload: function(){
            console.log("load music");
            count++;
        }
    });

    nbAssets += images.length;
    for (var i in sounds)
    {
        nbAssets++;
    }
    //debug pour chargement plus court
    //count+=2;
    loading();
}

function loading()
{
    if (count >= nbAssets)
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