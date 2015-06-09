var app = app || {};

var DragApp = React.createClass({

  getInitialState: function () {

    return {
      showTags        : false,
      current_user    : this.props.current_user,
      images          : this.props.images,
      tags            : this.props.tags,
      image_filter    : ''
    };
  },

  _handleToggleTags: function() {
    this.setState({
      showTags: !this.state.showTags
    });
  },

  _setFilter: function(filter) {
    this.setState({
      filter : filter
    });
  },

  _fetchImages: function() {
    $.ajax({
      url:       '/images',
      dataType:  'json',
      data:      { format: 'json' },
      success: function (result) {
        DragApp.setState({ images: result });
      }.bind(this),
      error: function () {
          alert('error getting posts. please try again later');
      }
    });
  },

  render: function () {
    return <div>
      <Header
        onToggleTags={ this._handleToggleTags }
        user={this.props.current_user}
      />

      <TagsBox
        tags={this.state.tags}
        showTags={this.state.showTags}
        filterTags={this._setFilter}
      />

      <div id="images">
        <ImageBox
          images={this.state.images}
          filter={this.state.filter}
        />
      </div>
    </div>
  }
});

