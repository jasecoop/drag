var ImageBox = React.createClass({
  getInitialState: function () {
    return {
    };
  },

  render: function () {
    var il = "";
    var _this = this;

    pendingQueries = this.props.pendingQueries
    imagesPending  = (pendingQueries.indexOf("images") > -1);
    console.log(pendingQueries)

    if (!imagesPending) {
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
