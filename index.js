const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// ✅ CORS setup
const corsOptions = {
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // preflight fix

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',            // your MySQL username
  password: 'SHAron132657', // your MySQL password
  database: 'school_db'    // your database name
});

db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL!');
});

// ✅ Example route
app.get('/', (req, res) => {
  res.send('🚀 Node.js + MySQL backend is working!');
});

// ✅ Admissions route
app.post('/admissions', (req, res) => {
  const {
    surname, other_names, home_address, lga, state_of_origin,
    dob, age, sex, parent_guardian_name, guardian_address,
    father_phone, mother_phone, religion, previous_school,
    attendance_year, sports, suspended, physical_challenge, emergency_contact
  } = req.body;

  console.log("📩 Incoming data:", req.body); // log data

  const sql = `
    INSERT INTO admissions (
      surname, other_names, home_address, lga, state_of_origin, dob, age, sex,
      parent_guardian_name, guardian_address, father_phone, mother_phone,
      religion, previous_school, attendance_year, sports, suspended,
      physical_challenge, emergency_contact
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    surname, other_names, home_address, lga, state_of_origin,
    dob, age, sex, parent_guardian_name, guardian_address,
    father_phone, mother_phone, religion, previous_school,
    attendance_year, sports, suspended, physical_challenge, emergency_contact
  ], (err, result) => {
    if (err) {
      console.error("❌ DB Error:", err.sqlMessage || err);
      return res.status(500).json({ message: '❌ Failed to save admission' });
    }

    console.log("✅ DB Insert success:", result.insertId);
    res.json({ message: '✅ Admission saved successfully!' });
  });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});