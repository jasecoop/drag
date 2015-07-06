window.BatchEdit       = require('components/batchedit/_batch_edit');
window.BatchEditSingle = require('components/batchedit/_batch_edit_single');

var BatchEditBox = React.createClass({
  getInitialState: function () {
    return {
    };
  },
  render: function () {
    var batchEditBox;
    var batchEdit;
    var _this = this;

    if (this.props.selectedImages.length > 1) {
      batchEdit =
        <BatchEdit
          collections={this.props.collections}
          selectedImages={this.props.selectedImages}
          imagesEdited={this.props.imagesEdited}
        />;

    } else {
      batchEdit =
        <BatchEditSingle
          collections={this.props.collections}
          selectedImages={this.props.selectedImages}
          image={this.props.selectedImages[0]}
          toggleBatchEdit={this.props.toggleBatchEdit}
          refresh={this.props.refresh}
          removeAllSelectedImages={this.props.removeAllSelectedImages}
          editImage={this.props.editImage}
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
