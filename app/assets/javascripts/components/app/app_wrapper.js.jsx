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
      selectedImages    : [],
      showBatchEdit     : false,
      showSettings      : false,
      rootCollection    : '',
      appBg             : '',
      size              : ''
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
        console.log(state.activeCollection.id.objectId)
        imagesQuery.equalTo("imageCollection", {
          __type: "Pointer",
          className: "Collection",
          objectId: state.activeCollection.id.objectId
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

  _removeAllSelectedImages: function() {
    this.setState({selectedImages: []});
  },

  _handleToggleCollections: function() {
    this.setState({
      showCollections: !this.state.showCollections
    });
    if (this.state.showSettings) {
      this._toggleSettings();
    }
    if (this.state.showBatchEdit) {
      this._toggleBatchEdit();
    }
    this._removeAllSelectedImages();
  },

  _editImage: function(image, title, source, desc, collection) {
    ParseReact.Mutation.Set(image.id, {
      title           : title,
      source          : source,
      description     : desc,
      imageCollection : collection
    }).dispatch()
    .then(function(collection) {
      this._toggleBatchEdit();
      this._removeAllSelectedImages();
      this._refresh();
    }.bind(this));
  },

  _imagesEdited: function() {
    this._toggleBatchEdit();
    this._removeAllSelectedImages();
    this._refresh();
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

  fetchAndSetAppBg: function(coId) {
    var _this = this;
    var Collection = Parse.Object.extend("Collection");
    var query = new Parse.Query(Collection);
    query.get(coId, {
      success: function(collection) {
        var colour = collection.get("setting_bg");
        var size   = collection.get("setting_size");

        _this.setState({
          appBg: colour,
          size: size
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
  },

 _setBackground: function(colour) {
    var collection = this._findCollection();
    ParseReact.Mutation.Set(collection.id, {
      setting_bg: colour
    }).dispatch();
    this._updateBgColour(colour);
    // this._refresh();
  },

  _setSize: function(value) {
    this.setState({
      size: value
    })
    // this._refresh();
  },

  _saveSize: function(value) {
    var collection = this._findCollection();
    ParseReact.Mutation.Set(collection.id, {
      setting_size: value
    }).dispatch();
  },

  _findCollection: function() {
    if(this.state.activeCollection) {
      return this.state.activeCollection
    } else {
      return this.data.collections[0]
    }
  },

  componentWillMount: function () {
    var _this = this;

    //Set root collection
    this.state.current_user.fetch().then(function(fetchedUser){
        var rc   = fetchedUser.get('rootCollection');
        _this.setState({
          rootCollection    : rc
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

    var activeCollection;
    if(this.state.activeCollection) {
      activeCollection = this.state.activeCollection;
    } else {
      activeCollection = this.data.collections[0];
    }
    // console.log(activeCollection.setting_bg);

    var appClasses;
    var appBg = this.state.appBg;

    if (pendingQueries.length == 0) {
      appClasses = classNames({
        'dragapp_app'       : true,
        'dragapp-container' : true,
        'dragapp-light'     : activeCollection.setting_bg=="#ffffff" || activeCollection.setting_bg=="#F1F1F1",
        'dragapp-dark'      : activeCollection.setting_bg=="#000000",
        'collapsed'         : this.state.showBatchEdit
      });
    } else {
      appClasses = classNames({
        'dragapp_app'       : true,
        'dragapp-container' : true,
        'collapsed'         : this.state.showBatchEdit
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
          showBatchEdit={this.state.showBatchEdit}
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
          size={this.state.size}
          setSize={this._setSize}
          saveSize={this._saveSize}
          setBg={this._setBackground}
        />

        <div id="images">
          <ImageBox
            images={this.data.images}
            currentUser={this.state.current_user}
            onImageClick={this._onImageClick}
            toggleBatchEdit={this._toggleBatchEdit}
            pendingQueries={pendingQueries}
            activeCollection={activeCollection}
            size={this.state.size}
            addSelectedImage={this._addSelectedImage}
            removeSelectedImage={this._removeSelectedImage}
            selectedImages={this.state.selectedImages}
          />
        </div>
        <BatchEditBox
          showBatchEdit={this.state.showBatchEdit}
          collections={this.data.collections}
          activeCollection={activeCollection}
          selectedImages={this.state.selectedImages}
          toggleBatchEdit={this._toggleBatchEdit}
          refresh={this._refresh}
          removeAllSelectedImages={this._removeAllSelectedImages}
          editImage={this._editImage}
          imagesEdited={this._imagesEdited}
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
