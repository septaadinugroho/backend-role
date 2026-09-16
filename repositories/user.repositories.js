const db = require("../config/db");

class userRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  async create(name, email, age) {
    const querySql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
    const [result] = await db.query(querySql, [name, email, age]);
    return result.insertId;
  }

  async update(id, name, email, age) {
    const querySql =
      "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?";
    const [result] = await db.query(querySql, [name, email, age, id]);
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [rows] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return rows.affectedRows > 0;
  }

  async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }
}

module.exports = new userRepository();
