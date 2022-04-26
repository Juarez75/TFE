const { prisma } = require("../../prisma")

async function listUser(req, res) {
  try {
    const users = await prisma.user.findMany()
    res.status(200).send(users)
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = listUser
