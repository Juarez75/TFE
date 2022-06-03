const { prisma } = require("../../prisma")

async function listRoom(req, res) {
  try {
    //on récupère l'id utilisateur grâce au token
    const id = parseInt(req.params.id)
    const society_code = req.auth.society_code

    //on vérifie que l'utilisateur est bien lié à la société
    const verifyUser = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    if (verifyUser.society_code != society_code) {
      return res.status(403).send("Utilisateur non lié à la société")
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
        TagOnRoom: {
          include: {
            tag: {
              select: {
                color: true
              }
            }
          }
        }
      }
    })
    res.status(200).send(rooms)
  } catch (error) {
    console.log(error)
    res.status(403).send("Une erreur est survenue")
  }
}
module.exports = listRoom
