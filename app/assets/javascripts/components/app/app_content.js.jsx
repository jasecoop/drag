var AppContent = React.createClass({
  getInitialState: function () {
    return {
      showTags          : false,
      showCollections   : false,
      showImageSettings : false,
      showBatchEdit     : false,
      showSettings      : false,
      selectedImages    : [],
    };
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

  _imagesEdited: function() {
    this._toggleBatchEdit();
    this._removeAllSelectedImages();
    this.props.refresh();
  },

  _toggleCollections: function() {
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

  _removeAllSelectedImages: function() {
    this.setState({selectedImages: []});
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

  _toggleBatchEdit: function() {
    this.setState({
      showBatchEdit: !this.state.showBatchEdit
    });
  },

  componentWillMount: function () {
    // Getting settings

  },

  render: function () {

    var pendingQueries = this.props.pendingQueries;

    var activeCollection = this.props.activeCollection;

    var appClasses;
    var appBg = this.props.setting_bg;

    if (pendingQueries.length == 0) {
      appClasses = classNames({
        'dragapp_app'       : true,
        'dragapp-container' : true,
        'dragapp-light'     : this.props.setting_bg=="#ffffff" || this.props.setting_bg=="#F1F1F1",
        'dragapp-dark'      : this.props.setting_bg=="#000000",
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
          user                ={this.props.currentUser}
          activeCollection    ={this.props.activeCollection}
          showBatchEdit       ={this.state.showBatchEdit}
          rootCollection      ={this.props.rootCollection}
          activeCollectionName={this.props.activeCollectionName}

          toggleCollections   ={this._toggleCollections }
          onToggleTags        ={this._handleToggleTags }
          onToggleSettings    ={this._toggleSettings }

          logout              ={this.props.logout}
        />

        <SettingsBox
          collections         ={this.props.collections}
          activeCollection    ={this.props.activeCollection}
          size                ={this.props.setting_size}
          bg                  ={this.props.setting_bg}

          showSettings        ={this.state.showSettings}
          toggleSettings      ={this._toggleSettings}

          updateBgColour      ={this._updateBgColour}

          setSize             ={this.props.setSize}
          setBackground       ={this.props.setBackground}

          refresh             ={this.props.refresh}
          setActiveCollection ={this.props.setActiveCollection}
          setSize             ={this.props.setSize}
          setBackground       ={this.props.setBackground}
        />

       <CollectionsBox
          collections         ={this.props.collections}
          activeCollection    ={this.props.activeCollection}

          showCollections     ={this.state.showCollections}

          toggleCollections   ={this._toggleCollections}

          setActiveCollection ={this.props.setActiveCollection}
          refresh             ={this.props.refresh}
          createCollection    ={this.props.createCollection}
        />

        <div id="images">
          <ImageBox
            images               ={this.props.images}
            currentUser          ={this.props.currentUser}
            pendingQueries       ={pendingQueries}
            selectedImages       ={this.state.selectedImages}
            activeCollection     ={activeCollection}
            setting_size         ={this.props.setting_size}

            toggleBatchEdit     ={this._toggleBatchEdit}

            addSelectedImage    ={this._addSelectedImage}
            removeSelectedImage ={this._removeSelectedImage}
          />
        </div>

        <BatchEditBox
          collections             ={this.props.collections}
          activeCollection        ={activeCollection}
          selectedImages          ={this.state.selectedImages}

          showBatchEdit           ={this.state.showBatchEdit}

          toggleBatchEdit         ={this._toggleBatchEdit}
          removeAllSelectedImages ={this._removeAllSelectedImages}
          imagesEdited            ={this._imagesEdited}

          editImage               ={this.props.editImage}
          refresh                 ={this.props.refresh}
        />

        <DropzoneBox
          collections             ={this.props.collections}
          currentUser             ={this.props.currentUser}
          activeCollection        ={this.props.activeCollection}

          refresh                 ={this.props.refresh}
        />
      </div>
    )
  }
});

module.exports = AppContent;
