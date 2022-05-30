const { prisma } = require("../../prisma")

async function allUser(req, res) {
  try {
    //on récupère l'id utilisateur grâce au token
    const society_code = req.auth.society_code

    //on recherche toutes les pièces de l'utilisateur
    const users = await prisma.user.findMany({
      where: {
        society_code: society_code,
        type: 2
      }
    })
    res.status(200).send(users)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = allUser
