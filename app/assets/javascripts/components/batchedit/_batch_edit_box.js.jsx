window.BatchEdit       = require('components/batchedit/_batch_edit');
window.BatchEditSingle = require('components/batchedit/_batch_edit_single');

var BatchEditBox = React.createClass({
  getInitialState: function () {
    return {
      selectedImages : [],
      showBatchEdit  : false
    };
  },

  _toggleBatchEdit: function() {
    this.setState({
      showBatchEdit: !this.state.showBatchEdit
    });
  },

  _removeAllSelectedImages: function() {
    this.setState({selectedImages: []});
  },

  _editImage: function(image, title, source, desc, collection) {
    ParseReact.Mutation.Set(image.id, {
      title           : title,
      source          : source,
      description     : desc,
      imageCollection : collection
    }).dispatch()
    .then(function(collection) {
      this._toggleBatchEdit();
      this._removeAllSelectedImages();
      this.props.refresh();
    }.bind(this));
  },

  render: function () {
    var batchEditBox;
    var batchEdit;
    var _this = this;

    if (this.state.selectedImages.length > 1) {
      batchEdit =
        <BatchEdit
          collections    ={this.props.collections}
          selectedImages ={this.state.selectedImages}
          imagesEdited   ={this.props.imagesEdited}
        />;

    } else {
      batchEdit =
        <BatchEditSingle
          collections     ={this.props.collections}
          selectedImages  ={this.state.selectedImages}
          image           ={this.state.selectedImages[0]}
          toggleBatchEdit ={this._toggleBatchEdit}
          refresh         ={this.props.refresh}
          removeAllSelectedImages ={this._removeAllSelectedImages}
          editImage       ={this._editImage}
        />
    }

    if(this.state.showBatchEdit) {
      batchEditBox =
        <div className="batchedit-box">
          {batchEdit}
        </div>;
    }

    return (
      <div>
        {batchEditBox}
      </div>
    );
  }
});

module.exports = BatchEditBox;
