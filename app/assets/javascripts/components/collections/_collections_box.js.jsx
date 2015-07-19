var ReactRouter = require('react-router');
var Router      = ReactRouter.Router;
var Navigation  = require('react-router').Navigation;


var CollectionsBox = React.createClass({
  mixins: [ Navigation, ParseReact.Mixin],
  getInitialState: function () {
    return {
      showAddCollection : false
    };
  },

  observe: function(props, state) {
    var currentUser      = Parse.User.current();
    var userId           = currentUser.id
    var collectionsQuery = new Parse.Query('Collection');
    return {
      collections: (collectionsQuery.equalTo("createdBy", currentUser).ascending('createdAt'))
    }
  },

  _collectionClick: function(collection) {
    this.props.setActiveCollection(collection.objectId);
    this.props.toggleCollections();
    this.props.refresh();
    this.props.setState();
  },

  _addCollectionClick:function() {
    this.setState({
      showAddCollection : !this.state.showAddCollection
    });
  },

  _closeClick: function() {
    this.props.toggleCollections();
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
        setting_title: false,
        setting_source : false,
        setting_description: false,
        createdBy  : Parse.User.current(),
        setting_public : true
      }).dispatch()
      .then(function(collection) {
        var coid = collection.objectId;
        self.props.setActiveCollection(coid);
        self.props.toggleCollections();
        self.props.refresh();
      }.bind(this));
    });
  },

  render: function () {

    var collectionList = "";
    var _this = this;

    var addCollection;

    if(this.state.showAddCollection) {
      addCollection =
        <AddCollection
          refresh={this.props.refresh}
          createCollection={this._createCollection}
          toggleAddCollection={this._addCollectionClick}
        />
    }

    collectionList =
      <div className="collection-list page-fade">
        <div className="page-actions">
          <div className="page-actions__close">✘</div>
          <div className="page-actions__add" onClick={_this._addCollectionClick}>Add Collection</div>
        </div>

        {addCollection}

        <ul>
          {this.data.collections.map(function (collection, index) {
            return <Collection
              collection={collection}
              collectionName={collection.name}
              key={collection.id}
              collectionClick={ _this._collectionClick.bind(null, collection)}
              activeCollection={_this.props.activeCollection}
              index={index}
            />
          })}
        </ul>
      </div>;

    return (
      <div className="collections-box">
        {collectionList}
      </div>
    );
  }
});

module.exports = CollectionsBox;
