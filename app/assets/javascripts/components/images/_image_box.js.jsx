var ImageBox = React.createClass({
  mixins: [ParseReact.Mixin],
  getInitialState: function () {
    return {
      // collections: this.props.collections,
      // username: this.props.username
    };
  },

  observe: function() {
    var currentUser = this.props.currentUser;
    var query = new Parse.Query('Images');
    return {
      images: (query.equalTo("createdBy", currentUser).descending('createdAt'))
    };
  },

  render: function () {

    var imageList = "";

    if( this.data.images.length > 0) {
      imageList =
        <ul className={"image-list col-" + this.props.image_size} id="grid" data-columns="">
          {this.data.images.map(function (image) {
            return <div className="image-list__item">
              <img src= { image.file._url } />
            </div>
          })}
        </ul>;
    } else {
      imageList =
        <div className="image-box-empty">

          Drag images here to upload them

        </div>;
    }

    return (
       <div className="image-box" id="grid">
        {imageList}
      </div>
    )
  }
});

module.exports = ImageBox;
