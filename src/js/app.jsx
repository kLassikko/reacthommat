import OptionForm from './optionForm.jsx';
import ItemList from './itemList.jsx';
import ItemForm from './itemForm.jsx';

var App = React.createClass({
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

const data = [];
const options = [{id: 0, value: '', text: ''}, {id: 1, value: 'Arvo1', text: 'Arvo1'}, 
                {id: 2, value: 'Arvo2', text: 'Arvo2'}, {id: 3, value: 'Arvo3', text: 'Arvo3'}];

ReactDOM.render(
  <App data={data} options={options} />,
  document.getElementById('content')
);