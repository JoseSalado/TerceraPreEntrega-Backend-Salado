import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = mongoose.Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

const Users = mongoose.model(usersCollection, usersSchema);

export default Users;