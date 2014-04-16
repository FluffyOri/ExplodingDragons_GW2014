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
                "rate"  : 4,
                "length" : 12,
                "animY"   : 0,
                "loop" : true
            },
            "idle" :
            {
                "rate"  : 2,
                "length" : 12,
                "animY"   : 128,
                "loop" : true
            },
        },
        "BULLET_FIRE" : 
        {
            "basic" :
            {
                "rate"  : 10,
                "length" : 6,
                "animY"   : 0,
                "loop" : true
            }
        },
        "LIGHT_SHIP" : 
        {
            "fly" :
            {
                "rate"  : 1,
                "length" : 12,
                "animY"   : 0,
                "loop" : true
            },
        },
        "BULLET_ENEMY" : 
        {
            "basic" :
            {
                "rate"   : 6,
                "length" : 4,
                "animY"  : 0,
                "loop"   : true
            }
        }
    }
}