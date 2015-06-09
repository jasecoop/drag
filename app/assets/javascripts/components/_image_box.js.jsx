var ImageBox = React.createClass({
getInitialState: function () {
  // return JSON.parse(this.props.presenter);
  return { images: this.props.images };
},
render: function () {
    return (
      <div className="image-box" id="grid">

        <ul className="image-list" id="grid" data-columns="">
          {this.state.images.map(function (image) {
            return <Image image={ image } />
          })}
        </ul>

      </div>

    );
  }
});
