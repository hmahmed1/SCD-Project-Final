// Load dependencies
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./db/connection"); // Database connection
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");

// Create express application
const app = express();

// Middleware
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.static("public")); // Serve static files
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(morgan("combined")); // Logging middleware
app.use(
  session({ secret: "yourSecretKey", resave: false, saveUninitialized: true })
); // Session middleware

// MongoDB Schemas and Models
// Define the Item Schema and Model
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  dateCreated: { type: Date, default: Date.now },
});

const Item = mongoose.model("Item", ItemSchema);

// Define the User Schema and Model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  loginTime: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

// Connect to MongoDB
connectDB(); // Establish the MongoDB connection

// Routes
app.get("/", (req, res) =>
  res.render("project_homepage", { title: "Homepage" })
);
app.get("/about", (req, res) => res.render("about", { title: "About Us" }));
app.get("/contact", (req, res) => res.render("contact", { title: "Contact Us" }));
app.get("/review", (req, res) => res.render("review", { title: "Reviews" }));
app.get("/login", (req, res) => res.render("login", { title: "Login" }));
app.get("/menu", (req, res) => res.render("menu", { title: "Menu" }));
app.get("/gallery", (req, res) => res.render("gallery", { title: "Gallery" }));
app.get("/cart", (req, res) => res.render("cart", { title: "CART" }));
app.get("/checkout", (req, res) =>
  res.render("checkout", { title: "CHECKOUT" })
);

// Fetch all items from the database
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find(); // Fetch items
    res.status(200).json(items);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch items", details: err.message });
  }
});

// POST: Add a new item to the database
app.post("/add-item", async (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || !price || stock === undefined) {
    return res
      .status(400)
      .json({ error: "Name, price, and stock are required" });
  }

  try {
    const newItem = new Item({ name, price, stock });
    await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (err) {
    console.error("Error adding item: ", err);
    res.status(500).json({ error: "Error adding item", details: err.message });
  }
});

// POST: Add to Cart
app.post("/add-to-cart", async (req, res) => {
  const { itemId, quantity } = req.body;

  if (!itemId || !quantity) {
    return res.status(400).json({ error: "Item ID and quantity are required" });
  }

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (item.stock < quantity) {
      return res.status(400).json({ error: "Insufficient stock available" });
    }

    item.stock -= quantity;
    await item.save();

    res.status(200).json({
      message: "Item successfully added to cart",
      item: { id: item._id, name: item.name, remainingStock: item.stock },
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res
      .status(500)
      .json({ error: "Error adding to cart", details: err.message });
  }
});

// POST: Login route
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found. Please sign up first." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ error: "Incorrect password. Please try again." });
    }

    req.session.user = user;

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Error logging in user:", err);
    res
      .status(500)
      .json({ error: "Error logging in user", details: err.message });
  }
});

// CREATE: Create user account
app.post("/auth/signup", async (req, res) => {
  const { username, email, password, phone } = req.body;
  console.log("req.body: ", req.body);

  if (!username || !email || !password || !phone) {
    return res.status(400).json({
      error: "All fields (username, email, password, phone) are required",
    });
  }

  try {
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      password: hashedPassword, // Save the hashed password
      phone,
    });

    await user.save();

    req.session.user = user;

    res.status(201).json({ message: "Signup successful", user });
  } catch (err) {
    console.error("Error signing up user:", err);
    res.status(500).json({ error: "Error signing up user", details: err.message });
  }
});

// UPDATE: Update user account
app.post("/auth/forgot-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ error: "Email and new password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password has been updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res
      .status(500)
      .json({ error: "Error updating password", details: err.message });
  }
});


// DELETE: Delete user account
app.delete("/auth/delete-account", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required to delete account." });
  }

  try {
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ error: "Failed to delete session." });
      }

      res.status(200).json({ message: "Account deleted successfully." });
    });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ error: "Error deleting account.", details: err.message });
  }
});



// Other Routes
app.post("/submit", (req, res) => {
  res.send("Form Submitted");
});

app.get("/user/:id", (req, res) => {
  res.send("User id is " + req.params.id);
});


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
