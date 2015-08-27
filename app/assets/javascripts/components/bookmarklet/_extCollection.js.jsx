'use strict';
var ExtCollection = React.createClass({
  getInitialState: function () {
    return {
    };
  },


  render: function () {
    return(
      <div className="extCo" ref="co" id={this.props.id} data-id={this.props.collection.id.objectId}>
        {this.props.collection.name}
      </div>
    )
  }
});

module.exports = ExtCollection;
