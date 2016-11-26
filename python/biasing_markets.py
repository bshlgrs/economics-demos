from sympy import *
from sympy.plotting import plot


## Suppose there's a prediction market I want to influence. It's a about the result
# of what a bookie with log utility knows is a fair coin toss. I want to bias the
# results, and I have $d to spend on it.

# So I want to make a bet with the bookie where he agrees to pay me some $x if
# the coin comes up heads. I want to spend all of my $d on it. The question is
# what price the bookie will give me for this.

# At the equilibrium price, the bookie will be indifferent between selling me
# the bet and not doing so. And I know how much I am going to spend on the bet.
# The question is just how much the bookie is going to spend.

# The bookie starts out with wealth 1.

# All values are positive.

d, x = symbols("d x", positive = True)

# His utility without the trade is log(1) = 0. His utility with it is

bookie_utility = (log(1 + d) + log(1 - x)) / 2

# Solve for x

[x_hat] = solve(bookie_utility, x)



print(x_hat)

# It's my $d against his $x_hat, so overall odds are
odds = simplify(x_hat / (x_hat + d))
print(odds, x_hat)

plot(odds, odds + 1, (d, 0, 4))
