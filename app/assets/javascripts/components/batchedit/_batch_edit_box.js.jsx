window.BatchEdit       = require('components/batchedit/_batch_edit');
window.BatchEditSingle = require('components/batchedit/_batch_edit_single');

var BatchEditBox = React.createClass({
  mixins: [ParseReact.Mixin],
  getInitialState: function () {
    return {
    };
  },

  observe: function(props, state) {
    var currentUser = Parse.User.current();
    var collectionsQuery = new Parse.Query('Collection');
    return {
      collections: (collectionsQuery.equalTo("createdBy", currentUser).ascending('createdAt'))
    }
  },

  _toggleBatchEdit: function() {
    this.props.toggleBatchEdit();
  },

  _removeAllSelectedImages: function() {
    this.props.removeAllSelectedImages();
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

  _closeClick: function() {
    this.props.toggleBatchEdit();
    this.props.removeAllSelectedImages();
  },

  _imagesEdited: function() {
    this._toggleBatchEdit();
    this._removeAllSelectedImages();
    this.props.refresh();
  },

  render: function () {
    var batchEditBox;
    var batchEdit;
    var _this = this;

    if (this.props.selectedImages.length > 1) {
      batchEdit =
        <BatchEdit
          collections    ={this.data.collections}
          selectedImages ={this.props.selectedImages}
          imagesEdited   ={this._imagesEdited}
          closeClick     ={this._closeClick}
        />;

    } else {
      batchEdit =
        <BatchEditSingle
          collections     ={this.data.collections}
          selectedImages  ={this.props.selectedImages}
          image           ={this.props.selectedImages[0]}
          toggleBatchEdit ={this._toggleBatchEdit}
          refresh         ={this.props.refresh}
          removeAllSelectedImages ={this._removeAllSelectedImages}
          editImage       ={this._editImage}
          closeClick      ={this._closeClick}
          imagesEdited   ={this._imagesEdited}
        />
    }

    if(this.props.showBatchEdit) {
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
