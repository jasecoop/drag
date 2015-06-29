var DragApp = React.createClass({
  mixins: [ParseReact.Mixin],
  getInitialState: function () {

    return {
      showTags          : false,
      showCollections   : false,
      activeCollection  : '',
      current_user      : Parse.User.current(),
      images            : '',
      tags              : '',
      collections       : '',
      image_bg          : '',
      image_size        : '',
      showImageSettings : false,
      active_images     : [],
      showBatchEdit     : false
    };
  },

  observe: function(props, state) {
    var currentUser      = Parse.User.current();
    var userId           = currentUser.id
    var imagesQuery      = new Parse.Query('Images');
    var collectionsQuery = new Parse.Query('Collection');
    var activeCollection = new Parse.Object(state.activeCollection);

    if (state.activeCollection) {

      imagesQuery.include('user');
      imagesQuery.equalTo("imageCollection", {
        __type: "Pointer",
        className: "Collection",
        objectId: activeCollection.id
      });

      return {
        images: imagesQuery.descending('createdAt'),
        collections: (collectionsQuery.equalTo("createdBy", currentUser))
      }
    } else {
      return {
        images: (imagesQuery.equalTo("createdBy", currentUser).descending('createdAt')),
        collections: (collectionsQuery.equalTo("createdBy", currentUser))
      }
    }
  },

  _refresh: function(x) {
    this.refreshQueries(x);
  },

  _logout: function() {
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
      activeCollection : collection
    });
    console.log(this.state.activeCollection);
    // this.refreshQueries();
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

    // if(this.state.showImageSettings) {
    //   imageSettings =
    //     <div className="image-settings" style={{background: settingsBgColor}}>
    //       <div className="image-settings__bg">
    //         <span onClick={this._setBackground.bind(this, '#000000')} className="image-settings__b"></span>
    //         <span onClick={this._setBackground.bind(this, '#ffffff')} dataColor={bgColor} className="image-settings__w"></span>
    //         <span onClick={this._setBackground.bind(this, '#F1F1F1')} dataColor={bgColor} className="image-settings__g"></span>

    //       </div>

    //       <div className="image-settings__size">
    //         <input onChange={this._setSize} type="range" min="1" max="8" step="0.2" value={imageSize} />
    //       </div>

    //       <div className="image-settings__close">
    //         <span class="" onClick={this._toggleImageSettings}>✘</span>
    //       </div>
    //     </div>;
    // }

    var y = "";
    if (this.state.current_user) {
      y =
        <div className="DragApp" style={{backgroundColor: bgColor}}>
          <Header
            onToggleCollections={ this._handleToggleCollections }
            onToggleTags={ this._handleToggleTags }
            onToggleSettings={ this._toggleImageSettings }
            user={this.props.current_user}
            activeTag={this.state.active_tag}
            logout={this._logout}
          />

          <CollectionsBox
            collections={this.data.collections}
            activeCollection={this.state.activeCollection}
            showCollections={this.state.showCollections}
            setActiveCollection={this._setActiveCollection}
            onToggleCollections={ this._handleToggleCollections }
          />

          <TagsBox
            tags={this.state.tags}
            showTags={this.state.showTags}
            filterTags={this._setActiveTag}
            onToggleTags={ this._handleToggleTags }
          />

          <div id="images" style={{backgroundColor: bgColor}}>
            <ImageBox
              images={this.data.images}
              image_size={this.state.image_size}
              currentUser={this.state.current_user}
              onImageClick={this._onImageClick}
              toggleBatchEdit={this._toggleBatchEdit}
            />
          </div>
          <BatchEditBox
            showBatchEdit={this.state.showBatchEdit}
            collections={this.data.collections}
          />
          <DropzoneBox
            uploadComplete={this._refreshQueries}
            currentUser={this.state.current_user}
            refresh={this._refresh}
            collections={this.data.collections}
          />
        </div>
    } else {
      y =
        <div className="page registration">
          <SignUp
            setCurrentUser={this._setCurrentUser}
          />
        </div>
    }

    return (
      <div>
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

