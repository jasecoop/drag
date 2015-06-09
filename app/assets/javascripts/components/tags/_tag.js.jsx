Tag = React.createClass({

  handleClick: function() {
    var tagName  = this.props.tag.name;
    console.log('TagClicked' + tagName)
    console.log(this.props)
    this.props.onTagClick(tagName);
  },

  render: function () {
    var tag     = this.props.tag;
    var tagHref = "tags/" + tag.name;
    return <li className="tag"><span onClick={this.handleClick}>{tag.name}</span></li>
  }
});
