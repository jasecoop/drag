// $(function() {
//   Dropzone.autoDiscover = false;
//   var imageUpload;


//   // var getPreviewTemplate = function() {
//   //   return React.renderToString(<UploadedImage />);
//   // }

//   // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
//   var previewNode = document.querySelector("#previewtemplate");
//   // previewNode.id = "";
//   var previewTemplate = document.querySelector('.preview-template').innerHTML;
//   previewNode.parentNode.removeChild(previewNode);

//   Dropzone.options.body = {
//     // previewsContainer: '.dz-custom',
//     previewTemplate: previewTemplate,
//     dictDefaultMessage: 'UPLOAD',
//     clickable: false
//   };

//   imageUpload = new Dropzone(document.body, // Make the whole body a dropzone
//     {
//       url: '/images',
//       previewTemplate: previewTemplate,
//       dictDefaultMessage: 'UPLOAD',
//       headers: {
//         'X-Transaction': 'POST Example',
//         'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
//       },
//       previewsContainer: '.previewsContainer',
//       init: function() {
//         this.on("dragenter", function() {
//           $('body').addClass('dragging');
//         });
//         this.on("dragleave", function() {
//           if( window.event.pageX == 0 || window.event.pageY == 0 ) {
//             $('body').removeClass('dragging');
//           }
//         });
//         this.on("drop", function() {
//           $('.dz-message').addClass('pre-hide');
//           $('.image-box-empty').hide();
//           setTimeout(function(){
//             $('.dz-message').hide();
//           }, 700);
//         });
//       }

//     }
//   );

//   return imageUpload.on("success", function(file, responseText) {

//     setTimeout(function(){
//     $('.previewsContainer').addClass('active');

//     var imageUrl;
//     imageUrl = responseText.file.url;
//     $(file.previewElement).find('.tag-field form').attr('action', '/edit_upload/' + responseText.id)
//     $(file.previewElement).find('.tag-field form').attr('data-id', responseText.id)

//     var name       = $('.dz-filename span').html();
//     var $nameInput = $('.tag-field form .uploadItem-form__name input');
//     console.log(name);
//     $nameInput.attr('value', name);
//     }, 700);

//   });

//   return imageUpload.on("dragenter", function(file) {
//     console.log('start')
//   });

// });
