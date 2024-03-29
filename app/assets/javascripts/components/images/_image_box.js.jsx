var Router          = require('react-router');
var DefaultRoute    = Router.DefaultRoute;
var Route           = Router.Route;
var SettingsBox     = require('../settings/_settings_box');
var CollectionsBox  = require('../collections/_collections_box');

var ImageBox = React.createClass({
  mixins: [Router.state],
  getInitialState: function () {
    return {
      selectedImages: [],
      showBatchEdit : false,
      setting_bg    : '',
      setting_size  : '',
      showTitle     : false,
      showDesc      : false,
      showSource    : false
    };
  },

  contextTypes: {
      router: React.PropTypes.func
  },

  _toggleSettings: function() {
    if (this.state.showSettings == false) {
      analytics.track('Opened Settings');
    }

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

  _resetRootView: function() {
    this._removeAllSelectedImages();
    this.setState ({
      showBatchEdit   : false,
      showCollections : false,
      showSettings    : false
    });
  },

  _setSize: function(size) {
    this.setState ({
      setting_size : size
    })
  },

  _setBg: function(bg) {
    this.setState ({
      setting_bg : bg
    })
  },

  _toggleImageMeta: function(field) {
    if(field == "title") {
      this.setState({
        showTitle: !this.state.showTitle
      })
    }
    if(field == "desc") {
      this.setState({
        showDesc: !this.state.showDesc
      })
    }

    if(field == "source") {
      this.setState({
        showSource: !this.state.showSource
      })
    }
  },

  componentDidMount: function () {
    this.setState({
      setting_bg    : this.props.collection.setting_bg,
      setting_size  : this.props.collection.setting_size,
      showTitle     : this.props.collection.showTitle,
      showDesc      : this.props.collection.showDesc,
      showSource    : this.props.collection.showSource
    })

    analytics.page('Collection');
    analytics.page('Collection - ' + this.props.collection.name);
    analytics.track('Collection viewed');
    if (Parse.User.current()) {
      if(this.props.userOwnsCollection) {
        analytics.track('Owner viewed their Collection');
      } else {
        analytics.track('Stranger viewed Collection');
      }
    } else {
      analytics.track('Stranger viewed Collection');
    }
  },

  render: function () {
    var il = "";
    var _this = this;

    pendingQueries       = this.props.pendingQueries;
    imagesPending        = (pendingQueries > -1);

    var imagelistCx = classNames({
      'image-box-fixed' : this.props.page == 'collections',
      'image-box' : true,
      'image-box-editing': this.state.showBatchEdit
    })

    var cb;
    var settingsBox;

    var collectionName, setting_size, setting_bg;

    if( this.props.images.length > 0 ) {
      il =
        <ImageList
          images              = {this.props.images}
          toggleBatchEdit     = {this.toggleBatchEdit}
          addSelectedImage    = {this._addSelectedImage}
          removeSelectedImage = {this._removeSelectedImage}
          selectedImages      = {this.state.selectedImages}
          setting_size        = {this.state.setting_size}
          setting_bg          = {this.state.setting_bg}
          saveSettings        = {this.props.saveSettings}
          showTitle           = {this.state.showTitle}
          showDesc            = {this.state.showDesc}
          showSource          = {this.state.showSource}
        />
    } else {
      if(Parse.User.current()) {
        il =
          <div className="image-box-empty">
            Drag images here to upload them
          </div>;
      } else {
        il =
            <div className="image-box-empty">
              Nothing to see here, ppl
            </div>;
      }

    }

    if(this.props.userOwnsCollection) {
      if(this.props.showSettings) {
        settingsBox =
          <SettingsBox
            params             = {this.props.params}
            showSettings       = {this.props.showSettings}
            toggleSettings     = {this.props.toggleSettings}
            collection         = {this.props.collection}
            setting_size       = {this.state.setting_size}
            setting_bg         = {this.state.setting_bg}
            setSize            = {this._setSize}
            setBg              = {this._setBg}
            showTitle          = {this.state.showTitle}
            showDesc           = {this.state.showDesc}
            showSource         = {this.state.showSource}
            toggleImageMeta    = {this._toggleImageMeta}
          />
      }
    }

    return (
      <div>

        {settingsBox}

        <BatchEditBox
          params                  ={this.props.params}
          refresh                 ={this.props.refresh}
          showBatchEdit           ={this.state.showBatchEdit}
          toggleBatchEdit         ={this._toggleBatchEdit}
          selectedImages          ={this.state.selectedImages}
          removeSelectedImage     ={this._removeSelectedImage}
          removeAllSelectedImages ={this._removeAllSelectedImages}
        />

        <div className={imagelistCx} id="grid">
          {il}
        </div>
      </div>
    )
  }
});

module.exports = ImageBox;
