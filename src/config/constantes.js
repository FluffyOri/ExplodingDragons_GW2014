module.exports = {
    CANVAS_WIDTH  : 1280,
    CANVAS_HEIGHT : 720,
    GAME_WIDTH    : 1280,
    GAME_HEIGHT   : 720,

    ANALOG_DEAD   : 0.3,

    ANIMATIONS    : {
        "DRAGON_PLAYER" : 
        {
            "fly" :
            {
                "rate"  : 11,
                "length" : 12,
                "animY"   : 0,
                "loop" : true
            },
            "idle" :
            {
                "rate"  : 8,
                "length" : 12,
                "animY"   : 128,
                "loop" : true
            }
        }
    }
}