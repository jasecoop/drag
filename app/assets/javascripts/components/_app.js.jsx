var DefaultRoute = ReactRouter.DefaultRoute;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;

var App = React.createClass({

  getInitialState: function () {
    console.log('react')
    return {
      showTags: false,
      current_user: this.props.current_user
    };
  },

  _handleToggleTags: function() {
    this.setState({
      showTags: !this.state.showTags
    })
  },
  render: function () {
    return <div>
      <Header
        onToggleTags={ this._handleToggleTags }
        user={this.props.current_user}
      />

      <RouteHandler/>

      <div id="images">
          <ImageBox/>
      </div>
    </div>;
  }
});


window.document.addEventListener("DOMContentLoaded", function() {

  var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="tags" handler={TagsBox}/>
    </Route>
  );

  ReactRouter.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
  });

});
