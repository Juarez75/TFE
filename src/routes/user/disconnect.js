const redis = require("redis")
async function disconnect(req, res) {
  const id = req.auth.id
  const REDIS_PORT = process.env.REDIS_PORT || 6379
  const client = redis.createClient(REDIS_PORT)
  var cacheList
  await client.connect()
  try {
    const token = req.cookies.refresh_token
    cacheList = await client.get(id + "")
    console.log(cacheList)
    if (cacheList != null) {
      const listToken = JSON.parse(cacheList)
      listToken.forEach((element, i) => {
        if (element == token) listToken.splice(i, 1)
      })
      cacheList = JSON.stringify(listToken)
      await client.set(id + "", cacheList)
    }
    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = disconnect
