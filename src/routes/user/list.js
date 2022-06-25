const { prisma } = require("../../prisma")

async function listUser(req, res) {
  try {
    //on récupère tous les utilisateurs existants
    const users = await prisma.user.findMany()
    res.status(200).send(users)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = listUser
