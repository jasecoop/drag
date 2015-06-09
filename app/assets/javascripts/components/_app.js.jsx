var App = React.createClass({

  getInitialState: function () {
    console.log('react')
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

      <TagsBox showTags={this.state.showTags}/>

      <div id="images">
          <ImageBox/>
      </div>
    </div>;
  }
});

