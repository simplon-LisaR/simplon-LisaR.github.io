// Oil Painting


// Constructeur OilPainting
function OilPainting(){
// Création des variables utilisées
  var canvas;
	var context;

	var width;
	var height;

	var startPos = {x: window.innerWidth/2, y: window.innerHeight/2};
	var prevPos = {x: window.innerWidth/2, y: 0};
	var dist = {x: 0, y: 0};
	var colour = '#'+Math.floor(Math.random()*16777215).toString(16);

  // Fonction d'initialisation qui sera appelé pour le constructeur OilPainting
	this.initialize = function(){
		canvas  = document.getElementById("monCanvas-romain");
		context = canvas.getContext('2d');
    // Taille de la zone de dessin
		width = 800;
		height = 400;

		canvas.width = width;
		canvas.height = height;

    // Gestion des évènements lors du click souris
		canvas.addEventListener('mousemove', MouseMove, false);
		canvas.addEventListener('click', MouseDown, false);
		canvas.addEventListener('dblclick', MouseDbl, false);
	};

  // Mouvement souris
	var MouseMove = function(e) {
		var distance = Math.sqrt(Math.pow(prevPos.x - startPos.x, 2) +
								 Math.pow(prevPos.y - startPos.y, 2));

		var a = distance * 10 * (Math.pow(Math.random(), 2) - 0.5);

		var r = Math.random() - 0.5;

		var size = (Math.random() * 5) / distance;

		dist.x = (prevPos.x - startPos.x) * Math.sin(0.5) + startPos.x;
		dist.y = (prevPos.y - startPos.y) * Math.cos(0.5) + startPos.y;

		startPos.x = prevPos.x;
		startPos.y = prevPos.y;

		prevPos.x = (e.layerX);
		prevPos.y = (e.layerY);

	   // Détermination de la taille des traits et du contexte lors du mouvement
	   var lWidth = (Math.random()+35/10-0.5)*size+(1-Math.random()+35/20-0.5)*size;
	   context.lineWidth = lWidth;
	   context.strokeWidth = lWidth;

	   context.lineCap = 'round';
	    context.lineJoin = 'round';

	   context.beginPath();
	   context.moveTo(startPos.x, startPos.y);
	   context.quadraticCurveTo(dist.x, dist.y, prevPos.x, prevPos.y);

	   context.fillStyle = colour;
	   context.strokeStyle = colour;

	   context.moveTo(startPos.x + a, startPos.y + a);
	   context.lineTo(startPos.x + r + a, startPos.y + r + a);

	   context.stroke();
	   context.fill();

	   context.closePath();
	};
  // Au clique gestion du changement de couleur
	var MouseDown = function(e) {
		e.preventDefault();
		colour = '#'+Math.floor(Math.random()*16777215).toString(16);
		context.fillStyle = colour;
	    context.strokeStyle = colour;
	};
  // Remise à zéro de la zone de dessin au double clique
	var MouseDbl = function(e) {
		e.preventDefault();
		context.clearRect(0, 0, width, height);
	};

}


// création variable à l'aide du constructeur OilPainting et appel de la fonction d'initialisation
var app = new OilPainting();
app.initialize();
