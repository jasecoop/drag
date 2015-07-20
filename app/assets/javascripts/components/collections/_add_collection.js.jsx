var AddCollection = React.createClass({
  componentDidMount: function(){
     this.refs.name.getDOMNode().focus();
  },

  _onClick: function(e) {
    e.preventDefault();
    var name = this.refs.name.getDOMNode().value;
    this.props.createCollection(name);
    this.props.toggleAddCollection();
  },

  _closeClick: function() {
    this.props.toggleAddCollection();
  },

  render: function () {

    return (
      <div className="collection-add">
        <div className="form-fix">
          <form>
            <div className="form-fix__header">
              <h3 className="form-fix__title">Add collection</h3>
              <div className="batchedit__close col-right" onClick={this._closeClick}>✘</div>
            </div>
            <div className="form-fix__body">
              <div className="field input-full">
                <input ref="name" type="text" placeholder="Collection name" autofocus></input>
              </div>
            </div>
            <div className="form-fix__footer">
              <input type="submit" className="btn btn-black btn-block" onClick={this._onClick}></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = AddCollection;
