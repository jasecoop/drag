var app = app || {};

var DragApp = React.createClass({

  getInitialState: function () {
    return {
      showTags        : false,
      current_user    : this.props.current_user,
      images          : this.props.images,
      tags            : this.props.tags,
      image_filter    : '',
      image_bg        : this.props.current_user.setting_bg,
      image_size      : this.props.current_user.setting_size
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
        console.log("error");
      }
    });
  },

  _setSize: function(e) {
    var newSize = e.target.value;
    newSize     = Math.round(newSize);
    newSize     = parseInt(newSize);
    var sizeClass = 'col-' + newSize;
    this.setState({
      image_size : newSize
    });
    this._postSize(newSize)
  },

  _postSize: function(size) {
    $.ajax({
      type: "PUT",
      url: 'update_user_size',
      dataType:  'json',
      data: {setting_size : size},
      success: function (result) {
        console.log('success')
      }.bind(this),
      error: function () {
        console.log("error");
      }
    });
  },

  componentWillMount: function () {
    this._fetchImages('/images');
  },

  render: function () {

    var bgColor   = this.state.image_bg
    var imageSize = this.state.image_size
    console.log(imageSize);
    var sizeClass = 'col-'+imageSize

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
          <div className="image-settings__bg">
            <span onClick={this._setBackground.bind(this, '#000000')} className="image-settings__b"></span>
            <span onClick={this._setBackground.bind(this, '#ffffff')} dataColor={bgColor} className="image-settings__w"></span>
          </div>

          <div className="image-settings__size">
            <input onChange={this._setSize} type="range" min="1" max="8" step="0.2" value={imageSize} />
          </div>
        </div>

        <div className="image-box" id="grid">
          <ul className={"image-list col-" + this.state.image_size} id="grid" data-columns="">
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

