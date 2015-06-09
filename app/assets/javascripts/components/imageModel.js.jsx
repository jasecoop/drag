var app = app || {};

(function () {
  'use strict';

  // var Utils = app.Utils;

  // Generic "model" object. You can use whatever
  // framework you want. For this application it
  // may not even be worth separating this logic
  // out, but we do this to demonstrate one way to
  // separate out parts of your application.
  app.ImagesModel = function (key) {
    // this.key = key;
    // this.todos = Utils.store(key);
    // this.onChanges = [];
  };

  app.ImagesModel.fetchData = function (onChange) {
    $.ajax({
        url:       '/images',
        dataType:  'json',
        data:      { format: 'json' },
        success: function (result) {
          this.setState({ images: result });
          console.log(this.state.images)
        }.bind(this),
        error: function () {
            alert('error getting posts. please try again later');
        }
    });
    // this.onChanges.push(onChange);
  };

})();
