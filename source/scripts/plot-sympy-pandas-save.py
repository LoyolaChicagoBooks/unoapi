import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import sympy as sp
import re

# Define the symbolic function
x = sp.Symbol('x')
f_sym = (x - 2) * (x - 50) * (x - 80)
f_lambda = sp.lambdify(x, f_sym, 'numpy')

# Convert the symbolic expression to a sanitized string for filename
filename = str(f_sym)
filename = re.sub(r'[\*\^\(\)/\+\-\s]', '_', filename) + ".csv"

# Define the range
a, b = 0, 100
n = 10  # number of trapezoids
h = (b - a) / n
x_trapezoids = np.linspace(a, b, n+1)

# Populate DataFrame
data = {
    'x_left': x_trapezoids[:-1],
    'x_right': x_trapezoids[1:],
}
data['y_left'] = f_lambda(data['x_left'])
data['y_right'] = f_lambda(data['x_right'])
data['area'] = 0.5 * h * (data['y_left'] + data['y_right'])

df = pd.DataFrame(data)

# Save DataFrame to CSV
df.to_csv(filename, index=False)

# Plotting
plt.figure(figsize=(10,6))
x_vals = np.linspace(a, b, 1000)
plt.plot(x_vals, f_lambda(x_vals), 'b-', label=f'$f(x) = {sp.latex(f_sym)}$')

for index, row in df.iterrows():
    x0, x1 = row['x_left'], row['x_right']
    y = [row['y_left'], row['y_right']]
    plt.fill_between([x0, x1], y, color='skyblue', alpha=0.4)
    plt.plot([x0, x1], y, 'r-')
    plt.plot([x0, x0], [0, row['y_left']], 'r-')
    plt.plot([x1, x1], [0, row['y_right']], 'r-')

plt.title(f'Trapezoidal Integration of $f(x) = {sp.latex(f_sym)}$')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.legend()
plt.grid(True)
plt.show()

print(f"Data saved to {filename}")

