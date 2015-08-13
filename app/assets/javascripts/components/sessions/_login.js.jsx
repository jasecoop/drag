var React = require('react');

var Login = React.createClass({

  _onSignUpClick: function (e) {
    var username = this.refs.signupUsername.getDOMNode().value
    var password = this.refs.signupPassword.getDOMNode().value

    var self = this;

    Parse.User.logIn(username, password, {
      success: function(user) {
        window.location.replace("/");
        delete self;
      },
      error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

    e.preventDefault();
  },

  render: function() {
    return (
      <div className="page-container">
        <div className="session-form box">
          <div className="box__header">
            <div className="box__title">Login</div>
          </div>
          <form>
            <div className="box__body">
                <div className="input input-full mb2">
                  <input onChange= {this._handleInputChange} ref="signupUsername" type="text" placeholder="Username"></input>
                </div>
                <div className="input input-full">
                  <input onChange= {this._handleInputChange} ref="signupPassword" type="password" placeholder="Password"></input>
                </div>
            </div>
            <div className="box__footer">
              <button className="btn btn-black" onClick={this._onSignUpClick}>Login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = Login;

