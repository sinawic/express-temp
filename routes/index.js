module.exports = (app) => {
  app.use("/admin", require("./admin"))
  app.use("/supporter", require("./supporter"))
  app.use('/', (req, res, next) => {
    res.send({ "404": "Not found" })
  })
}