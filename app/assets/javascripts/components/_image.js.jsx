var Image = React.createClass({
  render: function () {

    var image    = this.props.image;
    var imageURL = '/images/' + image.id;
    var imageSrc = image.file.url
    console.log(imageSrc);

    return (
      <a href={imageURL}><img src= { imageSrc } /></a>
    )
  }
});
