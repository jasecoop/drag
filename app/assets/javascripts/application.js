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
    // previewTemplate: '<div class="dz-details"><div class="dz-filename"><span data-dz-name=""></span></div><div class="dz-size" data-dz-size=""></div><img data-dz-thumbnail=""></div><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress=""></span></div><div class="dz-success-mark"><span>✔</span></div><div class="dz-error-mark"><span>✘</span></div><div class="dz-error-message"><span data-dz-errormessage=""></span></div>'
  };

  imageUpload = new Dropzone("#media-dropzone");

  console.log(imageUpload);

  return imageUpload.on("success", function(file, responseText) {
    var imageUrl;
    imageUrl = responseText.file.url;
  });
});
