var BatchEditBox = React.createClass({
  getInitialState: function () {
    return {
    };
  },

  render: function () {
    var batchEditBox;
    var _this = this;
    if(this.props.showBatchEdit) {
      batchEditBox =
        <div className="batchedit-box">
          <BatchEdit
            collections={this.props.collections}
          />
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
