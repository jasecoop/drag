var Image = React.createClass({
  render: function () {
    return (
      <div className="image-list__item">
        <img src= { this.props.file.url } />
      </div>
    )
  }
});
