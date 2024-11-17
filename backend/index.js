const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");

dotenv.config();
// Routes
const authRoutes = require("./routes/auth");
const noticeRoutes = require("./routes/notice");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const {
  createStudents,
  createAdmins,
  createTeachers,
} = require("./lib/helper");
const { InitSocket } = require("./lib/socket");

// createAdmins(1);
// createTeachers(20);
// createStudents(20);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route middlewares
app.use("/auth", authRoutes);
app.use("/notice", noticeRoutes);

mongoose.connect(process.env.MONGO_URI).then((res) => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
const server = http.createServer(app);

server.listen(3000, () => {
  InitSocket(server);
  console.log("Server is running on port 3000");
});
