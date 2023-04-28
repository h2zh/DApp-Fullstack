const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev }); // initializes NextJS instance
const handle = app.getRequestHandler(); // returns a handler to parse all HTTP requests

const { createProject } = require("./project.js");

app
  .prepare() // resolves after NextJS successful instantiation.
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get("/api/createProject", async (req, res) => {
      // let creatorAccount = "0x620e4C6680a0C6B09673CBC2A6f1E73EEb34a2f0",
      //   title = "testtt",
      //   description = "dasfds",
      //   targetAmount = 2,
      //   daysLimit = 5,
      //   minContribution = 0.01;
      const requestMethod = req.method;
      const body = JSON.parse(req.body);
      console.log(body);
      const {
        creatorAccount,
        title,
        description,
        targetAmount,
        daysLimit,
        minContribution,
      } = body;
      const pAddr = await createProject(
        creatorAccount,
        title,
        description,
        targetAmount,
        daysLimit,
        minContribution
      );
      console.log(pAddr);
      return res.status(200).send({ projectAddress: pAddr });
    });

    server.get("*", (req, res) => {
      // default route
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
