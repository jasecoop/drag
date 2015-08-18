var ReactRouter = require('react-router');
var Router      = ReactRouter.Router;
var Navigation  = require('react-router').Navigation;


var CollectionsBox = React.createClass({
  mixins: [ Navigation],
  getInitialState: function () {
    return {
      showAddCollection : false
    };
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
        analytics.track('Created Collection');
        var coid = collection.objectId;
        self.props.setActiveCollection(coid);
        self.props.toggleCollections();
        self.props.refresh();
      }.bind(this));
    });
  },

  componentDidMount: function () {
    analytics.page('Collections');
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

        {addCollection}

        <div className="collections-yours">
          <h1 class="bold">Yours</h1>
          <span className="collections-add" onClick={_this._addCollectionClick}>Add Collection</span>
          <ul>
            {this.props.collections.map(function (collection, index) {
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
        </div>

        <div className="collections-theirs">
          <h1 class="bold">Theirs</h1>
          <p>Coming soon — you'll be able to watch other peoples public collections, they'll be available to view in a feed aswell as listed here for reference.</p>
        </div>
      </div>;

    return (
      <div className="collections-box">
        {collectionList}
      </div>
    );
  }
});

module.exports = CollectionsBox;
