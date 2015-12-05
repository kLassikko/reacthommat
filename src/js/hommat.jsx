
var Master = React.createClass({
  refresh: function() {
  	this.setState({data: this.props.data});
    this.setState({options: this.props.options});
  },
  newComment: function(comment){
  	this.state.data.push(comment);
  	this.refresh();
  },
  deleteItem: function(item){
    this.state.data.splice(this.state.data.indexOf(item), 1);
    this.refresh();
  },
  newOption: function(option){
    option.id = Date.now();
    option.value = option.text;
    this.state.options.push(option);
    this.refresh();
  },
  changeView: function(viewName, e){
    this.setState({currentPage: viewName});
  },
  getInitialState: function() {
    return {data: [], options: [], currentPage: ''};
  },
  componentDidMount: function() {
    this.refresh();
  },
  render: function() {
    var partial;
    if (this.state.currentPage === 'tallentaminen') {
      partial =<div><h1>Tallentaminen</h1>
        <ItemForm options={this.state.options} data={this.state.data} 
        onCommentSubmit={this.newComment} onDelete={this.deleteItem} /></div>;
    } else if (this.state.currentPage === 'hallitseminen') {
      partial = <div><h1>Hallitseminen</h1>
        <OptionForm options={this.state.options} 
        onOptionSubmit={this.newOption} /></div>;
    } else if (this.state.currentPage === 'tarkasteleminen'){
      partial = <div><h1>Tarkasteleminen</h1>
        <ItemList data={this.state.data} /></div>;
    }
    return (
      <div id="header">
        <button className="btn btn-xs btn-primary" 
        onClick={this.changeView.bind(null, 'tallentaminen')}>Tallentaminen</button>
        <button className="btn btn-xs btn-primary" 
        onClick={this.changeView.bind(null, 'hallitseminen')}>Hallitseminen</button>
        <button className="btn btn-xs btn-primary" 
        onClick={this.changeView.bind(null, 'tarkasteleminen')}>Tarkasteleminen</button>
        {partial}
      </div>
    );
  }
});

var ItemList = React.createClass({
  deleteItem: function(item, e) {
    e.preventDefault();
    this.props.onDelete(item);
  },
  render: function() {
    var deleteLink;
    
    var itemNodes = this.props.data.map(function(item) {
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
    }, this);
    return (
      <table className="table table-striped"><thead><tr><th>Alasveto1</th><th>Alasveto2</th>
      <th>Alasveto3</th><th>Tekstikenttä</th><th> </th></tr></thead>
        <tbody>
        {itemNodes}
        </tbody>
      </table>
    );
  }
});

var Item = React.createClass({
  render: function() {
    return (
      <div className="item">
        {this.props.children}
      </div>
    );
  }
});

var ItemForm = React.createClass({
  getInitialState: function() {
    return {text: '', selectOne: '', selectTwo: '', selectThree: '', selectorLevel: 1, data: []};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  //save selector value on change to state
  //reset following selectors' values (in nextSs) and load values to the immediate next one
  handleSelect: function(thisSelector, nextSs, selectorLevel, data) {
    this.state[thisSelector] = data.value;
    this.setState({selectorLevel: selectorLevel})
    for(let i in nextSs){
      this.refs[nextSs[i]].resetValue();
      if(i == 0){
        this.refs[nextSs[i]].loadOptions();
      }
    }
  },
  handleSubmit: function(e) {
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
    this.props.data.map(function(item){
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
  deleteItem: function(item){
    this.state.data.splice(this.state.data.indexOf(item), 1);
    this.props.onDelete(item);
  },
  componentDidMount: function() {
    this.refs.selectorOne.loadOptions();
  },
  render: function() {
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
      <h2> Tallennetut </h2>
      <ItemList data={this.state.data} onDelete={this.deleteItem} deletable={true} />
      </div>
    );
  }
});

var Selector = React.createClass({
  getInitialState: function() {
    return {value: '', options: []};
  },
  handleSelectChange: function(e) {
    this.setState({value: e.target.value});
    this.props.onSelectChange({value: e.target.value});
  },
  loadOptions: function() {
    var options = this.props.options.map(function(option) {
      return (<option key={option.id} value={option.value}> {option.text} </option>);
    });
    this.setState({options: options});
  },
  flushOptions: function() {
    this.setState({options: []});
  },
  resetValue: function() {
    this.setState({value: ''});
  },
  render: function() {
    return (
      <select className="form-control" value={this.state.value} onChange={this.handleSelectChange} 
      disabled={this.props.disabled}>
        {this.state.options}
      </select>
    );
  }
});

var OptionForm = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    //prevent duplicate options
    var duplicate = false;
    this.props.options.map(function(option){
      if(text == option.text){
        duplicate = true
        return;
      }
    });
    if(duplicate){
      return;
    }
    this.props.onOptionSubmit({text: text});
    this.setState({text: ''});
  },
  render: function() {
    return (
      <div className="optionForm">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            type="text"
            placeholder="Uusi arvo"
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <button className="btn btn-default" type="submit">Lisää</button>
        </form>
      </div>
    );
  }
});

const data = [];
const options = [{id: 0, value: '', text: ''}, {id: 1, value: 'Arvo1', text: 'Arvo1'}, 
                {id: 2, value: 'Arvo2', text: 'Arvo2'}, {id: 3, value: 'Arvo3', text: 'Arvo3'}];

ReactDOM.render(
  <Master data={data} options={options} />,
  document.getElementById('content')
);