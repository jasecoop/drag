ReactSlider = require('react-slider');
var SettingsBox = React.createClass({

  getInitialState: function () {
    return {
      sizeVal : this.props.size
    };
  },

  _saveBackground: function(colour) {
    var collectionId = this.props.activeCollection;
    ParseReact.Mutation.Set({className: 'Collection', objectId: collectionId}, {
      setting_bg: colour
    }).dispatch();
  },

  _saveSize: function(value) {
    var collectionId = this.props.activeCollection;
    ParseReact.Mutation.Set({className: 'Collection', objectId: collectionId}, {
      setting_size: value
    }).dispatch();
  },

  _onBgChange: function(colour) {
    this.props.setBackground(colour);
    this._saveBackground(colour);
  },

  _onSizeChange: function(value) {
    var roundedValue = Math.round(value);
    this._saveSize(roundedValue);
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

    // if(setting_bg=="#000000" || setting_bg=="#F1F1F1") {
    //   settingsBoxBg = "#ffffff"
    // } else if (setting_bg=="#ffffff") {
    //   settingsBoxBg = "#F1F1F1"
    // }

    if (this.props.showSettings) {
      settingsBox =
        <div className="image-settings">
          <div className="image-settings__bg">
            <span onClick={this._onBgChange.bind(this, '#000000')} className="image-settings__b"></span>
            <span onClick={this._onBgChange.bind(this, '#ffffff')} className="image-settings__w"></span>
            <span onClick={this._onBgChange.bind(this, '#F1F1F1')} className="image-settings__g"></span>

          </div>

          <div className="image-settings__size">
            <ReactSlider ref="size" className="slider" defaultValue={this.props.size} min={1} max={8} step={0.25} onChange={this._onSizeChange} onAfterChange={this._onAfterChange}/>
          </div>

          <div className="image-settings__close">
            <span className="" onClick={this._toggleImageSettings}>✘</span>
          </div>
        </div>;
    }
    return(
      <div>{settingsBox}</div>
    )
  }
});

module.exports = SettingsBox;
