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
    render: function () {

      var active_tag = this.props.activeTag
      console.log(active_tag);

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
            <li><span onClick={this.handleClick} >Tags</span></li>
            <li><a rel="nofollow" data-method="delete" href="/users/sign_out">Logout</a></li>
          </ul>
        </div>
      </header>
    }
});

module.exports = Header;
