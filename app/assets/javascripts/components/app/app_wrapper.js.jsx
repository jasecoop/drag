var React        = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header       = require('components/header/_header');


var AppWrapper = React.createClass({
  mixins: [ParseReact.Mixin],
  getInitialState: function () {
    return {
      showTags          : false,
      showCollections   : false,
      activeCollection  : '',
      current_user      : Parse.User.current(),
      image_bg          : '',
      image_size        : '',
      showImageSettings : false,
      selectedImages    : [],
      showBatchEdit     : false,
      showSettings      : false,
      rootCollection    : ''
    };
  },

  observe: function(props, state) {
    if (Parse.User.current()) {
      var currentUser      = Parse.User.current();
      var userId           = currentUser.id
      var imagesQuery      = new Parse.Query('Images');
      var collectionsQuery = new Parse.Query('Collection');
      var activeCollection = new Parse.Object(state.activeCollection);

      if (state.activeCollection) {
        console.log(state.activeCollection.id.objectId)
        imagesQuery.equalTo("imageCollection", {
          __type: "Pointer",
          className: "Collection",
          objectId: state.activeCollection.id.objectId
        });

        return {
          images: imagesQuery.descending('createdAt'),
          collections: (collectionsQuery.equalTo("createdBy", currentUser).ascending('createdAt'))
        }
      } else {
        imagesQuery.equalTo("imageCollection", {
          __type: "Pointer",
          className: "Collection",
          objectId: state.rootCollection
        });
        return {
          images: (imagesQuery.descending('createdAt')),
          collections: (collectionsQuery.equalTo("createdBy", currentUser).ascending('createdAt'))
        }
      }
    }
  },

  _logout: function() {
    Parse.User.logOut();
  },

  _imagesEdited: function() {
    this._toggleBatchEdit();
    this._removeAllSelectedImages();
    this._refresh();
  },

  _handleToggleTags: function() {
    this.setState({
      showTags: !this.state.showTags
    });
  },

  _setActiveCollection: function(collection) {
    this.setState({
      activeCollection : collection
    });
    this._setBackground(collection.setting_bg)
  },

  _fetchImages: function() {
    this.setState({
      images : this.data.images
    });
  },

  _setBackground: function(colour) {
    this.setState({
      appBg : colour
    });
  },

  fetchAndSetAppBg: function(coId) {
    var _this = this;
    var Collection = Parse.Object.extend("Collection");
    var query = new Parse.Query(Collection);
    query.get(coId, {
      success: function(collection) {
        var colour = collection.get("setting_bg");
        var size   = collection.get("setting_size");

        _this.setState({
          appBg: colour,
          size: size
        });
      },
      error: function(object, error) {
        console.log('Couldnt get rootCollectionObject:' + error.message)
      }
    });
  },

  _updateBgColour: function(colour) {
    this.setState({
      appBg: colour
    });
  },

  _findCollection: function() {
    if(this.state.activeCollection) {
      return this.state.activeCollection
    } else {
      return this.data.collections[0]
    }
  },

  render: function () {
    return (
      <div className="app_wrapper">
        <RouteHandler {...this.state}/>
      </div>
    )
  }
});

module.exports = AppWrapper;
