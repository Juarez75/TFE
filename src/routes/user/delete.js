const { prisma } = require("../../prisma")

async function deleteUser(req, res) {
  try {
    await prisma.user.delete({
      where: {
        id: req.body.id
      }
    })
    res.status(200).send("Suppression effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = deleteUser
