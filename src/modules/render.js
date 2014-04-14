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
        this.context.save();
        this.context.translate(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
        this.context.rotate(this.angle);
        this.context.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
        this.context.restore();
    }
}

module.exports = addRenderSystem;