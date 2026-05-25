const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  // This line creates a new schema that describes the user collection.
  {
    // This line starts the object that contains all user fields.

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      // This line says every user must have an email.
      unique: true,
      // This line prevents two users from using the same email.
      lowercase: true,
      // This line stores email in lowercase.
      trim: true
    },

    password: {
      // This line creates the password field.
      type: String,
      // This line says the password value must be text.
      required: true,
      // This line says every user must have a password.
      minlength: 6
      // This line requires the password to have at least 6 characters.
    },
    
    phone: {
      // This line creates the phone field.
      type: String,
      // This line says the phone value must be text.
      required: true,
      // This line says every user must have a phone number.
      trim: true
    },

    role: {
      type: String,
      enum: ["farmer", "consumer"],
      // This line allows only farmer or consumer as role values.
      default: "consumer"
      // This line makes a new user a consumer if no role is selected.
    }
  },
  {
    timestamps: true
    // This line automatically adds createdAt and updatedAt fields.
  }
);

module.exports = mongoose.model("User", UserSchema);
// This line creates and exports the User model for the users collection.
