var TagsBox = React.createClass({
  getInitialState: function () {
    // return JSON.parse(this.props.presenter);
    return { tags: this.props.tags };
  },

  render: function () {
    return (
      <div className="tags-box">
        {this.props.showTags ? <TagsList tags={this.state.tags} /> : null }
      </div>
    );
  }
});

