import User from "../models/user.js";

import limitUserFields from "../helpers/limitUserFields.js";
import CustomError from "../errors/customError.js";

const create = async (req, res, next) => {
  try {
    const user = await new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    await user.save();
    res.status(201).json({ message: "added!" });
  } catch (err) {
    let error;
    if (err.code == "11000") {
      error = new CustomError("Email is in use!", 400);
    } else {
      error = new CustomError("Internal server error!", 500);
    }
    return next(error);
  }
};

const find = async (req, res, next) => {
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
    const error = new CustomError("Internal server error!", 500);
    return next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new CustomError("User not found!", 404);
      return next(error);
    }
    res.status(200).json({
      user: limitUserFields(user),
    });
  } catch (err) {
    const error = new CustomError("Internal server error!", 500);
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      const error = new CustomError("User not found!", 404);
      return next(error);
    }
    res.status(200).json({ user: limitUserFields(updatedUser) });
  } catch (err) {
    let error;
    if (err.code == "11000") {
      error = new CustomError("Email is in use!", 400);
    } else {
      error = new CustomError("Internal server error!", 500);
    }
    return next(error);
  }
};

const deletedUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      const error = new CustomError("User not found!", 404);
      return next(error);
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    const error = new CustomError("Internal server error!", 500);
    return next(error);
  }
};

export { create, find, get, update, deletedUser };
