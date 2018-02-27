// Navigation
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("topNav").style.visibility = "hidden";
  document.getElementById("mapDark").style.display = "block";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("topNav").style.visibility = "visible";
  document.getElementById("mapDark").style.display = "none";
}

function showSignUp() {
  document.getElementById("sign-up-form").style.display = "block";
  closeNav();
}

function closeSignUp() {
  document.getElementById("sign-up-form").style.display = "none";
}
