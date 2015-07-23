var classNames = require('classnames');
var Image = React.createClass({

  getInitialState: function() {
    return {
      loaded: false,
      newHeight : '',
      newWidth : ''
    };
  },

  _handleClick: function(image, e) {
    this.props.setActiveImage(image);
  },

  componentDidMount: function () {
    var oH = this.props.image.height;
    var oW = this.props.image.width;

    var img = React.findDOMNode(this.refs.image);
    var newHeight = img.offsetWidth * oH / oW;
    this.setState({
      newHeight : newHeight,
      newWidth  : img.offsetWidth
    })
  },

  render: function () {
    var cx = classNames({
      'image' : true,
      'active': this.props.isImageSelected
    })

    var image = this.props.image
    return(
      <span ref="image" className={cx} onClick={this._handleClick.bind(null, this.props.image)}>
        <div className={'image__container'}>
          <img src={ this.props.image.file._url } />
        </div>
      </span>
    )
  }
});

module.exports = Image;
