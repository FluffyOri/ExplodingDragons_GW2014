    //requirements
var c     = require("../config/constantes");
var world = require("../world");

function addRenderSystem(target)
{
    target.angle       = 0;
    target.zIndex      = 0;    
    target.frameNum    = 0;
    target.frameCount  = 0;
    target.isAnimating = true;
    target.spritePos   = { x : 0, y : 0 };
    
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
        this.context.drawImage(this.image, -this.size.width / 2, -this.size.height / 2, this.size.width, this.size.height);
        this.context.restore();
    }

    target.drawFrame = function()
    {
        this.context.save();
        this.context.translate(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
        this.context.rotate(this.angle);
        this.context.drawImage(this.spritesheet,
            this.spritePos.x, this.spritePos.y, this.spriteSize.width, this.spriteSize.height,
            -this.size.width / 2, -this.size.height / 2, this.size.width, this.size.height);
        this.context.restore();
    }

    target.animate = function()
    {
        this.frameCount++;

        if (this.frameCount >= this.activeAnim["rate"] && this.isAnimating)
        {
            this.frameCount = 0;
            this.frameNum++;
            if (this.frameNum >= this.activeAnim["length"])
            {
                this.frameNum = 0;
                if (!this.activeAnim["loop"])
                {
                    this.isAnimating = false;
                }
            }
        }
        
        this.spritePos.x = this.frameNum * this.spriteSize.width;
        this.spritePos.y = this.animY;

        this.context.save();
        this.context.translate(this.position.x + this.size.width / 2, this.position.y + this.size.height / 2);
        this.context.rotate(this.angle);
        this.context.drawImage(this.spritesheet,
            this.spritePos.x, this.spritePos.y, this.spriteSize.width, this.spriteSize.height,
            -this.size.width / 2, -this.size.height / 2, this.size.width, this.size.height);
        this.context.restore();
    }
}

module.exports = addRenderSystem;