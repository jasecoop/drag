var ImageBox = React.createClass({
getInitialState: function () {
  // return JSON.parse(this.props.presenter);
  return { images: [] };
},
componentWillMount: function () {
  this.fetchUsersImages();
},
fetchUsersImages: function () {
  $.ajax({
      url:       '/images',
      dataType:  'json',
      data:      { format: 'json' },
      success: function (result) {
        this.setState({ images: result });
      }.bind(this),
      error: function () {
          alert('error getting posts. please try again later');
      }
  });
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
