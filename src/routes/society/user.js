const { prisma } = require("../../prisma")

async function listRoom(req, res) {
  try {
    //on récupère l'id utilisateur grâce au token
    const id = parseInt(req.params.id)
    const id_society = req.auth.id_society
    const type = req.auth.type

    //on vérifie que l'utilisateur est bien lié à la société
    const verifyUser = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    if (verifyUser.id_society != id_society || type != 1) {
      return res.status(403).send("BAD_REQUEST")
    }

    //on recherche toutes les pièces de l'utilisateur
    const rooms = await prisma.room.findMany({
      where: {
        id_user: id
      },
      include: {
        _count: {
          select: { box: true }
        },
        TagSociety: true
      }
    })
    res.status(200).send(rooms)
  } catch (error) {
    console.log(error)
    res.status(403).send("ERROR")
  }
}
module.exports = listRoom
