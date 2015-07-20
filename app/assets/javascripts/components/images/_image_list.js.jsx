var ImageList = React.createClass({

  getInitialState: function () {
    return {
      images        : this.props.images
    };
  },

  _imageIsSelected: function(string) {
    var arr = this.props.selectedImages;
    return (arr.indexOf(string) > -1);
  },

  _addSelectedImage: function(imageId) {
    this.props.addSelectedImage(imageId);
  },

  _removeSelectedImage: function(imageId) {
    this.props.removeSelectedImage(imageId);
  },

  _setActiveImage: function(imageId) {
    if(this._imageIsSelected(imageId)) {
      this._removeSelectedImage(imageId);
    } else {
      this._addSelectedImage(imageId);
    }
  },

  render: function () {

    var _this = this;

    return (
      <div className="image-list" style={{background: this.props.setting_bg}}>

        <div className={"image-list__container col-" + this.props.setting_size} id="grid" data-columns="">

          {this.state.images.map(function (image, i ) {

            var cx = classNames({
              'image' : true,
              'active': _this._imageIsSelected(image)
            })

            return <Image
              image={image}
              key={image.id}
              imageId={'img-'+image.id}
              classNames={cx}
              setActiveImage={_this._setActiveImage}
            />

          })}

        </div>
      </div>
    )
  }
});

module.exports = ImageList;
