var Image = require("parse-image");
Parse.Cloud.define("getBase64", function(request, response) {
  var fileext = request.params.url.replace(/^.*?\.([a-zA-Z0-9]+)$/, "$1");
  var url = request.params.url;
  Parse.Cloud.httpRequest({
    url: url,
    success: function(httpResponse) {
      var filename = url.substring(url.lastIndexOf('/')+1);
      // The file contents are in response.buffer.
      var image = new Image();
      var b = httpResponse.buffer.toString('base64');
      var base64 = 'data:image/'+fileext+';base64,'+b
      return image.setData(httpResponse.buffer, {
        success: function() {
          var data = {
            base64 : base64,
            res    : httpResponse,
            width  : image.width(),
            height : image.height(),
            name   : filename
          }
          response.success(data);
        },
        error: function(error) {
          console.log(error)
        }
      })

    }, error: function(httpResponse) {
      response.error('Request failed with response code ' + httpResponse.status);
    }
  });
});


Parse.Cloud.afterSave(Parse.User, function(request) {
  if(request.object.existed() == false) {

    setCollection = function(collection) {
      user.set("rootCollection", collection.id);
      user.save(null, {
        success: function(user) {
        },
        error: function(user, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        }
      });
    };

    var Collection = Parse.Object.extend("Collection");
    var collection = new Collection();

    var user = Parse.User.current()
    collection.set("name", user.getUsername());
    collection.set("createdBy", user);
    collection.set("setting_bg", "#ffffff");
    collection.set("setting_size", 3);
    collection.set("setting_public", true);

    collection.save(null, {
      success: function(collection) {
        setCollection(collection);
      },
      error: function(collection, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  }


  // query = new Parse.Query("Collection");
  // query.get(request.object.get("post").id, {
  //   success: function(post) {
  //     post.increment("comments");
  //     post.save();
  //   },
  //   error: function(error) {
  //     console.error("Got an error " + error.code + " : " + error.message);
  //   }
  // });
});
