var CollectionsBox = React.createClass({
  getInitialState: function () {
    return {
      collections: this.props.collections,
      username: this.props.username
    };
  },

  collectionClicked: function(collection) {
    this.props.filterCollections(collection);
    this.props.onToggleCollections();
  },

  render: function () {

    var collectionList;
    var _this = this;
    if(this.props.showCollections) {
      collectionList =
        <div className="collection-list page-fade">
          <ul>
            {this.state.collections.map(function (collection) {
              return <Collection
                collection={collection}
                key={collection.id}
                onCollectionClick={ _this.collectionClicked }
                username={_this.state.username}
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

