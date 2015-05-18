//= require dropzone
//= require react
//= require react_ujs
//= require components
//= require jquery
$(function() {
  var mediaDropzone;
  mediaDropzone = new Dropzone("#media-dropzone");
  return mediaDropzone.on("success", function(file, responseText) {
    var imageUrl;
    imageUrl = responseText.file.url;
  });
});
