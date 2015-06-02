var ImageList = React.createClass({
  render: function () {
    var ImageNodes = this.props.images.map(function ( image ) {
      return <Image file={ image.file } id={ image.id } />
    });

    return (
      <div className="image-list" data-columns>
        { ImageNodes }
      </div>
    )
  }
});
