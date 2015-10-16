/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/

$(function () {     //this is the same as document.addEventList...
    "use strict";
    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f';


    $('a').attr('target', '_blank');
    $('article').hide().fadeIn();

    $('#toggle-article').on('click', function () {
        $('article').fadeToggle();
    });

    $.getJSON(url)
        .then(function (data) {
            console.log(data);
            var temp = data.main.temp;
            $('#temp').text(Math.round(temp));
        }
    );
})