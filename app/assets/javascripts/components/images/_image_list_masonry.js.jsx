var MasonryMixin = require('react-masonry-mixin');

var masonryOptions = {
    transitionDuration: 0
};

var ImageList = React.createClass({
  displayName: 'SomeComponent',
  mixins: [MasonryMixin('masonryContainer', masonryOptions)],
  getInitialState: function () {
    return {
      images        : this.props.images,
      isImageSelected : false
    };
  },

  _imageIsSelected: function(string) {
    var arr = this.props.selectedImages;
    if(arr.indexOf(string) > -1) {
      this.setState({
        isImageSelected : true
      });
    }
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

  componentDidMount: function () {
    console.log('image_list: CDM')
    this.masonry.layout();
    this.masonry.reloadItems();
    this.masonry.destroy();
  },

  render: function () {

    var _this = this;
    return (
      <div className="image-list" style={{background: this.props.setting_bg}}>

        <div ref="masonryContainer"  className={"image-list__container col-" + this.props.setting_size} id="grid" data-columns="">

          {this.state.images.map(function (image, i ) {

            return <Image
              image={image}
              key={image.id}
              imageId={'img-'+image.id}
              setActiveImage={_this._setActiveImage}
              isImageSelected={_this.state.isImageSelected}
            />

          })}

        </div>
      </div>
    )
  }
});

module.exports = ImageList;
