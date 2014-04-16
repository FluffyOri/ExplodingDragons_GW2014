//requirements
var c      = require("../config/constantes");
var world  = require("../world");
var input  = require("../controllers/inputs");
var Player = require("../models/player");

var Gauge = function Gauge(params)
{
    this.playerID = params.playerID;
    this.position = params.position;
    this.size     = params.size;
    this.color    = params.color            || "red";
    this.limit    = params.playerShootLimit || 100;
}