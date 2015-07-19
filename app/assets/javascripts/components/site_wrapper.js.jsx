var React        = require('react');
var RouteHandler = require('react-router').RouteHandler;


var SiteWrapper = React.createClass({

  render: function() {
    return (
      // <div className="dragapp__site dragapp-container">
      //   <div className="page registration">
      //     <SignUp
      //       setCurrentUser={this.props.setCurrentUser}
      //     />
      //   </div>
      // </div>
      <div>
        <RouteHandler {...this.state}/>
      </div>
    )
  }
});

module.exports = SiteWrapper;

