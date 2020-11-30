const app = require('fastify')({ logger: true })
const clientRoutes = require('./routers/client')

app.register(require('fastify-cors'), { origin: '*' });

clientRoutes.forEach((route, index) => {
  app.route(route)
})

const start = async () => {
  try {
    await app.listen(3000)
    app.log.info(`server listening on ${app.server.address().port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()