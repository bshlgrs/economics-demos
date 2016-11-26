from sympy import *

x, r = symbols("x r")

# Suppose the returns to thinking are logarithmic.
# Maybe the cost of manufacturing a paperclip after you’ve expended r effort on
# researching paperclip manufacturing is 1/log(r).
# Now if you have xx total resources, the total paperclip manufacture you get done is

paperclips = (x - r) * log(r)

# this is optimized when

[optimal_r] = solve(diff(paperclips, r), r)

print(optimal_r)
