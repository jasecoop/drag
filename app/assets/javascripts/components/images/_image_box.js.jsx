var ImageBox = React.createClass({
  getInitialState: function () {
    return {
    };
  },

  render: function () {
    var il = "";
    var _this = this;
    if( this.props.images.length > 0) {
      il =
        <ImageList
          images = {this.props.images}
          onImageClick = {this._imageClicked}
          toggleBatchEdit = {_this.props.toggleBatchEdit}
        />
    } else {
      il =
        <div className="image-box-empty">

          Drag images here to upload them

        </div>;
    }

    return (
       <div className="image-box" id="grid">
        {il}
      </div>
    )
  }
});

module.exports = ImageBox;
