// Navigation
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("topNav").style.visibility = "hidden";
  document.getElementById("mapDark").style.display = "block";
  // document.getElementById("map").className = "opClass";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("topNav").style.visibility = "visible";
  document.getElementById("mapDark").style.display = "none";
  // document.getElementById("map").classList.remove("opClass");
}

//Layers
var layerSelection = document.getElementById("layersNav");
var closeLayers = document.querySelector(".closeLayers");
var openBtn = document.getElementById("openLayers");

function toggleLayers() {	
	layerSelection.classList.toggle("hide");
}

openBtn.addEventListener("click", function(){
	toggleLayers();
});
closeLayers.addEventListener("click", function(){
	toggleLayers();
});

$(document).ready(function() {	
	$( '.layer-btn' ).click(function() {
	  $( this ).toggleClass( 'fa fa-check-square' );      
	});
  $('#radar').click(function(){
    //radar();
  });
});
