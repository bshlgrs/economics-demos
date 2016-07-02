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
    }, 1);
  },
  updateTime () {
    var that = this;
    console.log("blah " + this.state.number);
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
      <button className="btn btn-default" onClick={this.restart}>Restart</button>
    </div>;
  }
});

ReactDom.render(<LogLengthAnimation rate={130} totalTime={10}/>,
      document.getElementById("log-length-animation"));



