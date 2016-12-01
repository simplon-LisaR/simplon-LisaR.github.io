$(document).ready(function() {

	var color = "#000";
	var painting = false;
	var started = false;
	var width_brush = 5;
	var canvas = $("#canvas");
	var cursorX, cursorY;
	var restoreCanvasArray = [];
	var restoreCanvasIndex = 0;

	var context = canvas[0].getContext('2d');

	context.lineJoin = 'round';
	context.lineCap = 'round';

	canvas.mousedown(function(e) {
		painting = true;

		cursorX = (e.pageX - this.offsetLeft);
		cursorY = (e.pageY - this.offsetTop);
	});


	$(this).mouseup(function() {
		painting = false;
		started = false;
	});


	canvas.mousemove(function(e) {
		if (painting) {
			cursorX = (e.pageX - this.offsetLeft) - 10;
			cursorY = (e.pageY - this.offsetTop) - 10;

			drawLine();
		}
	});

	function drawLine() {
		if (!started) {

			context.beginPath();
			context.moveTo(cursorX, cursorY);
			started = true;
		}
		else {
			context.lineTo(cursorX, cursorY);
			context.strokeStyle = color;
			context.lineWidth = width_brush;
			context.stroke();
		}
	}


	function clear_canvas() {
		context.clearRect(0,0, canvas.width(), canvas.height());
	}


	$("#couleurs a").each(function() {

		$(this).css("background", $(this).attr("data-couleur"));


		$(this).click(function() {

			color = $(this).attr("data-couleur");


			$("#couleurs a").removeAttr("class", "");
			$(this).attr("class", "actif");

			return false;
		});
	});


	$(".crayon input").change(function() {
		if (!isNaN($(this).val())) {
			width_brush = $(this).val();
			$("#output").html($(this).val() + " ");
		}
	});


	$("#reset").click(function() {

		clear_canvas();


	$(".crayon").attr("value", 5);
		width_brush = 5;
		$("#output").html("5 ");

	});


	$("#save").click(function() {
		var canvas_tmp = document.getElementById("canvas");	//
		window.location = canvas_tmp.toDataURL("image/png");
	});

});
