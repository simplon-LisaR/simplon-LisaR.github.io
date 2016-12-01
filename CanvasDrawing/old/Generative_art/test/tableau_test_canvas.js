var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

context.beginPath();
context.moveTo(100,50);
context.lineTo(200,100);
context.fill();

<ul id="couleurs">
    <li><a href="#" data-couleur="#000000">Noir</a></li>
    <li><a href="#" data-couleur="#ffffff">Blanc</a></li>
    <li><a href="#" data-couleur="#ff0000">Rouge</a></li>
</ul>

$("#couleurs a").each(function() {
        $(this).css("background", $(this).attr("data-couleur"));

});

<input type="range" min="2" max="50" value="5" id="largeur" />

var canvas = document.getElementById("canvas");
window.location = canvas.toDataURL("image/png");

var canvas = document.getElementById("canvas");
window.location = canvas.toDataURL("image/png");
