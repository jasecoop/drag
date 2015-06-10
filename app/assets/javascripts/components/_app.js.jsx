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
    var url = '/tags/'+filter
    this._fetchImages(url);
  },

  _fetchImages: function(url) {
    $.ajax({
      url:       url,
      dataType:  'json',
      data:      { format: 'json' },
      success: function (result) {
        this.setState({ images: result });
        console.log(result)

      }.bind(this),

      error: function () {
          alert('error getting posts. please try again later');
      }
    });
  },

  componentWillMount: function () {
    this._fetchImages('/images');
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
        onToggleTags={ this._handleToggleTags }
      />

      <div id="images">
        <div className="image-box" id="grid">

          <ul className="image-list" id="grid" data-columns="">
            {this.state.images.map(function (image) {
              return <div className="image-list__item">
                <img src= { image.url } />
              </div>
            })}
          </ul>

        </div>
      </div>
    </div>
  }
});

