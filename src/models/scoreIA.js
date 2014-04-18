//requirements
var c     = require("../config/constantes");
var world = require("../world");

var ScoreIA = function ScoreIA (params) 
{
    this.playerID = - 6;
    this.score    = params.score || 10000;

    this.run = function()
    {
        this.updateScore();
    }

    this.updateScore = function()
    {
        this.scoreText = $('.HudEnnemies');
        this.scoreText.text(this.score.toString());
    }
}

module.exports = ScoreIA;