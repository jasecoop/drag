Parse.Cloud.afterSave(Parse.User, function(request) {
  if(request.object.existed() == false) {
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
