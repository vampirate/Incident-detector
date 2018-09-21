import sys
import json

weather = str(sys.argv[2])
postcode = str(sys.argv[1])

f = open('data.csv', 'a')
string = postcode + "," + weather + "\n"
f.write(string)  # Give your csv text here.
## Python will convert \n to os.linesep
f.close()

print(postcode)
