const db = require("./db");

async function createTables() {
  try {
    const querySql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        age INT NOT NULL CHECK (age > 0),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await db.query(querySql);
    console.log("🟢 Tabel 'users' berhasil dibuat atau sudah tersedia.");
  } catch (error) {
    console.error("🔴 Gagal membuat tabel:", error);
  }
}

module.exports = createTables;
