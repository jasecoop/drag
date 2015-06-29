var ImageList = React.createClass({

  getInitialState: function () {
    return {
      images        : this.props.images,
      activeImages : []
    };
  },

  _imageIsActive: function(string) {
    var arr = this.state.activeImages;
    return (arr.indexOf(string) > -1);
  },

  _addActiveImage: function(imageId) {
    var currentActiveImages = this.state.activeImages;
    currentActiveImages.push(imageId)
    this.setState({activeImages: currentActiveImages});

    if(this.state.activeImages.length == 1) {
      this.props.toggleBatchEdit();
    }
  },

  _removeActiveImage: function(imageId) {
    var array = this.state.activeImages;
    var index = array.indexOf(imageId);
    array.splice(index, 1);
    this.setState({activeImages: array});

    if(this.state.activeImages.length == 0) {
      this.props.toggleBatchEdit();
    }
  },

  _setActiveImage: function(imageId) {

    var arr = this.state.activeImages;

    if(this._imageIsActive(imageId)) {
      this._removeActiveImage(imageId);
    } else {
      this._addActiveImage(imageId);
    }
  },

  render: function () {

    var _this = this;

    return (
      <ul className={"image-list col-" + this.props.image_size} id="grid" data-columns="">

        {this.state.images.map(function (image, i ) {

          var cx = classNames({
            'image' : true,
            'active': _this._imageIsActive('img-'+image.id)
          })

          return <Image
            image={image}
            key={image.id}
            imageId={'img-'+image.id}
            classNames={cx}
            setActiveImage={_this._setActiveImage}
          />

        })}

      </ul>
    )
  }
});

module.exports = ImageList;
