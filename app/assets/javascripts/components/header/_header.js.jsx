Header = React.createClass({
    handleSettingsClick: function() {
      this.props.onToggleSettings();
    },
    handleClick: function() {
      this.props.onToggleTags();
    },
    render: function () {
      return <header>
        <div className="header-user">
          <span>{this.props.user.username}</span>
        </div>
        <div className="header-menu" id="header-menu">
          <ul>
            <li><span onClick={this.handleSettingsClick}>Settings</span></li>
            <li><span onClick={this.handleClick} >Tags</span></li>
            <li><a rel="nofollow" data-method="delete" href="/users/sign_out">Logout</a></li>
          </ul>
        </div>
      </header>
    }
});
