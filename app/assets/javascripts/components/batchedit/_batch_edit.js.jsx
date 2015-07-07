var Select = require('react-select');

var BatchEdit = React.createClass({
  getInitialState: function () {
    return {
      source     : '',
      title      : '',
      desc       : '',
      collection : '',
      options    : []
    };
  },

  _handleTitleChange: function(e) {
    self = this;
    this.setState({title: event.target.value});
  },
  _handleSourceChange: function(e) {
    self = this;
    this.setState({source: event.target.value});
  },

  _handleDescChange: function(e) {
    self = this;
    this.setState({desc: event.target.value});
  },

  _handleCollectionChange: function(val) {
    var val = val;
    this.setState({collection: val});
  },

  _batchTitle: function(batch, value) {
    this.props.selectedImages.forEach(function(o)  {
      ParseReact.Mutation.Set(o.id, {
        title: value,
      }).dispatch({ batch: batch });;
    });
  },

  _batchSource: function(batch, value) {
    this.props.selectedImages.forEach(function(o)  {
      ParseReact.Mutation.Set(o.id, {
        source: value,
      }).dispatch({ batch: batch });;
    });
  },

  _batchCollection: function(batch, value) {
    var Collection = Parse.Object.extend("Collection");
    var collection = new Collection();
    collection.id  = this.state.collection;
    this.props.selectedImages.forEach(function(o)  {
      ParseReact.Mutation.Set(o.id, {
        imageCollection: collection,
      }).dispatch({ batch: batch });;
    });
  },

  _batchDesc: function(batch, value) {
    this.props.selectedImages.forEach(function(o)  {
      ParseReact.Mutation.Set(o.id, {
        description: value,
      }).dispatch({ batch: batch });;
    });
  },

  _onFormSubmit: function (e) {
    e.preventDefault();

    var title       = this.state.title;
    var source      = this.state.source;
    var desc        = this.state.desc;
    var collection  = this.state.collection;

    var batch = new ParseReact.Mutation.Batch();

    if (title)      {this._batchTitle(batch, title)}
    if (source)     {this._batchSource(batch, source)}
    if (desc)       {this._batchDesc(batch, desc)}
    if (collection) {this._batchCollection(batch, collection)}

    console.log(batch)
    batch.dispatch().then(function() {
      this.props.imagesEdited();
    }.bind(this));
  },

  componentWillMount: function () {
    var options = [];
    this.props.collections.map(function(collection){
      var option = {value: collection.objectId, label: collection.name}
      options.push(option);
    });
    this.setState({
      options : options
    })
  },

  render: function () {
    var selectedImages = this.props.selectedImages;
    var selectedImagesCount = selectedImages.length;
    return (
      <div className="batchedit">
        <h3>Edit these {selectedImagesCount} images</h3>

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
              value='Select a collection'
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
