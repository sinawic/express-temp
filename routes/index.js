module.exports = (app) => {
  app.use("/admin", require("./admin"))
  app.use("/supporter", require("./supporter"))
}