var Image = React.createClass({
  render: function () {

    var image    = this.props.image;
    var imageURL = '/images/' + image.id;
    var imageSrc = image.file.url

    return (
      <div className="image-list__item">
        <a href={imageURL}><img src= { imageSrc } /></a>
      </div>
    )
  }
});
