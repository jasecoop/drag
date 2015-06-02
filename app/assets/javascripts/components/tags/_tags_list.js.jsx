var TagsList = React.createClass({
  render: function () {
    return (
      <ul className="tags-list">
        {this.props.tags.map(function (tag) {
            return <Tag tag={tag}/>
        })}
      </ul>
    );
  }
});
