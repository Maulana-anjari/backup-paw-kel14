// ? Import module
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");

// ? START THE APP
const app = express();
// ? CONFIG
// ? Connecting Database
const connectDB = require("./src/utils/db");
dotenv.config({ path: "./.env" });

// ? Using Middleware
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", process.env.CLIENT_URL],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());

// ? Routes
const Inventaris = require("./src/routers/inventaris.router.js");
const Proposal = require("./src/routers/proposal.router.js");
const Persuratan = require("./src/routers/persuratan.router.js");
const Anggota = require("./src/routers/anggota.router.js");
const LPJ = require("./src/routers/pertanggungjawab.router.js");
const AuthRouter = require("./src/routers/auth.router.js");

app.use("/api/v1/inventaris", Inventaris);
app.use("/api/v1/proposal", Proposal);
app.use("/api/v1/persuratan", Persuratan);
app.use("/api/v1/anggota", Anggota);
app.use("/api/v1/lpj", LPJ);
app.use("/api/v1/auth", AuthRouter);
// ? End Routes

// ? Error handling\
// ? will be called automatically when the url doesn't exist or it's wrong
app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: true,
    message: error.message,
  });
});
// ? End error handling

// ? Server Run
const port = process.env.PORT || 5000;
connectDB(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
