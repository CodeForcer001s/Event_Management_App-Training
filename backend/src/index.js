import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // ✅ Add this
import connectDB from "../configs/db.js";
import authRoutes from "../Routes/AuthRouter.js";
import eventsRoutes from "../Routes/EventsRouter.js"; // ✅ Add Events routes

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

connectDB(); // ✅ Connect to MongoDB

// ✅ Configure CORS properly
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Only allow your frontend
    credentials: true, // ✅ Allow cookies (tokens)
    optionSuccessStatus:200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // ✅ Enables reading cookies

app.get("/", (req, res) => {
  res.send("Events API is running");
});

app.use("/AuthRouter", authRoutes); // ✅ Matches the frontend request
app.use("/events", eventsRoutes); // ✅ Add Events routes 

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
