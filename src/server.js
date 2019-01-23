import express, { json } from "express";
import genres from "./routes/genres";
const app = express();

app.use(json());
app.use("/api/genres", genres);

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
