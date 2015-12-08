import Selector from './selector.jsx';
import ItemList from './itemList.jsx';

var ItemForm = React.createClass({
  getInitialState: () => ({text: '', selectOne: '', selectTwo: '', selectThree: '', 
                          selectorLevel: 1, data: []}),
  handleTextChange(e) {
    this.setState({text: e.target.value});
  },
  //save selector value on change to state
  //reset following selectors' values (in nextSs) and load values to the immediate next one
  handleSelect(thisSelector, nextSs, selectorLevel, data) {
    this.state[thisSelector] = data.value;
    this.setState({selectorLevel: selectorLevel})
    for(let i in nextSs){
      this.refs[nextSs[i]].resetValue();
      if(i == 0){
        this.refs[nextSs[i]].loadOptions();
      }
    }
  },
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.selectorLevel < 4) {
      return;
    }
    var newItem = {text: this.state.text.trim(), 
                selectOne: this.state.selectOne,
                selectTwo: this.state.selectTwo,
                selectThree: this.state.selectThree,
                id: Date.now()
                };
    //prevent duplicate items
    var duplicate = false;
    this.props.data.map((item) => {
      if(newItem.text == item.text && 
         newItem.selectOne == item.selectOne &&
         newItem.selectTwo == item.selectTwo &&
         newItem.selectThree == item.selectThree){
        duplicate = true
        return;
      }
    });
    if(duplicate){
      return;
    }
    this.props.onCommentSubmit(newItem);
    this.state.data.push(newItem);
    this.setState({text: '', selectOne: '', selectTwo: '', selectThree: '', selectorLevel: 1});
    for(let ref in this.refs){
      this.refs[ref].flushOptions();
    }
    this.refs.selectorOne.loadOptions();
    this.refs.selectorOne.resetValue();
  },
  deleteItem(item){
    this.state.data.splice(this.state.data.indexOf(item), 1);
    this.setState({data: this.state.data});
    this.props.onDelete(item);
  },
  componentDidMount() {
    this.refs.selectorOne.loadOptions();
  },
  render() {
    return (
      <div className="itemForm" >
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <label className="col-sm-2 control-label">Alasveto1</label>
        <Selector ref='selectorOne' options={this.props.options} 
          onSelectChange={this.handleSelect.bind(null, 'selectOne', ['selectorTwo', 
          'selectorThree'], 2)} disabled={this.state.selectorLevel < 1} />
        <label className="col-sm-2 control-label">Alasveto2</label>
        <Selector ref='selectorTwo' options={this.props.options} 
          onSelectChange={this.handleSelect.bind(null, 'selectTwo', ['selectorThree'], 3)} 
          disabled={this.state.selectorLevel < 2} />
        <label className="col-sm-2 control-label">Alasveto3</label>
        <Selector ref='selectorThree' options={this.props.options} 
          onSelectChange={this.handleSelect.bind(null, 'selectThree','', 4)} 
          disabled={this.state.selectorLevel < 3} />
        <label className="col-sm-2 control-label">Tekstikenttä</label>
        <input
          className="form-control"
          type="text"
          placeholder="Tekstiä.."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <button className="btn btn-default" type="submit">Tallenna</button>
      </form>
      <ItemList data={this.state.data} onDelete={this.deleteItem} deletable={true} />
      </div>
    );
  }
});

export default ItemForm;