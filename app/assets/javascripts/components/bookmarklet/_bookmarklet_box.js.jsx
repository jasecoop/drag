'use strict';
var ExtCollection = require('./_extCollection');
var BookmarkletBox = React.createClass({
  mixins: [ParseReact.Mixin],
  getInitialState: function () {
    return {
    };
  },

  observe: function(props, state) {
    var collectionsQuery = new Parse.Query("Collection");
    var currentUser      = Parse.User.current();
    return {
      collections: (collectionsQuery.equalTo("createdBy", currentUser).ascending('createdAt'))
    }
  },

  render: function () {
    if(this.pendingQueries().length == 0) {
      var _this = this;
      var uploadBox =
        this.data.collections.map(function (collection, i ) {
          return(
          <UploadBox
            collections        ={_this.data.collections}
            collection         ={collection}
            signingUrl         ="/signedurl"
            accept             ="image/*"
            bucket             ="dragggg"
            token              =""
            id                 ={"co-i"+i}
            i                  ={i}
          />)
        });
    } else {
      var uploadBox =
        <h3>loading</h3>;
    }

    return(
      <div>
        <h2>Drag an image into a collection</h2>
        <div className="extCollections">
          {this.data.collections.map(function (collection, i ) {
            return(
              <ExtCollection
                id={"co-i"+i}
                collection={collection}
              />
            )
          })}

          {uploadBox}

          <img src="http://40.media.tumblr.com/19a2b6aca5a336d5e3ffc138a57f2e15/tumblr_ntqg36sG821rly3p1o1_1280.jpg" />

        </div>
      </div>
    )
  }
});

module.exports = BookmarkletBox;
