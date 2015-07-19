var React        = require('react');
var AppWrapper   = require('../components/site_wrapper');
var Home         = require('../components/site/_home');
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
    <Route name="login" path="signup" handler={Login} />
  </Route>
);
