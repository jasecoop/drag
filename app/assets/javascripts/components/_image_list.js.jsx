var ImageList = React.createClass({
  render: function () {
    var ImageNodes = this.props.images.map(function ( image ) {
      return <Image url={ image.url } />
    });

    return (
      <div className="image-list">
        { ImageNodes }
      </div>
    )
  }
});
