//= require jquery
//= require vendor/salvatorre
//= require dropzone
//= require react
//= require react_ujs
//= require components
//= require upload
//= require save_tags



$(document).ready(function() {
  $("body").on('click', '.tag-save-button', function() {

    var form = $(this).parent('form');
    var post_url = $(form).attr('action');
    console.log(post_url)
    var post_data = form.serialize();
    $.ajax({
      type: 'POST',
      url: post_url,
      data: post_data,
      success: function(msg) {
        console.log(post_data);
      }
    });
    return false;
  });
});
