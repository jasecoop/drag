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

  Dropzone.options.body = {
    // previewsContainer: '.dz-custom',
    previewTemplate: previewTemplate,
    dictDefaultMessage: 'UPLOAD',
    clickable: false
  };

  imageUpload = new Dropzone(document.body, // Make the whole body a dropzone
    {
        url: '/images',
        previewTemplate: previewTemplate,
        dictDefaultMessage: 'UPLOAD',
        headers: {
          'X-Transaction': 'POST Example',
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        previewsContainer: '.previewsContainer'
        // more options if needed

    }
  );

  return imageUpload.on("success", function(file, responseText) {

    $('.previewsContainer').addClass('active');

    var imageUrl;
    imageUrl = responseText.file.url;
    $(file.previewElement).find('.tag-field form').attr('action', '/edit_upload/' + responseText.id)
    $(file.previewElement).find('.tag-field form').attr('data-id', responseText.id)

    var name       = $('.dz-filename span').html();
    var $nameInput = $('.tag-field form .uploadItem-form__name input');
    console.log(name);
    $nameInput.attr('value', name);

  });

});
