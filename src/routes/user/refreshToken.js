const jwt = require("jsonwebtoken")
const { prisma } = require("../../prisma")
const redis = require("redis")

async function refreshToken(req, res) {
  try {
    const REDIS_PORT = process.env.REDIS_PORT || 6379
    const client = redis.createClient(REDIS_PORT)
    client.connect()
    let color
    const token = req.cookies.refresh_token
    const decoded = jwt.decode(token, { complete: true })
    try {
      jwt.verify(token, process.env.TOKEN_REFRESH_SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).send("Error")
    }
    //on vérifie le refresh token dans le cache
    const cacheList = await client.get(decoded.payload.id + "")
    if (cacheList == null) return res.status(401).send("Error")
    const listToken = JSON.parse(cacheList)
    listToken.forEach((element) => {
      if (element == token) existingToken = true
    })
    if (!existingToken) return res.status(401).send("Refresh inexistant")

    result = await prisma.user.findUnique({
      where: { id: decoded.payload.id },
      include: {
        society: true
      }
    })
    if (result != null) {
      const user = {
        id: result.id,
        type: result.type,
        id_society: result.id_society
      }
      const access_token = jwt.sign(user, process.env.TOKEN_ACCESS_SECRET, {
        expiresIn: "3h"
      })
      if (result.id_society == null) color = "#707070"
      else color = result.society.color
      const data = {
        id: result.id,
        type: result.type,
        id_society: result.id_society,
        color: color
      }
      return res
        .cookie("access_token", access_token, {
          httpOnly: true,
          secure: false,
          expires: new Date(Date.now() + 3 * 3600000)
        })
        .status(200)
        .send(data)
    }
  } catch (e) {
    console.log(e)
    return res.status(400).send("ERROR")
  }
}
module.exports = refreshToken
