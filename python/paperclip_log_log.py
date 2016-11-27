from scipy.optimize import minimize_scalar
from math import log

def get_cost_for_x(x):
    def cost(r):
        return - (x - r) * log(log(r))

    return minimize_scalar(cost, bounds=(0, x), method='bounded').x

for i in range(2, 101):
    print(i, get_cost_for_x(10**i))
