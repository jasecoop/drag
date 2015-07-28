var React = require('react');
var Signup = require('../sessions/_reserve_username');

var Home = React.createClass({

  render: function() {
    return (
      <div className="page-home">
        <div className="box">
          <div className="box__body">
            <h1>Drag</h1>
            <h2>Save what you see</h2>

            <p>Image collections for professionals.</p>

            <ul>

              <li>$20 per year.</li>

              <li>Public and private collections of images.</li>

              <li>Hi-res. View images at the resolution they deserve.</li>

              <li>Customiable layout to suit your images context.</li>

              <li>No cupcakes, motiviational quotes and Pinteresters.</li>

              <li><a href="">Learn more about why we built Drag</a></li>

            </ul>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Home;

