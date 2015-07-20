var Router       = require('react-router');
var Link         = Router.Link;


Header = React.createClass({
    _handleSettingsClick: function() {
      this.props.toggleSettings();
    },
    _logoutClick: function() {
      this.props.logout();
    },
    _handleRootClick: function() {
      this.props.resetRootView();
    },
    render: function () {

      var activeCollection = this.props.activeCollection;
      var username         = this.props.username;
      var activeCollectionSpan;
      var collectionsURL   = '/sdflkfdslf/collections'
      var currentPath      = this.props.currentPath;
      var currentPage;
      if (currentPath == '/' + username + '/collections') {
        currentPage =
          <span className="header-user__tag">Collections</span>;
      } else if (this.props.params.hasOwnProperty('collectionName')) {
        currentPage =
          <span className="header-user__tag">{this.props.params.collectionName}</span>
      }

      activeCollectionSpan =
        <div className="header-user">
          <Link to={'/'} onClick={this._handleRootClick}>{username}</Link>
          {currentPage}
        </div>

      var classes = classNames({
        'collapsed' : this.props.showBatchEdit
      });

      return <header className={classes}>
        <div className="header__container">
          {activeCollectionSpan}
          <span className="header__settings" onClick={this._handleSettingsClick}>Settings</span>
          <div className="header-menu" id="header-menu">
            <ul>
              <li><Link to={collectionsURL}>Collections</Link></li>
              <li><span onClick={this._logoutClick}>Logout</span></li>
            </ul>
          </div>
        </div>
      </header>
    }
});

module.exports = Header;
