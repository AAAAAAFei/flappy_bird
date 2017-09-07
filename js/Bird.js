(function (Game) {
    function Bird(option) {
        this.ctx = option.ctx;//画布
        this.img = option.img;//图片
        this.width = this.img.width / 3;
        this.height = this.img.height;
        this.x = option.x || 50;
        this.y = option.y || 150;
        this.index = 0;//帧数
        //运动参数
        this.a = 0.0005;//加速度
        this.speed = 0;//速度
        this.maxSpeed = 0.5;
        this.maxAngle = 45;
        this.angle = 0;
    }
    Bird.prototype.render = function (dValue) {
        this.speed = this.speed + this.a * dValue;
        this.y = this.y + this.speed * dValue + 1 / 2 * this.a * dValue * dValue;
        this.angle = this.speed / this.maxSpeed * this.maxAngle;
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle * Math.PI / 180);
        this.ctx.drawImage(this.img, this.index * this.width, 0, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
        this.ctx.restore();
        this.index ++;
        this.index %= 3;
    }
    Game.Bird = Bird;
})(Game);
