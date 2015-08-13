var React        = require('react');
var AppWrapper   = require('../components/site_wrapper');
var Home         = require('../components/site/_home');
var AppInit      = require('../components/app/app_init');
var Signup       = require('../components/sessions/_sign_up');
var Login        = require('../components/sessions/_login');
var Router       = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route        = Router.Route;
var Redirect     = Router.Redirect;
var BrowserHistory = Router.BrowserHistory;


module.exports = (
  <Route name="app" path="/" handler={SiteWrapper} history={BrowserHistory}>
    <DefaultRoute handler={Home} />
    <Route name="signup" path="signup" handler={Signup} />
    <Route name="login" path="login" handler={Login} />
    <Route name="collections" path=":username/collections" handler={AppInit} />
    <Route name="collection" path=":username/:collectionName" handler={AppInit} />
    <Route name="username" path=":username" handler={AppInit} />
  </Route>
);
