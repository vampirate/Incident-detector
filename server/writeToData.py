import sys
import json

suburb = str(sys.argv[1])
postcode = str(sys.argv[2])
weather = str(sys.argv[3])
color = str(sys.argv[4])

f = open('data.csv', 'a')
string = suburb + "," + postcode + "," + weather + "," + color + "\n"
f.tell
f.write(string)
f.close()

print(postcode)
