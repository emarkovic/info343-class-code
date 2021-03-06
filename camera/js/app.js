
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    navigator.getUserMedia = navigator.getUserMedia
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia
                            || navigator.msGetUserMedia
    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var snapshot = document.querySelector('img');
    var ctx = canvas.getContext('2d');
    var videoStream;
    var mousedown = false;

    navigator.getUserMedia({video: true}, function (stream) {
        videoStream = stream;
        video.src = window.URL.createObjectURL(stream);
    }, function (err) {
        //if user denies webcam
        console.error(err);
    });

    video.addEventListener('click', function () {
        if (videoStream) {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            ctx.drawImage(video, 0, 0);
        }
    });

    canvas.addEventListener('mousedown', function (evt) {
        var x = evt.clientX - canvas.offsetLeft;
        var y = evt.clientY - canvas.offsetTop + window.scrollY;

        ctx.strokeStyle = '#FF0000'; 
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(x, y);
        mousedown = true;
    });

    canvas.addEventListener('mousemove', function (evt) {
        var x = evt.clientX - canvas.offsetLeft;
        var y = evt.clientY - canvas.offsetTop;
        if (mousedown) {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function (evt) {
        mousedown = false;
        
    });

    document.querySelector('#btn-snapshot').addEventListener('click', function () {
        snapshot.src = canvas.toDataURL();

    })
});

