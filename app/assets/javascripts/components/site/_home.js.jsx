var React = require('react');
var Signup = require('../sessions/_reserve_username');

var Home = React.createClass({

  render: function() {
    return (
      <div className="page-home">
        <Signup />
      </div>
    )
  }
});

module.exports = Home;

