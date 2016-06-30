var RcSlider = require('rc-slider');
var React = require("react");
var ReactDom = require("react-dom")

const EULER_CONSTANT = 2.71828;

const marks = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10'
};

marks[EULER_CONSTANT] = <i>e</i>;

const LogDemo = React.createClass({
  getInitialState () {
    return {
      base: 2
    }
  },
  changeBase (newBase) {
    if (newBase == 1 || newBase == 0) {
      return;
    }

    if (Math.abs(newBase - EULER_CONSTANT) < 0.05) {
      newBase = EULER_CONSTANT;
    }

    if (Math.abs(newBase - Math.round(newBase)) < 0.05) {
      // 0, 1, and 2 are all special cases where we don't want to do this.

      // We don't snap to 0 and 1 because log base 0 and 1 are undefined.
      // We don't snap to 2 because Nate asked us not to.
      if (Math.round(newBase) > 2) {
        newBase = Math.round(newBase);
      }
    }

    this.setState({ base: newBase });
  },
  componentDidUpdate () {
    this.plotFunction();
  },
  componentDidMount () {
    this.plotFunction();
  },
  plotFunction () {
    const xLimit = 40;

    const yLimit = Math.log(xLimit) / Math.log(this.state.base)
    const domain = [yLimit, -yLimit].sort()

    functionPlot({
      target: '#demo',
      data: [{
        fn: 'log(x) / log('+this.state.base+")"
      }],
      xAxis: {
        domain: [0, xLimit]
      },
      yAxis: {
        domain: domain
      },
      height: 500,
      width: 500,
      grid: true,
      disableZoom: true
    });

    functionPlot({
      target: '#demo2',
      data: [{
        fn: 'log(x) / log('+this.state.base+")"
      }],
      xAxis: {
        domain: [0, xLimit]
      },
      yAxis: {
        domain: [-8, 8]
      },
      height: 500,
      width: 500,
      grid: true,
      disableZoom: true
    });
  },
  render () {
    return <div>
      <div style={{width:500 }}>
        <RcSlider
          min={0.01}
          marks={marks}
          included={false}
          value={this.state.base}
          max={10}
          onChange={this.changeBase}
          step={0.01}
          included={false}
          tipFormatter={null}/>
      </div>

      <div style={{height: 520, width: 500, position: "relative"}}>
        <h2 style={{position: "absolute", left: "40%"}} id="graph-title">
          <i>y</i> = log<sub>{this.state.base == EULER_CONSTANT ? <i>e</i> : (this.state.base + "").substring(0,4)}</sub>(<i>x</i>)
        </h2>
        <div id="demo" style={{paddingTop: 20}}/>
      </div>

      <div style={{height: 520, width: 500, position: "relative"}}>
        <h2 style={{position: "absolute", left: "40%"}} id="graph-title">
          <i>y</i> = log<sub>{this.state.base == EULER_CONSTANT ? <i>e</i> : (this.state.base + "").substring(0,4)}</sub>(<i>x</i>)
        </h2>
        <div id="demo2" style={{paddingTop: 20}}/>
      </div>
    </div>;
  }
});

ReactDom.render(<LogDemo />,
      document.getElementById("log-demo"))



