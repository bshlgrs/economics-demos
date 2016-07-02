var React = require("react");
var ReactDom = require("react-dom");

const LogLengthAnimation = React.createClass({
  getInitialState () {
    return {
      number: 0
    }
  },
  componentDidMount () {
    this.restart();
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
          10 * this.props.rate +
          Math.round(Math.random() * this.props.rate), 999999)
      });
      setTimeout(() => {
        that.updateTime();
      }, 1);
    } else {
      this.setState({ number: 999999 });
      setTimeout(this.restart, 1000);
    }
  },
  render () {
    const startString = this.state.number + "";
    const numberString = ('000000'+startString).substring(startString.length);

    return <div>
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

ReactDom.render(<LogLengthAnimation rate={13} />,
      document.getElementById("log-length-animation"));



