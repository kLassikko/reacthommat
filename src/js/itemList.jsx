var ItemList = React.createClass({
  deleteItem(item, e) {
    e.preventDefault();
    this.props.onDelete(item);
  },
  render() {
    var deleteLink;
    
    var itemNodes = this.props.data.map((item) => {
      if(this.props.deletable){
        deleteLink = <a href='' onClick={this.deleteItem.bind(null, item)}>poista</a>;
      }
      return (
        <tr key={item.id}>
            <td>{item.selectOne}</td>
            <td>{item.selectTwo}</td>
            <td>{item.selectThree}</td>
            <td>{item.text}</td>
            <td>{deleteLink}</td>
        </tr>
      );
    });
    return (
      <div>
      <table className="table table-striped"><thead><tr><th>Alasveto1</th><th>Alasveto2</th>
      <th>Alasveto3</th><th>Tekstikenttä</th><th> </th></tr></thead>
        <tbody>
        {itemNodes}
        </tbody>
      </table>
      </div>
    );
  }
});

var Item = React.createClass({
  render() {
    return (
      <div className="item">
        {this.props.children}
      </div>
    );
  }
});

export default ItemList;