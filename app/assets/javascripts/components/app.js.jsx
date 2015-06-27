var DragApp = React.createClass({
  mixins: [ParseReact.Mixin],
  getInitialState: function () {

    return {
      showTags          : false,
      showCollections   : false,
      current_user      : Parse.User.current(),
      images            : '',
      tags              : '',
      collections       : '',
      active_tag        : '',
      image_bg          : '',
      image_size        : '',
      showImageSettings : false
    };
  },

  observe: function() {
    var currentUser = this.state.current_user;
    var query = new Parse.Query('Images');
    return {
      images: (query.equalTo("createdBy", currentUser).descending('createdAt'))
    };
  },

  _refresh: function(x) {
    this.refreshQueries(x);
    console.log('refresh')
  },

  _logout: function() {
    console.log('logout')
    Parse.User.logOut();
    this.setState({
      current_user: Parse.User.current()
    });
  },

  _setCurrentUser: function() {
    this.setState({
      current_user: Parse.User.current()
    });
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
      active_tag : tag,
    });
    var url = '/tags/'+ tag
    this._fetchImages(url);
  },

  _fetchImages: function() {
    this.setState({
      images : this.data.images
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
    this._fetchImages();
  },

  render: function () {

    var bgColor   = this.state.image_bg
    var imageSize = this.state.image_size
    var sizeClass = 'col-'+imageSize;

    if (bgColor=="#F1F1F1"){
      var settingsBgColor = "#fff";
    } else {
      var settingsBgColor = "#F1F1F1";
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

    var y = "";
    if (this.state.current_user) {
      y =
        <div className="DragApp" style={{backgroundColor: bgColor}}>
          <Header
            onToggleCollections={ this._handleToggleCollections }
            onToggleTags={ this._handleToggleTags }
            onToggleSettings={ this._toggleImageSettings }
            user='{this.props.current_user}'
            activeTag={this.state.active_tag}
            logout={this._logout}
          />

          <CollectionsBox
            username=''
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
            <ImageBox
              images={this.data.images}
              image_size={this.state.image_size}
              currentUser={this.state.current_user}
            />
          </div>
          <DropzoneBox
            uploadComplete={this._refreshQueries}
            currentUser={this.state.current_user}
            refresh={this._refresh}
          />
        </div>
    } else {
      y =
        <SignUp
          setCurrentUser={this._setCurrentUser}
        />
    }

    return (
      <div className="page registration">
        {y}
      </div>
    )
  }
});

React.render(
  <DragApp />,
  document.getElementById('app')
);

module.exports = DragApp;

