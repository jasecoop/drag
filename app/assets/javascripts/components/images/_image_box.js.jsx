var ImageBox = React.createClass({
  getInitialState: function () {
    return {
    };
  },

  render: function () {
    var il = "";
    var _this = this;
    var activeCollection     = '';
    var sizeVal = this.props.size;

    pendingQueries       = this.props.pendingQueries;
    imagesPending        = (pendingQueries.indexOf("images") > -1);
    activeCollection     = this.props.activeCollection;

    if (!imagesPending) {
      if( this.props.images.length > 0) {
        il =
          <ImageList
            images = {this.props.images}
            onImageClick = {this._imageClicked}
            toggleBatchEdit = {_this.props.toggleBatchEdit}
            image_size = {sizeVal}
          />
      } else {
        il =
          <div className="image-box-empty">
            Drag images here to upload them
          </div>;
      }
    } else {
      il =
        <div className="loading"><img src="http://i.imgur.com/Drx5dG7.gif" width="200" height="200"></img></div>;
    }

    return (
       <div className="image-box" id="grid">
        {il}
      </div>
    )
  }
});

module.exports = ImageBox;
