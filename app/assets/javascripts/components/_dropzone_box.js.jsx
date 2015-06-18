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
      fileUploaded : false,
    };
  },

  renderNewImages: function() {
    this.props.uploadComplete('/images');
    console.log('gofetch')
  },

  render: function () {

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

    /**
     * If you want to attach multiple callbacks, simply
     * create an array filled with all your callbacks.
     * @type {Array}
     */
    var simpleCallBack = function () {
        this.uploadComplete();
    }.bind(this);


    var onDragEnter = function() {
      console.log('onDragEnter')
      addDragFlash();
    };

    var onDragLeave = function() {
      removeDragFlashOnLeave();
    };

    var onDrop = function() {
      // removeDragFlash();
      onDragDrop();
    };

    var onSuccess = function() {
      // setTimeout(hideProgress(), 2000);
      // setTimeout(this.renderNewImages, 2000);
      this.renderNewImages()
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
        addedfile: null,
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
