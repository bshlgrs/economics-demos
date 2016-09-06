const React = require("react");
const Immutable = require('immutable');

const BundlingDemo = React.createClass({
  getInitialState () {
    return {
      people: Immutable.fromJS([
        { name: "Buck", prices: [100, 80] },
        { name: "Daniel", prices: [80, 100] },
      ]),
      products: Immutable.fromJS(["Radiohead", "Nirvana"])
    }
  },
  handleChange(e, personIdx, productIdx) {
    const newPeople = this.state.people.setIn([personIdx, "prices", productIdx], parseInt(e.target.value) || 0);
    this.setState({people: newPeople});
  },
  render () {
    const people = this.state.people;
    const products = this.state.products;

    // sold seperately
    const profitMaximizingPrices = products.map((name, idx) => {
      var priceOptions = people.map((person) => person.get("prices").get(idx));

      // Your profit maximizing price is the one which maximizes profit.
      return priceOptions.maxBy((priceOption) => {
        // You sell your product to everyone who's willing to pay this much or more for it.
        const quantitySold = priceOptions.count((price) => price >= priceOption);

        return quantitySold * priceOption;
      });
    });

    const buyers = products.map((name, idx) =>
      people
        .filter((person) => person.get("prices").get(idx) >= profitMaximizingPrices.get(idx))
        .map((person) => person.get("name"))
    );

    const profits = products.map((name, idx) =>
      buyers.get(idx).count() * profitMaximizingPrices.get(idx)
    );

    const totalNonBundledProfit = profits.reduce((x, y) => x + y);

    // bundles
    const possibleBundlePrices = people.map((person, idx) =>
      person.get("prices").reduce((x, y) => x + y)
    );

    const optimalBundlePrice = possibleBundlePrices.maxBy((bundlePriceOption) => {
      var quantitySold = possibleBundlePrices.count((price) => price >= bundlePriceOption);

      return quantitySold * bundlePriceOption;
    });

    const bundleBuyers = people
      .filter((person) => person.get("prices").reduce((x, y) => x + y) >= optimalBundlePrice)
      .map((person) => person.get("name"));

    const bundleProfit = optimalBundlePrice * bundleBuyers.count()

    return <div>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th></th>
            {this.state.people.map((person, idx) => <th key={idx}>{person.get("name")}</th>)}
          </tr>
          {this.state.products.map((x, productIdx) =>
            <tr key={productIdx}>
              <td>Maximum price for {x}</td>
              {this.state.people.map((person, personIdx) =>
                <td key={personIdx}>
                  <input
                    value={person.get("prices").get(productIdx) || 0}
                    onChange={(e) => this.handleChange(e, personIdx, productIdx)} />
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>

      <table className="table table-bordered">
        <tbody>
          <tr>
            <th></th>
            <th>Profit-maximizing price</th>
            <th>Buyers</th>
            <th>Profit</th>
          </tr>
          {this.state.products.map((product, idx) => {
            return <tr key={idx}>
              <td>{product}</td>
              <td>${profitMaximizingPrices.get(idx)}</td>
              <td>{buyers.get(idx).join(", ")}</td>
              <td>${profits.get(idx)}</td>
            </tr>
          })}
          <tr>
            <td>Bundle</td>
            <td>${optimalBundlePrice}</td>
            <td>{bundleBuyers.join(", ")}</td>
            <td>${bundleProfit}</td>
          </tr>
        </tbody>
      </table>

      <p>So without bundling, total profit is <strong>${totalNonBundledProfit}</strong>.</p>
      <p>With bundling, total profit is <strong>${bundleProfit}</strong>.</p>
      <p>So bundling is
        a <strong>
          {totalNonBundledProfit > bundleProfit && "bad"}
          {totalNonBundledProfit == bundleProfit && "neutral"}
          {totalNonBundledProfit < bundleProfit && "good"}
        </strong> idea.
      </p>
    </div>
  },
})

exports.BundlingDemo = BundlingDemo;
