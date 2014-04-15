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

    loading();
}

function loading()
{
    if (count >= nbImages)
    {
        init();

        return;
    }

    requestAnimationFrame(loading);
}

module.exports = loader;