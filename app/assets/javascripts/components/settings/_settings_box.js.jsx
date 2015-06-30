var SettingsBox = React.createClass({

  getInitialState: function () {
    return {
    };
  },

  _setBackground: function(colour) {
    var collection = this.props.activeCollection

    ParseReact.Mutation.Set(collection.id, {
      setting_bg: colour
    }).dispatch();
    this.props.updateBgColour(colour);
    this.props.refresh();
  },

  _setSize: function() {

  },

  _toggleImageSettings: function() {
    this.props.toggleSettings();
  },

  render: function () {
    var settingsBox = '';
    var collection = this.props.activeCollection
    var settingsBoxBg;

    if(collection) {
      if(collection.setting_bg=="#000000" || collection.setting_bg=="#F1F1F1") {
        settingsBoxBg = "#ffffff"
      } else if (collection.setting_bg=="#ffffff") {
        settingsBoxBg = "#F1F1F1"
      }
    }

    if (this.props.showSettings) {
      settingsBox =
        <div className="image-settings" style={{background: settingsBoxBg}}>
          <div className="image-settings__bg">
            <span onClick={this._setBackground.bind(this, '#000000')} className="image-settings__b"></span>
            <span onClick={this._setBackground.bind(this, '#ffffff')} className="image-settings__w"></span>
            <span onClick={this._setBackground.bind(this, '#F1F1F1')} className="image-settings__g"></span>

          </div>

          <div className="image-settings__size">
            <input onChange={this._setSize} type="range" min="1" max="8" step="0.2" value={collection.setting_size} />
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
