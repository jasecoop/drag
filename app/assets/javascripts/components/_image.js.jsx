var Image = React.createClass({
  render: function () {
    console.log(this.props)
    return (
      <div>
        <img src= { this.props.file.url } />
      </div>
    )
  }
});
