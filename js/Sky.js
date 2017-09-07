(function (Game) {
    function Sky(option) {
        this.ctx = option.ctx;
        this.img = option.img;
        this.height = this.ctx.canvas.height;//自适应宽高
        this.width = this.height / this.img.height * this.img.width;
        this.index = option.index || 0;
        this.x = this.index * this.width;
        this.y = 0;
        this.offsetX = this.x;
    }
    Sky.prototype.render = function () {
        this.offsetX -= 3;
        if (this.offsetX < this.x - this.width) {
            this.offsetX = this.x;
        }
        this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.offsetX, this.y, this.width, this.height);
    }
    Game.Sky = Sky;
})(Game);
