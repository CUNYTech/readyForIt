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


