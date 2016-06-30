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
  5: '5'
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

    if (this.state.base != 1) {
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
    } else {
      functionPlot({
        target: '#demo',
        data: [{
          x: '0',
          y: 't',
          fnType: 'parametric',
          graphType: 'polyline'
        }],
        xAxis: {
          domain: [0, xLimit]
        },
        yAxis: {
          domain: [-10, 10]
        },
        height: 500,
        width: 500,
        grid: true,
        disableZoom: true
      });
    }


  },
  render () {
    return <div>
      <RcSlider
        min={0.01}
        marks={marks}
        included={false}
        value={this.state.base}
        max={5}
        onChange={this.changeBase}
        step={0.01}
        included={false}
        tipFormatter={null}/>

      <div style={{height: 520, width: 500, position: "relative"}}>
        <h2 style={{position: "absolute", left: "40%"}} id="graph-title">
          <i>y</i> = log<sub>{this.state.base == EULER_CONSTANT ? <i>e</i> : (this.state.base + "").substring(0,4)}</sub>(<i>x</i>)
        </h2>
        <div id="demo" style={{paddingTop: 20}}/>
      </div>
    </div>;
  }
});

ReactDom.render(<LogDemo />,
      document.getElementById("log-demo"))



