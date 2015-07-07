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

  render: function () {

    return (
      <div className="collection-add">
        <form>
          <input ref="name" type="text" placeholder="Collection name" autofocus></input>
          <input type="submit" onClick={this._onClick}></input>
        </form>
      </div>
    );
  }
});

module.exports = AddCollection;
