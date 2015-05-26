$(function() {
  Dropzone.autoDiscover = false;
  var imageUpload;


  // var getPreviewTemplate = function() {
  //   return React.renderToString(<UploadedImage />);
  // }

  // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
  var previewNode = document.querySelector("#previewtemplate");
  // previewNode.id = "";
  var previewTemplate = document.querySelector('.preview-template').innerHTML;
  previewNode.parentNode.removeChild(previewNode);

  Dropzone.options.mediaDropzone = {
    // previewsContainer: '.dz-custom',
    previewTemplate: previewTemplate,
    dictDefaultMessage: 'UPLOAD',
    clickable: false
  };

  imageUpload = new Dropzone("#media-dropzone");

  return imageUpload.on("success", function(file, responseText) {
    var imageUrl;
    imageUrl = responseText.file.url;
    $(file.previewElement).find('.tag-field form').attr('action', '/edit_upload/' + responseText.id)
    $(file.previewElement).find('.tag-field form').attr('data-id', responseText.id)
  });

});
