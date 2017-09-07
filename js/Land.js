(function (Game) {
    function Land(option) {
        this.ctx = option.ctx;//画布
        this.img = option.img;//图片
        this.width = this.img.width;
        this.height = this.img.height;
        this.index = option.index || 0;//陆地索引，用于决定绘制图片的位置
        this.x = this.index * this.width;//绘制位置
        this.y = this.ctx.canvas.height - this.height;//绘制位置
        this.offsetX = this.x;//位置偏移
    }
    Land.prototype.render = function () {
        this.offsetX -= 2;
        if (this.offsetX < this.x - this.width) {
            this.offsetX = this.x;
        }
        this.ctx.drawImage(this.img, 0, 0, this.width, this.height, this.offsetX, this.y, this.width, this.height);
    }
    Game.Land = Land;
})(Game);
