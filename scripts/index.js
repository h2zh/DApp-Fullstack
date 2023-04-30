const express = require("express");
const cors = require("cors");
require("dotenv").config(); // to use .env variables
const bodyParser = require("body-parser");
const {
  createProject,
  getAllProjects,
  payDeposit,
  contribute,
  getDetail,
  withdraw,
  refund,
  finalize,
} = require("./project.js");

const server = express();
const port = process.env.SERVER_PORT || 8080;

server.use(cors());
server.use(bodyParser.json());
server.post("/api/createProject", async (req, res) => {
  //   let creatorAccount = "0x620e4C6680a0C6B09673CBC2A6f1E73EEb34a2f0",
  //     title = "testtt",
  //     description = "dasfds",
  //     targetAmount = 2,
  //     daysLimit = 5,
  //     minContribution = 0.01;
  const requestMethod = req.method;

  switch (requestMethod) {
    case "POST":
      const body = req.body; // The body-parser middleware should already have parsed the request body as JSON

      const {
        creatorAccount,
        title,
        description,
        targetAmount,
        daysLimit,
        minContribution,
        userPrivateKey,
      } = body;
      const pAddr = await createProject(
        creatorAccount,
        title,
        description,
        targetAmount,
        daysLimit,
        minContribution
      );
      console.log(userPrivateKey);
      // await payDeposit(pAddr, userPrivateKey, targetAmount * 0.01);
      return res.status(200).send({ projectAddress: pAddr });
    default:
      res.status(200).json({ message: "createProject API works!" });
  }
});

server.get("/api/getAllProjects", async (req, res) => {
  console.log("getAllProjects triggered");
  const allProjects = await getAllProjects();
  res.status(200).send({ allProjects: allProjects, isTrigger: "yes" });
});

server.get("/", (req, res) => {
  // default route
  return res.status(200).json({ message: "This API works!" });
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
