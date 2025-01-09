const { Router } = require("express");
const USERFORMMOdelses = require("../models/Curdmodels");
const USERFORMRouter = Router();

USERFORMRouter.post("/usercreate", async (req, res) => {
  const { name, email, phone, role, language, address, message } = req.body;

  try {
    // Validate required fields
    if (!email || !phone) {
      return res
        .status(400)
        .send({ message: "email, and phone are required!" });
    }

    // Check if a user with the same name, phone, or email already exists
    const existingUser = await USERFORMMOdelses.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(409).send({
        message: "User with the same email, or phone already exists!",
      });
    }

    // Create a new user
    const user = new USERFORMMOdelses({
      name,
      email,
      phone,
      role,
      language,
      address,
      message,
    });

    // Save the user to the database
    await user.save();

    // Respond with success
    res.status(201).send({
      message: "User created successfully!",
      user,
    });
    // console.log("New user created:", user);
  } catch (error) {
    console.error("Error creating user:", error);

    // Detailed error message for database issues
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .send({ message: "Validation Error", error: error.message });
    }

    // Generic server error
    res
      .status(500)
      .send({ message: "An error occurred while creating the user" });
  }
});

// get
USERFORMRouter.get("/userget", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await USERFORMMOdelses.find();

    if (users.length === 0) {
      return res.status(404).send({
        message: "No users found!",
        count: 0,
        users: [],
      });
    }

    // Send a successful response
    res.status(200).send({
      message: "Users retrieved successfully!",
      count: users.length,
      users,
    });
    console.log("Users retrieved:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .send({ message: "An error occurred while retrieving users" });
  }
});
// USER FIND WHIT ID
USERFORMRouter.get("/userget/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the user by ID
    const user = await USERFORMMOdelses.findById(id);

    if (!user) {
      // If the user doesn't exist, send a 404 response
      return res.status(404).send({ message: "User not found!" });
    }

    // Send a successful response with the user data
    res.status(200).send({
      message: "User retrieved successfully!",
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);

    // Handle invalid ObjectID errors
    if (error.kind === "ObjectId") {
      return res.status(400).send({ message: "Invalid user ID format!" });
    }

    // Generic server error
    res
      .status(500)
      .send({ message: "An error occurred while retrieving the user" });
  }
});
// put
USERFORMRouter.put("/userupdate/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    const userupdate = await USERFORMMOdelses.findByIdAndUpdate(
      id,
      payload,
      { new: true } // Ensures the updated document is returned
    );

    if (!userupdate) {
      return res.status(404).send({ message: "User not found!" });
    }

    res.status(200).send({
      message: "User updated successfully!",
      user: userupdate,
    });
    // console.log("User updated:", userupdate);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Error occurred while updating user" });
  }
});

// delete user
USERFORMRouter.delete("/userdelete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userdeleted = await USERFORMMOdelses.findByIdAndDelete(id);

    if (!userdeleted) {
      return res.status(404).send({ message: "User not found!" });
    }

    res.status(200).send({
      message: "User deleted successfully!",
      // user: userdeleted, // Include this if you want to return the deleted user details
    });
    // console.log("User deleted:", userdeleted);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Error occurred while deleting user" });
  }
});
module.exports = USERFORMRouter;
