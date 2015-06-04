Header = React.createClass({
    handleClick: function() {
      this.props.onToggleTags();
    },
    render: function () {
      return <header>
        <div className="header-user">
          <span>jasecoop</span>
        </div>
        <div className="header-menu" id="header-menu">
          <span onClick={this.handleClick} >Tags</span>
          <a rel="nofollow" data-method="delete" href="/users/sign_out">Logout</a>
        </div>
      </header>
    }
});
