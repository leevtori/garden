from bs4 import BeautifulSoup
from urllib.request import urlopen
from mysql.connector import connect
import mysql.connector, string

conn = connect(
    database = "garden",
    user = "root", 
    host = "localhost")

c = conn.cursor()

sql = ''' INSERT INTO Flower(name, image_url)
    VALUES (%s,%s) '''

baseurl = "https://www.atozflowers.com/letter/"
alphabet = string.ascii_lowercase[:26]

for letter in alphabet:

    url = baseurl+letter+'/'
    html = urlopen(url).read()
    soup = BeautifulSoup(html, "lxml")
    containers = soup.findAll("div", {"class": "item-thumb-wrap"})
    flowers = []
    for container in containers:
        img = container.find("img")
        image = img['src']
        name = img['alt']

        flower = (name, image)
        flowers.append(flower)
    print(flowers)   
    c.executemany(sql, flowers) 

conn.commit()
conn.close()



