const { prisma } = require("../../prisma")

async function infoUser(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.id
      }
    })
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = infoUser
