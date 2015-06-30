var CollectionsBox = React.createClass({

  getInitialState: function () {
    return {
      showAddCollection : false
    };
  },

  collectionClick: function(collection) {
    this.props.setActiveCollection(collection);
    this.props.onToggleCollections();
  },

  _addCollectionClick:function() {
    this.setState({
      showAddCollection : !this.state.showAddCollection
    });
  },

  _closeClick: function() {
    this.props.onToggleCollections();
  },

  render: function () {

    var collectionList = "";
    var _this = this;

    var addCollection;
    if(this.state.showAddCollection) {
      addCollection =
        <AddCollection
          refresh={this.props.refresh}
          createCollection={this.props.createCollection}
          toggleAddCollection={this._addCollectionClick}
        />
    }

    if(this.props.showCollections) {
      collectionList =
        <div className="collection-list page-fade">
          <div className="page-actions">
            <div className="page-actions__close" onClick={_this._closeClick}>✘</div>
            <div className="page-actions__add" onClick={_this._addCollectionClick}>Add Collection</div>
          </div>

          {addCollection}

          <ul>
            {this.props.collections.map(function (collection, index) {
              return <Collection
                collection={collection}
                collectionName={collection.name}
                key={collection.id}
                collectionClick={ _this.collectionClick.bind(null, collection)}
                activeCollection={_this.props.activeCollection}
                index={index}
              />
            })}
          </ul>
        </div>;
    }

    return (
      <div className="collections-box">
        {collectionList}
      </div>
    );
  }
});

module.exports = CollectionsBox;
