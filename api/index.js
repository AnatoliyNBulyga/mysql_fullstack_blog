import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT ?? 8800;
app.use(express.json());
app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.listen(PORT, () => console.log(`Server was started on port ${PORT}`))