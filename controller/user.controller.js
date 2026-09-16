const userServices = require("../services/user.service");

class userController {
  async getAll(req, res) {
    try {
      const users = await userServices.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal menarik data",
      });
    }
  }

  async getById(req, res) {
    const userId = req.params.id;
    try {
      const users = await userServices.getUserById(userId);
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      if (error.message === "USER_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "User tidak ditemukan",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Gagal menarik data",
      });
    }
  }

  async create(req, res) {
    try {
      const userData = await userServices.createUser(req.body);
      res.status(201).json({
        success: true,
        message: "User baru telah ditambahkan",
        userId: userData,
      });
    } catch (error) {
      if (error.message === "VALIDATION_ERROR") {
        return res.status(400).json({
          success: false,
          message: "data tidak boleh kosong",
        });
      }

      if (error.message === "EMAIL_ALREADY_EXISTS") {
        return res.status(409).json({
          success: false,
          message: "Email sudah terdaftar, gunakan email lain",
        });
      }
      res.status(500).json({
        success: false,
        message: "Gagal menyimpan data",
      });
    }
  }

  async update(req, res) {
    try {
      await userServices.updateUser(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Sukses update data",
      });
    } catch (error) {
      if (error.message === "UPDATE_FAILED") {
        return res.status(400).json({
          success: false,
          message: "Gagal update data",
        });
      }

      if (error.message === "USER_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "user tidak ditemukan",
        });
      }

      if (error.message === "VALIDATION_ERROR") {
        return res.status(400).json({
          success: false,
          message: "Data tidak valid",
        });
      }

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      await userServices.deleteUser(req.params.id);
      res.status(200).json({
        success: true,
        message: "Berhasil hapus data",
      });
    } catch (error) {
      if (error.message === "DELETE_FAILED") {
        res.status(400).json({
          success: false,
          message: "Gagal menghapus user",
        });
      }

      if (error.message === "USER_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "user tidak ditemukan",
        });
      }

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new userController();
