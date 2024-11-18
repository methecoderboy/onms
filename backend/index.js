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
    origin: "https://onms-client-one.vercel.app",
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
const { errorMiddleware } = require("./middlewares/error");

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

// createStudents();
// createAdmins();
// createTeachers();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorMiddleware);

const server = http.createServer(app);

server.listen(3000, () => {
  InitSocket(server);
  console.log("Server is running on port 3000");
});
