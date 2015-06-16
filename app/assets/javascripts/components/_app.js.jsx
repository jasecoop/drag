var app = app || {};

var DragApp = React.createClass({

  getInitialState: function () {
    return {
      showTags          : false,
      showCollections   : false,
      current_user      : this.props.current_user,
      images            : this.props.images,
      tags              : this.props.tags,
      collections       : this.props.collections,
      active_tag        : '',
      image_bg          : this.props.current_user.setting_bg,
      image_size        : this.props.current_user.setting_size,
      showImageSettings : false
    };
  },

  _handleToggleCollections: function() {
    this.setState({
      showCollections: !this.state.showCollections
    });
  },

  _handleToggleTags: function() {
    this.setState({
      showTags: !this.state.showTags
    });
  },

  _toggleImageSettings: function() {
    this.setState ({
      showImageSettings: !this.state.showImageSettings
    });
  },

  _setActiveCollection: function(collection) {
    this.setState({
      active_tag : collection
    });
    var username = this.state.current_user.username
    var url = username +'/'+collection
    this._fetchImages(url);
  },

  _setActiveTag: function(tag) {
    this.setState({
      active_tag : tag
    });
    var url = '/tags/'+ tag
    this._fetchImages(url);
  },

  _fetchImages: function(url) {
    $.ajax({
      url:       url,
      dataType:  'json',
      data:      { format: 'json' },
      success: function (result) {
        this.setState({ images: result });
      }.bind(this),

      error: function () {
          alert('error getting posts. please try again later');
      }
    });
  },

  _setBackground: function(colour, item) {
    this.setState({
      image_bg : colour
    });
    this._postSettings(colour)
  },

  _postSettings: function(colour) {
    $.ajax({
      type: "PUT",
      url: 'update_user',
      dataType:  'json',
      data: {setting_bg : colour},
      success: function (result) {
        console.log('success')
      }.bind(this),
      error: function () {
        console.log("error");
      }
    });
  },

  _setSize: function(e) {
    var newSize = e.target.value;
    newSize     = Math.round(newSize);
    newSize     = parseInt(newSize);
    var sizeClass = 'col-' + newSize;
    this.setState({
      image_size : newSize
    });
    this._postSize(newSize)
  },

  _postSize: function(size) {
    $.ajax({
      type: "PUT",
      url: 'update_user_size',
      dataType:  'json',
      data: {setting_size : size},
      success: function (result) {
        console.log('success')
      }.bind(this),
      error: function () {
        console.log("error");
      }
    });
  },

  componentWillMount: function () {
    this._fetchImages('/images');
  },

  render: function () {

    var bgColor   = this.state.image_bg
    var imageSize = this.state.image_size
    var sizeClass = 'col-'+imageSize;
    if (bgColor=="#ffffff"){
      var settingsBgColor = "#000000";
    } else {
      var settingsBgColor = "#ffffff";
    }

    var imageSettings = "";
    if(this.state.showImageSettings) {
      imageSettings =
        <div className="image-settings" style={{background: settingsBgColor}}>
          <div className="image-settings__bg">
            <span onClick={this._setBackground.bind(this, '#000000')} className="image-settings__b"></span>
            <span onClick={this._setBackground.bind(this, '#ffffff')} dataColor={bgColor} className="image-settings__w"></span>
            <span onClick={this._setBackground.bind(this, '#F1F1F1')} dataColor={bgColor} className="image-settings__g"></span>

          </div>

          <div className="image-settings__size">
            <input onChange={this._setSize} type="range" min="1" max="8" step="0.2" value={imageSize} />
          </div>

          <div className="image-settings__close">
            <span class="" onClick={this._toggleImageSettings}>✘</span>
          </div>
        </div>;
    }

    console.log(this.state.active_tag)

    return <div className="DragApp" style={{backgroundColor: bgColor}}>
      <Header
        onToggleCollections={ this._handleToggleCollections }
        onToggleTags={ this._handleToggleTags }
        onToggleSettings={ this._toggleImageSettings }
        user={this.props.current_user}
        activeTag={this.state.active_tag}
      />

      <CollectionsBox
        username={this.state.current_user.username}
        collections={this.state.collections}
        showCollections={this.state.showCollections}
        filterCollections={this._setActiveCollection}
        onToggleCollections={ this._handleToggleCollections }
      />

      <TagsBox
        tags={this.state.tags}
        showTags={this.state.showTags}
        filterTags={this._setActiveTag}
        onToggleTags={ this._handleToggleTags }
      />

      <div id="images" style={{backgroundColor: bgColor}}>
        {imageSettings}
        <div className="image-box" id="grid">
          <ul className={"image-list col-" + this.state.image_size} id="grid" data-columns="">
            {this.state.images.map(function (image) {
              return <div className="image-list__item">
                <img src= { image.url } />
              </div>
            })}
          </ul>

        </div>
      </div>
    </div>
  }
});

