var BatchEdit = React.createClass({
  getInitialState: function () {
    return {
    };
  },

  _closeClick: function () {

  },

  render: function () {

    return (
      <div className="batchedit">
        <span>Edit these images</span>

        <form>
          <div className="field input-line input-full">
            <input placeholder="source" type="text" name="source" />
          </div>
          <div className="field input-line input-full">
            <select placedholder="Add to category">
            </select>
          </div>
        </form>
        <div className="batchedit__close" onClick={this._closeClick}>✘</div>
      </div>
    )
  }
});

module.exports = BatchEdit;
