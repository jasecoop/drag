var AppWrapper = React.createClass({
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
      showBatchEdit     : false,
      rootCollection    : ''
    };
  },

  observe: function(props, state) {
    if (Parse.User.current()) {
      var currentUser      = Parse.User.current();
      var userId           = currentUser.id
      var imagesQuery      = new Parse.Query('Images');
      var collectionsQuery = new Parse.Query('Collection');
      var activeCollection = new Parse.Object(state.activeCollection);

      if (state.activeCollection) {
        imagesQuery.equalTo("imageCollection", {
          __type: "Pointer",
          className: "Collection",
          objectId: activeCollection.id
        });

        return {
          images: imagesQuery.descending('createdAt'),
          collections: (collectionsQuery.equalTo("createdBy", currentUser).ascending('createdAt'))
        }
      } else {


        imagesQuery.equalTo("imageCollection", {
          __type: "Pointer",
          className: "Collection",
          objectId: state.rootCollection
        });
        return {
          images: (imagesQuery.descending('createdAt')),
          collections: (collectionsQuery.equalTo("createdBy", currentUser).ascending('createdAt'))
        }
      }
    }
  },

  _refresh: function() {
    console.log('refresh')
    this.refreshQueries();
  },

  _logout: function() {
    Parse.User.logOut();
    this.props.setCurrentUser();
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

  _toggleBatchEdit: function() {
    this.setState({
      showBatchEdit: !this.state.showBatchEdit
    });
  },

  _createCollection: function(name) {
    var Co   = Parse.Object.extend("Collection");
    var co   = new Co();
    var self = this;
    co.save().then(function() {
      ParseReact.Mutation.Create('Collection', {
        name       : name,
        setting_bg : '#ffffff',
        setting_size : 3,
        createdBy  : Parse.User.current(),
        setting_public : true
      }).dispatch()
      .then(function(collection) {
        self._setActiveCollection(collection);
        self._handleToggleCollections();
        self._refresh();
      }.bind(this));
    });
  },

  componentWillMount: function () {
    var _this = this;
    this.state.current_user.fetch().then(function(fetchedUser){
        var rc = fetchedUser.get('rootCollection');
        _this.setState({
          rootCollection: rc
        });
    }, function(error){
        //Handle the error
    });
    this._fetchImages();
  },

  render: function () {

    var pendingQueries = this.pendingQueries();
    return (
      <div className="dragapp__app dragapp-container">
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
          refresh={this._refresh}
          createCollection={this._createCollection}
        />

        <TagsBox
          tags={this.state.tags}
          showTags={this.state.showTags}
          filterTags={this._setActiveTag}
          onToggleTags={ this._handleToggleTags }
        />

        <div id="images">
          <ImageBox
            images={this.data.images}
            image_size={this.state.image_size}
            currentUser={this.state.current_user}
            onImageClick={this._onImageClick}
            toggleBatchEdit={this._toggleBatchEdit}
            pendingQueries={pendingQueries}
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
          activeCollection={this.state.activeCollection}
        />
        </div>
    )
  }
});

module.exports = AppWrapper;
