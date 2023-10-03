#!/usr/bin/env python
import numpy as np
import matplotlib.pyplot as plt
import math

def f(x):
    return (x - 2) * (x - 50) * (x - 80) + 20000

# Define the range
a, b = 0, 100
n = 10  # number of trapezoids; using fewer to clearly visualize each trapezoid
h = (b - a) / n
x = np.linspace(a, b, 1000)
x_trapezoids = np.linspace(a, b, n+1)

plt.figure(figsize=(10,6))
plt.plot(x, f(x), 'b-', label='f(x) = $x^3 + 3x^2 + 3x - 10$')

# Plot trapezoids
for i in range(n):
    x0 = x_trapezoids[i]
    x1 = x_trapezoids[i+1]
    y = [f(x0), f(x1)]
    plt.fill_between([x0, x1], y, color='skyblue', alpha=0.4)
    plt.plot([x0, x1], y, 'r-')
    plt.plot([x0, x0], [0, f(x0)], 'r-')  # left vertical line
    plt.plot([x1, x1], [0, f(x1)], 'r-')  # right vertical line

plt.title('Trapezoidal Integration of $f(x) = x^3 + 3x^2 + 3x - 10$')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.legend()
plt.grid(True)
plt.show()

