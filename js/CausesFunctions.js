jQuery(function ($) {
  $("#CreateDonate").click(function(e){
    $('.Edit').toggle();
    $('.Trash').toggle();
  });
  $(".Edit").click(function(e){
    $('.EditModal').show();
  });
  $(".Trash").click(function(e){
    $('.TrashModal').show();
  });

  $(".Hide").click(function(e){
    $('.EditModal').hide();
    $('.TrashModal').hide();
  });
  $(".CloseBtn").click(function(e){
    $('.TrashModal').hide();
  });

  $('MoreOptions').click(function(e){
      // e.stopPropagation();
      // var parent = $(this).parent();
      // var uniqueID = $(parent).attr('id'); //Assuming the images are all different.
      // if (uniqueID == null) {
      //   var parent = $(this).parent().parent();
      //   var uniqueID = $(parent).attr('id'); //Assuming the images are all different.
      // }
      // var dataString = 'ID='+uniqueID;
      // window.location.href = "Donate.php?"+dataString;
      // }
  });
  $(".btn").click(function(e){
    if ($(this).text() == 'Read More') {
      e.stopPropagation();
      var parent = $(this).parent().parent().parent().parent();
      var uniqueID = $(parent).attr('id'); //Assuming the images are all different.
      if (uniqueID == null) {
        var parent = $(this).parent().parent();
        var uniqueID = $(parent).attr('id'); //Assuming the images are all different.
      }
      var dataString = 'ID='+uniqueID;
      window.location.href = "Donate.php?"+dataString;
    }
  });
});
