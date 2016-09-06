class IncomeData {
  constructor (incomes) {
    this.incomes = incomes.sort();
    this.length = incomes.length;
    this.cumulativeIncomes = this.getCumulativeIncomes();
  }

  maxIncome() {
    return this.incomes[this.incomes.length - 1];
  }

  getCumulativeIncomes () {
    if (this.incomes.length == 0) {
      return [];
    }
    var cumulativeIncomes = [this.incomes[0]];
    this.incomes.forEach((x, idx) => {
      if (idx > 0) {
        cumulativeIncomes.push(x + cumulativeIncomes[idx - 1]);
      }
    });
    return cumulativeIncomes;
  }

   giniCoefficient () {
    // From Wikipedia (https://en.wikipedia.org/wiki/Gini_coefficient):

    // An alternative approach would be to consider the Gini coefficient as
    // half of the relative mean absolute difference, which is a mathematical
    // equivalence.[15] The mean absolute difference is the average absolute
    // difference of all pairs of items of the population, and the relative
    // mean absolute difference is the mean absolute difference divided by
    // the average, to normalize for scale.

    // The key ingredient here is the sum of all absolute differences between
    // incomes.

    // I'm going to do this fast eventually, but for now I'll hack it out fast.

    var totalAbsoluteDifference = 0;
    var incomes = this.incomes;

    if (incomes.length == 0) {
      return null;
    }

    for (var i = 0; i < incomes.length; i++) {
      for (var j = 0; j < incomes.length; j++) {
        totalAbsoluteDifference += Math.abs(incomes[i] - incomes[j]);
      }
    }

    var mean = this.meanIncome();

    if (mean == 0) {
      return null;
    } else {
      return totalAbsoluteDifference / (2 * incomes.length * incomes.length * mean);
    }
  }

  meanIncome () {
    if (this.incomes.length) {
      return this.incomes.reduce((x, y) => x + y) / this.incomes.length;
    } else {
      return null;
    }
  }

  meanLogIncomeOverLogMeanIncome () {
    if (this.incomes.length) {
      var meanLogIncome = this.incomes.map(Math.log).reduce((x, y) => x + y) / this.incomes.length;
      return meanLogIncome / Math.log(this.meanIncome());
    }
  }
}

exports.IncomeData = IncomeData;
