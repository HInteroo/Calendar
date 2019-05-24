function ValidationEventForm(){
  var validation = true;
  var timeFormat = new RegExp('/^[1-9]{2}:[0-9]{2}([AaPp][Mm])$/');

  var Form = document.forms["EventForm"];

  for (var i = 0; i < Form.length-1; i++) {
    var id = Form[i].id;
    var stringID = '#' + id;
    var name = $(stringID);
    name.css('border-color','');
    if(name.val() === ''){
      name.css('border-color','#2faf49');
      validation = false;
    }
  }
  return validation;
}
$(document).ready(function(){
  // These vars are used in order to initialize/record them once the user 'selects' a date and when the user clicks on an event 'eventClick'
  var CalendarID;												//unique id for an event
  var Title;														//Title of an event
  var Stime;														//The start time of the event ('12:00pm, 1:00pm, HH:MM etc..')
  var Etime;														//The end time of the event ('12:00pm, 1:00pm, H:MM etc..')
  var Start;														//The start date of the event ('1/10/19, 1/11/19, M/DD/YY, etc..')
  var End;															//The end date of the event ('1/10/19, 1/11/19, M/DD/YY, etc..')
  var LocationName;											//The title of a location (Lehman College, Hunter College, My house, There House, etc..)
  var LocationAddress;									//The address of the specify location. (If you click on an event's Location name, it'll redirect you to google map with the specify address)
  var Color;														//Color display of the event. You can choose multiple colors
  var Description;											//Description of an event. Describing the what, who, where, when and/or why of the event.
  var isEdit = false;										//Whether or not the user is inserting a new event or is editing an event. Used for eventclicke, eventDrop and eventResize
  var clicked = false;
  $(function() {
        var calendar = $('#calendar').fullCalendar({
        editable:true,								//Makes it so you can click & drag
        selectable:true,							//Able to select/click/highlight
        selectHelper:true,						//Displays select helper (the blue highlight)
        header:{
             left:'month,agendaWeek,agendaDay,listYear',
             center:'title',
             right:'prev,next,today'
           },
        events: 'CalendarPHP/Events.php', //loads events
        select: function(start, end, allDay)										//When user selects/highlights a (bunch of) day(s)
           {
             Start = moment(start).format("MM/DD/Y");						//Formating the day to MM-DD-Y or 01-01-2019
             End = moment(end).format("MM/DD/Y");
             Stime =  moment(start).format( 'h:mma');						//'h:mma' = 12:00PM or 12:00AM
             Etime =  moment(end).format( 'h:mma');
             $(".bg-modal").show();
             $('#eventStart').val(Start);
             $('#eventEnd').val(End);
             $('#eventSTime').val(Stime);
             $('#eventETime').val(Etime);
           },																				//after this is done, User either submits or closes the form
          eventDrop:function(event){								//Since editable is set to true, you can pick up the event and drop it on another date. eventDrop updates the new dropped event
            CalendarID = event.id;
            Start = moment(event.start).format("Y-MM-DD HH:mm:ss");
            End = moment(event.end).format("Y-MM-DD HH:mm:ss");
            dataString = 'id1='+CalendarID
                            +'&Start1='+Start
                            +'&End1='+End
                            +'&isEdit1='+isEdit;
            $.ajax({																		//Update new event that was droped to a different date by the user.
              type		:'POST',
              data		: dataString,
              url			:"CalendarPHP/UpdateEvent.php",
              success : function(result){
                alert("Successfully edited event's date");
                $('#CalendarListEvents').fullCalendar('refetchEvents');					//Gets the new event that was just droppedn and fetches it to the calendar's list data on NAV
                $('#calendar').fullCalendar('refetchEvents');										//Gets the new event that was just droppedn and fetches it to the calendar's data
              }
            })
          },
          eventResize:function(event){						//when the view is set to 'week or day', user is allow to resize the event. Updates the new event.
            CalendarID = event.id;
            Title = event.title;
            Start = moment(event.start).format("Y-MM-DD HH:mm:ss");
            End = moment(event.end).format("Y-MM-DD HH:mm:ss");
            Color = event.color;
            Description = event.description;
            var dataString = 'id1='+CalendarID
                            +'&Title1='+Title
                            +'&Start1='+Start
                            +'&End1='+End
                            +'&Color1='+Color
                            +'&Description1='+Description
                            +'&isEdit1='+isEdit;
            $.ajax({
              type		:'POST',
              data		: dataString,
              url			:"CalendarPHP/UpdateEvent.php",
              success : function(result){
                alert('Successfully edited resized event');
                $('#CalendarListEvents').fullCalendar('refetchEvents');
                $('#calendar').fullCalendar('refetchEvents');
              }
            })
          },
          eventClick:function(event){							//When an event is clicked. You have the choice to edit or delete the event. It shows the 'event detail' modal.
            CalendarID = event.id;
            Title = event.title;
            Start = moment(event.start).format("MMMM, DD YYYY HH:mm A");
            End = moment(event.end).format("MMMM, DD YYYY HH:mm A");
            Color = event.color;
            LocationAddress = event.location;
            LocationName = event.locationTitle;
            Description = event.description;
            if (moment(event.start).format("HH:mm") === '00:00'){
              Start = moment(event.start).format("MMMM, DD YYYY");
            }
            if (moment(event.end).format("HH:mm") === '00:00'){
              End = moment(event.end).format("MMMM, DD YYYY");
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
        }); // Ends Var Calendar
    }); // Ends $(function() {

    $(function() {
        $('#SubmitBtn').on('click', function(e) {						//function, once the #submitBtn (The button on the modal-content modal) is clicked.
          e.preventDefault();
          if(ValidationEventForm() === true){								//Checks if the form submited by the user is valid. If it's valid, do this:
            Title = $('#EventTitle').val() ;
            Stime = $('#eventSTime').val();
            Etime = $('#eventETime').val();
            Start = moment($('#eventStart').val()).format("Y-MM-DD") +" "+moment(Stime, ["h:mm A"]).format("HH:mm:ss");
            End = moment($('#eventEnd').val()).format("Y-MM-DD") + " "+moment(Etime, ["h:mm A"]).format("HH:mm:ss");
            LocationName = $('#LocationInput').val();
            LocationAddress = $('#LocationAddressInput').val();
            Color = $('#colorList').val();
            Description = $('#Description').val();
            if ($('#EventTitle').val() ==''){
              Title = 'No Title';
            }
            var dataString = 'Title1='+Title
                            +'&Start1='+Start
                            +'&End1='+End
                            +'&LocationName1='+LocationName
                            +'&LocationAddress1='+LocationAddress
                            +'&Color1='+Color
                            +'&Description1='+Description
                            +'&isEdit1='+isEdit;
            if(isEdit){																									//Checks if the form is the form that edits an event or is creating a new event
                dataString = dataString +'&id1='+CalendarID;						//In this case, it's edit
                $.ajax({
                  type		:'POST',
                  data		: dataString,
                  url			:"CalendarPHP/UpdateEvent.php",
                  success : function(result){
                    alert('Successfully edited event');
                    $('#CalendarListEvents').fullCalendar('refetchEvents');
                    $('#calendar').fullCalendar('refetchEvents');
                  }
                })
                isEdit = false;
            }
            else{																												//if the form is creating a new event, do this
              $.ajax({
                type		:'POST',
                data		: dataString,
                url			:"CalendarPHP/InsertEvent.php",
                success : function(result){
                  alert('Successfully created new event');
                  $('#CalendarListEvents').fullCalendar('refetchEvents');
                  $('#calendar').fullCalendar('refetchEvents');
                }
              })
            }
            $(".bg-modal").hide();
            $('#EventTitle').val('');
            $('#LocationInput').val('');
            $('#LocationAddressInput').val('');
            $('#Description').val('');
            $('#eventSTime').val('');
            $('#eventETime').val('');
            $('#eventStart').val('');
            $('#eventEnd').val('');
          }
          });
      });
      $(function() {
          $('.Trash').on('click', function(e) {														//If the user clicks on an event, if the user clicks on .Trash, delete the event
            e.preventDefault();
            if(confirm('Are you sure you want to delete this event?')){		//Confirms to delete event
              var dataString = 'CalendarID1='+CalendarID;									//Needs id to delete the event, the id is unique
              $.ajax({
                type		:'POST',
                data		: dataString,
                url			:"CalendarPHP/DeleteEvent.php",
                success : function(){
                  alert('Successfully deleted');
                  $('#CalendarListEvents').fullCalendar('refetchEvents');
                  $('#calendar').fullCalendar('refetchEvents');
                }
              })
              $(".Options").hide();
            }
          });
        });
        $(function() {
            $('.Edit').on('click', function(e) {													//when user clicks on edit instead of .Trash or .Hide do this:
              isEdit = true;
              Stime =  moment(Start).format( 'h:mma');
              Etime =  moment(End).format( 'h:mma');
              Start = moment(Start).format("MM-DD-Y");
              End = moment(End).format("MM-DD-Y");
              $('#EventTitle').val(Title);
              $('#LocationInput').val(LocationName);
              $('#LocationAddressInput').val(LocationAddress);

              $('#eventStart').val(Start);
              $('#eventEnd').val(End);
              $('#eventSTime').val(Stime);
              $('#eventETime').val(Etime);
              $('#colorList').val(Color);
              $('#Description').val(Description);
              $(".Options").hide();
              $(".bg-modal").show();
            });
        });
        $( function() {
          $( "#eventStart" ).datepicker({ format: 'mm/dd/yyyy'});					//Creates datepicker for the form modal-content
          $( "#eventEnd" ).datepicker({ format: 'mm/dd/yyyy'});							//Creates datepicker for the form modal-content

          $("#smallcalendar").datepicker({																	//Creates a calendar for side navigation bar
            format: 'yyyy-mm-dd',
            onSelect: function(dateText) {																	//When one clicks on a data on the small calendar, do this:
              $('#calendar').fullCalendar('changeView', 'agendaDay', dateText);			//Changes the view of the 'calendar' to agendaDay of the clicked date.
              $('#calendar .fc-view-container').addClass('viewanimation');									//Creates a small animation
              setTimeout(function () {
                    $('#calendar .fc-view-container').removeClass('viewanimation');
                }, 500);
              }
          });
          $("#smallcalendar").mouseover(function() {
            $(this).removeClass("ui-button-hover");
          });
          $('#SmallCalendar').css('z-index',9999);
          $('#eventSTime').timepicker();								//Creates timepicker for modal-content
          $('#eventETime').timepicker();								//creates timepicker for modal-content
        } );
        $(function() {																	//When the .Hide is clicked on, resets the value of each inputs to '' and hides the modal
          $( ".Hide" ).click(function() {
            $( ".bg-modal" ).hide();
            $( ".Options" ).hide();
            $(".bg-modal").hide();
            $('#EventTitle').val('');
            $('#LocationInput').val('');
            $('#LocationAddressInput').val('');
            $('#Description').val('');
            $('#eventSTime').val('');
            $('#eventETime').val('');
            $('#eventStart').val('');
            $('#eventEnd').val('');
          });
        });
        $(function() {
          $( "#CreateEventButton" ).click(function() {			//WHen the create event button is clicked on side navigation bar, opens a new modal-content
            $( ".bg-modal" ).show();
          });
        });
        $(function() {
              $('#CalendarListEvents').fullCalendar({
                defaultView: 'listMonth',
                events: 'CalendarPHP/Events.php' //loads events
              });
            });
            $( "#LogInOrReg" ).click(function() {
              if ($( "#LogInOrReg" ).text() == 'Log Out'){
                $.ajax({
                  type		:'POST',
                  url			:"php/LogOut.php",
                  success : function(result){
                    alert('Successfully logged out!');
                    window.location.replace("index.php");
                  }
                });
              }
            });
    $('.hamburger-menu').on('click', function(e) {
      e.stopPropagation();
    });
    $('.site-navigation ul').on('click', function(e) {
      e.stopPropagation();
    });
    $('body').click(function() {
      if ($('.site-navigation').hasClass("show")) {
        $(".site-navigation").removeClass('show');
        $(".hamburger-menu").removeClass('open');
      }
    });
});
