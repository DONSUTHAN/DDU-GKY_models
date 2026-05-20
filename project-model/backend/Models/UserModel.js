const mongoose = require("mongoose");
// This line imports mongoose for creating the user schema.

const UserSchema = new mongoose.Schema(
  // This line creates a new schema that describes the user collection.
  {
    // This line starts the object that contains all user fields.
    name: {
      // This line creates the name field.
      type: String,
      // This line says the name value must be text.
      required: true,
      // This line says every user must have a name.
      trim: true
      // This line removes extra spaces before and after the name.
    },
    // This line ends the name field.
    email: {
      // This line creates the email field.
      type: String,
      // This line says the email value must be text.
      required: true,
      // This line says every user must have an email.
      unique: true,
      // This line prevents two users from using the same email.
      lowercase: true,
      // This line stores email in lowercase.
      trim: true
      // This line removes extra spaces before and after the email.
    },
    // This line ends the email field.
    password: {
      // This line creates the password field.
      type: String,
      // This line says the password value must be text.
      required: true,
      // This line says every user must have a password.
      minlength: 6
      // This line requires the password to have at least 6 characters.
    },
    // This line ends the password field.
    phone: {
      // This line creates the phone field.
      type: String,
      // This line says the phone value must be text.
      required: true,
      // This line says every user must have a phone number.
      trim: true
      // This line removes extra spaces before and after the phone number.
    },
    // This line ends the phone field.
    role: {
      // This line creates the role field.
      type: String,
      // This line says the role value must be text.
      enum: ["farmer", "consumer"],
      // This line allows only farmer or consumer as role values.
      default: "consumer"
      // This line makes a new user a consumer if no role is selected.
    }
    // This line ends the role field.
  },
  // This line ends the fields object.
  {
    // This line starts the schema options object.
    timestamps: true
    // This line automatically adds createdAt and updatedAt fields.
  }
  // This line ends the schema options object.
);
// This line ends the UserSchema creation.

module.exports = mongoose.model("User", UserSchema);
// This line creates and exports the User model for the users collection.
