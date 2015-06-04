var App = React.createClass({

  getInitialState: function () {
    return {
      showTags: false,
      current_user: this.props.current_user
    };
  },

  _handleToggleTags: function() {
    this.setState({
      showTags: !this.state.showTags
    })
  },
  render: function () {
    return <div>
      <Header
        onToggleTags={ this._handleToggleTags }
        user={this.props.current_user}
      />
      <div id="tags">
          <TagsBox showTags={ this.state.showTags }/>
      </div>
      <div id="images">
          <ImageBox/>
      </div>
    </div>;
  }
});

// App.start = function () {
//   React.render(<App/>, document.getElementById('app'));
// };
