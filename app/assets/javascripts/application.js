//= require jquery
//= require jquery_ujs
//= require vendor/salvatorre
//= require dropzone
//= require react
//= require react_ujs
//= require components
//= require upload
//= require save_tags



$(document).ready(function() {

  $( "body" ).on( "click", '#upload-close', function(e) {
    e.preventDefault();
    $('#media-dropzone .uploadItem').remove();
    $('#media-dropzone').removeClass('dz-started');
  });

});
