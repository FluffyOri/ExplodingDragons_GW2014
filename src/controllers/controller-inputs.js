var inputs =
{
    keydown : {},
    mousePosition : {
        x : 0,
        y : 0
    },
    getKeyDown : function(keycode) {
        return this.keydown[keycode];
    }
}

var buttons =
{

}

function keyName(event) {
    return jQuery.hotkeys.specialKeys[event.which] ||
        String.fromCharCode(event.which).toLowerCase();
}

$(document).bind("keydown", function(event) {
    inputs.keydown[keyName(event)] = true;
});

$(document).bind("keyup", function(event) {
    inputs.keydown[keyName(event)] = false;
});

window.addEventListener("mousemove", function(e) {
    inputs.mousePosition.x = e.layerX;
    inputs.mousePosition.y = e.layerY;
});

module.exports = inputs;