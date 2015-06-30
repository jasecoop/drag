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

      var activeCollection = this.props.activeCollection

      var activeCollectionSpan = ""
      if (activeCollection) {
        activeCollectionSpan =
        <span className="header-user__tag">{activeCollection.name}</span>
      }

      return <header>
        <div className="header-user">
          <span>{Parse.User.current().getUsername()}</span>
          {activeCollectionSpan}
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
