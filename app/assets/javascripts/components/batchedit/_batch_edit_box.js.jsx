var BatchEditBox = React.createClass({
  getInitialState: function () {
    return {
    };
  },

  render: function () {
    var batchEdit;
    var _this = this;
    if(this.props.showBatchEdit) {
      batchEdit = <BatchEdit
        collections={this.prop.collections}
      />
    }
    return (
      <div className="batchedit-box">
        {batchEdit}
      </div>
    )
  }
});

module.exports = BatchEditBox;
