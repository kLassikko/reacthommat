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

export default Selector;