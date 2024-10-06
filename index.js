const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
var cors = require('cors')


app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));


app.use(express.urlencoded({ extended: true }));

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Endpoint to create tables
app.get('/create-table', (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE
    )
  `;

  const Createstudent = `
    CREATE TABLE IF NOT EXISTS student (
      id INT AUTO_INCREMENT PRIMARY KEY,
      department VARCHAR(100) NOT NULL,
      year  VARCHAR(100) NOT NULL,
      entry_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Execute both table creation queries
  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating users table:', err);
      return res.status(500).send('Error creating users table');
    }
    console.log('Users table created successfully');
  });

  connection.query(Createstudent, (err, results) => {
    if (err) {
      console.error('Error creating student table:', err);
      return res.status(500).send('Error creating student table');
    }
    res.send('Tables created successfully');
  });
});

// Endpoint to insert user and student data
app.post('/Regasa', (req, res) => {
  const { name, email, deparment, year } = req.body;

  if (!name || !email || !department || !year) {
    return res.status(400).send('Name, email, deparment, and year are required');
  }

  const insertUserQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';
  const insertStudentQuery = 'INSERT INTO student (department, year) VALUES (?, ?)';

  // Insert into users table
  connection.query(insertUserQuery, [name, email], (err, userResults) => {
    if (err) {
      console.error('Error inserting into users:', err);
      return res.status(500).send('Error inserting user');
    }

    // Insert into student table after user insertion is done
    connection.query(insertStudentQuery, [deparment, year], (err, studentResults) => {
      if (err) {
        console.error('Error inserting into student:', err);
        return res.status(500).send('Error inserting student');
      }

      // Send success response once both inserts are completed
      res.send('User and Student added successfully');
    });
  });
});

app.get('/regester',(req,res)=>{
  let myquery = `SELECT * FROM users INNER JOIN student ON 
  users.id=student.id
  `

  connection.query(myquery,(err,results)=>{
    if(err){
      console.log(err)
    }
    // console.log(results)
    res.send(results)
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
