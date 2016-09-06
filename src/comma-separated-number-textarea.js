const React = require("react");
const Textarea = require('react-textarea-autosize').default;

const CommaSeparatedNumberTextarea = React.createClass({
  getInitialState () {
    return {
      textareaValue: this.props.defaultStringValue,
      legit: true,
      focused: false
    }
  },
  handleChange (e) {
    var legit = false;
    try {
      var list = JSON.parse("[" + e.target.value + "]");
      this.setState({ textareaValue: e.target.value, legit: true });
      this.props.onChange(list);
      console.log(list);
    } catch (exception) {
      this.setState({ textareaValue: e.target.value, legit: false });
      console.log("exception")
    }
  },
  render () {
    return <Textarea
      value={this.state.textareaValue}
      style={{backgroundColor: (this.state.legit || this.state.focused) ? "white" : "pink"}}
      onChange={(e) => this.handleChange(e)}
      className="form-control"
      onBlur={() => this.setState({focused: false})}
      onFocus={() => this.setState({focused: true})}
      />
  }
})

exports.CommaSeparatedNumberTextarea = CommaSeparatedNumberTextarea;
