const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./Middleware/errorHandler");
const connectToDb = require("./Config/dbConnection");

connectToDb();
const app = express();
app.use(express.json());

const contact = require("./routes/contactRoutes");
const user = require("./routes/userRoute");

app.use("/api/contacts", contact);
app.use("/api/user",user)
app.use(errorHandler);



const port = process.env.PORT || 50001;
app.listen(port, () => console.log(`Server is running at PORT ${port}`));

