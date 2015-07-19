var React = require('react');
var Signup = require('../sessions/_sign_up');

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

