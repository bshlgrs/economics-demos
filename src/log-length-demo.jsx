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
      <h2>Version 1</h2>
      <div className="log-length-demo" style={{height: "200px"}}>
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
          max={1000000}
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

      <hr/>

      <h2>Version 2</h2>
      <div className="log-length-demo">
        <div>
          base =
          <input
            className="big-input"
            value={this.state.base}
            onChange={this.changeBase}
            min={2}
            max={10}
            type="number" />
          , x =
          <input
            className="big-input"
            value={this.state.number}
            onChange={this.changeNumber}
            min={1}
            max={1000000}
            type="number" />
        </div>

        <div>
          log<sub>{this.state.base}</sub>({this.state.number}) ≈
          {" " + (Math.log(this.state.number) / Math.log(this.state.base)).toFixed(5)}
        </div>
        <div>
          {this.state.number}<sub>10</sub> = {this.numberString()}<sub>{this.state.base}</sub>&nbsp;

          ({this.numberString().length} digits)
        </div>
      </div>

      <hr/>

      <h2>Version 3</h2>
      <div className="log-length-demo">
        <div>
          base =
          <input
            className="big-input"
            value={this.state.base}
            onChange={this.changeBase}
            min={2}
            max={10}
            type="number" />
          , x =
          <input
            className="big-input"
            value={this.state.number}
            onChange={this.changeNumber}
            min={1}
            max={1000000}
            type="number" />
        </div>

        <div>
          log<sub>{this.state.base}</sub>({this.state.number}) ≈
          {" " + (Math.log(this.state.number) / Math.log(this.state.base)).toFixed(5)}
        </div>
        <div>
          {this.state.number}<sub>10</sub> =&nbsp;
          <div style={{position: "relative", display: "inline-block", textAlign: "center"}}>
            {this.numberString()}
            <div style={{
              position: "absolute",
              fontSize: "18px",
              top: "20px",
              left: (6*this.numberString().length - 95)+"px",
              width: '200px'}}>

              <div style={{position: "relative", top: "20px"}}>
                ({this.numberString().length} digits)
              </div>
            </div>
          </div>
          <sub>{this.state.base}</sub>&nbsp;
        </div>
      </div>
    </div>;
  }
})

ReactDom.render(<LogLengthDemo />,
      document.getElementById("log-length-demo"));



