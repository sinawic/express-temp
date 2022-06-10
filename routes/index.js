module.exports = (app) => {
  app.use("/admin", require("./admin"));
  app.use('/', (req, res, next) => {
    res.send({ "404": "Not found" })
  })
  app.use((req, res, next) => {
    res.status(404).send("404")
  })
}