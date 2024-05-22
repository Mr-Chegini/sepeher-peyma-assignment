import User from "../models/user.js";

import limitUserFields from "../helpers/limitUserFields.js";

const create = async (req, res) => {
  try {
    const user = await new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    await user.save();
    res.status(201).json({ message: "added!" });
  } catch (err) {
    console.log(err);
    if (err.code == "11000") {
      res.send("Email is in use!");
    }
  }
};

const find = async (req, res) => {
  try {
    const { email, name } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const emailRegex = email ? new RegExp(email, "i") : null;
    const nameRegex = name ? new RegExp(name, "i") : null;

    const query = {};
    if (emailRegex) {
      query.email = emailRegex;
    }
    if (nameRegex) {
      query.name = nameRegex;
    }

    const sortField = req.query.sortField || "createdAt";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
    const sortOptions = {};
    sortOptions[sortField] = sortOrder;

    const users = await User.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      users: users.map((user) => limitUserFields(user)),
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user: limitUserFields(user),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: limitUserFields(updatedUser) });
  } catch (err) {
    console.log(err);
    if (err.code == "11000") {
      res.send("Email is in use!");
    }
  }
};

const deletedUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
export { create, find, get, update, deletedUser };
