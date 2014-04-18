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
        volume : 0.04, //0.13
        onload: function(){
            count++;
        }
    });
    world.manifest.sounds.blackdragon = new Howl({
        urls: [sounds["entrer_dragon_noir.mp3"]],
        volume : 0.05,
        onload: function(){
            count++;
        }
    });
    world.manifest.sounds.shadow = new Howl({
        urls: [sounds["entrer_shadow.mp3"]],
        volume : 0.15,
        loop: false,
        onload: function(){
            count++;
        }
    });
    world.manifest.sounds.explosion = new Howl({
        urls: [sounds["explosion_dragon.mp3"]],
        volume : 0.05,
        onload: function(){
            count++;
        }
    });
    world.manifest.sounds.gameover = new Howl({
        urls: [sounds["gameover.mp3"]],
        volume : 0.20,
        onload: function(){
            count++;
        }
    });
     world.manifest.sounds.boss = new Howl({
         urls: [sounds["musique_boss.mp3"]],
         loop: true,
         volume : 0.05,
         onload: function(){
             count++;
        }
    });
     world.manifest.sounds.victoire = new Howl({
         urls: [sounds["victoire.mp3"]],
         volume : 0.00,
         onload: function(){
           count++;
        }
    });
    world.manifest.sounds.tire_shadow = new Howl({
        urls: [sounds["bullet_shadow.mp3"]],
        volume : 0.15,
        onload: function(){
            count++;
        }
    });
      world.manifest.sounds.vent = new Howl({
        urls: [sounds["vent.mp3"]],
        loop: true,
        volume : 0.07,
        onload: function(){
            count++;
        }
    });
    world.manifest.sounds.game = new Howl({
        urls: [sounds["musique_projet_gameweek.mp3"]],
        loop: true,
        volume : 0.05, //0.05
        onload: function(){
            count++;
        }
    });
    nbAssets += images.length;
    for (var i in sounds)
    {
        nbAssets++;
    }
    //nbAssets++;
    //debug pour chargement plus court
    count+=5;
    loading();
    console.log(nbAssets)
}

function loading()
{   
    console.log(count)
    if (count >= nbAssets)
    {
        $("#loadingScreen").fadeOut(100, function() {
            $("#menuScreen").fadeIn(100, function() {
                init();                
            });
        });
        
        // $("#loadingScreen").hide();
        // $("#menuScreen").show();
        // init();

        return;
    }

    requestAnimationFrame(loading);
}

module.exports = loader;