var app = app || {};

var DragApp = React.createClass({

  getInitialState: function () {
    return {
      showTags        : false,
      current_user    : this.props.current_user,
      images          : this.props.images,
      tags            : this.props.tags,
      image_filter    : '',
      image_bg        : this.props.current_user.setting_bg
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

  _setBackground: function(colour, item) {
    this.setState({
      image_bg : colour
    });
    this._postSettings(colour)
  },

  _postSettings: function(colour) {
    $.ajax({
      type: "PUT",
      url: 'update_user',
      dataType:  'json',
      data: {setting_bg : colour},
      success: function (result) {
        console.log('success')
      }.bind(this),
      error: function () {
        console.log("error ");
      }
    });
  },

  componentWillMount: function () {
    this._fetchImages('/images');
  },

  render: function () {

    var bgColor = this.state.image_bg

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

      <div id="images" style={{backgroundColor: bgColor}}>

        <div className="image-settings">
          <span onClick={this._setBackground.bind(this, '#000000')} className="image-settings__b"></span>
          <span onClick={this._setBackground.bind(this, '#ffffff')} dataColor={bgColor} className="image-settings__w"></span>
        </div>

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

