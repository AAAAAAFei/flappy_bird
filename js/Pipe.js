(function (Game) {
    function Pipe(option) {
        this.ctx = option.ctx;
        this.upImg = option.upImg;
        this.downImg = option.downImg;
        this.width = this.upImg.width;
        this.index = option.index || 0;
        this.spaceX = 200;
        this.spaceY = 100;
        this.height = 100 + parseInt(Math.random() * 100);
        this.x = 200 + this.index * (this.width + this.spaceX) ;
        this.y = 0;
    }
    Pipe.prototype.render = function () {
        this.x -= 6;
        if (this.x < -this.width) {
            this.x = 200 + 4 * (this.width + this.spaceX);
        }
        //先画上管道
        var uy = this.upImg.height - this.height;
        this.ctx.drawImage(this.upImg, 0, uy, this.width, this.height, this.x, 0, this.width, this.height);
        //再画下管道
        var dy = this.ctx.canvas.height - this.spaceY - this.height;
        this.ctx.drawImage(this.downImg, 0, 0, this.width, dy, this.x, this.spaceY + this.height, this.width, dy);
        //绘制路径
        this.ctx.rect(this.x, 0, this.width, this.height);
        this.ctx.rect(this.x, this.spaceY + this.height, this.width, dy);
        // this.ctx.strokeStyle = 'red';
        // this.ctx.stroke();
    }
    Game.Pipe = Pipe;
})(Game);
