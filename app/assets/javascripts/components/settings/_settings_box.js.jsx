ReactSlider = require('react-slider');
var SettingsBox = React.createClass({

  getInitialState: function () {
    return {
      sizeVal : this.props.size
    };
  },

  _saveBackground: function(colour) {
    var collectionId = this.props.activeCollectionId
    ParseReact.Mutation.Set({className: 'Collection', objectId: collectionId}, {
      setting_bg: colour
    }).dispatch();
  },

  _saveSize: function(value) {
    collectionId = this.props.activeCollectionId
    ParseReact.Mutation.Set({className: 'Collection', objectId: collectionId}, {
      setting_size: value
    }).dispatch();
  },

  _onBgChange: function(colour) {
    this.props.setBackground(colour);
    // this._saveBackground(colour);
  },

  _onSizeChange: function(value) {
    var roundedValue = Math.round(value);
    // this._saveSize(roundedValue);
    this.props.setSize(roundedValue);
  },

  _onAfterChange: function(value) {
    var roundedValue = Math.round(value);
    this._saveSize(roundedValue);
  },

  _toggleImageSettings: function() {
    this.props.toggleSettings();
  },

  render: function () {
    var settingsBox  = '';
    var collection   = this.props.activeCollection
    var setting_size = this.props.size;
    var setting_bg   = this.props.bg;
    var settingsBoxBg;

    if (this.props.showSettings) {
      settingsBox =
        <div className="image-settings">
          <div className="image-settings__container">
            <div className="image-settings__item image-settings__bg">
              <div className="image-settings__label">Background</div>
              <span onClick={this._onBgChange.bind(this, '#000000')} className="image-settings__b"><span></span></span>
              <span onClick={this._onBgChange.bind(this, '#ffffff')} className="image-settings__w"><span></span></span>
              <span onClick={this._onBgChange.bind(this, '#F1F1F1')} className="image-settings__g"><span></span></span>
            </div>

            <div className="image-settings__size">
              <div className="image-settings__label">Image size</div>
              <ReactSlider ref="size" className="slider" defaultValue={this.props.size} min={1} max={4} step={1} onChange={this._onSizeChange} onAfterChange={this._onAfterChange}/>
            </div>

            <div className="image-settings__close">
              <span onClick={this._toggleImageSettings}>✘</span>
            </div>
          </div>
        </div>;
    }
    return(
      <div>{settingsBox}</div>
    )
  }
});

module.exports = SettingsBox;
