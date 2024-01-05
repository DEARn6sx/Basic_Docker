const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 8000;

let conn; // Declare the conn variable

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'db', // หรือใส่เป็น localhost ก็ได้
    user: 'root',
    password: 'root',
    database: 'tutorial',
  });
};

app.get('/hello-world', (req, res) => {
  res.send('hello world');
});

// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users', async (req, res) => {
  try {
    if (!conn) {
      // If conn is not initialized, call initMySQL
      await initMySQL();
    }

    const [results] = await conn.query('SELECT * FROM users');
    res.json(results);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
