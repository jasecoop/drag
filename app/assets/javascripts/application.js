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
    $('.uploadItem').remove();
    $('.previewsContainer').removeClass('active');
  });


this.body = $('body').get(0)
this.body.addEventListener("dragenter", this.dragenter, true);
this.body.addEventListener("dragleave", this.dragleave, true);
this.dragenter = function() {
    if ($('body').not(this).length != 0) return;
    console.log('sdf')
}

});
