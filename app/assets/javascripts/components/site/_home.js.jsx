var React = require('react');
var Signup = require('../sessions/_reserve_username');

var Home = React.createClass({

  _onSignUpClick: function (e) {
    var username = this.refs.signupUsername.getDOMNode().value
    var email = this.refs.signupEmail.getDOMNode().value
    var password = this.refs.signupPassword.getDOMNode().value

    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    user.set("activated", false);

    var self = this;

    user.signUp(null, {
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

  componentDidMount: function () {
    analytics.page('Home');
  },

  render: function() {
    var content;
    var userActivated = false;
    var username;

    if (Parse.User.current()) {
      username    = Parse.User.current().get('username');
      Parse.User.current().fetch().then(function (user) {
        userActivated = user.get('activated');
      });
    }

    if (Parse.User.current()) {
      content =
        <div className="form-fix__body">
          <h2 class="mt0">Hi {username}</h2>
          <p>Thanks for signing up. Drag is a place to keep your images. We'll give you a shout when it's ready to go.</p>
        </div>
    } else {
      content =
         <form>
          <div className="form-fix__body">
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
          <div className="form-fix__footer">
            <button className="btn btn-black" onClick={this._onSignUpClick}>Sign up</button>
          </div>
        </form>
    }
    return (
      <div className="page-home">
        <div className="home-box form-fix">
          {content}
        </div>
      </div>
    )
  }
});

module.exports = Home;

