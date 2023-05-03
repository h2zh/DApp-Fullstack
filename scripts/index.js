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
  //   let creatorAccount = "",
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
      console.log(body);
      const pAddr = await createProject(
        creatorAccount,
        title,
        description,
        targetAmount,
        daysLimit,
        minContribution
      );
      console.log(userPrivateKey);
      await payDeposit(pAddr, userPrivateKey, targetAmount * 0.01);
      return res.status(200).send({ projectAddress: pAddr });
    default:
      res.status(200).json({ message: "createProject API works!" });
  }
});

server.post("/api/payDeposit", async (req, res) => {
  const { pAddr, userPrivateKey, targetAmount } = req.body;
  console.log(req.body);
  const _ = await payDeposit(pAddr, userPrivateKey, targetAmount * 0.01);
  res.status(200).send();
});

server.get("/api/getAllProjects", async (req, res) => {
  console.log("getAllProjects triggered");
  const allProjects = await getAllProjects();
  res.status(200).send({ allProjects: allProjects, isTrigger: "yes" });
});

server.post("/api/contribute", async (req, res) => {
  console.log("/contribute triggered");
  const { projectAddr, creatorPrivateKey, donation } = req.body;
  console.log(projectAddr, creatorPrivateKey, donation);
  await contribute(projectAddr, creatorPrivateKey, donation);
  res.status(200).send();
});

server.post("/api/withdraw", async (req, res) => {
  console.log("/api/withdraw triggered");
  const { projectAddr } = req.body;
  console.log(projectAddr);
  await withdraw(projectAddr);
  res.status(200).send();
});

server.post("/api/refund", async (req, res) => {
  console.log("/api/refund triggered");
  const { projectAddr } = req.body;
  console.log(projectAddr);
  await refund(projectAddr);
  res.status(200).send();
});

server.post("/api/finalize", async (req, res) => {
  console.log("/api/finalize triggered");
  const { projectAddr } = req.body;
  console.log(projectAddr);
  await finalize(projectAddr);
  res.status(200).send();
});

server.get("/", (req, res) => {
  // default route
  return res.status(200).json({ message: "This API works!" });
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
