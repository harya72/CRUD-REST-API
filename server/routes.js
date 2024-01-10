import express from "express";
import usersData from "./data/data.js";

let users = usersData;

// Initialize a counter for generating unique IDs
let userIdCounter = users.length

const router = express.Router();

// Getting users data from the database.
router.get("/users", (req, res) => {
  res.send(users);
});

// Posting data to the database
router.post("/users", (req, res) => {
  const user = req.body;

  // Assign a unique ID to the user
  user.id = userIdCounter++;

  // console.log(user);
  users.push(user);
  // console.log(user.name, user.age, user.email);
  res.send(users);
});

// Deleting user from the database
router.delete("/users/:id", (req, res) => {
  users = users.filter((user) => {
    return parseInt(req.params.id) !== user.id;
  });

  res.send({ message: 'User deleted successfully' });
});


  

// PATCH request to update user by ID
router.patch("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedFields = req.body;

  // Find the user by ID
  const userToUpdate = users.find((user) => user.id === userId);

  if (!userToUpdate) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update only the specified fields
  Object.assign(userToUpdate, updatedFields);

  console.log("User updated successfully");
  res.json(userToUpdate);
});

export default router;
