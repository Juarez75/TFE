const { prisma } = require("../../prisma")

async function listRoom(req, res) {
  try {
    //on récupère l'id utilisateur grâce au token
    const id = req.auth.id

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
    res.status(400).send("ERROR")
  }
}
module.exports = listRoom
