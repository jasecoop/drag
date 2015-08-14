var ImageList = React.createClass({

  getInitialState: function () {
    return {
      images : this.props.images
    };
  },

  _imageIsSelected: function(string) {
    var arr = this.props.selectedImages;
    if(arr.indexOf(string) > -1) {
      return true
    } else {
      return false
    }
  },

  _addSelectedImage: function(imageId) {
    this.props.addSelectedImage(imageId);
  },

  _removeSelectedImage: function(imageId) {
    this.props.removeSelectedImage(imageId);
  },

  _setActiveImage: function(image) {
    imageId = image.objectId;
    if(this._imageIsSelected(image)) {
      this._removeSelectedImage(image);
    } else {
      this._addSelectedImage(image);
    }
  },

  render: function () {

    var _this = this;
    return (
      <div className="image-list" style={{background: this.props.setting_bg}}>

        <div className={"image-list__container col" + this.props.setting_size} id="grid" data-columns="">

          {this.state.images.map(function (image, i ) {

            return <Image
              image={image}
              key={image.id}
              imageId={'img-'+image.id}
              selectedImages={_this.props.selectedImages }
              setActiveImage={_this._setActiveImage}
              imageIsSelected={_this._imageIsSelected}
              showTitle      = {_this.props.showTitle}
              showDesc       = {_this.props.showDesc}
              showSource     = {_this.props.showSource}
            />

          })}

        </div>
      </div>
    )
  }
});

module.exports = ImageList;
