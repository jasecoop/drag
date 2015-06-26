Header = React.createClass({
    handleSettingsClick: function() {
      this.props.onToggleSettings();
    },
    handleCollectionsClick: function() {
      this.props.onToggleCollections();
    },
    handleClick: function() {
      this.props.onToggleTags();
    },
    _logoutClick: function() {
      this.props.logout();
    },
    render: function () {

      var active_tag = this.props.activeTag

      var activeTagSpan = ""
      if (active_tag) {
        activeTagSpan =
        <span className="header-user__tag">{active_tag}</span>
      }

      return <header>
        <div className="header-user">
          <span>{this.props.user.username}</span>
          {activeTagSpan}
        </div>
        <div className="header-menu" id="header-menu">
          <ul>
            <li><span onClick={this.handleSettingsClick}>Settings</span></li>
            <li><span onClick={this.handleCollectionsClick} >Collections</span></li>
            <li><span onClick={this._logoutClick}>Logout</span></li>
          </ul>
        </div>
      </header>
    }
});

module.exports = Header;
