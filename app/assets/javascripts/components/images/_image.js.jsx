var Image = React.createClass({

  _handleClick: function(image, e) {
    this.props.setActiveImage(image);
  },

  render: function () {
    return(
      <span className={this.props.classNames} onClick={this._handleClick.bind(null, this.props.image)}>
        <div className={'image__container'}>
          <img src={ this.props.image.file._url } />
        </div>
      </span>
    )
  }
});

module.exports = Image;
