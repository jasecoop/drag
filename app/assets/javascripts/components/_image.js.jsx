var Image = React.createClass({
  render: function () {

    // imageURL: function (image) {
    //   imageId = image.id;
    //   return ('/images/' + imageId);
    // };

    var imageURL = '/images/' + this.props.id;

    return (
      <div className="image-list__item">
        <a href={imageURL}><img src= { this.props.file.url } /></a>
      </div>
    )
  }
});
