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
      setting_size  : ''
    };
  },

  contextTypes: {
      router: React.PropTypes.func
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

  componentDidMount: function () {
    this.setState({
      setting_bg    : this.props.collection.setting_bg,
      setting_size  : this.props.collection.setting_size
    })
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
        />
    } else {
      il =
        <div className="image-box-empty">
          Drag images here to upload them
        </div>;
    }

    if(this.state.showCollections) {
      cb =
        <CollectionsBox
          refresh={this._refresh}
          setState={this._setState}
        />
    }

    if(this.props.showSettings) {
      settingsBox =
        <SettingsBox
          params             ={this.props.params}
          showSettings       ={this.props.showSettings}
          toggleSettings     ={this.props.toggleSettings}
          collection         ={this.props.collection}
          setting_size       ={this.state.setting_size}
          setting_bg         ={this.state.setting_bg}
          setSize            = {this._setSize}
          setBg              = {this._setBg}
        />
    }

    return (
      <div>

        {settingsBox}

        <BatchEditBox
          params                  ={this.props.params}
          refresh                 ={this._refresh}
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
