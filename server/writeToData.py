import sys
import json

postcode = str(sys.argv[1])
weather = str(sys.argv[2])
color = str(sys.argv[3])

f = open('data.csv', 'a')
string = postcode + "," + weather + "," + color + "\n"
f.tell
f.write(string)
f.close()

print(postcode)
