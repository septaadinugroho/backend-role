const userRepository = require("../repositories/user.repositories");

class userServices {
  async getAllUsers() {
    return await userRepository.findAll();
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error("USER_NOT_FOUND");
    return user;
  }

  async createUser(data) {
    const { name, email, age } = data;

    if (!name || !email || !age || age <= 0) {
      throw new Error("VALIDATION_ERROR");
    }

    const isEmailExist = await userRepository.findByEmail(email);
    if (isEmailExist) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    return await userRepository.create(name, email, age);
  }

  async updateUser(id, data) {
    const { name, email, age } = data;

    if (!name || !email || !age || age <= 0) {
      throw new Error("VALIDATION_ERROR");
    }

    const isUserExist = await userRepository.findById(id);

    if (!isUserExist) {
      throw new Error("USER_NOT_FOUND");
    }

    const isUpdated = await userRepository.update(id, name, email, age);

    if (!isUpdated) {
      throw new Error("UPDATE_FAILED");
    }

    return { id, name, email, age };
  }

  async deleteUser(id) {
    const isUserExist = await userRepository.findById(id);

    if (!isUserExist) {
      throw new Error("USER_NOT_FOUND");
    }

    const isDeleted = await userRepository.delete(id);
    if (!isDeleted) throw new Error("DELETE_FAILED");

    return true;
  }
}

module.exports = new userServices();
