var SignUp = React.createClass({
  mixins: [ParseReact.Mixin],
  getInitialState: function () {
    return {

    };
  },

  observe: function() {

  },

  signUpSuccess: function() {
    this.props.setCurrentUser();
  },

  _onSignUpClick: function (e) {
    var username = this.refs.signupUsername.getDOMNode().value
    var email = this.refs.signupEmail.getDOMNode().value
    var password = this.refs.signupPassword.getDOMNode().value

    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    var self = this;

    user.signUp(null, {
      success: function(user) {
        self.signUpSuccess();
        delete self;
      },
      error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

    e.preventDefault();
  },

  render: function () {
    return(
      <div className="page-container">
        <div className="session-form">
          <form>
            <div className="input input-full mb2">
              <input onChange= {this._handleInputChange} ref="signupUsername" type="text" placeholder="Username"></input>
            </div>
            <div className="input input-full mb2">
              <input onChange= {this._handleInputChange} ref="signupEmail" type="email" placeholder="Email address"></input>
            </div>
            <div className="input input-full mb2">
              <input onChange= {this._handleInputChange} ref="signupPassword" type="password" placeholder="Password"></input>
            </div>
            <div className="input">
              <button className="btn btn-black" onClick={this._onSignUpClick}>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = SignUp;
