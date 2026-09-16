const express = require("express");
// const db = require("../config/db");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

module.exports = router;

// router.get("/users", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM users");
//     res.status(200).json({
//       success: true,
//       data: rows,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Gagal menarik data dari db",
//     });
//   }
// });

// router.get("/users/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
//     res.status(200).json({
//       success: true,
//       data: rows,
//     });
//   } catch (error) {}
// });

// router.post("/users", async (req, res) => {
//   const { name, email, age } = req.body;
//   try {
//     if (name.length === 0 || email.length === 0 || age === 0) {
//       res.status(400).json({
//         success: false,
//         message: "data tidak boleh kosong",
//       });
//     }

//     const querySql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
//     const [result] = await db.query(querySql, [name, email, age]);

//     res.status(201).json({
//       success: true,
//       message: "User baru sukses ditambahkan",
//       userId: result.userId,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Gagal menyimpan data",
//     });
//   }
// });

// router.put("/users/:id", async (req, res) => {
//   const id = req.params.id;
//   const { name, email, age } = req.body;
//   try {
//     const querySql =
//       "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?";
//     const [result] = await db.query(querySql, [name, email, age, id]);

//     if (result.affectedRows === 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Gagal update data" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Berhasil update data",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// router.delete("/users/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const [rows] = await db.query("DELETE FROM users WHERE id = ?", [id]);

//     res.status(200).json({
//       success: true,
//       message: "Berhasil hapus user",
//       data: rows,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });
