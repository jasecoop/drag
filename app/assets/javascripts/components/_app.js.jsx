var App = React.createClass({

  getInitialState: function () {

    // this._fetchImages();

    return {
      showTags: false,
      current_user: this.props.current_user,
      images: []
    };
  },
  _handleToggleTags: function() {
    this.setState({
      showTags: !this.state.showTags
    })
  },

  _fetchImages: function() {
    $.ajax({
        url:       '/images',
        dataType:  'json',
        data:      { format: 'json' },
        success: function (result) {
          this.setState({ images: result });
          console.log(this.state.images)
        }.bind(this),
        error: function () {
            alert('error getting posts. please try again later');
        }
    });
  },

  componentDidMount: function () {
    this._fetchImages();
  },

  render: function () {
    return <div>
      <Header
        onToggleTags={ this._handleToggleTags }
        user={this.props.current_user}
      />

      <TagsBox showTags={this.state.showTags}/>


      <div id="images">
          <ImageBox images={this.state.images}/>
      </div>
    </div>;
  }
});

