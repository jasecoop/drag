var DragApp = React.createClass({

  getInitialState: function () {
    return {
      currentUser : ''
    }
  },

  _setCurrentUser: function() {
    this.setState({
      current_user: Parse.User.current()
    });
  },

  render: function() {
    var content = '';

    if (Parse.User.current()) {
      content =
        <AppWrapper
          setCurrentUser={this._setCurrentUser}
        />
    } else {
      content =
        <SiteWrapper
          setCurrentUser={this._setCurrentUser}
        />
    }

    return (
      <div class="dragapp">{content}</div>
    )
  }
});

React.render(
  <DragApp />,
  document.getElementById('app')
);

module.exports = DragApp;

