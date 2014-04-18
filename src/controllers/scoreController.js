var world = require("../world");

var scoreController = 
{
    addScoreTo : function(playerID, num)
    {
        var playerID = playerID;
        var num      = num;
        var targetToScore = world.find("tag", "player")[playerID];

        targetToScore.score += num;

        if (playerID === 0)
        {
            $("#PopScoreP" + targetToScore.playerID.toString()).text("+ " + num.toString()).fadeIn(500,
                 function(){
                    $("#PopScoreP" + targetToScore.playerID.toString()).text("").fadeOut(3000,
                         function(){
                            return;
                         })
                 });
        }
        else if (playerID === 1)
        {
            $("#PopScoreP" + targetToScore.playerID.toString()).text(num.toString() + " +").fadeIn(500,
                 function(){
                    $("#PopScoreP" + targetToScore.playerID.toString()).text("").fadeOut(3000,
                         function(){
                            return;
                         })
                 });
        }

    },

    substractScoreTo : function(playerID, num)
    {
        var playerID = playerID;
        var num      = num;
        var targetToScore = world.find("tag", "player")[playerID];

        targetToScore.score -= num;
    },

    addScoreToIA : function(num)
    {
        var IA = world.find("playerID", - 6)[0];

        IA.score += num;
    },

    substractScoreToIA : function(num)
    {
        var IA = world.find("playerID", - 6)[0];

        IA.score -= num;
    }
}

module.exports = scoreController;