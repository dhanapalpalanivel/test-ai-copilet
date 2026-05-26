const express = require("express");
const swaggerUi = require("swagger-ui-express");
const authRoutes = require("./routes/authRoutes");
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");
const openApiSpec = require("../docs/openapi.json");

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "registration-api"
  });
});

app.get("/api-docs.json", (req, res) => {
  res.status(200).json(openApiSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use("/api/auth", authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
