var Collection = React.createClass({
  getInitialState: function () {
    return {
      username: this.props.username
    };
  },

  handleClick: function() {
    var collectionName  = this.props.collection.name;
    this.props.onCollectionClick(collectionName);
  },

  render: function () {
    var collection = this.props.collection;
    return (
      <li className="collection">
        <span className="collection__name" onClick={this.handleClick}>
          {collection.name}
        </span>
      </li>
    );
  }
});
