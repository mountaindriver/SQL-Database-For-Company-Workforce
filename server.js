const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: 'root',
    // TODO: Add MySQL Password
    password: 'MbU<2xumqL',
    database: 'books_db'
  },
  console.log(`Connected to the books_db database.`)
);

// Query database using COUNT() and GROUP BY
db.query('', function (err, results) {
  console.log(results);
});

// Query database using SUM(), MAX(), MIN() AVG() and GROUP BY
db.query('', function (err, results) {
  console.log(results);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
