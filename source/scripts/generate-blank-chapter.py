import sys
import os
import os.path

filename = sys.argv[1]
heading = sys.argv[2]


if os.path.exists(filename):
    print(f"Please delete {filename}")
    exit(1)

with open(filename, "w") as outfile:
    outfile.write(f"{heading}\n")
    sphinx_h = len(heading) * "="
    outfile.write(f"{sphinx_h}\n")



