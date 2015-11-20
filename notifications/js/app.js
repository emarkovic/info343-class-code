/* script for the notifications demo page */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    function askPermission() {
        Notification.requestPermission(function (result) {
            if (result === 'granted') {
                showNotification('Thanks!', 'You will now see my notifications.');
            }
        });
    }

    function showNotification(title, body) {
        var note = new Notification(title, {body : body, icon : 'img/notification.png'});
        window.setTimeout(note.close.bind(note), 3000);
    }

    function dismissAlert() {

    }

    var triggerBtn = document.getElementById('trigger');
    triggerBtn.addEventListener('click', function () {
        switch (Notification.permission) {
            case 'granted' : 
                showNotification('hello', 'triggered at ' + new Date().toLocaleTimeString());
                break;
            
            case 'denied' :
                alert('Please enable notification');
                break;

            default: 
                askPermission();
        }
    });


});
