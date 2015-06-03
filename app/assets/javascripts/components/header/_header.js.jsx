Header = React.createClass({
    handleClick: function() {
      this.props.onToggleTags();
    },
    render: function () {
      return <header>
        <div className="container">
          <div className="header-menu" id="header-menu">
            <span onClick={this.handleClick} >Tags</span>
          </div>
        </div>
      </header>
    }
});
