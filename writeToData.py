import sys
import json

suburb = str(sys.argv[1])
postcode = str(sys.argv[2])
lat = str(sys.argv[3])
lon = str(sys.argv[4])
temp = str(sys.argv[5])
pressure = str(sys.argv[6])
photo = str(sys.argv[7])
time = str(sys.argv[8])
device = str(sys.argv[9])

f = open('data.csv', 'a')
string = suburb + "," + postcode + "," + lat + "," + lon + "," + temp + "," + pressure + "," + photo + "," + time + "," + device + "\n"
f.tell
f.write(string)
f.close()

print(postcode)
