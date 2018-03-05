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
    let name = $("input[name='name']").val();
    let email = $("input[name='email']").val();
    let phone = $("input[name='phone']").val();
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
        closeSignUp();
      },
      error: function(error) {
        console.log(error)
      }
    })
    let csrf_token = $('#csrf_token').val();
    $.ajaxSetup({
      beforeSend: function(xhr, settings) {
          if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrf_token);
          }
      }
  });
  });
});
