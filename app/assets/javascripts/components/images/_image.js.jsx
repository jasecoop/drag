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

    var title;
    var desc;
    var source;

    if(this.props.showTitle) {
      title =
        <div className={'image__title'}>
          { this.props.image.title }
        </div>
    }

    if(this.props.showDesc) {
      desc =
        <div className={'image__desc'}>
          { this.props.image.description }
        </div>
    }

    if(this.props.showSource) {
      source =
        <div className={'image__source'}>
          <a href="{ this.props.image.source }">{ this.props.image.source }</a>
        </div>
    }

    return(
      <span ref="image" className={cx} onClick={this._handleClick.bind(null, this.props.image)}>
        <div className={'image__container'}>
          <div className={'image__image'}>
            <img src={ this.props.image.filesource } />
          </div>
          <div className={'image__meta'}>
            {title}
            {desc}
            {source}
          </div>
        </div>
      </span>
    )
  }
});

module.exports = Image;
