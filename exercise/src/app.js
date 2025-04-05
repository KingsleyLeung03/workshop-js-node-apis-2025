import express from "express";
import cors from "cors";
import morgan from "morgan";
import contactRoutes from "./routes/contacts-routes.js";

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// TODO Create the Express server
const app = express();

// TODO Configure middleware with app.use() (CORS support, JSON parsing support, static files support)
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));

// TODO Your application routes here
app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.json({message: "Hello World!"});
});

// TODO Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
