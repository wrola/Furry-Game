document.addEventListener("DOMContentLoaded", function () {

    var Furry = function () {
        this.x = 0;
        this.y = 0;
        this.direction = 'right';
    };

    var Coin = function () {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    };

    var Game = function () {
        var self = this;
        var endScreen = document.querySelector('#over');
        var titleGameOver = document.querySelector('section#over h1');
        this.board = document.querySelectorAll("#board div");
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;

        this.index = function (x, y) {
            return x + (y * 10);
        };


        this.showFurry = function () {
            self.hideVisibleFurry();
            console.log(this.furry.x, this.furry.y)
            if (this.furry.y >= 0 && this.furry.y <= 9 && this.furry.x >= 0 && this.furry.x <= 9) {
                this.board[ this.index(this.furry.x, this.furry.y) ].classList.add('furry');
            }
        };

        this.showCoin = function () {
            this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
        };

        this.startGame = function () {
            var self = this;
            self.idSetInterval = setInterval(function () {
                self.moveFurry();
                self.gameOver();
                self.showFurry();
                self.checkCoinCollision();
            }, 250)
        };

        this.moveFurry = function () {
            if (this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            }
            if (this.furry.direction === "left") {
                this.furry.x = this.furry.x - 1;
            }
            if (this.furry.direction === "top") {
                this.furry.y = this.furry.y - 1;
            }
            if (this.furry.direction === "bottom") {
                this.furry.y = this.furry.y + 1;
            };

        };

        this.hideVisibleFurry = function () {
            if (document.querySelector('.furry') === null) {
                return false;
            } else {
                document.querySelector('.furry').classList.remove('furry');
            }
        };

        this.turnFurry = function (event) {
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 38:
                    this.furry.direction = 'top';
                    break;
                case 40:
                    this.furry.direction = 'bottom';
                    break;
            }
        };

        this.checkCoinCollision = function () {
            if (this.furry.x === this.coin.x && this.furry.y === this.coin.y){
                document.querySelector('.coin').classList.remove('coin');
                this.score++;
                document.querySelector('#score > div > strong').innerText = this.score;
                this.coin = new Coin();
                game.showCoin();
            };
        };

        this.gameOver = function () {
            if (this.furry.y < 0 || this.furry.y > 9 || this.furry.x < 0 || this.furry.x > 9) {
                clearInterval(this.idSetInterval);
                this.gameState = 0;
                this.hideVisibleFurry();
                endScreen.classList.toggle("invisible");
                titleGameOver.classList.toggle("invisible")
            }

            return this.gameState;
        };

        document.addEventListener('keydown', function (event) {
            self.turnFurry(event);
        });
    }

    var game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();
});