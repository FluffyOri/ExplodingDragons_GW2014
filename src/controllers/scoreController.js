var world = require("../world");

var scoreController = 
{
    addScoreTo : function(playerID, num)
    {
        var playerID = playerID;
        var num      = num;
        var targetToScore = world.find("tag", "player")[playerID];

        targetToScore.score += num;

        this.animAddScore(playerID, num, targetToScore);
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

        this.animAddScoreIA(num);
    },

    substractScoreToIA : function(num)
    {
        var IA = world.find("playerID", - 6)[0];

        IA.score -= num;
    },

    animAddScore : function(playerID, num, targetToScore)
    {
        var num           = num;
        var playerID      = playerID;
        var targetToScore = targetToScore;

        if (playerID === 0)
        {
            $("#PopScoreP" + targetToScore.playerID.toString()).text("+ " + num.toString()).fadeIn(500,
                function()
                {
                    $("#PopScoreP" + targetToScore.playerID.toString()).text("").fadeOut(3000);
                })
        }
        else if (playerID === 1)
        {
            $("#PopScoreP" + targetToScore.playerID.toString()).text(num.toString() + " +").fadeIn(500,
                function()
                {
                    $("#PopScoreP" + targetToScore.playerID.toString()).text("").fadeOut(3000);
                })
        }
    },

    animSubScore : function(playerID, num, targetToScore)
    {
       $("#PopScoreSubP" + targetToScore.playerID.toString()).text("- " + num.toString()).fadeIn(500,
        function()
        {
            $("#PopScoreSubP" + targetToScore.playerID.toString()).text("").fadeOut(5000);
        })
    },

    animAddScoreIA : function(num)
    {
        $("#PopScoreSubIA").text("+ " + num.toString());
        $("#PopScoreSubIA").fadeIn(500,
        function()
        {
            $("#PopScoreSubIA").text(" ");
            $("#PopScoreSubIA").fadeOut(5000);
        })
    }
}

module.exports = scoreController;