from sympy import *

# Part 0: some variables. First we define the tax rate and the UBI
nontax_rate, ubi = symbols("nontax_rate ubi", positive = True)

## Part 1: How much do invididuals work, given a tax rate and UBI?
# First we find the optimal hours worked for an individual by
# differentiating utility with respect to hours worked and solving for 0:""")

hours, wage = symbols("hours wage", positive = True)

pre_tax_income = hours * wage
post_tax_income = pre_tax_income * nontax_rate + ubi

utility = log(post_tax_income) - hours
print("Utility is", utility)

d_utility_on_d_h = diff(utility, hours)
print("d utility/dh is", d_utility_on_d_h)

[optimal_h] = solve(d_utility_on_d_h, hours)
print("optimal hours worked is", optimal_h)

income = (optimal_h * wage).expand()
print("optimal income is", income)

individual_utility = expand_log(log((income * nontax_rate + ubi).expand())) - optimal_h
print("utility for an individual is", individual_utility)


assert income == wage - ubi/nontax_rate

## What's the total income of the whole population? Just the sum of that for everyone in the population!
# total_wage is the total wage of the population
population, total_wage = symbols("population total_wage", positive = True)

total_income = total_wage - population*(ubi/nontax_rate)

print()

## Part 2: Given a tax rate, what is the UBI?
# Definitionally, the UBI is just the total income * the tax rate, divided over the population

ubi_as_function_of_income_and_tax = total_income * (1 - nontax_rate)/population

print("UBI as a function of income and tax is ", ubi_as_function_of_income_and_tax)

# We know that that expression equals ubi. So solve:

[ubi_given_tax_rate] = solveset(ubi_as_function_of_income_and_tax - ubi, ubi)
print("the equilibrium UBI given a tax rate is", ubi_given_tax_rate)

## Part 3: What is the optimal tax rate?

# What is the total utility of the population at this tax rate?
assert individual_utility == log(nontax_rate) - 1 + ubi/nontax_rate * (1/wage) + log(wage)

# We can sum that up across a population, if we separately define our sum of wage reciprocals
# and sum of wage logarithms:

sum_wage_reciprocals, sum_wage_logarithms = symbols("sum_wage_reciprocals sum_wage_logarithms")
total_utility = population * (log(nontax_rate) - 1) + (ubi_given_tax_rate/nontax_rate) * sum_wage_reciprocals + sum_wage_logarithms
print(total_utility)
print("total utility is", total_utility)

print("\nNow let's solve that for optimal tax rate")

total_utility_d_rate = diff(total_utility, nontax_rate)
print("total_utility_d_rate = ", total_utility_d_rate)
[optimal_rate] = solveset(total_utility_d_rate, nontax_rate)
print("optimal rate is", optimal_rate)

## This is the harmonic mean of the wages divided by the arithmetic mean of the wages!
