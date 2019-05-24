$(document).ready(function(){
  var next = 0;
  var previous = 0;
  var CalendarClicked = false;
  var topOffsetOfBtns = $('#MonthBtnsDiv').offset().top;       // get initial position of the element
  var temp = topOffsetOfBtns;
  var lastWidth = $(window).width();

  $(window).resize(function(){  //767-991 the topOffsetOfBtns changes to 871 otherwise 809
     if($(window).width()!=lastWidth && $(window).width()>767 && $(window).width()<992){
       topOffsetOfBtns = 811;
     }
     else{
       topOffsetOfBtns = 749;
     }
  })

  // **********************|  JQuery funtions for LogIn modal  |*****************************************************
  // $('.Options').click(function(){
  //   $('.Hide').click();
  // })
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
    $(".bg-modal").show();
    $("#LogInBtn").css('background-color','white');
    $("#RegisterBtn").css('background-color','lightGray');
    $("#LogInBtn").css('background-color','white');
    $("#RegisterBtn").css('background-color','lightGray');
    $("#LogIn").css('height','420px');
    $("#ValidationError").css('margin-top','40px');
    $(".SubmitAndSave").css('top','360px');
    $(".LogInForm").css('visibility','');
    $(".RegisterForm").css('visibility','hidden');
    $(".site-navigation").removeClass('show');
    $(".hamburger-menu").removeClass('open');
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

  // **********************|  JQuert funtions for Events.html  |*****************************************************
  $(window).scroll(function() {                                   //Small nvaigation with next, previous, today and view calendar buttons |***********
    var topOffsetOfFooter = $('.site-footer').offset().top;
    var currentScroll = $(window).scrollTop();                    // getting current position of the cursor
    if (currentScroll >= topOffsetOfBtns && $('#MonthBtnsDiv').css("visibility") != "hidden") {
        $('#MonthBtnsDiv').css({
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0'
        });
        $('#MonthBtnsDiv').addClass('addShadow');
        if (CalendarClicked == true) {
          $('#SmallCalendar').css(
            'padding-top','70px'
          );
        }else{
            $('#Monthly').css(
              'padding-top','65px'
            );
          }
        if(currentScroll >= topOffsetOfFooter-70){
          $('#MonthBtnsDiv').css({
              position: 'absolute',
              top: topOffsetOfFooter-70,
              left: '0',
              right: '0'
          });
        }
        if(currentScroll >= topOffsetOfFooter){
          $('#MonthBtnsDiv').css({
              position: 'absolute',
              top: topOffsetOfFooter-70,
              left: '0',
              right: '0'
          });
        }
        if(currentScroll == temp){
          $('#MonthBtnsDiv').css({
              position: 'static'
          });
          $('#MonthBtnsDiv').removeClass('addShadow');
          if (CalendarClicked == true) {
            $('#SmallCalendar').css(
              'padding-top','0px'
            );
          }else{
            $('#Monthly').css(
              'padding-top','0px'
            );
          }
        }

    }
    else{
        $('#MonthBtnsDiv').css({
            position: 'static'
        });
        $('#Monthly').css(
          'padding-top','0px'
        );
        $('#SmallCalendar').css(
          'padding-top','0px'
        );
        $('#MonthBtnsDiv').removeClass('addShadow');

    }
  });//*************************| Ends here |**************************************************
  $('#UpcomingEvents').load("php/UpcomingEvents.php"); //Load # of upcoming events

  $( "#Next" ).click(function() {
    if (CalendarClicked == true) {
      $(".fc-next-button").click();
    }else{
      next++;
      $('#CalendarEvents').load("php/LoadEventsToDiv.php", { Next: next, Previous: previous,Clicked: 1});
    }
  });
  $( "#Previous" ).click(function() {
    if (CalendarClicked == true) {
      $(".fc-prev-button").click();
    }else{
      previous++;
      $('#CalendarEvents').load("php/LoadEventsToDiv.php", { Next: next, Previous: previous, Clicked: 1});
    }
  });
  $( "#Today" ).click(function() {
    if (CalendarClicked == true) {
      $(".fc-today-button").click();
    }else{
      previous=0;
      next=0;
      $('#CalendarEvents').load("php/LoadEventsToDiv.php", { Next: next, Previous: previous,Clicked: 0});
    }
  });

  $("#Calendar").click(function() { //Loads Calendar of events
    // var CalendarClicked = false;
    var CalendarID;												//unique id for an event
    var Title;														//Title of an event
    var Stime;														//The start time of the event ('12:00pm, 1:00pm, HH:MM etc..')
    var Etime;														//The end time of the event ('12:00pm, 1:00pm, H:MM etc..')
    var Start;														//The start date of the event ('1/10/19, 1/11/19, M/DD/YY, etc..')
    var end;															//The end date of the event ('1/10/19, 1/11/19, M/DD/YY, etc..')
    var LocationName;											//The title of a location (Lehman College, Hunter College, My house, There House, etc..)
    var LocationAddress;									//The address of the specify location. (If you click on an event's Location name, it'll redirect you to google map with the specify address)
    var Color;														//Color display of the event. You can choose multiple colors
    var Description;											//Description of an event. Describing the what, who, where, when and/or why of the event.

    if($(this).text()== "View Calendar"){
      CalendarClicked = true;
      $(this).text("View Monthly");
      $('#CalendarEvents').remove();
      $('#Events').append('<div id = "SmallCalendar"></div>');
        var calendar = $('#SmallCalendar').fullCalendar({

            header:{
                 left:'prev,next today',
                 center:'title',
                 right:''
               },
            events: 'CalendarPHP/Events.php', //loads events
            eventClick:function(event){							//When an event is clicked. You have the choice to edit or delete the event. It shows the 'event detail' modal.
              CalendarID = event.id;
              Title = event.title;
              Start = moment(event.start).format('MMMM D YYYY, h:mm a');
              End = moment(event.end).format("MMMM, D YYYY h:mm a");
              Color = event.color;
              LocationAddress = event.location;
              LocationName = event.locationTitle;
              Description = event.description;
              if (moment(event.start).format("h:mm") === '00:00'){
                Start = moment(event.start).format("MMMM, D YYYY");
              }
              if (moment(event.end).format("h:mm") === '00:00'){
                End = moment(event.end).format("MMMM, D YYYY");
              }
              if (Description){
                $('.Description').html(Description);
              }

              $('.Square').css('background-color',Color);
              $('.Title').html(Title);
              $('.Date').html(Start +" - "+ End);
              $('.LocationTitle').html(LocationName);
              $(".LocationTitle").attr('href', 'http://maps.google.com/?q=' +LocationAddress);
              $('.Location').html(LocationAddress);
              $('.Description').html(Description);
              $(".Options").show();
            }
            });
      }
      else {
        $(this).text("View Calendar");
        CalendarClicked = false;
        $('#Events').append('<div id = "CalendarEvents"></div>');
        $('#CalendarEvents').hide("fast").load("php/LoadEventsToDiv.php", { Next: next, Previous: previous,Clicked:0 }).slideDown(600);
        $('#SmallCalendar').slideUp(600,function(){
          $('#SmallCalendar').remove();
        });
      }
    });
    $( ".Hide" ).click(function() {
      $( ".bg-modal" ).hide();
      $( ".Options" ).hide();
    });

  $('#EventBtn').on('click', function(e) {
		e.preventDefault();
		if($(this).text()== "See Events!"){
			$(this).text("Hide Events");
      $('#Events').append('<div id = "CalendarEvents"></div>');
      $('#CalendarEvents').hide("fast").load("php/LoadEventsToDiv.php", { Next: next, Previous: previous,Clicked:0 }).slideDown(600);
      $('#MonthBtnsDiv').css('visibility','');
		}
		else {
			$(this).text("See Events!");
      if (CalendarClicked == true) {
        CalendarClicked == false;
        $('#SmallCalendar').slideUp(600,function(){
          $('#Calendar').text("View Calendar");
          $('#SmallCalendar').remove();
        });
      }
      else{
        $('#CalendarEvents').slideUp(600,function(){
          $('#CalendarEvents').remove();
        });

      }
      $('#MonthBtnsDiv').css('visibility','hidden');
		}
		$('.home-page-icon-boxes').slideToggle(600);
  	});
});
