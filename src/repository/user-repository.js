const { where } = require("sequelize");
const { User } = require("../models/index");

class UserRepository {
  async create(data) {
    try {
      console.log("data",data);
      const user = await User.create(data);
      console.log("sfkjsldfjs",user);
      return user;
    } catch (error) {
      console.log("Something went wrong at user repository");
      throw error;
    }
  }

  async delete(id) {
    try {
      await User.destroy({ where: { id: id } });
      return true;
    } catch (error) {
      console.log("Something went wrong at user repository");
      throw error;
    }
  }
}

module.exports = UserRepository;
