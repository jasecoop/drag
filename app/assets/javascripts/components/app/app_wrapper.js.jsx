var React        = require('react');
var Router       = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route        = Router.Route;
var RouteHandler = require('react-router').RouteHandler;
var Header       = require('components/header/_header');


var AppWrapper = React.createClass({
  mixins: [Router.state],
  getInitialState: function () {
    return {
    };
  },

  render: function () {
    return (
      <div className="app_wrapper">
        <RouteHandler {...this.state}/>
      </div>
    )
  }
});

module.exports = AppWrapper;
