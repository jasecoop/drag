var ImageBox = React.createClass({
  getInitialState: function () {
    return {
      // collections: this.props.collections,
      // username: this.props.username
    };
  },

  render: function () {

    var imageList = "";

    if( this.props.images.length > 0) {
      console.log('roo')
      imageList =
        <ul className={"image-list col-" + this.props.image_size} id="grid" data-columns="">
          {this.props.images.map(function (image) {
            return <div className="image-list__item">
              <img src= { image.url } />
            </div>
          })}
        </ul>;
    } else {
      imageList =
        <div className="image-box-empty">

          Drag images here to upload them

        </div>;
    }

    return(
      <div className="image-box" id="grid">
        {imageList}
      </div>
    )
  }
});
