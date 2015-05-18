//= require jquery
//= require dropzone
//= require react
//= require react_ujs
//= require components

$(function() {
  Dropzone.autoDiscover = false;
  var imageUpload;

  Dropzone.options.mediaDropzone = {
    // previewsContainer: '.dz-custom',
    previewTemplate: $('.preview-template').html(),
    dictDefaultMessage: 'UPLOAD',
    clickable: false
    // init: function() {
    //   this.on("success", function(file) {
    //     $('.dz-upload-message').
    //   });
    // }
  };

  imageUpload = new Dropzone("#media-dropzone");

  return imageUpload.on("success", function(file, responseText) {
    var imageUrl;
    imageUrl = responseText.file.url;
  });

});
