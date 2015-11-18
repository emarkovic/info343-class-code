/* script file for the Canvas demo */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var canvas = document.getElementById('game-canvas');
    var ctx = canvas.getContext('2d');

    //current game state
    var gameState;

    //create new gamestate object
    function newGameState() {
        return {
            ball: {
                left: Math.random() * canvas.width,
                top: Math.random() * canvas.height,
                width: 10,
                height: 10,
                vectorX: 5,
                vectorY: 5,
                velocity: 1
            },
            paddle: {
                left: 20,
                top: 0,
                width: 10,
                height: canvas.height / 6                
            },
            lastTimestamp: performance.now()
        };
    } //newGameState();

    //render current game state to canvas elem
    function render() {
        //clears canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var ball = gameState.ball;
        //begins path
        ctx.beginPath();
        //draws arc
        ctx.arc(ball.left + ball.width / 2,
            ball.top + ball.height / 2,
            ball.width, 0, 2 * Math.PI);
        //fill in
        ctx.fill();

        //render paddle
        var paddle = gameState.paddle;
        ctx.fillRect(paddle.left, paddle.top, paddle.width, paddle.height);

    } //render();

    //advance animation by one step
    function step() {
        var ball = gameState.ball;

        //move the ball
        ball.left += ball.vectorX * ball.velocity;
        ball.top += ball.vectorY * ball.velocity;

        if (ball.left + ball.width >= canvas.width) {
            ball.vectorX = -ball.vectorX;
        }

        if (ball.top <= 0 || ball.top + ball.height >= canvas.height) {
            ball.vectorY = -ball.vectorY;
        }

        //bounce if hit paddle
        var paddle = gameState.paddle;
        if (ball.left <= paddle.left + paddle.width) {
            //if bottom of ball is at or below top of paddle 
            if (ball.top + ball.height >= paddle.top && 
                ball.top <= paddle.top + paddle.height) {
                ball.vectorX = -ball.vectorX;
            } else {
                ctx.font = '20px Helvetica';
                var message = 'Game Over';

                var metrics = ctx.measureText(message);

                ctx.fillText(message, (canvas.width - metrics.width) / 2, (canvas.height - 20) / 2);
                return false
            }
        }
        return true


    } //step()

    //advance the animation and redraw
    function animate(timestamp) {
        var keepGoing = true;
        render();
        if (timestamp - gameState.lastTimestamp > 16) {            
            keepGoing = step();
            gameState.lastTimestamp = timestamp;
        }
        if (keepGoing) {
            requestAnimationFrame(animate);
        }        
    } //animate()

    document.addEventListener('mousemove', function (evt) {
        var canvasY = evt.clientY - canvas.offsetTop;
        var paddle = gameState.paddle;
        paddle.top = canvasY - (paddle.height / 2);
    });

    gameState = newGameState();

    //ask browser to animate as quickly as possible
    requestAnimationFrame(animate);
});
