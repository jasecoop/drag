ReactSlider = require('react-slider');
var SettingsBox = React.createClass({

  getInitialState: function () {
    return {
    };
  },

  _onSaveClick: function() {
    var collectionId = this.props.collection.objectId;

    ParseReact.Mutation.Set(this.props.collection.id, {
      setting_bg  : this.props.setting_bg,
      setting_size: this.props.setting_size,
      showTitle   : this.props.showTitle,
      showDesc    : this.props.showDesc,
      showSource  : this.props.showSource
    }).dispatch()
    .then(function() {
      analytics.track('Saved settings');
      this.props.toggleSettings();
    }.bind(this));

  },

  _onBgChange: function(colour) {
    analytics.track('Changed background');
    this.props.setBg(colour);
  },

  _onSizeChange: function(value) {
    var currentSize = this.props.setting_size;
    var newSize;

    if (value == '+' && currentSize == 7) {return false}
    if (value == '-' && currentSize == 1) {return false}

    if(value == '+') {
      newSize = parseInt(currentSize) + 1;

    } else {

      newSize = parseInt(currentSize) - 1;

    }
    analytics.track('Changed size');
    this.props.setSize(newSize);
  },

  _toggleSettings: function() {
    this.props.toggleSettings();
  },

  _closeClick: function() {
    this.props.toggleSettings();
  },

  _handleShowTitleChange: function() {
    analytics.track('Toggled title');
    this.props.toggleImageMeta('title');
  },

  _handleShowDescChange: function() {
    analytics.track('Toggled description');
    this.props.toggleImageMeta('desc');
  },

  _handleShowSourceChange: function() {
    analytics.track('Toggled source');
    this.props.toggleImageMeta('source');
  },

  render: function () {
    var settingsBox  = '';
    var collection   = this.props.collection;
    var settingsBoxBg;

    var plusSizeClass = classNames({
      'disabled ' : this.props.setting_size == 7
    })

    var minusSizeClass = classNames({
      'disabled ' : this.props.setting_size == 1
    })

    return(
      <div className="image-settings form-fix">

        <div className="form-fix__header">
          <div className="form-fix__title">Settings</div>
          <div className="form-fix__close" onClick={this._closeClick.bind(this,'')}>✘</div>
        </div>

        <div className="form-fix__body">
          <div className="form-fix__field-half mb2">
            <div className="image-settings__item image-settings__bg">
              <div className="image-settings__label">Background</div>
              <span onClick={this._onBgChange.bind(this, '#000000')} className="image-settings__b"><span></span></span>
              <span onClick={this._onBgChange.bind(this, '#ffffff')} className="image-settings__w"><span></span></span>
              <span onClick={this._onBgChange.bind(this, '#F1F1F1')} className="image-settings__g"><span></span></span>
            </div>
          </div>

          <div className="form-fix__field-half mb2">
            <div className="image-settings__item image-settings__size">
              <div className="image-settings__label">Image size</div>
              <span className={minusSizeClass} onClick={this._onSizeChange.bind(this, '-')} >-</span>
              <span className={plusSizeClass} onClick={this._onSizeChange.bind(this, '+')} >+</span>
            </div>
          </div>

          <div className="form-fix__field mb1">
            <div className="image-settings__item">
              <input type="checkbox" name="title" value={!this.props.showTitle} onChange={this._handleShowTitleChange} ></input>
              <div className="image-settings__label image-settings__label-checkbox">Title</div>
            </div>
          </div>

          <div className="form-fix__field mb1">
            <div className="image-settings__item">
              <input type="checkbox" name="title" value={!this.props.showDesc} onChange={this._handleShowDescChange} ></input>
              <div className="image-settings__label image-settings__label-checkbox">Description</div>
            </div>
          </div>

          <div className="form-fix__field mb1">
            <div className="image-settings__item">
              <input type="checkbox" name="title" value={!this.props.showSource} onChange={this._handleShowSourceChange} ></input>
              <div className="image-settings__label image-settings__label-checkbox">Source</div>
            </div>
          </div>

          <div className="image-settings__item image-settings__privacy">
            <div className="image-settings__label">Privacy</div>
            <span>Coming soon — right now all Collections are public. We'll be launching with private collections and accounts. Hold tight.</span>
          </div>
        </div>
        <div className="form-fix__footer">
          <span className="btn btn-black" onClick={this._onSaveClick.bind(this, '')}>Save</span>
        </div>
      </div>
    )
  }
});

module.exports = SettingsBox;
