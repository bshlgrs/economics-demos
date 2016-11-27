from sympy import *

x, r = symbols("x r", positive=True)

# Suppose the returns to thinking are logarithmic.
# Maybe the cost of manufacturing a paperclip after you’ve expended r effort on
# researching paperclip manufacturing is 1/log(r).
# Now if you have xx total resources, the total paperclip manufacture you get done is

paperclips = (x - r) * log(r)

# this is optimized when

solutions = solve(diff(paperclips, r), r)
try:
    [optimal_r] = solutions
except ValueError:
    print(solutions)
    exit(1)

optimal_r_func = lambdify(x, optimal_r)

print(latex(optimal_r))

for i in range(300):
    print(optimal_r_func(10**i), i)

