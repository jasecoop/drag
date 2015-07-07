var Select = require('react-select');

var BatchEdit = React.createClass({
  getInitialState: function () {
    return {
      source     : this.props.image.source,
      title      : this.props.image.title,
      desc       : this.props.image.description,
      collection : this.props.image.imageCollection.objectId,
      options    : []
    };
  },

  _editImage: function(image, title, source, desc, collection) {
    ParseReact.Mutation.Set(image.id, {
      title           : title,
      source          : source,
      description     : desc,
      imageCollection : collection
    }).dispatch()
    .then(function(collection) {
      this.props.toggleBatchEdit();
      this.props.removeAllSelectedImages();
      this.props.refresh();
    }.bind(this));
  },

  _handleTitleChange: function(e) {
    this.setState({title: event.target.value});
  },
  _handleSourceChange: function(e) {
    this.setState({source: event.target.value});
  },
  _handleDescChange: function(e) {
    this.setState({desc: event.target.value});
  },
  _handleCollectionChange: function(val) {
    var val = val;
    this.setState({collection: val});
  },

  _onFormSubmit: function (e) {
    e.preventDefault();
    var Collection = Parse.Object.extend("Collection");
    var collection = new Collection();
    collection.id  = this.state.collection;
    var image      = this.props.image;
    var title      = this.state.title;
    var source     = this.state.source;
    var desc       = this.state.desc;
    this._editImage(image, title, source, desc, collection);
  },

  componentWillMount: function () {
    var options = [];
    this.props.collections.map(function(collection){
      var option = {value: collection.objectId, label: collection.name}
      options.push(option);
    });
    console.log(options);
    this.setState({
      options : options
    })
  },

  render: function () {

    var image = this.props.image;
    var _this = this;

    return (
      <div className="batchedit batchedit-single">
        <h3>Edit this image</h3>

        <form>
          <div className="field input-full">
            <label>Title</label>
            <input ref="title" placeholder="source" type="text" value={this.state.title} onChange={this._handleTitleChange} name="source" placeholder="img.png"/>
          </div>
          <div className="field input-full">
            <label>Source</label>
            <input ref="source" placeholder="source" type="text" value={this.state.source} onChange={this._handleSourceChange} name="source" placeholder="e.g. http://somedanktumblr.tumblr.com"/>
          </div>
          <div className="field input-full">
            <label>Description</label>
            <textarea ref="desc" placeholder="source" type="text" value={this.state.desc} onChange={this._handleDescChange} name="source" placeholder="This image changes everything"></textarea>
          </div>
          <div className="field input-full">
            <label>Collection</label>
            <Select
              name="collection"
              value='Select'
              options={this.state.options}
              onChange={this._handleCollectionChange}
            />
          </div>
          <div className="field">
            <input type="submit" onClick={this._onFormSubmit} value="Save"></input>
          </div>
        </form>
        <div className="batchedit__close" onClick={this._closeClick}>✘</div>
      </div>
    )
  }
});

module.exports = BatchEdit;
