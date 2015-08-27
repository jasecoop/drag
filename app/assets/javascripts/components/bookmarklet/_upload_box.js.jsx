'use strict';
var FileProgress = require('vendor/FileProgress.js')
var S3Upload = require('./_s3upload.js');

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
      uploading     : false,
      activeCollection : '',
      activeCollectionId : ''
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
        collection.id  = this.state.activeCollectionId;

        ParseReact.Mutation.Create('Images', {
          filesource : signResult.publicUrl,
          title      : signResult.name,
          width      : signResult.width,
          height     : signResult.height,
          type       : signResult.type,
          createdBy  : user,
          imageCollection : collection
        }).dispatch()
        .then(function() {
          analytics.track('Uploaded photo with Chrome extension');
        }.bind(this));
    },

    onError: function() {

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

  _setActiveCollection: function(collection) {
    this.setState({
      activeCollection : collection
    })
  },

  _getDataURI: function(url) {
    var image = new Image();
    var canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth; // or 'width' if you want a special/scaled size
    canvas.height = image.naturalHeight; // or 'height' if you want a special/scaled size
    canvas.getContext('2d').drawImage(image, 0, 0);
    image.src = url;
  },

  _dataURItoBlog: function(data) {

    var dataURI = data.base64

    var mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }

    var blob = new Blob([new Uint8Array(array)], {type: mimestring});
    blob.width = data.height;
    blob.height = data.width;
    blob.name = data.name;


    new S3Upload({
      token: this.props.token,
      fileElement: blob,
      signingUrl: this.props.signingUrl,
      onProgress: this.onProgress,
      onFinishS3Put: this.onFinish,
      onError: this.props.onError,
      bucket: this.props.bucket
    });
  },

  _getBase64: function(theevent) {
    var insert_text;
    var location = theevent.target;
    var etext;
    var ehtml;
    var object;
    try {
      etext = theevent.dataTransfer.getData("text/plain");
    } catch (_error) {}
    try {
      ehtml = theevent.dataTransfer.getData("text/html");
    } catch (_error) {}
    if (etext) {
      insert_text = etext;
    } else if (ehtml) {
      object = $('<div/>').html(ehtml).contents();
      if (object) {
              insert_text =  object.closest('img').prop('src');
      }
    }
    if (insert_text) {
      var _this = this;
      Parse.Cloud.run('getBase64', {url: insert_text}, {
         success: function(data) {
          _this._dataURItoBlog(data);
         },
         error: function(error) {
           console.log(error);
         }
      });
    }
  },

  _dropped: function (e) {
    //see if we have anything in the text or img src tag
    this._getBase64(e);

    this.setState({
      activeCollectionId : e.target.dataset.id
    })
  },

  render: function () {
    mixins: [ParseReact.Mixin]

    var componentConfig = {
      allowedFiletypes: ['.jpg', '.png', '.gif',"image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png",
        "image/bmp",
        "image/x-windows-bmp",
        "image/tiff",
        "image/x-tiff",
        "image/webp",
        "jpeg",
        "jpg",
        "gif",
        "png",
        "bmp",
        "tiff",
        "webp"],
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
        drop: this._dropped,
        dragstart: null,
        dragend: null,
        dragenter: null,
        dragover: this._dragOver,
        dragleave: null,
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
        // sendingmultiple: this.uploadFile,
        sendingmultiple: null,
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

        <BookmarkletDropzone
          collections={this.props.collections}
          config={componentConfig}
          eventHandlers={eventHandlers}
          djsConfig={djsConfig}
          collection={this.props.collection}
          id      = {this.props.id}
          setActiveCollection = {this._setActiveCollection}
        />
      </div>
    )
  }
});

module.exports = DropzoneBox;
