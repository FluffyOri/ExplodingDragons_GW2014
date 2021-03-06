module.exports = {
    CANVAS_WIDTH  : 1280,
    CANVAS_HEIGHT : 720,
    GAME_WIDTH    : 1280,
    GAME_HEIGHT   : 720,
    NB_PLAYERS    : 2,

    ANALOG_DEAD   : 0.4,

    ANIMATIONS    : {
        "DRAGON_PLAYER" : 
        {
            "fly" :
            {
                "rate"  : 8,
                "length" : 12,
                "animY"   : 0,
                "loop" : true
            },
            "idle" :
            {
                "rate"  : 4,
                "length" : 12,
                "animY"   : 128,
                "loop" : true
            },
            "shield" : 
            {
                "rate"  : 16,
                "length" : 12,
                "animY"   : 512,
                "loop" : true    
            }
        },
        "BULLET_FIRE" : 
        {
            "basic" :
            {
                "rate"  : 20,
                "length" : 6,
                "animY"   : 0,
                "loop" : true
            }
        },
        "BULLET_DARK" : 
        {
            "basic" :
            {
                "rate"  : 20,
                "length" : 4,
                "animY"   : 0,
                "loop" : true
            }
        },
        "LIGHT_SHIP" : 
        {
            "fly" :
            {
                "rate"  : 2,
                "length" : 12,
                "animY"   : 0,
                "loop" : true
            },
        },
        "BOSS" : 
        {
            "fly" :
            {
                "rate"  : 8,
                "length" : 11,
                "animY"   : 0,
                "loop" : true
            },
        },
        "BULLET_ENEMY" : 
        {
            "basic" :
            {
                "rate"   : 12,
                "length" : 4,
                "animY"  : 0,
                "loop"   : true
            }
        },
        "EXPLOSION" : 
        {
            "EXPLOSION" :
            {
                "rate"   : 2,
                "length" : 14,
                "animY"  : 0,
                "loop"   : false
            }
        },
        "KAMIKAZE" :
        {
            "fly" :
            {
                "rate"   : 10,
                "length" : 8,
                "animY"  : 0,
                "loop"   : true
            }
        },
        "ZEPPELIN" :
        {
            "fly" :
            {
                "rate"   : 12,
                "length" : 4,
                "animY"  : 0,
                "loop"   : true
            }
        }
    }
}