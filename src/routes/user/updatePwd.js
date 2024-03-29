const { prisma } = require("../../prisma")
const bcrypt = require("bcrypt")
const redis = require("redis")

async function updatePwd(req, res) {
  try {
    //on récupère les données
    const lastPwd = req.body.lastPwd
    const newPwd = req.body.newPwd
    const id = req.auth.id

    const REDIS_PORT = process.env.REDIS_PORT || 6379
    const client = redis.createClient(REDIS_PORT)
    client.connect()
    const token = req.cookies.refresh_token

    var listToken = []

    listToken.push(token)
    const cacheList = JSON.stringify(listToken)
    await client.set(id + "", cacheList)

    //on récupère le mdp de l'utilisateur dans la bdd
    const result = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    //on vérifie que l'ancien mdp et le mdp de la bdd correspondent bien
    const exist = await bcrypt.compare(lastPwd, result.password)
    if (exist == false) {
      return res.status(403).send("WRONG_PASSWORD")
    }

    //on hash le mdp
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPwd, salt)

    //on actualise le mdp de l'utilisateur si tout est complet
    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        password: hash
      }
    })
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = updatePwd
