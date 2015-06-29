var CollectionsBox = React.createClass({
  // mixins: [ParseReact.Mixin],

  getInitialState: function () {
    return {
      showCollections : this.props.showCollections
    };
  },

  collectionClick: function(collection) {
    this.props.setActiveCollection(collection);
    this.props.onToggleCollections();
  },

  render: function () {

    var collectionList = "";
    var _this = this;

    if(this.props.showCollections) {
      collectionList =
        <div className="collection-list page-fade">
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
