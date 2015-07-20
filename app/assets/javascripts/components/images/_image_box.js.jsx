var Router          = require('react-router');
var DefaultRoute    = Router.DefaultRoute;
var Route           = Router.Route;
var SettingsBox     = require('../settings/_settings_box');
var CollectionsBox  = require('../collections/_collections_box');

var ImageBox = React.createClass({
  mixins: [Router.state, ParseReact.Mixin],
  getInitialState: function () {
    return {
      selectedImages: [],
      activeCollectionName: '',
      activeCollectionId: '',
      showSettings: false,
      showCollections : false,
      showBatchEdit   : false,
      username        : '',
      setting_size    : '',
      setting_bg      : ''
    };
  },

  contextTypes: {
      router: React.PropTypes.func
  },

  observe: function(props, state) {
    var imagesQuery = new Parse.Query('Images');
    if (state.activeCollectionId) {
      imagesQuery.equalTo("imageCollection", {
        __type: "Pointer",
        className: "Collection",
        objectId: state.activeCollectionId
      });
      return {
        images: imagesQuery.descending('createdAt')
      }
    } else {
    }
  },

  _toggleSettings: function() {
    this.setState ({
      showSettings: !this.state.showSettings
    });
  },

  _addSelectedImage: function(imageId) {
    var currentSelectedImages = this.state.selectedImages;
    currentSelectedImages.push(imageId)
    this.setState({selectedImages: currentSelectedImages});

    if(this.state.selectedImages.length == 1) {
      this._toggleBatchEdit();
    }
  },

  _removeSelectedImage: function(imageId) {
    var array = this.state.selectedImages;
    var index = array.indexOf(imageId);
    array.splice(index, 1);
    this.setState({selectedImages: array});

    if(this.state.selectedImages.length == 0) {
      this._toggleBatchEdit();
    }
  },

  _toggleBatchEdit: function() {
    this.setState ({showBatchEdit: !this.state.showBatchEdit});
  },

  _removeAllSelectedImages: function() {
    this.setState({selectedImages: []});
  },

  _setBackground: function(bg) {
   this.setState({
    image_bg: bg
    })
  },

  _setSize: function(value) {
    this.setState({
      image_size: value
    })
  },

  _setStates: function() {
    var _this = this;
    var username      = Parse.User.current().getUsername();
    var usernameParam = this.props.params.username;
    var params        = this.props.params;
    var currentPath   = this.context.router.getCurrentPath();

    // Get user
    var userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo("username", usernameParam);
    userQuery.first().then(function(user) {
      return user;
    }).then(function(user) {
      if(currentPath == "/" + username +"/collections") {
        //Collections
        collectionParam = _this.props.params.username;
        _this.setState({
          showCollections : true
        })
      } else if(params.hasOwnProperty('collectionName')) {
        // Collection
        collectionParam = _this.props.params.collectionName;
      } else {
        collectionParam = _this.props.params.username;
      }

      // Get users collection
      var collectionQuery = new Parse.Query("Collection");
      collectionQuery.equalTo("createdBy", user);
      collectionQuery.equalTo("name", collectionParam);
      return collectionQuery.first();

    }).then(function(collection) {
      _this.setState({
        activeCollectionName : collection.get('name'),
        setting_bg           : collection.get('setting_bg'),
        setting_size         : collection.get('setting_size'),
        activeCollectionId   : collection.id
      })
    }, function(error) {
      console.log('Error getting user');
    });
    this.setState({
      username   : Parse.User.current().getUsername(),
      currentPath: this.context.router.getCurrentPath()
    });
  },

  componentWillReceiveProps: function () {
    this._setStates();
  },

  _toggleCollections: function() {
    this.setState({
      showCollections: !this.state.showCollections
    });
    if (this.state.showSettings) {
      this._toggleSettings();
    }
    if (this.state.showBatchEdit) {
      this._toggleBatchEdit();
    }
    this._removeAllSelectedImages();
  },
  _refresh: function() {
    this.refreshQueries();
  },
  _resetRootView: function() {
    this._removeAllSelectedImages();
    this.setState ({
      showBatchEdit: false,
      showCollections: false,
      showSettings: false
    });
  },
  render: function () {

    var il = "";
    var _this = this;
    var activeCollection     = '';
    var sizeVal = this.props.size;

    pendingQueries       = this.pendingQueries();
    imagesPending        = (pendingQueries.indexOf("images") > -1);
    var activeCollectionName = this.state.activeCollectionName;

    var imagelistCx = classNames({
      'image-box-fixed' : this.state.showCollections,
      'image-box' : true,
      'image-box-editing': this.state.showBatchEdit
    })

    var cb = "";

    if (imagesPending || !activeCollectionName) {
      il =
        <div className="loading"><img src="http://i.imgur.com/Drx5dG7.gif" width="200" height="200"></img></div>;
    } else {
      if( this.data.images.length > 0) {
        il =
          <ImageList
            images              = {this.data.images}
            toggleBatchEdit     = {this.toggleBatchEdit}
            setting_size        = {this.state.setting_size}
            addSelectedImage    = {this._addSelectedImage}
            removeSelectedImage = {this._removeSelectedImage}
            selectedImages      = {this.state.selectedImages}
            setting_size        = {this.state.setting_size}
            setting_bg          = {this.state.setting_bg}
          />
      } else {
        il =
          <div className="image-box-empty">
            Drag images here to upload them
          </div>;
      }
    }

    if(this.state.showCollections) {
      cb =
        <CollectionsBox
          toggleCollections={this._toggleCollections}
          refresh={this._refresh}
          setState={this._setState}
        />
    }

    return (
      <div>
        <Header
          params         ={this.props.params}
          toggleSettings ={this._toggleSettings}
          currentPath    ={this.state.currentPath}
          username       ={this.state.username}
          resetRootView  ={this._resetRootView}
        />

        <div>
          {cb}
        </div>

        <SettingsBox
          params             ={this.props.params}
          showSettings       ={this.state.showSettings}
          toggleSettings     ={this._toggleSettings}
          activeCollectionId ={this.state.activeCollectionId}
          setSize            ={this._setSize}
          setBackground      ={this._setBackground}
        />

        <BatchEditBox
          params                  ={this.props.params}
          refresh                 ={this._refresh}
          showBatchEdit           ={this.state.showBatchEdit}
          toggleBatchEdit         ={this._toggleBatchEdit}
          selectedImages          ={this.state.selectedImages}
          removeSelectedImage     ={this._removeSelectedImage}
          removeAllSelectedImages ={this._removeAllSelectedImages}
        />

        <DropzoneBox
          activeCollectionId = {this.state.activeCollectionId}
          refresh            = {this._refresh}
        />

        <div className={imagelistCx} id="grid">
          {il}
        </div>
      </div>
    )
  }
});

module.exports = ImageBox;
