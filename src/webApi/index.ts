import { createServer } from "../utils/server";
import { connectToDatabase } from "../persistence/services/db";

import userRouter from "../webApi/routes/userRoutes";
import stableRouter from "../webApi/routes/stableRoutes";

connectToDatabase().subscribe({
  next: () => {
    console.log("Connected to database");
  },
});

const app = createServer();

app.use("/api/user", userRouter);
app.use("/api/stable", stableRouter);

app.get("/", (req, res) => {
  res.send("HorseBreeders API");
});

app.listen(5000, () => {
  console.log("Listening on port 5000!");
});
