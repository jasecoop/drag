var Image = React.createClass({

  _handleClick: function(imageId, e) {
    this.props.setActiveImage(imageId);
  },

  render: function () {
    return(
      <span className={this.props.classNames} onClick={this._handleClick.bind(null, this.props.imageId)}>
        <div className={'image__container'}>
          <img src={ this.props.image.url } />
        </div>
      </span>
    )
  }
});

module.exports = Image;
