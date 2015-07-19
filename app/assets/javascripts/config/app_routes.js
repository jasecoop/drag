var React        = require('react');
var AppWrapper   = require('../components/app/app_wrapper');
var Images       = require('../components/images/_image_box');
var Collection   = require('../components/collections/_collections_box');
var Router       = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route        = Router.Route;
var Redirect     = Router.Redirect;
var BrowserHistory = Router.BrowserHistory;


var rd;

var appRoutes  = '';

if (Parse.User.current()) {
  u  = '/' + Parse.User.current().getUsername()
  rd = <Redirect from="/" to={u} />
}

module.exports = (
  <Route name="app" path="/" handler={AppWrapper} history={BrowserHistory}>
    <Route name="username" path=":username" handler={Images} />
    <Route name="collections" path=":username/collections" handler={Images} />
    <Route name="collection" path=":username/:collectionName" handler={Images} />
    <DefaultRoute handler={Images} />
    {rd}
  </Route>
);
