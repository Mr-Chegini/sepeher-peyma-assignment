import * as userController from "../api/controllers/user.controller.js";
import User from "../api/models/user.js";

describe("User Controller", () => {
  // Mocking User model methods
  jest.mock("../api/models/user.js", () => ({
    findById: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }));

  // Test cases for create method
  describe("create", () => {
    test("should create a new user", async () => {
      const req = {
        body: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mocking save method of User model
      User.prototype.save = jest.fn().mockResolvedValueOnce({});

      await userController.create(req, res);

      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "added!" });
    });

    test("should handle error if user already exists", async () => {
      const req = {
        body: {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      // Mocking save method of User model to throw an error with code 11000
      User.prototype.save = jest.fn().mockRejectedValueOnce({ code: 11000 });

      await userController.create(req, res);

      expect(res.send).toHaveBeenCalledWith("Email is in use!");
    });
  });

  // Test cases for find method
  describe("find", () => {
    test("should return paginated list of users", async () => {
      const req = { query: { page: 1, limit: 10 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mocking User model methods
      User.find = jest
        .fn()
        .mockReturnValueOnce([{ name: "User 1" }, { name: "User 2" }]);
      User.countDocuments = jest.fn().mockResolvedValueOnce(20);

      await userController.find(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(User.countDocuments).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        users: [{ name: "User 1" }, { name: "User 2" }],
        totalPages: 2,
        currentPage: 1,
      });
    });

    test("should handle error if database query fails", async () => {
      const req = { query: { page: 1, limit: 10 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mocking User model methods to throw an error
      User.find = jest.fn().mockRejectedValueOnce(new Error("Database error"));

      await userController.find(req, res);

      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  // Test cases for get method
  describe("get", () => {
    test("should return user details", async () => {
      const req = { params: { id: "user_id" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mocking findById method of User model
      User.findById = jest.fn().mockResolvedValueOnce({ name: "User 1" });

      await userController.get(req, res);

      expect(User.findById).toHaveBeenCalledWith("user_id");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ name: "User 1" });
    });

    test("should handle error if user is not found", async () => {
      const req = { params: { id: "user_id" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mocking findById method of User model to return null
      User.findById = jest.fn().mockResolvedValueOnce(null);

      await userController.get(req, res);

      expect(User.findById).toHaveBeenCalledWith("user_id");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    test("should handle error if database query fails", async () => {
      const req = { params: { id: "user_id" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mocking findById method of User model to throw an error
      User.findById = jest
        .fn()
        .mockRejectedValueOnce(new Error("Database error"));

      await userController.get(req, res);

      expect(User.findById).toHaveBeenCalledWith("user_id");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  // Test cases for update method
  describe("update", () => {
    test("should update user details", async () => {
      const req = { params: { id: "user_id" }, body: { name: "Updated User" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mocking findByIdAndUpdate method of User model
      User.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValueOnce({ name: "Updated User" });

      await userController.update(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "user_id",
        { name: "Updated User" },
        { new: true, runValidators: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ name: "Updated User" });
    });

    test("should handle error if user is not found", async () => {
      const req = { params: { id: "user_id" }, body: { name: "Updated User" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mocking findByIdAndUpdate method of User model to return null
      User.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);

      await userController.update(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "user_id",
        { name: "Updated User" },
        { new: true, runValidators: true }
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    test("should handle error if database query fails", async () => {
      const req = { params: { id: "user_id" }, body: { name: "Updated User" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mocking findByIdAndUpdate method of User model to throw an error
      User.findByIdAndUpdate = jest
        .fn()
        .mockRejectedValueOnce(new Error("Database error"));

      await userController.update(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "user_id",
        { name: "Updated User" },
        { new: true, runValidators: true }
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  // Test cases for deletedUser method
  describe("deletedUser", () => {
    test("should delete user", async () => {
      const req = { params: { id: "user_id" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mocking findByIdAndDelete method of User model
      User.findByIdAndDelete = jest.fn().mockResolvedValueOnce({});

      await userController.deletedUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("user_id");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User deleted successfully",
      });
    });

    test("should handle error if user is not found", async () => {
      const req = { params: { id: "user_id" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mocking findByIdAndDelete method of User model to return null
      User.findByIdAndDelete = jest.fn().mockResolvedValueOnce(null);

      await userController.deletedUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("user_id");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    test("should handle error if database query fails", async () => {
      const req = { params: { id: "user_id" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Mocking findByIdAndDelete method of User model to throw an error
      User.findByIdAndDelete = jest
        .fn()
        .mockRejectedValueOnce(new Error("Database error"));

      await userController.deletedUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("user_id");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});
