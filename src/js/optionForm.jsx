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

export default OptionForm;