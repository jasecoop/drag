var SiteWrapper = React.createClass({

  render: function() {
    return (
      <div className="dragapp__site dragapp-container">
        <div className="page registration">
          <SignUp
            setCurrentUser={this.props.setCurrentUser}
          />
        </div>
      </div>
    )
  }
});

module.exports = SiteWrapper;

