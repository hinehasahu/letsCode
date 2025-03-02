const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Routes
const userRoutes = require("./routes/user.routes");
const asanaRoutes = require("./routes/asana.routes");
const groupRoutes = require("./routes/group.routes");
const challengeRoutes = require("./routes/challenge.routes");

app.get("/",(req,res)=>{
    res.send("Healthy")
})
app.use("/api/users", userRoutes);
app.use("/api/asanas", asanaRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/challenges", challengeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
