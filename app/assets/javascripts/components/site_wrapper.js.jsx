var React        = require('react');
var RouteHandler = require('react-router').RouteHandler;


var SiteWrapper = React.createClass({

  render: function() {
    return (
      <div>
        <RouteHandler {...this.state}/>
      </div>
    )
  }
});

module.exports = SiteWrapper;

