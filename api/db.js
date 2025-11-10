const { Pool } = require('pg');
const path = require('path');
// Memuat .env dari direktori root proyek
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

let connectionString = process.env.DATABASE_URL;

// Menambahkan sslmode=require jika belum ada di connection string
if (connectionString && !/sslmode/i.test(connectionString)) {
  connectionString += "?sslmode=require";
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // Diperlukan untuk beberapa koneksi ke Vercel/Neon
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
