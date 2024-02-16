const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // chech if user email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'user email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    await new userModel(req.body).save();
    res
      .status(201)
      .send({
        statuscode: 201,
        message: "User registered successfully!",
      });
  } catch (err) {
    res.status(400).send({ statuscode: 400, message: err.message });
    console.log("signup error", err);
  }
}

// super admin login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email }).lean();
    if (!user) {
      return res
        .status(404)
        .send({ statuscode: 404, message: "User not registered!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }
    const token = jwt.sign({ email: user.email, role: user.role }, "privateKey", { expiresIn: '1h' });

    user = await userModel
      .findOneAndUpdate({ email: user.email }, { token }, { new: true })
      .lean();

    res 
      .status(200)
      .send({ statuscode: 200, message: "Successfully Logged in!", data: token });
  } catch (err) {
    res.status(404).send({ statuscode: 404, message: err.message });
  }
};

module.exports = {
  signup,
  login
};