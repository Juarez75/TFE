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
      return res.status(403).send("BAD_REQUEST")
    }

    const box = await prisma.box.findMany({
      where: {
        id_user: id_user
      },
      orderBy: [
        {
          id_room: "asc"
        },
        {
          id: "asc"
        }
      ],
      include: {
        room: {
          include: {
            TagSociety: true
          }
        },
        user: true
      }
    })
    res.status(200).send(box)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = pdf
