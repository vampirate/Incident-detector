import sys
import json

postcode = str(sys.argv[1])
weather = str(sys.argv[2])
color = str(sys.argv[3])

f = open('data.csv', 'a')
string = postcode + "," + weather + "," + color + "\n"
f.write(string)  # Give your csv text here.
## Python will convert \n to os.linesep
f.close()

print(postcode)
