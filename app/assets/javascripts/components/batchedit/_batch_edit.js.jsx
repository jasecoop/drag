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

    batch.dispatch().then(function() {
      this.props.imagesEdited();
    }.bind(this));

  },

  _closeClick: function() {
    this.props.closeClick()
  },

  _deleteImages: function() {
    var batch = new ParseReact.Mutation.Batch();

    this.props.selectedImages.forEach(function(o)  {
      ParseReact.Mutation.Destroy(o.id).dispatch({ batch: batch });;
    });

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
      <div className="form-fix batchedit">
        <div className="form-fix__header clearfix">
          <h3 className="form-fix__title col-left">Edit these {selectedImagesCount} images</h3>
          <div className="form-fix__close col-right" onClick={this._closeClick}>✘</div>
        </div>

        <form>
          <div className="form-fix__body">
            <div className="field input-full mb1 clearfix">
              <label>Title</label>
              <input ref="title" placeholder="source" type="text" value={this.state.title} onChange={this._handleTitleChange} name="source" placeholder="img.png"/>
            </div>
            <div className="field input-full mb1 clearfix">
              <label>Source</label>
              <input ref="source" placeholder="source" type="text" value={this.state.source} onChange={this._handleSourceChange} name="source" placeholder="e.g. http://somedanktumblr.tumblr.com"/>
            </div>
            <div className="field input-full mb1 clearfix">
              <label>Description</label>
              <textarea ref="desc" placeholder="source" type="text" value={this.state.desc} onChange={this._handleDescChange} name="source" placeholder="This image changes everything"></textarea>
            </div>
            <div className="field input-full mb2 clearfix">
              <label>Collection</label>
              <Select
                name="collection"
                value='Select a collection'
                options={this.state.options}
                onChange={this._handleCollectionChange}
              />
            </div>
          </div>

          <div className="form-fix__footer">
            <div className="field">
              <input type="submit" className="btn btn-black left" onClick={this._onFormSubmit} value="Save"></input>
              <span onClick={this._deleteImages} className="btn right">Delete images</span>
            </div>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = BatchEdit;
