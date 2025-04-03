const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://miniproject-rxaf.onrender.com',
    methods: ['GET', 'POST'],
    credentials: true
}));

// Request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Static files
app.use(express.static(__dirname));

// Dummy Users
const users = [
    { username: "admin", password: "1234" },
    { username: "user1", password: "password" }
];

// Routes
app.get("/test", (req, res) => {
    res.send("✅ Server is running correctly!");
});

app.post("/login", (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Username and password required" });
        }

        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
