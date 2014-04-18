var world = require("../world");

var scoreController = 
{
    addScoreTo : function(playerID, num)
    {
        var playerID = playerID;
        var num      = num;
        var targetToScore = world.find("tag", "player")[playerID];

        targetToScore.score += num;
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