const bcrypt = require("bcryptjs");
// This line imports bcryptjs for hashing and checking passwords.

const jwt = require("jsonwebtoken");
// This line imports jsonwebtoken for creating login tokens.

const User = require("../Models/UserModel");
// This line imports the User model for user database actions.

const createToken = (userId) => {
  // This line creates a helper function for making a JWT token.
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
  // This line signs the user id into a token that expires in one day.
};
// This line ends the createToken helper.

const registerUser = async (req, res) => {
  // This line creates the register controller.
  try {
    // This line starts a try block for safe error handling.
    const { name, email, password, phone, role } = req.body;
    // This line reads user form data from the request body.
    const userExists = await User.findOne({ email });
    // This line checks if the email is already registered.
    if (userExists) {
      // This line checks if a matching user was found.
      return res.status(400).json({ message: "User already exists" });
      // This line sends an error when the email already exists.
    }
    // This line ends the existing-user check.
    const salt = await bcrypt.genSalt(10);
    // This line creates salt to make the password hash stronger.
    const hashedPassword = await bcrypt.hash(password, salt);
    // This line converts the plain password into a secure hash.
    const user = await User.create({ name, email, password: hashedPassword, phone, role });
    // This line saves the new user in MongoDB.
    const token = createToken(user._id);
    // This line creates a login token for the new user.
    res.status(201).json({
      // This line sends a success response with user data.
      token,
      // This line sends the token to the frontend.
      user: {
        // This line starts the safe user object.
        id: user._id,
        // This line sends the user id.
        name: user.name,
        // This line sends the user name.
        email: user.email,
        // This line sends the user email.
        phone: user.phone,
        // This line sends the user phone number.
        password:user.password,
        role: user.role
        // This line sends the user role.
      }
      // This line ends the safe user object.
    });
    // This line ends the JSON response.
  } catch (error) {
    // This line catches register errors.
    res.status(500).json({ message: error.message });
    // This line sends the error message to the frontend.
  }
};
// This line ends the registerUser controller.

const loginUser = async (req, res) => {
  // This line creates the login controller.
  try {
    // This line starts a try block for safe error handling.
    const { email, password } = req.body;
    // This line reads email and password from the request body.
    const user = await User.findOne({ email });
    // This line searches MongoDB for a user with the entered email.
    if (!user) {
      // This line checks if no user was found.
      return res.status(401).json({ message: "Invalid email or password" });
      // This line sends a login error without revealing which value was wrong.
    }
    // This line ends the missing-user check.
    const passwordMatch = await bcrypt.compare(password, user.password);
    // This line compares the entered password with the saved hashed password.
    if (!passwordMatch) {
      // This line checks if the password is wrong.
      return res.status(401).json({ message: "Invalid email or password" });
      // This line sends a login error when the password is wrong.
    }
    // This line ends the password check.
    const token = createToken(user._id);
    // This line creates a token after successful login.
    res.json({
      // This line sends a success response with token and user data.
      token,
      // This line sends the token to the frontend.
      user: {
        // This line starts the safe user object.
        id: user._id,
        // This line sends the user id.
        name: user.name,
        // This line sends the user name.
        email: user.email,
        // This line sends the user email.
        phone: user.phone,
        // This line sends the user phone number.
        role: user.role
        // This line sends the user role.
      }
      // This line ends the safe user object.
    });
    // This line ends the JSON response.
  } catch (error) {
    // This line catches login errors.
    res.status(500).json({ message: error.message });
    // This line sends the error message to the frontend.
  }
};
// This line ends the loginUser controller.

const getProfile = async (req, res) => {
  // This line creates the profile controller.
  res.json(req.user);
  // This line sends the logged-in user that was added by the protect middleware.
};
// This line ends the getProfile controller.

module.exports = { registerUser, loginUser, getProfile };
// This line exports the user controllers for the auth routes.
