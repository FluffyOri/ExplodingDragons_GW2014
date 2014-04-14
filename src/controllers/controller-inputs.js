// REQUIREMENTS
var c           = require("../config/constantes");
var buttons     = require("../config/key_bindings").buttons;
var gamepadMode = require("../config/key_bindings").gamepadMode;


//KEYBOARD AND MOUSE INPUTS

var keyboardInput =
{
    keydown : {},
    mousePosition : {
        x : 0,
        y : 0
    },
    getKeyDown : function(keycode)
    {
        return this.keydown[keycode];
    },
    getButtonDown : function(button)
    {
        for (var i = 0; i < buttons[button].length; i++)
        {
            if (this.keydown[buttons[button][i]])
                return true;
        }
    },
    getAxis : function(axis)
    {
        var value = 0;

        if (axis.toLowerCase() === "horizontal")
        {
            if (this.keydown["q"] || this.keydown["left"])
                value--;
            if (this.keydown["d"] || this.keydown["right"])
                value++;
        }
        else if (axis.toLowerCase() === "vertical")
        {
            if (this.keydown["s"] || this.keydown["down"])
                value--;
            if (this.keydown["z"] || this.keydown["up"])
                value++;
        }
        else
        {
            console.error("Bad axis name : " + axis);
        }

        return value;
    }
}

function keyName(event) {
    return jQuery.hotkeys.specialKeys[event.which] ||
        String.fromCharCode(event.which).toLowerCase();
}

$(function() {
    if (!gamepadMode)
    {
        $(document).bind("keydown", function(event) {
            keyboardInput.keydown[keyName(event)] = true;
        });

        $(document).bind("keyup", function(event) {
            keyboardInput.keydown[keyName(event)] = false;
        });

        window.addEventListener("mousemove", function(e) {
            keyboardInput.mousePosition.x = e.layerX;
            keyboardInput.mousePosition.y = e.layerY;
        });

        window.addEventListener("mousedown", function(e) {
            if (e.button === 0)
                keyboardInput.keydown["leftClick"]  = true;
            if (e.button === 1)
                keyboardInput.keydown["wheelClick"] = true;
            if (e.button === 2)
                keyboardInput.keydown["rightClick"] = true;
        });

        window.addEventListener("mouseup", function(e) {
            if (e.button === 0)
                keyboardInput.keydown["leftClick"]  = false;
            if (e.button === 1)
                keyboardInput.keydown["wheelClick"] = false;
            if (e.button === 2)
                keyboardInput.keydown["rightClick"] = false;
        });
    }
});


//GAMEPAD INPUTS

var gamepadSupport = {
    startPolling: function()
    {
        if (!gamepadSupport.ticking)
        {
            gamepadSupport.ticking = true;
            gamepadSupport.tick();
        }
    },

    stopPolling: function()
    {
        gamepadSupport.ticking = false;
    },

    tick: function()
    {
        gamepadSupport.pollStatus();
        gamepadSupport.scheduleNextTick();
    },

    scheduleNextTick: function()
    {
        if (gamepadSupport.ticking)
        {
            window.requestAnimationFrame(gamepadSupport.tick);
        }
    },

    pollStatus: function()
    {
        var pads = navigator.webkitGetGamepads();
        gamepadInput.gamepads = [];

        for (var i = 0; i < pads.length; i++)
        {
            if (pads[i] !== undefined && pads[i].axes.length > 0 )
            {
                gamepadInput.gamepads.push(pads[i]);
            }
        }
    },
}

var gamepadInput =
{
    gamepads : [],
    keys : {
        "A"          : 0,
        "B"          : 1,
        "X"          : 2,
        "Y"          : 3,
        "LB"         : 4,
        "RB"         : 5,
        "LT"         : 6,
        "RT"         : 7,
        "BACK"       : 8,
        "START"      : 9,
        "L_STICK"    : 10,
        "R_STICK"    : 11,
        "DPAD_UP"    : 12,
        "DPAD_DOWN"  : 13,
        "DPAD_LEFT"  : 14,
        "DPAD_RIGHT" : 15,
    },

    axes : {
        "LEFT_HORIZONTAL"  : 0,
        "LEFT_VERTICAL"    : 1,
        "RIGHT_HORIZONTAL" : 2,
        "RIGHT-VERTICAL"   : 3,
    },

    getKeyDown : function(key, gamepadID)
    {
        if (gamepadID === undefined)
            gamepadID = 0;
        if (!this.gamepads[gamepadID])
        {
            console.error("There is no gamepad associated with this ID : " + gamepadID);
            return;
        }

        if (this.gamepads[gamepadID].buttons[this.keys[key]] > 0)
        {
            return true;
        }
    },

    getButtonDown : function(button, gamepadID)
    {
        if (gamepadID === undefined)
            gamepadID = 0;
        if (!this.gamepads[gamepadID])
        {
            console.error("There is no gamepad associated with this ID : " + gamepadID);
            return;
        }

        for (var i = 0; i < buttons[button].length; i++)
        {
            if (this.gamepads[gamepadID].buttons[this.keys[buttons[button][i]]])
            {
                return true;
            }
        }
    },

    getAxis : function(axis, gamepadID)
    {
        if (gamepadID === undefined)
            gamepadID = 0;
        if (!this.gamepads[gamepadID])
        {
            console.error("There is no gamepad associated with this ID : " + gamepadID);
            return;
        }

        return this.gamepads[gamepadID].axes[this.axes[axis]];
    }

}

$(function() {
    if (gamepadMode)
    {
        gamepadSupport.startPolling();
    }
});

window.inputs = gamepadInput;

//EXPORT
module.exports = (gamepadMode && Modernizr.gamepads) ? gamepadInput : keyboardInput;