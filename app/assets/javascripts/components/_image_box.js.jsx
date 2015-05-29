var ImageBox = React.createClass({
  getInitialState: function () {
    return JSON.parse(this.props.presenter);
  },
render: function () {
    return (
      <div className="image-box" id="grid">

        <ImageList images={ this.state.images } />

      </div>
    );
  }
});
