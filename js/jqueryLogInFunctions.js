$(document).ready(function(){

  // **********************|  JQuery funtions for LogIn modal  |*****************************************************
  $('#ClickedEventModal').on('click', function(e) {
    e.stopPropagation();
  });

  $('.Options').not('#ClickedEventModal').on('click', function() {
    $('.Hide').click();
  });

  $('#LogIn').on('click', function(e) {
    e.stopPropagation();
  });

  $('.bg-modal').not('#LogIn').on('click', function() {
    $('.Close').click();
  });

  $( "#LogInOrReg" ).click(function() {
    if ($( "#LogInOrReg" ).text() == 'Log In') {
      $(".bg-modal").show();
      $("#LogInBtn").css('background-color','white');
      // $("#RegisterBtn").css('background-color','lightGray');
      $("#LogInBtn").css('background-color','white');
      // $("#RegisterBtn").css('background-color','lightGray');
      $("#LogIn").css('height','420px');
      $("#ValidationError").css('margin-top','40px');
      $(".SubmitAndSave").css('top','360px');
      $(".LogInForm").css('visibility','');
      // $(".RegisterForm").css('visibility','hidden');
      $(".site-navigation").removeClass('show');
      $(".hamburger-menu").removeClass('open');
    }
    else if ($( "#LogInOrReg" ).text() == 'Log Out'){
      $.ajax({
        type		:'POST',
        url			:"php/LogOut.php",
        success : function(result){
          alert('Successfully logged out!');
          location.reload();
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
      });

    }

  });

  $( "#LogInBtn" ).click(function() {
    $("#LogInBtn").css('background-color','white');
    $("#RegisterBtn").css('background-color','lightGray');
    $("#LogIn").css('height','420px');
    $("#ValidationError").css('margin-top','40px');
    $(".SubmitAndSave").css('top','360px');
    $(".LogInForm").css('visibility','');
    $(".RegisterForm").css('visibility','hidden');
  });

  $( "#RegisterBtn").click(function() {
    $("#LogInBtn").css('background-color','lightGray');
    $("#RegisterBtn").css('background-color','white');
    $("#LogIn").css('height','470px');
    $("#ValidationError").css('margin-top','5px');
    $(".SubmitAndSave").css('top','310px');
    $(".LogInForm").css('visibility','hidden');
    $(".RegisterForm").css('visibility','');
  });

  $( ".Close" ).click(function() {
    $( ".bg-modal" ).hide();
  });

});
