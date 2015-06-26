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
      <form>
        <input onChange= {this._handleInputChange} ref="signupUsername" type="text" placeholder="Username"></input>
        <input onChange= {this._handleInputChange} ref="signupEmail" type="email" placeholder="Email address"></input>
        <input onChange= {this._handleInputChange} ref="signupPassword" type="password"></input>
        <button onClick={this._onSignUpClick}>Sign up</button>
      </form>
    )
  }
});

module.exports = SignUp;
