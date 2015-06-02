var TagsBox = React.createClass({
  getInitialState: function () {
    // return JSON.parse(this.props.presenter);
    return { tags: [], showTags: false };
  },
  componentWillMount: function () {
    this.fetchUsersTags();
  },

  fetchUsersTags: function () {
    // this.setState({ tags: JSON.parse(this.props.presenter) });
    // console.log(this.props.presenter);
    console.log('dsf')
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
  hideTags: function () {
    TagButton.setState({showTags: !TagButton.state.showTags});
  },
  render: function () {
    return (
      <div className="tags-box">

        // <span className="button-close b-c-black b-c-topright" onClick={this.hideTags}></span>

        {this.state.showTags ? <TagList tags={this.state.tags} /> : null }

      </div>
    );
  }
});

React.render(
  <span checked={true} onClick={console.log.bind(console)}>
    Tags
  </span>,
  document.getElementById('tags-button')
);
