Tag = React.createClass({
    render: function () {
      var tag     = this.props.tag;
      var tagHref = "tags/" + tag.name;
      return <li className="tag"><a href={tagHref}>{tag.name}</a></li>
    }
});
