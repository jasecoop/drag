classNames = require('classnames');

var Collection = React.createClass({

  handleClick: function() {
    this.props.collectionClick(this.props.collection);
  },

  render: function () {
    var collection       = this.props.collection;
    var active           = false;
    var activeCollection = this.props.activeCollection;

    if (!activeCollection) {
      if (this.props.index == 0) {
        active = true;
      }
    }

    if (activeCollection && activeCollection.objectId == collection.objectId) {
      active = true;
    }

    var classes = classNames({
      'collection' : true,
      'collection-active' : active
    })

    return (
      <li className={classes}>
        <span className="collection__name" onClick={this.handleClick}>
          {this.props.collectionName}
        </span>
      </li>
    );
  }
});

module.exports = Collection;
