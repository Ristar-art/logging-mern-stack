const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  biography: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  jobPosition: { type: String, required: true },
  //image: { type: String, required: true }, // Store the image path as a string.
}, { collection: 'user-data' });

const User = mongoose.model('UserData', UserSchema);

module.exports = User;
