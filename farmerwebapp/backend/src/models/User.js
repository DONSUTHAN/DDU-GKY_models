const bcrypt = require("bcryptjs");
// Loads bcrypt so user passwords can be hashed and compared safely.
const mongoose = require("mongoose");
// Loads Mongoose so we can define the user schema and model.

const userSchema = new mongoose.Schema(
  // Creates the structure for user documents in MongoDB.
  {
    // Starts the list of fields stored for each user.
    name: {
      // Defines the user's display name field.
      type: String,
      // Stores the name as text.
      required: true,
      // Requires every user to have a name.
      trim: true
      // Removes extra spaces from the start and end of the name.
    },
    email: {
      // Defines the user's email field.
      type: String,
      // Stores the email as text.
      required: true,
      // Requires every user to have an email.
      unique: true,
      // Prevents two users from registering with the same email.
      lowercase: true,
      // Saves the email in lowercase.
      trim: true
      // Removes extra spaces from the start and end of the email.
    },
    password: {
      // Defines the user's password field.
      type: String,
      // Stores the hashed password as text.
      required: true,
      // Requires every user to have a password.
      minlength: 6,
      // Requires passwords to be at least six characters.
      select: false
      // Hides the password field from normal database queries.
    },
    role: {
      // Defines what type of user this account is.
      type: String,
      // Stores the role as text.
      enum: ["farmer", "consumer", "admin"],
      // Allows only these role values.
      default: "consumer"
      // Makes new users consumers unless another role is provided.
    },
    phone: String,
    // Stores the user's phone number as optional text.
    location: String
    // Stores the user's location as optional text.
  },
  { timestamps: true }
  // Automatically adds createdAt and updatedAt fields.
);

userSchema.pre("save", async function hashPassword(next) {
  // Runs this function before saving a user document.
  if (!this.isModified("password")) {
    // Checks whether the password was changed.
    return next();
    // Skips hashing when the password was not changed.
  }

  this.password = await bcrypt.hash(this.password, 12);
  // Replaces the plain password with a secure hash.
  next();
  // Continues the save operation.
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  // Adds a method that compares a login password to the stored hash.
  return bcrypt.compare(candidatePassword, this.password);
  // Returns true when the password matches and false when it does not.
};

const User = mongoose.model("User", userSchema);
// Creates the User model from the schema.

module.exports = { User };
// Exports the User model for controllers and middleware.
