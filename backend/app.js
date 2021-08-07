const express = require("express");
const customerController = require("./controller-layer/customer-controller");
const transactionController = require("./controller-layer/transactions-controller");
const cors = require("cors");
const server = express();

//Enabling cors to access from all ip address, allowing json as response.
server.use(cors())
server.use(express.json());

//ExpressJS Routes to controllers.
server.use("/api/customer", customerController);
server.use("/api/transaction", transactionController);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log("Listening...."));
