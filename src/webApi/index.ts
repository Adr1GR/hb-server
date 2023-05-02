import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes";
import { connectToDatabase } from "../persistence/services/db";

const app = express();
var cors = require("cors");

connectToDatabase().subscribe({
	next: (connection) => {
		console.log("Connected to database");
	},
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
	res.send("HorseBreeders API");
});

app.listen(5000, () => {
	console.log("Listening on port 5000!");
});