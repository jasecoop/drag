var TagsBox = React.createClass({
  getInitialState: function () {
    // return JSON.parse(this.props.presenter);
    return { tags: [] };
  },
  componentWillMount: function () {
    this.fetchUsersTags();
  },

  fetchUsersTags: function () {
    // this.setState({ tags: JSON.parse(this.props.presenter) });
    // console.log(this.props.presenter);
    $.ajax({
        url:       '/tags',
        dataType:  'json',
        data:      { format: 'json' },
        success: function (result) {
          this.setState({ tags: result });
        }.bind(this),
        error: function () {
            alert('error getting posts. please try again later');
        }
    });
  },
  render: function () {
    return (
      <div className="tags-box">
        {this.props.showTags ? <TagsList tags={this.state.tags} /> : null }
      </div>
    );
  }
});

