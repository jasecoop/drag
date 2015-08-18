var SignUp = React.createClass({
  mixins: [ParseReact.Mixin],
  getInitialState: function () {
    return {

    };
  },

  observe: function() {

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
        analytics.track('Signed Up');
        window.location.replace("/");
        delete self;
      },
      error: function(user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

    e.preventDefault();
  },

  componentDidMount: function () {
    analytics.page('Sign Up');
  },

  render: function () {
    return(
      <div className="page-container">
        <div className="session-form box">
          <div className="box__header">
            <div className="box__title">Sign Up</div>
          </div>
          <form>
            <div className="box__body">
                <div className="input input-full mb2">
                  <input onChange= {this._handleInputChange} ref="signupUsername" type="text" placeholder="Username"></input>
                </div>
                <div className="input input-full mb2">
                  <input onChange= {this._handleInputChange} ref="signupEmail" type="email" placeholder="Email address"></input>
                </div>
                <div className="input input-full">
                  <input onChange= {this._handleInputChange} ref="signupPassword" type="password" placeholder="Password"></input>
                </div>
            </div>
            <div className="box__footer">
              <button className="btn btn-black" onClick={this._onSignUpClick}>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
});

module.exports = SignUp;
