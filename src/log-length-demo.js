const React = require("react");
const ReactDom = require("react-dom");

const css = require("./log-length-demo.css");

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
    const lengthOfNumberString = this.numberString().length;
    return <div>
      <div className="log-length-demo" style={{height: "200px"}}>
        <div>
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

            <input
            className="big-input"
            value={this.state.number}
            onChange={this.changeNumber}
            min={1}
            max={1000000}
            type="number" />
           {"≈ "}
          {(Math.log(this.state.number) / Math.log(this.state.base)).toFixed(5)}
        </div>

        <div style={{marginTop: "10px"}}>
          {this.state.number} (in base 10) is&nbsp;
          <div style={{display: "inline-block", position: "relative", marginBottom: "36px"}}>
            {this.numberString()}
            <div style={{position: "absolute", display: "block", margin: "0 auto", top: "20px"}}>
              <img
                width={13.5 * lengthOfNumberString + "px"}
                height="10px"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/GullBraceDown.svg/120px-GullBraceDown.svg.png" />
            </div>
            <div style={
              {
                position: "absolute",
                display: "block",
                top: "40px",
                width:"100px",
                left: (6.75*lengthOfNumberString - 50) + "px",
                textAlign: "center"
              }
            }>
              {this.numberString().length} digits
            </div>
          </div>
          &nbsp;(in base {this.state.base})
        </div>
      </div>
    </div>;
  }
})

// ReactDom.render(<LogLengthDemo />,
//       document.getElementById("log-length-demo"));




exports.LogLengthDemo = LogLengthDemo;
