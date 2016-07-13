const React = require("react");
const ReactDom = require("react-dom");

const css = require("./log-length-animation.css");

const LogLengthAnimation = React.createClass({
  getInitialState () {
    return {
      number: 0
    }
  },
  componentDidMount () {
    this.restart();
    this.rate = 0.3;
  },
  restart () {
    this.setState({ number: 1 });
    setTimeout(() => {
      this.updateTime();
    }, 60);
  },
  updateTime () {
    var that = this;
    if (this.state.number < 999999) {
      this.setState({
        number: Math.min(
          this.state.number +
          10 * this.rate +
          Math.round(Math.random() * this.rate), 999999)
      });
      setTimeout(() => {
        that.updateTime();
      }, 30);
    } else {
      this.setState({ number: 999999 });
      setTimeout(this.restart, 1000);
    }
  },
  render () {
    const startString = this.state.number + "";
    const numberString = ('000000'+startString).substring(startString.length);

    return <div className="log-length-animation">
      <div className="digit-wrapper">
        {numberString.split('').map((x, idx) =>
          <div className="digit" key={idx}>{x}</div>
        )}
      </div>
      <div className="log-paragraph">
        log<sub>10</sub>({this.state.number}) = {Math.log10(this.state.number).toFixed(5)}
      </div>
      <div className="length-paragraph">
        number of digits: {(this.state.number + "").length}
      </div>
      <div>
        <button className="btn btn-default" onClick={this.restart}>Restart</button>
      </div>
    </div>;
  }
});

exports.LogLengthAnimation = LogLengthAnimation;
