import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./Routes/UserRouter.js";
import moviesRouter from "./Routes/MoviesRouter.js";
import categoriesRouter from "./Routes/CategoriesRouter.js"
import Uploadrouter from "./Controlles/UploadFile.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";


const PORT = process.env.PORT || 5001;

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//Connect DB
connectDB();

app.get("/", (req, res) => {});

app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/upload", Uploadrouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server app on port - ${PORT}`);
});
