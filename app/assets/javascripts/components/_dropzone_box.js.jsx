'use strict';
var DropzoneComponent = require('vendor/dropzone.js');
var FileProgress = require('vendor/FileProgress.js')
var S3Upload = require('vendor/s3upload.js');

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

  propTypes: {
      signingUrl: React.PropTypes.string.isRequired,
      onProgress: React.PropTypes.func,
      onFinish: React.PropTypes.func,
      token: React.PropTypes.string.isRequired,
      bucket: React.PropTypes.string.isRequired,
      onError: React.PropTypes.func
  },

  defaultProps: {
      onProgress: function(percent, message){},
      onFinish: function(signResult){},
      onError: function(message){}
  },

  getInitialState: function () {
    return {
      fileUploaded  : false,
      currentUser   : Parse.User.current(),
      files         : [],
      uploads       : [],
      showZone      : false,
      uploading     : false
    };
  },

    addUpload: function(filename, file)  {
      var uploads = this.state.uploads.concat({filename: filename, file: file});
      this.setState({
          uploads: uploads
      });
    },

    /***
     * Returns the upload in progress with the given filename. Returns null if no such upload exists.
     */
    getUpload: function(filename) {
      var upload = null;
      var uploads = this.state.uploads;
      for(var i = 0, len = uploads.length; i < len; i ++) {
          var currUpload = uploads[i];
          if(currUpload.filename === filename) {
              upload = currUpload;
              break;
          }
      }
      return upload && upload.file || null;
    },

    deleteUpload: function(filename) {
        var uploadIndex = null;
        var uploads = this.state.uploads;
        for(var i = 0, len = uploads.length; i < len; i++) {
            var currUpload = uploads[i];
            if(currUpload.filename === filename) {
                uploadIndex = i;
                break;
            }
        }

        if(uploadIndex >= 0) {
            uploads.splice(uploadIndex, 1);
            this.setState({
                uploads: uploads
            })
        }
    },

    updateUpload: function(filename, file) {
        var upload = null;
        var uploads = this.state.uploads;
        for(var i = 0, len = uploads.length; i < len; i ++) {
            var currUpload = uploads[i];
            if(currUpload.filename === filename) {
                upload = currUpload;
                break;
            }
        }

        if(upload) {
            upload.file = file;
            this.setState({
                uploads: uploads
            });
        }
    },

    onProgress: function(percent, message, signResult, file, abort) {
        if(signResult) {
            var filename =  file.name;
            var currUpload = this.getUpload(filename);
            if(currUpload) {
                currUpload.percent = percent;
                this.updateUpload(filename, currUpload);
            }

            else {
                this.addUpload(filename, {
                    percent: percent,
                    abort: abort
                });
            }
        }

        if(this.props.onProgress) {
            this.props.onProgress(percent, message, signResult);
        }
    },

    abort: function(filename) {
        return function() {
            this.getUpload(filename).abort();
            this.deleteUpload(filename);
        };
    },

    onFinish: function(signResult) {
        console.log(signResult.filename)
        console.log(signResult)

        var user    = Parse.User.current();
        var self    = this;

        var Collection = Parse.Object.extend("Collection");
        var collection = new Collection();
        collection.id  = self.props.activeCollectionId;

        ParseReact.Mutation.Create('Images', {
          filesource   : signResult.publicUrl,
          title      : signResult.name,
          width      : signResult.width,
          height     : signResult.height,
          type       : signResult.type,
          createdBy  : user,
          imageCollection : collection
        }).dispatch()
        .then(function() {
          analytics.track('Uploaded photo');
          self.props.refresh();
        }.bind(this));

        var filename =  signResult.filename;
        this.deleteUpload(filename);
          this.setState ({
            uploading: false
          })
        if(this.props.onFinish) {
          this.props.onFinish(signResult);
        }
    },

    onError: function() {

    },

    uploadFile: function(files) {
      new S3Upload({
          token: this.props.token,
          fileElement: files,
          signingUrl: this.props.signingUrl,
          onProgress: this.onProgress,
          onFinishS3Put: this.onFinish,
          onError: this.props.onError,
          bucket: this.props.bucket
      });
    },

    toggleZoneTrue: function() {
      this.setState ({
        showZone : true
      })
    },

    toggleZoneFalse: function() {
      if( window.event.pageX == 0 || window.event.pageY == 0 ) {
        this.setState ({
          showZone : false
        })
      }
    },

    removeZone: function() {
      this.setState ({
        showZone : false,
        uploading: true
      })
    },

    displayLoaders: function() {
      var loaders = [];
      var uploads = this.state.uploads;
      for(var i = 0, len = uploads.length; i < len; i++) {
          var upload = uploads[i];
          var filename = upload.filename;
          var file = upload.file;
          var percent = file.percent;
          if(percent < 100) {
              loaders.push(
                  React.createElement(FileProgress, {key: filename,
                      onCancel: this.abort(filename).bind(this),
                      percent: percent,
                      filename: filename})
              );
          }

      }
      return loaders;
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
        uploadMultiple: true,
        previewTemplate: React.renderToStaticMarkup(
          <div>
          </div>
        )
    };

    /**
     * Attach event handlers here to be notified
     * for pretty much any event.
     * Arrays are accepted.
     */
    var eventHandlers = {
        // All of these receive the event as first parameter:
        drop: this.removeZone,
        dragstart: null,
        dragend: null,
        dragenter: this.toggleZoneTrue,
        dragover: null,
        dragleave: this.toggleZoneFalse,
        // All of these receive the file as first parameter:
        addedfile: null,
        removedfile: null,
        thumbnail: null,
        error: null,
        processing: null,
        uploadprogress: null,
        sending: null,
        success: null,
        complete: null,
        canceled: null,
        maxfilesreached: null,
        maxfilesexceeded: null,
        // All of these receive a list of files as first parameter
        // and are only called if the uploadMultiple option
        // in djsConfig is true:
        processingmultiple: null,
        sendingmultiple: this.uploadFile,
        successmultiple: null,
        completemultiple: null,
        canceledmultiple: null,
        // Special Events
        totaluploadprogress: null,
        reset: null,
        queuecompleted: null
    }

    var zone;
    var uploading;
    console.log(this.state.uploads);

    if(this.state.uploading) {
      uploading =
        <div className="uploadstatus">
          <div className="uploadstatus__text">
            Uploading to the Internet
          </div>
        </div>
    }

    if(this.state.showZone) {
      zone =
        <div className="dz-message">
          <div className="progress"></div>
        </div>;
    }

    return (
      <div>
        {uploading}
        {zone}
        <DropzoneComponent
          config={componentConfig}
          eventHandlers={eventHandlers}
          djsConfig={djsConfig}
        />
      </div>
    )
  }
});

module.exports = DropzoneBox;
