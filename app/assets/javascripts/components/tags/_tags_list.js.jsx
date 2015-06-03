var TagsList = React.createClass({
  render: function () {
    return (
      <div className="tags-list">
        <ul>
          {this.props.tags.map(function (tag) {
              return <Tag tag={tag}/>
          })}
        </ul>
      </div>
    );
  }
});
