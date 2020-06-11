from mysql.connector import connect

sql = '''CREATE TABLE IF NOT EXISTS garden.Flower(
    id integer PRIMARY KEY AUTO_INCREMENT,
    name text NOT NULL, 
    file_path text NOT NULL); '''

conn = connect(user = "root", password = "password", host = "localhost",auth_plugin='mysql_native_password')

c = conn.cursor()
try:
    c.execute("CREATE DATABASE garden")
except: 
    print("Database already exists!")

c.execute(sql)
c.close()
conn.commit()
conn.close()
