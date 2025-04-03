const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json()); // Parse JSON body
app.use(cors()); // Allow frontend requests

// ✅ Serve Static Files from Current Directory (mini/)
app.use(express.static(__dirname));

// Dummy Users Database
const users = [
    { username: "admin", password: "1234" },
    { username: "user1", password: "password" }
];

// ✅ Test Route
app.get("/test", (req, res) => {
    res.send("✅ Server is running correctly!");
});

// ✅ Login Route
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
});

// ✅ Default Route to Serve login.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

// Start Server
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running at http://0.0.0.0:${PORT}`));

