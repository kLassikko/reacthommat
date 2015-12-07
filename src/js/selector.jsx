var Selector = React.createClass({
  getInitialState:() => ({value: '', options: []}),
  handleSelectChange (e) {
    this.setState({value: e.target.value});
    this.props.onSelectChange({value: e.target.value});
  },
  loadOptions() {
    var options = this.props.options.map((option) => {
      return (<option key={option.id} value={option.value}> {option.text} </option>);
    });
    this.setState({options: options});
  },
  flushOptions() {
    this.setState({options: []});
  },
  resetValue() {
    this.setState({value: ''});
  },
  render() {
    return (
      <select className="form-control" value={this.state.value} onChange={this.handleSelectChange} 
      disabled={this.props.disabled}>
        {this.state.options}
      </select>
    );
  }
});

export default Selector;