import { createPool } from 'mysql2/promise';

const connectionPool = createPool({
  host: 'localhost', // Replace with your MySQL host
  user: 'ihashirr', // Replace with your MySQL username
  password: 'Iamhashir@42', // Replace with your MySQL password (avoid storing in plain text)
  database: 'codesmith', // Replace with your database name
});

export async function connectToDatabase() {
  try {
    const connection = await connectionPool.getConnection();
    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw new Error('Database connection error'); // Re-throw for API route handler
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, column1, column2, column3 } = req.body; // Destructure data from request body

  let db; // Declare db variable outside the try block

  try {
    db = await connectToDatabase();

    // Prepare parameterized SQL statement to prevent SQL injection
    const query = `
      INSERT INTO user_data (name, column1, column2, column3)
      VALUES (?, ?, ?, ?)
    `;
    const values = [name, column1, column2, column3];

    await db.query(query, values);

    return res.status(200).json({ message: 'User data inserted successfully!' });
  } catch (error) {
    console.error('Error inserting data:', error);
    return res.status(500).json({ message: 'Failed to insert user data' });
  } finally {
    if (db) {
      await db.release();
    }
  }
}
