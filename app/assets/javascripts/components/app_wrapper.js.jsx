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
      showSettings      : false,
      rootCollection    : '',
      appBg             : ''
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

    if (this.state.showSettings) {
      this.toggleSettings();
    }
  },

  _handleToggleTags: function() {
    this.setState({
      showTags: !this.state.showTags
    });
  },

  _toggleSettings: function() {
    this.setState ({
      showSettings: !this.state.showSettings
    });
  },

  _setActiveCollection: function(collection) {
    this.setState({
      activeCollection : collection
    });
    this._setBackground(collection.setting_bg)
  },

  _fetchImages: function() {
    this.setState({
      images : this.data.images
    });
  },

  _setBackground: function(colour) {
    this.setState({
      appBg : colour
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

  fetchAndSetAppBg: function(coId) {
    var _this = this;
    var Collection = Parse.Object.extend("Collection");
    var query = new Parse.Query(Collection);
    query.get(coId, {
      success: function(collection) {
        var colour = collection.get("setting_bg");
        _this.setState({
          appBg: colour
        });
      },
      error: function(object, error) {
        console.log('Couldnt get rootCollectionObject:' + error.message)
      }
    });
  },

  _updateBgColour: function(colour) {
    this.setState({
      appBg: colour
    });
    console.log('updated colour')
  },

  componentWillMount: function () {
    var _this = this;

    //Set root collection
    this.state.current_user.fetch().then(function(fetchedUser){
        var rc = fetchedUser.get('rootCollection');
        _this.setState({
          rootCollection: rc
        });

        // setAppBg if no active collection
        if(!_this.state.activeCollection) {
          _this.fetchAndSetAppBg(rc);
        }
    }, function(error){
        //Handle the error
    });
    this._fetchImages();
  },

  render: function () {

    var pendingQueries = this.pendingQueries();
    var activeCollection = this.state.activeCollection;
    var appClasses;
    var appBg = this.state.appBg;

    if (pendingQueries.length == 0) {
      appClasses = classNames({
        'dragapp_app'       : true,
        'dragapp-container' : true,
        'dragapp-light'     : activeCollection.setting_bg=="#ffffff" || activeCollection.setting_bg=="#F1F1F1",
        'dragapp-dark'      : activeCollection.setting_bg=="#000000"
      });
    } else {
      appClasses = classNames({
        'dragapp_app'       : true,
        'dragapp-container' : true
      })
    }



    return (
      <div className={appClasses} style={{background: appBg}}>
        <Header
          onToggleCollections={ this._handleToggleCollections }
          onToggleTags={ this._handleToggleTags }
          onToggleSettings={ this._toggleSettings }
          user={this.props.current_user}
          activeTag={this.state.active_tag}
          logout={this._logout}
          activeCollection={this.state.activeCollection}
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

        <SettingsBox
          activeCollection={activeCollection}
          showSettings={this.state.showSettings}
          collections={this.data.collections}
          toggleSettings={this._toggleSettings}
          refresh={this._refresh}
          setActiveCollection={this._setActiveCollection}
          updateBgColour={this._updateBgColour}
        />

        <div id="images">
          <ImageBox
            images={this.data.images}
            image_size={this.state.image_size}
            currentUser={this.state.current_user}
            onImageClick={this._onImageClick}
            toggleBatchEdit={this._toggleBatchEdit}
            pendingQueries={pendingQueries}
            activeCollection={activeCollection}
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
