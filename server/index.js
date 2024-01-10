import express from "express";
import bodyParser from "body-parser";
import routes from "./routes.js";
import cors from 'cors';

const app = express();

//Middlewares
app.use(bodyParser.json()); // it is being used to post json data to the server
app.use(cors()); // Cors policy

// Use the router at the specified path
app.use("", routes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});


