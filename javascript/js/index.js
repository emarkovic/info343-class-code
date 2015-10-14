document.addEventListener('DOMContentLoaded', function () {
    "use strict";

    function forEachElement(collection, fcn) {
        for (var i = 0; i < collection.length; i++) {
            fcn(collection[i]);
        }
    }

    var clickMeButton = document.getElementById("click-me");
    clickMeButton.addEventListener("click", function () {
       var alerts = document.querySelectorAll('.alert');
        forEachElement(alerts, function (alert) {
            alert.style.display = 'block';
        })
    });

    var closeButtons = document.querySelectorAll(".alert .close");


    forEachElement(closeButtons, function (button) {

        button.addEventListener("click", function () {

            button.parentElement.style.display = "none";
        });
    })
});