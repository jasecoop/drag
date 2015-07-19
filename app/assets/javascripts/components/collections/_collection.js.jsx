classNames = require('classnames');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Collection = React.createClass({

  _handleCollectionClick: function() {
    this.props.collectionClick();
  },

  render: function () {
    var collection       = this.props.collection;
    var collectionName   = collection.name;
    var username         = Parse.User.current().getUsername();
    var link             = '/' + username + '/' + collectionName
    var active           = false;
    var activeCollection = this.props.activeCollection;

    if (this.props.index == 0) {
      active = true;
      link   = '/' + username;
    }

    var classes = classNames({
      'collection' : true,
      'collection-active' : active
    })

    return (
      <li className={classes}>
        <Link to={link} onClick={this._handleCollectionClick} className="collection__name">
          {this.props.collectionName}
        </Link>
        <div className="collection__info">
          <div className="collection_privacy">
            Public
          </div>
        </div>
      </li>
    );
  }
});

module.exports = Collection;
