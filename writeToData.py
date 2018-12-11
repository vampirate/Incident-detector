import sys
import json

suburb = str(sys.argv[1])
postcode = str(sys.argv[2])
temp = str(sys.argv[3])
pressure = str(sys.argv[4])
photo = str(sys.argv[5])

f = open('data.csv', 'a')
string = suburb + "," + postcode + "," + temp + "," + pressure + "," + photo + "\n"
f.tell
f.write(string)
f.close()

print(postcode)
