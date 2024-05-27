// app.use(session({
//     secret: secret, // Use the generated secret key
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 60 * 60 * 1000, // 1 hour
//         secure: false, // For development, set to true if you have https setup
//         httpOnly: true
//     }
// }));
console.log("start");
const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const cors = require('cors');
const session = require('express-session');
const crypto = require('crypto'); // Import crypto
const MySQLStore = require('express-mysql-session')(session);

const app = express();
const port = 3000;
app.use(express.json());
// Generate a secret key
const secret = crypto.randomBytes(32).toString('hex');

app.use(cors({
    origin: '*', // Replace with your development server origin
    credentials: true // Allow cookies to be sent with requests from the client
}));

const options = {
	host: 'localhost',
    user: 'ihashirr',
    password: 'Iamhashir@42',
    database: 'codesmith',
	schema: {
        tableName: 'my_sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
const sessionStore = new MySQLStore(options);
 

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'ihashirr',
    password: 'Iamhashir@42',
    database: 'codesmith'
});

app.use(express.urlencoded({ extended: true }));
console.log("sigin");
app.post('/register', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('signup route hit');
    console.log('Request body:', req.body);
    // Basic input validation (replace with more robust validation later)
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const connection = await pool.getConnection();
        const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt for secure password hashing
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        const [results] = await connection.query(sql, [email, hashedPassword]);

        if (results.affectedRows === 1) {
            res.send('Registration successful!');
        } else {
            res.status(500).send('Registration failed');
        }

        connection.release();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});
console.log("username");
app.post('/login', async (req, res) => {
    console.log('Login route hit');
    console.log('Request body:', req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log('Password:', password);
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }
    try {
        const connection = await pool.getConnection();
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [users] = await connection.query(sql, [email]);
        if (users.length === 0) {
            res.status(401).send('Invalid email or password');
        } else {
            const user = users[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                req.session.email = email;
				res.send('Logged in!');
				console.log("logged in");
                // res.redirect('http://localhost:3001/'); // Redirect to localhost:3000/ after successful login
            } else {
                res.status(401).send('Invalid email or password');
            }
        }
        connection.release();
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});
function isAuthenticated(req, res, next) {
    if (req.session && req.session.username) {
        next();
    } else {
        res.status(401).send('You must be logged in to access this page');
    }
}
app.get('/protected', isAuthenticated, (req, res) => {
    res.send('Welcome to the protected page!');
});
app.get('/logouts', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out.');
        } else {
            return res.redirect('http://127.0.0.1:5500/index.html');
        }
    });
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
