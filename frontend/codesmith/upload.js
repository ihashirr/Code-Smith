// pages/api/upload.js
import mysql from 'mysql';

export default async (req, res) => {
  if (req.method === 'POST') {
    // Create a connection to the database
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'ihashirr',
      password: 'Iamhashir@42',
      database: 'codesmith'
    });

    // Connect to the database
    connection.connect();

    console.log('Request body:', req.body);

    // Define your SQL query
    const sql = 'INSERT INTO user_data SET ?';

    // Execute the SQL query
    connection.query(sql, req.body, (error, results) => {
      console.log('SQL query results:', results);

      if (error) {
        res.status(500).json({ message: 'An error occurred.' });
      } else {
        res.status(200).json({ message: 'Data uploaded successfully.' });
      }
    });

    // End the connection
    connection.end();
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed.' });
  }
};