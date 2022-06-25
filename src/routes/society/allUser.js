const { prisma } = require("../../prisma")

async function allUser(req, res) {
  try {
    //on récupère l'id utilisateur grâce au token
    const id_society = req.auth.id_society

    //on recherche toutes les pièces de l'utilisateur
    const users = await prisma.user.findMany({
      where: {
        id_society: id_society,
        type: 2
      }
    })
    res.status(200).send(users)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = allUser
