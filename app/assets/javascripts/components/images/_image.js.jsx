var classNames = require('classnames');
var Image = React.createClass({

  getInitialState: function() {
    return {
      loaded: false,
      imageIsSelected : false
    };
  },

  _handleClick: function(image, e) {
    if (Parse.User.current()) {
      this.props.setActiveImage(image);
    }
  },

  render: function () {

    var image = this.props.image

    var cx = classNames({
      'image' : true,
      'active': this.props.imageIsSelected(image)
    })
    return(
      <span ref="image" className={cx} onClick={this._handleClick.bind(null, this.props.image)}>
        <div className={'image__container'}>
          <img src={ this.props.image.filesource } />
        </div>
      </span>
    )
  }
});

module.exports = Image;
