const { prisma } = require("../../prisma")

async function roomUser(req, res) {
  try {
    id = req.params.id
    society_code = req.auth.society_code
    //on vérifie que c'est bien un nombre et on le convertit
    const isaNumber = isNaN(id)
    if (isaNumber == true) {
      return res.status(403).send("Int attendu")
    }
    id = parseInt(id)

    //on récupère les données dans la bdd
    const room = await prisma.room.findUnique({
      where: {
        id: id
      },
      include: {
        box: true
      }
    })

    //on vérifie que l'utilisateur est bien lié à la société
    const verifyUser = await prisma.user.findUnique({
      where: {
        id: room.id_user
      }
    })

    if (verifyUser.society_code != society_code) {
      return res.status(400).send("Utilisateur non lié à la société")
    }

    res.status(200).send(room)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = roomUser
