(function (window) {
    function Game(option) {
        this.ctx = option.ctx;
        this.roles = [];
        this.imgNameList = ['birds', 'land', 'pipe1', 'pipe2', 'sky'];
        this.timer = null;
        this.flappy = null;
        this.startTime = new Date();
        this.endTime = 0;
        this.dValue = 0;
        this.gameStart();
    }
    Game.prototype = {
        constructor: Game,
        //游戏开始
        gameStart: function () {
            var that = this;
            //资源加载
            this.loadImg(function (imgList) {
                //创建对象
                that.gameInit(imgList);
                //定时器
                that.timer = setInterval(function () {
                    that.endTime = new Date();
                    that.dValue = that.endTime - that.startTime;
                    that.startTime = that.endTime;
                    that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
                    that.ctx.beginPath();
                    //对象渲染
                    that.gameRender(that.dValue);
                    //碰撞检测
                    that.impact();
                }, 30);
                //用户控制
                that.userControl();
            });
        },
        //资源加载
        loadImg: function (callback) {
            var imgList = {};
            var count = 0;
            for (var i = 0; i < this.imgNameList.length; i ++) {
                var obj = this.imgNameList[i];
                var img = new Image();
                img.src = 'imgs/' + obj + '.png';
                imgList[obj] = img;
                img.onload = function () {
                    count ++;
                    if (count >= 5) {
                        //加载完成
                        callback && callback(imgList);
                    }
                    // console.log(imgList);
                }
            }
        },
        //创建游戏对象
        gameInit: function (imgList) {
            //sky--3 pipe--5 land--4 bird--1
            // console.log(this);
            // console.log('Sky' in Game);
            // console.log('Sky' in this);
            for (var i = 0; i < 3; i ++) {
                var sky = new Game.Sky({
                    ctx: this.ctx,
                    img: imgList['sky'],
                    index: i
                });
                this.roles.push(sky);
            }
            for (var i = 0; i < 5; i ++) {
                var pipe = new Game.Pipe({
                    ctx: this.ctx,
                    upImg: imgList['pipe2'],
                    downImg: imgList['pipe1'],
                    index: i
                });
                this.roles.push(pipe);
            }
            for (var i = 0; i < 4; i ++) {
                var land = new Game.Land({
                    ctx: this.ctx,
                    img: imgList['land'],
                    index: i
                });
                this.roles.push(land);
            }
            var bird = new Game.Bird({
                ctx: this.ctx,
                img: imgList['birds'],
            })
            this.roles.push(bird);
            this.flappy = bird;
            // console.log(this.roles);
        },
        //游戏对象渲染
        gameRender: function (dValue) {
            for (var i = 0; i < this.roles.length; i ++) {
                var obj = this.roles[i];
                obj.render(dValue);
            }
        },
        //碰撞检测
        impact: function () {
            if (this.ctx.isPointInPath(this.flappy.x, this.flappy.y) || this.flappy.y < 0 || this.flappy.y > this.ctx.canvas.height - this.roles[10].height) {
                clearInterval(this.timer);
            }
        },
        //用户操作
        userControl: function () {
            var that = this;
            window.onclick = function () {
                that.flappy.speed = -0.3;
            }
        },
        //游戏结束
        gameOver: function () {

        }
    }
    window.Game = Game;
})(window);
