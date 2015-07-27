var Router          = require('react-router');
var DefaultRoute    = Router.DefaultRoute;
var Route           = Router.Route;
var SettingsBox     = require('../settings/_settings_box');
var CollectionsBox  = require('../collections/_collections_box');
var ImageBox        = require('../images/_image_box');

var AppInit = React.createClass({
  mixins: [Router.state, ParseReact.Mixin],
  getInitialState: function () {
    return {
      currentPath     : '',
      page            : '',
      usernameCurrent : '',
      paramUsername   : '',
      params          : '',
      paramCollection : '',
      activeCollectionName : 'newname',
      activeCollectionId : '9niMiSw0rD',
      showSettings : false
    };
  },

  contextTypes: {
      router: React.PropTypes.func
  },

  observe: function(props, state) {
    var _this = this;
    var paramUsername      = state.paramCollection;
    var paramCollection    = state.paramUsername;
    var activeCollectionId = state.activeCollectionId;

    var currentUser      = Parse.User.current();
    var userId           = currentUser.id
    var collectionsQuery = new Parse.Query('Collection');

    var imagesQuery      = new Parse.Query('Images');
    imagesQuery.equalTo("imageCollection", {
      __type: "Pointer",
      className: "Collection",
      objectId: activeCollectionId
    });

    var collectionQuery = new Parse.Query("Collection");

    return {
      images     : (imagesQuery.descending('createdAt')),
      collection : (collectionQuery.equalTo("objectId", activeCollectionId)),
      collections: (collectionsQuery.equalTo("createdBy", currentUser).ascending('createdAt'))
    }

  },

  _setPage: function (username) {
    var currentPath = this.context.router.getCurrentPath();
    var username    = this.props.params.username;
    var params      = this.props.params;

    console.log('setpage');
    console.log(currentPath);

    if(currentPath == "/" + username + "/collections") {
      this.setState({
        page            : 'collections',
        paramCollection : username
      });

    } else if(params.hasOwnProperty('collectionName')) {
      this.setState({
        page : 'collection',
        paramCollection : this.props.params.collectionName
      })

    } else {
      this.setState({
        page : 'root',
        paramCollection : username
      })
    }
  },

  _setActiveCollection: function(username) {
    var _this = this;
    // Get user
    var userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo("username", username);
    userQuery.first().then(function(user) {
      return user;
    }).then(function(user) {
      // Get users collection
      var collectionQuery = new Parse.Query("Collection");
      collectionQuery.equalTo("createdBy", user);

      if(_this.state.page == 'collections') {
        console.log(_this.state.page);
        collectionQuery.equalTo("name", _this.state.paramUsername);
      } else {
        collectionQuery.equalTo("name", _this.state.paramCollection);
      }
      return collectionQuery.first();
    }).then(function(collection) {
      _this.setState({
        activeCollectionId   : collection.id
      })
    }, function(error) {
      console.log('Error getting user');
    });
  },

  _toggleSettings: function() {
    this.setState ({
      showSettings: !this.state.showSettings
    });
  },

  _saveSettings: function (size, bg) {
    ParseReact.Mutation.Set({className: 'Collection', objectId: this.state.activeCollectionId}, {
      setting_size: size,
      setting_bg  : bg
    }).dispatch();
  },

  _setCollectionPath: function() {
    var paramUsername   = this.props.params.username;
    this.setState ({
      currentPath : '/'+paramUsername+'/collections'
    })
  },

  _init: function () {
    var _this = this;
    var usernameCurrent = Parse.User.current().getUsername();
    var paramUsername   = this.props.params.username;
    var params          = this.props.params;
    var currentPath     = this.context.router.getCurrentPath();

    this.setState({
      usernameCurrent : Parse.User.current().getUsername(),
      paramUsername   : paramUsername,
      currentPath     : currentPath,
      params          : this.props.params
    });

    this._setPage(paramUsername);
    this._setActiveCollection(paramUsername)
  },

  componentWillMount: function () {
    this._init();
  },

  render: function () {
    var cb;
    var imagebox;
    var pendingQueries = this.pendingQueries();
    var pending        = (pendingQueries.indexOf("images") > -1);

    if(this.state.page == "collections") {
      cb =
        <CollectionsBox
          collections={this.data.collections}
          refresh={this._refresh}
          setState={this._setState}
        />
    } else {

      if (pendingQueries.length == 0) {
        imagebox =
          <ImageBox
            params         = {this.props.params}
            pendingQueries = {pendingQueries}
            pending        = {pending}
            images         = {this.data.images}
            collection     = {this.data.collection[0]}
            showSettings   = {this.state.showSettings}
            setSize        = {this._setSize}
            setBg          = {this._setBg}
            toggleSettings = {this._toggleSettings}
          />
      } else {
        imagebox =
          <div className="loading"><img src="http://i.imgur.com/Drx5dG7.gif" width="200" height="200"></img></div>;
      }

    }

    return (
      <div>
        <Header
          params         ={this.props.params}
          toggleSettings ={this._toggleSettings}
          currentPath    ={this.state.currentPath}
          username       ={this.state.paramUsername}
          resetRootView  ={this._resetRootView}
          setCurrentPath ={this._setCurrentPath}
        />

        {cb}

        {imagebox}

        <DropzoneBox
          activeCollectionId = {this.state.activeCollectionId}
          refresh            = {this._refresh}
        />
      </div>
    )
  }
});

module.exports = AppInit;
