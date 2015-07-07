Header = React.createClass({
    handleSettingsClick: function() {
      this.props.onToggleSettings();
    },
    handleCollectionsClick: function() {
      this.props.toggleCollections();
    },
    handleClick: function() {
      this.props.onToggleTags();
    },
    _logoutClick: function() {
      this.props.logout();
    },
    render: function () {

      var activeCollection = this.props.activeCollection;
      var activeCollectionSpan;

      if(activeCollection) {

        if (activeCollection == this.props.rootCollection) {
          console.log('nope')
          activeCollectionSpan =
            <div className="header-user">
              <span>{Parse.User.current().getUsername()}</span>
            </div>
        } else {
          console.log('yep')
          activeCollectionSpan =
            <div className="header-user">
              <span>{Parse.User.current().getUsername()}</span>
              <span className="header-user__tag">{this.props.activeCollectionName}</span>
            </div>
        }
      }

      var classes = classNames({
        'collapsed' : this.props.showBatchEdit
      });

      return <header className={classes}>
        {activeCollectionSpan}
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
