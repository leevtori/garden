from mysql.connector import connect

sql = '''CREATE TABLE IF NOT EXISTS garden.Flower(
    id integer PRIMARY KEY AUTO_INCREMENT,
    name text NOT NULL, 
    file_path text NOT NULL); '''

conn = connect(user = "root", host = "localhost")

c = conn.cursor()
try:
    c.execute("CREATE DATABASE garden")
except: 
    print("Database already exists!")

c.execute(sql)
c.close()
conn.commit()
conn.close()
