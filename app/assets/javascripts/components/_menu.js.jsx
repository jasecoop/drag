var AppMenu = React.createClass({

  toggleTags: function() {
    alert('toggle');
  },

  render: function() {
    return (
      <ul>
        <li onSelect={this.toggleTags}>
          Tags
        </li>
      </ul>
    );
  }
});

// React.render(<AppMenu />, document.getElementById('header-menu'));
