var TagsBox = React.createClass({
  getInitialState: function () {
    return { tags: this.props.tags };
  },

  tagClicked: function(tag) {
    this.props.filterTags(tag);
    this.props.onToggleTags();
  },

  render: function () {

    var tagList;
    var _this = this;
    if(this.props.showTags) {
      tagList =
        <div className="tags-list">
          <ul>
            {this.props.tags.map(function (tag) {
              return <Tag
                tag={tag}
                key={tag.id}
                onTagClick={ _this.tagClicked }
              />
            })}
          </ul>
        </div>;
    }

    return (
      <div className="tags-box">
        // {this.props.showTags ? <TagsList tags={this.state.tags} /> : null }
        {tagList}
      </div>
    );
  }
});

