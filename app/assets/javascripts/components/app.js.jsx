var React = require('react');
var Router = require('react-router');
var app_routes = require('config/app_routes');
var site_routes = require('config/site_routes');

var userActivated;

if(Parse.User.current()) {
  Parse.User.current().fetch().then(function (user) {
    userActivated = user.get('activated');
    if(Parse.User.current() && userActivated) {
      Router.run(app_routes, Router.HistoryLocation, function(Root){
        React.render(<Root {...this.state}/>, document.getElementById('app'));
      });
    } else {
      Router.run(site_routes, Router.HistoryLocation, function(Root){
        React.render(<Root {...this.state} />, document.getElementById('app'));
      });
    }
  });
} else {
  Router.run(site_routes, Router.HistoryLocation, function(Root){
    React.render(<Root {...this.state} />, document.getElementById('app'));
  });
}

