// REQUIREMENTS
var c           = require("../config/constantes");
var buttons     = require("../config/key_bindings").buttons;
var world       = require("../world");

var gamepadSupport =
{    
    prevRawGamepadTypes : [],
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
    },

    startPollingGamepads : function()
    {
        if (!this.ticking)
        {
            this.ticking = true;
            this.prevRawGamepads = navigator.webkitGetGamepads();
            this.tick();
        }
    },

    stopPollingGamepads : function()
    {
        this.ticking = false;
    },

    tick: function()
    {
        gamepadSupport.pollStatus();
        gamepadSupport.scheduleNextTick();
    },

    scheduleNextTick: function()
    {
        if (this.ticking)
        {
            window.requestAnimationFrame(this.tick);
        }
    },

    pollStatus: function()
    {
        var rawGamepads = navigator.webkitGetGamepads();

        for (var i = 0; i < rawGamepads.length; i++)
        {
            if (typeof rawGamepads[i] != this.prevRawGamepadTypes[i]) 
            {
                this.prevRawGamepadTypes[i] = typeof rawGamepads[i];

                if (rawGamepads[i] && rawGamepads[i].axes.length > 0)
                {
                console.log(rawGamepads[i])
                    this.gamepads.push(rawGamepads[i]);
                    world.trigger("gamepad connected", this.gamepads.length-1);
                    //console.log(world);
                }
            }
        }
    },

}

//EXPORT
module.exports = gamepadSupport;