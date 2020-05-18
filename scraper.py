from bs4 import BeautifulSoup
from mysql.connector import connect
from urllib.parse import urlparse
import mysql.connector, string, urllib.request, os
from urllib.request import urlopen
import threading, time, logging, concurrent.futures

#make image folder
cwd = os.getcwd()
path = cwd+'/images/'
try: 
    os.mkdir(path)
except OSError as error:
    print("folder already exists!")

#download image function
def dl_img(url, file_name):
    u = urlparse(url)
    url = f'{u.scheme}://{u.netloc}/{urllib.parse.quote(u.path)}'
    location = path + file_name + '.jpg'
    print(f"Saving {url} to {location}.")
    urllib.request.urlretrieve(url, location)

def dl_data(letter):
    url = baseurl+letter+'/'
    html = urlopen(url).read()
    soup = BeautifulSoup(html, "lxml")
    containers = soup.findAll("div", {"class": "item-thumb-wrap"})
    flowers = []
    for container in containers:
        img = container.find("img")
        url = img['src']
        name = img['alt']

        dl_img(url, name)

        flower = (name, path+name)
        flowers.append(flower)
    print(flowers)   
    c.executemany(sql, flowers) 

conn = connect(
    database = "garden",
    user = "root", 
    host = "localhost")

c = conn.cursor()

sql = ''' INSERT INTO Flower(name, file_path)
    VALUES (%s, %s) '''

baseurl = "https://www.atozflowers.com/letter/"
alphabet = string.ascii_lowercase[:26]

#multi threading
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executer:
    executer.map(dl_data, alphabet)

conn.commit()
conn.close()



