var DropzoneComponent = require('vendor/dropzone.js');

var addDragFlash = function() {
  $('body').addClass('dragging');
};

var removeDragFlash = function() {
  $('body').removeClass('dragging');
};

var removeDragFlashOnLeave = function() {
  if( window.event.pageX == 0 || window.event.pageY == 0 ) {
    $('body').removeClass('dragging');
  }
};

var onDragDrop = function() {
  $('.image-box-empty').hide();
  $('.dz-message').fadeOut();
  $('.image-box-empty').hide();
  setTimeout(function(){
    $('body').removeClass('dragging');
  }, 700);
}

var hideProgress = function() {
  $('.uploadstatus').fadeOut();
}

var DropzoneBox = React.createClass({
  getInitialState: function () {
    return {
      fileUploaded  : false,
      currentUser   : Parse.User.current()
    };
  },

  render: function () {
    mixins: [ParseReact.Mixin]

    var componentConfig = {
      allowedFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: '/images'
    };

    var djsConfig = {
        addRemoveLinks: true,
        clickable: false,
        previewTemplate: React.renderToStaticMarkup(
          <div className="uploadstatus">
            <div className="uploadstatus__text">
              Uploading to the Internet
            </div>
          </div>
        )
    };

    var onDragEnter = function() {
      addDragFlash();
    };

    var onDragLeave = function() {
      removeDragFlashOnLeave();
    };

    var onDrop = function(file) {
      // removeDragFlash();
      onDragDrop();

      var Image = Parse.Object.extend("Images");
      var image = new Image();

    };

    var createImage = function(file) {
      var user    = Parse.User.current();
      var self    = this;
      var f       = new Parse.File(file.name, file);

      var Collection = Parse.Object.extend("Collection");
      var collection = new Collection();
      collection.id  = self.props.activeCollection;

      f.save().then(function() {
        ParseReact.Mutation.Create('Images', {
          file       : f,
          title      : file.name,
          width      : file.width,
          height     : file.height,
          type       : file.type,
          createdBy  : user,
          imageCollection : collection
        }).dispatch()
        .then(function() {
          self.props.refresh();
        }.bind(this));
      });

      // self.props.refresh('images');
    }.bind(this);

    // var addedFile = function(file) {


    //   var self    = this;
    //   var Image   = Parse.Object.extend("Images");
    //   var image   = new Image();
    //   var f       = new Parse.File(file.name, file);
    //   image.set("file", f);
    //   image.set("title", file.name);
    //   image.set("width", file.width);
    //   image.set("height", file.height);
    //   image.set("type", file.type);
    //   image.set("createdBy", Parse.User.current());
    //   image.save(null, {
    //     success: function(image) {
    //       // Execute any logic that should take place after the object is saved.
    //       // self.props.uploadComplete()
    //     },
    //     error: function(image, error) {
    //       alert(error.message)
    //     }
    //   });

    // }.bind(this);;

    var onSuccess = function() {
      setTimeout(function() { hideProgress(); },2000);
    }.bind(this);

    /**
     * Attach event handlers here to be notified
     * for pretty much any event.
     * Arrays are accepted.
     */
    var eventHandlers = {
        // All of these receive the event as first parameter:
        drop: onDrop,
        dragstart: null,
        dragend: null,
        dragenter: onDragEnter,
        dragover: null,
        dragleave: onDragLeave,
        // All of these receive the file as first parameter:
        addedfile: createImage,
        removedfile: null,
        thumbnail: null,
        error: null,
        processing: null,
        uploadprogress: null,
        sending: null,
        success: null,
        complete: onSuccess,
        canceled: null,
        maxfilesreached: null,
        maxfilesexceeded: null,
        // All of these receive a list of files as first parameter
        // and are only called if the uploadMultiple option
        // in djsConfig is true:
        processingmultiple: null,
        sendingmultiple: null,
        successmultiple: null,
        completemultiple: null,
        canceledmultiple: null,
        // Special Events
        totaluploadprogress: null,
        reset: null,
        queuecompleted: null
    }

    return(
      <DropzoneComponent config={componentConfig}
        eventHandlers={eventHandlers}
        djsConfig={djsConfig}/>
    )
  }
});

module.exports = DropzoneBox;
