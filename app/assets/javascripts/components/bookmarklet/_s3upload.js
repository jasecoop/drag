'use strict';
/**
 * Taken, CommonJS-ified, and heavily modified from:
 * https://github.com/flyingsparx/NodeDirectUploader
 */
var mime = require('mime');

function S3Upload(options) {
    if (!options) {
        options = {};
    }
    for (var option in options) {
        if (options.hasOwnProperty(option)) {
            this[option] = options[option];
        }
    }

    this.handleFileSelect(this.fileElement);
    console.log(this.fileElement);
}

S3Upload.prototype.signingUrl = '/signedurl';
S3Upload.prototype.bucket = null;
S3Upload.prototype.fileElement = null;
S3Upload.prototype.token = null;

S3Upload.prototype.createAbort = function(xhr) {
    return function() {
        if(xhr){
            xhr.abort();
        }
    };
};

S3Upload.prototype.onFinishS3Put = function(signResult) {
    return console.log('base.onFinishS3Put()', signResult.publicUrl);
};

S3Upload.prototype.onProgress = function(percent, status) {
    return console.log('base.onProgress()', percent, status);
};

S3Upload.prototype.onError = function(status) {
    return console.log('base.onError()', status);
};

S3Upload.prototype.handleFileSelect = function(fileElement) {
    this.onProgress(0, 'Upload started.');
    // var files = fileElement.files ? fileElement.files : fileElement;
    var result = [];
    result.push(this.uploadFile(fileElement));
};

S3Upload.prototype.createCORSRequest = function(method, url) {
    var xhr = new XMLHttpRequest();

    if (xhr.withCredentials != null) {
        xhr.open(method, url, true);
    }
    else if (typeof XDomainRequest !== "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    }
    else {
        xhr = null;
    }
    return xhr;
};

S3Upload.prototype.executeOnSignedUrl = function(file, callback) {
    console.log('executeOnSignedUrl')
    var fileName = file.name.replace(/[^\w]/g, "_");
    var SIGN_URL = this.signingUrl + '?objectName=' + fileName + '&bucket=' + this.bucket;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', SIGN_URL, true);

    /**
     * TODO: Eventually extend this to have other options on how to send authorization.
     */
    if(this.token) {
        xhr.setRequestHeader('Authorization', 'JWT ' + this.token);
    }

    if(xhr.overrideMimeType != null) {
        xhr.overrideMimeType('text/plain; charset=x-user-defined');
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result;
            try {
                result = xhr.responseText;
            } catch (error) {
                this.onError('Invalid signing server response JSON: ' + xhr.responseText);
                return false;
            }
            return callback(result);
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            return this.onError('Could not contact request signing server. Status = ' + xhr.status);
        }
    }.bind(this);
    return xhr.send();
};

S3Upload.prototype.createProgressHandler = function(signResult, file, xhr) {
    return function(e) {
        var percentLoaded;
        if (e.lengthComputable) {
            percentLoaded = Math.round((e.loaded / e.total) * 100);
            return this.onProgress(percentLoaded, percentLoaded === 100 ? 'Finalizing.' : 'Uploading.', signResult, file, this.createAbort(xhr));
        }
    }.bind(this);
};

S3Upload.prototype.uploadToS3 = function(file, signResult) {
    var xhr = this.createCORSRequest('PUT', signResult.signedUrl);
    var mimeType = this.getMimeType(file.name);
    xhr.setRequestHeader('Content-Type', mimeType);
    xhr.setRequestHeader('x-amz-acl', 'public-read');

    if (!xhr) {
        onError('CORS not supported');
    } else {
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log('xxx')
                console.log(file)
                this.onProgress(100, 'Upload completed.');
                var uri = signResult.signedUrl;
                var filename = file.name.replace(/[^\w]/g, "_");
                var link = uri.split('/');
                var url  = 'https://s3.amazonaws.com/dragggg/images/' + link[5] + '/' + filename
                signResult.publicUrl = url;
                signResult.file = file;
                signResult.name = file.name.replace(/.[^.]+$/,'');;
                signResult.width = file.width;
                signResult.height = file.height;
                signResult.type   = mimeType;
                return this.onFinishS3Put(signResult);
            } else {
                return this.onError('Upload error: ' + xhr.status);
            }
        }.bind(this);

        xhr.onerror = function() {
            return this.onError('XHR error.');
        }.bind(this);

        xhr.upload.onprogress = this.createProgressHandler(signResult, file, xhr);
    }

    return xhr.send(file);
};

S3Upload.prototype.getMimeType = function(filename) {
    var fileExtensionRegEx = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    var extensions = filename.match(fileExtensionRegEx);
    var extension = extensions[1];

    var mimeType = null;

    var moleculeExtensions = ['pdb', 'sdf', 'xyz', 'mol2', 'txt'];
    var isMolecule = moleculeExtensions.indexOf(extension) >= 0;

    if(isMolecule) {
        mimeType = 'text/plain';
    }
    else {
        mimeType = mime.lookup(filename);
    }

    return mimeType;
};


S3Upload.prototype.uploadFile = function(file) {
    return this.executeOnSignedUrl(file, function(signResult) {
        var signedUrl  = signResult;
        var signResult = {}
        signResult.signedUrl = signedUrl
        return this.uploadToS3(file, signResult);
    }.bind(this));
};

module.exports = S3Upload;
