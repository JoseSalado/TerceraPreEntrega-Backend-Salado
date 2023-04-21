import User from "../mongo/models/users.models.js";

class UserManager {
  async get() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id){
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async findOne(email){
    try {
      const user = await User.findOne(email);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async create(userInfo) {
    try {
      const newUser = await User.create(userInfo);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  async updateOne(email, encryptedPass){
    try {
      const newUser = await User.updateOne({email}, {password: encryptedPass})
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserManager;