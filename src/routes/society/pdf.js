const { prisma } = require("../../prisma")

async function pdf(req, res) {
  try {
    const id_user = req.body.id_user
    console.log(id_user)
    const society_code = req.auth.society_code
    //on vérifie que l'utilisateur est bien lié à la société
    const user = await prisma.user.findUnique({
      where: {
        id: id_user
      }
    })
    if (user.society_code != society_code) {
      return res.status(403).send("Utilisateur non lié à la société")
    }

    const box = await prisma.box.findMany({
      where: {
        id_user: id_user
      },
      orderBy: {
        id_room: "asc"
      },
      include: {
        room: {
          include: {
            TagOnRoom: {
              include: {
                tag: true
              }
            }
          }
        },
        user: true
      }
    })
    res.status(200).send(box)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = pdf
