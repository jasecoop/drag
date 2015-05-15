var ImageBox = React.createClass({
  getInitialState: function () {
    return JSON.parse(this.props.presenter);
  },
render: function () {
    return (
      <div className="image-box">

        <ImageList images={ this.state.images } />

      </div>
    );
  }
});
