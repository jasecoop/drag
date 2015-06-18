Tag = React.createClass({

  handleClick: function() {
    var tag_name  = this.props.tag.name;
    this.props.onTagClick(tag_name);
  },

  render: function () {
    var tag     = this.props.tag;
    var tagHref = "tags/" + tag.name;
    return <li className="tag"><span onClick={this.handleClick}>{tag.name}</span></li>
  }
});
