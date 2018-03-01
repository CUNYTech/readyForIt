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

$(function(){
  $('#form-sign').submit(function(e){
    e.preventDefault();
    var name = $("input[name='name']").val();
    var email = $("input[name='email']").val();
    var phone = $("input[name='phone']").val();
    if (email.indexOf("@", 0) < 0 || email.indexOf(".", 0) < 0)
    {
        window.alert("Please enter a valid e-mail address.");
        $("input[name='email']").focus();
        return false;
    }

    $.ajax({
      url: 'api/register',
      data: $('#form-sign').serialize(),
      type: 'POST',
      success: function(response) {
        console.log(response)
        alert('Now You shall also be READYFORIT!')
        closeSignUp();
      },
      error: function(error) {
        alert('Email already in use')
      }
    })
  });
});
