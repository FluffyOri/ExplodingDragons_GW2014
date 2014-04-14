//requirements
var c     = require("../config/constantes");
var world = require("../world");

function addRenderSystem(target)
{
    target.drawSquare = function()
    {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

    target.drawImage = function()
    {

    }
}

module.exports = addRenderSystem;