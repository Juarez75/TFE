const { prisma } = require("../../prisma")

async function infoUser(req, res) {
  try {
    const isaNumber = isNaN(req.params.id)
    if (isaNumber == false) {
      const id = parseInt(req.params.id)
      const user = await prisma.user.findUnique({
        where: {
          id: id
        }
      })
      res.status(200).send(user)
    } else {
      res.status(403).send("Raté")
    }
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = infoUser
