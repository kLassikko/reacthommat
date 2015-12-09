import OptionForm from './optionForm.jsx';
import ItemList from './itemList.jsx';
import ItemForm from './itemForm.jsx';
import { Router, Route, Link, Redirect } from 'react-router';
import { createHashHistory } from 'history';

var App = React.createClass({
  newComment(comment){
  	this.state.data.push(comment);
  },
  deleteItem(item){
    this.state.data.splice(this.state.data.indexOf(item), 1);
  },
  newOption(option){
    option.id = Date.now();
    option.value = option.text;
    this.state.options.push(option);
  },
  changeView(viewName, e){
    this.setState({currentPage: viewName});
  },
  getInitialState() {
    return {data: [], options: [{id: 0, value: '', text: ''}, {id: 1, value: 'Arvo1', text: 'Arvo1'}, 
                {id: 2, value: 'Arvo2', text: 'Arvo2'}, {id: 3, value: 'Arvo3', text: 'Arvo3'}]};
  },
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" 
                      data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Homma</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><Link to="/tallentaminen" activeClassName="active" id="lol">tallentaminen</Link></li>
                <li><Link to="/hallitseminen" activeClassName="active" id="lol">hallitseminen</Link></li>
                <li><Link to="/tarkasteleminen" activeClassName="active" id="lol">tarkasteleminen</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        {React.cloneElement(this.props.children, {data: this.state.data, options: this.state.options,
          onCommentSubmit: this.newComment, onDelete: this.deleteItem, onOptionSubmit: this.newOption })}
      </div>
    );
  }
});

//clean up the urls
var history = createHashHistory({
  queryKey: false
});

ReactDOM.render((
  <Router history={history}>
    <Route component={App}>
      <Redirect from="/" to="/tallentaminen"/>
      <Route path="/tallentaminen" component={ItemForm} />
      <Route path="/hallitseminen" component={OptionForm} />
      <Route path="/tarkasteleminen" component={ItemList} />
    </Route>
  </Router>
), document.getElementById('content'));