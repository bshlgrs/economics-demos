var React = require("react");
var ReactDom = require("react-dom");

const LogLengthDemo = React.createClass({
  getInitialState () {
    return {
      number: 7,
      base: 2
    }
  },
  changeNumber(e) {
    this.setState({number: Math.max(0, parseInt(e.target.value))});
  },
  changeBase(e) {
    this.setState({base: Math.max(0, parseInt(e.target.value))});
  },
  numberString() {
    if (this.state.base < 2 || this.state.number < 0) {
      return "error";
    }
    if (number == 0) {
      return "0";
    } else {
      var res = "";
      var number = this.state.number;
      while (number) {
        res = number % this.state.base + res;
        number = Math.floor(number / this.state.base);
      }

      return res;
    }
  },
  render () {
    return <div>
      <div className="log-length-demo">
        log
        base
        <input
          className="big-input"
          value={this.state.base}
          onChange={this.changeBase}
          min={2}
          max={10}
          type="number" />
        of
        <div style={{display: "inline-block", position: "relative"}}>
          <input
          className="big-input"
          value={this.state.number}
          onChange={this.changeNumber}
          min={1}
          max={400}
          type="number" />
          <div style={{position: "absolute", display: "block", margin: "0 auto"}}>
            <div className="number-display">
              {this.numberString()}
            </div>
            <img className="brace" src="https://upload.wikimedia.org/wikipedia/commons/8/88/ThinBraceDown.svg" />
            <div className="length-display">
              {this.numberString().length} digits
            </div>
          </div>
        </div>
         {"≈ "}
        {(Math.log(this.state.number) / Math.log(this.state.base)).toFixed(5)}
      </div>
    </div>;
  }
})

ReactDom.render(<LogLengthDemo />,
      document.getElementById("log-length-demo"));



