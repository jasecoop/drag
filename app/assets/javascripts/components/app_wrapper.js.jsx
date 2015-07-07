window.AppContent = require('components/app/app_content');

var AppWrapper = React.createClass({
  mixins: [ParseReact.Mixin],
  getInitialState: function () {
    return {
      current_user         : Parse.User.current(),
      selectedImages       : [],
      rootCollection       : '',
      activeCollection     : '',

      setting_bg           : '#fff',
      setting_size         : '3',
      activeCollectionName : ''
    };
  },

  observe: function(props, state) {
    if (Parse.User.current()) {
      var currentUser      = state.current_user;
      var userId           = currentUser.id
      var imagesQuery      = new Parse.Query('Images');
      var collectionsQuery = new Parse.Query('Collection');
      var activeCollection = new Parse.Object(state.activeCollection);

      if (state.activeCollection) {
        imagesQuery.equalTo("imageCollection", {
          __type: "Pointer",
          className: "Collection",
          objectId: state.activeCollection
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

  _setActiveCollection: function(collectionId) {

    var _this      = this;
    var Collection = Parse.Object.extend("Collection");
    var query      = new Parse.Query(Collection);
    query.get(collectionId, {
      success: function(collection) {
        _this.setState({
          activeCollection     : collection.id,
          setting_bg           : collection.get("setting_bg"),
          setting_size         : collection.get("setting_size"),
          activeCollectionName : collection.get("name")
        });
      },
      error: function(object, error) {
        console.log('Error: Couldnt Set Collection:' + error.message)
      }
    });
  },

  _setBackground: function(colour) {
    this.setState({
      setting_bg : colour
    });
  },

  _setSize: function(value) {
    this.setState({
      setting_size: value
    })
  },

  componentWillMount: function () {
    var _this = this;

    if(!this.state.activeCollection) {

      this.state.current_user.fetch().then(function(fetchedUser){
        var rc = fetchedUser.get('rootCollection');
        _this.setState({
          rootCollection : rc
        });

        _this._setActiveCollection(rc)

      }, function(error){
        console.log('Couldnt set RC');
      });
    }
  },

  render: function () {

    var pendingQueries = this.pendingQueries();
    var appClasses;
    var appBg = this.state.appBg;

    return (
      <div className="app-content">
        <AppContent
          currentUser          ={this.state.current_user}
          images               ={this.data.images}
          collections          ={this.data.collections}
          activeCollection     ={this.state.activeCollection}
          pendingQueries       ={pendingQueries}
          setting_size         ={this.state.setting_size}
          setting_bg           ={this.state.setting_bg}
          activeCollectionName ={this.state.activeCollectionName}
          rootCollection       ={this.state.rootCollection}

          refresh             ={this._refresh}
          addSelectedImage    ={this._addSelectedImage}
          removeSelectedImage ={this._removeSelectedImage}
          logout              ={this._logout}
          setActiveCollection ={this._setActiveCollection}
          editImage           ={this._editImage}
          setBackground       ={this._setBackground}
          setSize             ={this._setSize}
          createCollection    ={this._createCollection}
        />
      </div>
    )
  }
});

module.exports = AppWrapper;
