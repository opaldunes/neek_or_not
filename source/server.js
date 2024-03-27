const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

// Database configuration
const config = {
  user: 'sqlserver',
  password: 'brawlstars',
  server: '34.38.131.91', // Public IP address of your SQL Server
  database: 'users_databse',
  options: {
    encrypt: true // For Azure SQL Database
  }
};

// Middleware
app.use(bodyParser.json());

// Register endpoint
app.post('/api/users/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Hash password
    const hash = await bcrypt.hash(password, 10);
    // Connect to the database
    await sql.connect(config);
    // Store username and hashed password in the database
    const result = await sql.query`INSERT INTO users (username, password) VALUES (${username}, ${hash})`;
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    sql.close();
  }
});

// Login endpoint
app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Connect to the database
    await sql.connect(config);
    // Retrieve user from the database
    const result = await sql.query`SELECT * FROM users WHERE username = ${username}`;
    const user = result.recordset[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // Generate JWT token
    const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    sql.close();
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
