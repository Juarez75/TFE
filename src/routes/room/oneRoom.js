const { prisma } = require("../../prisma")

async function oneRoom(req, res) {
  try {
    id = req.params.id
    id_user = req.auth.id
    //on vérifie que c'est bien un nombre et on le convertit
    const isaNumber = isNaN(id)
    if (isaNumber == true) {
      return res.status(403).send("WRONG_PAGE")
    }
    id = parseInt(id)

    //on récupère les données dans la bdd
    const room = await prisma.room.findUnique({
      where: {
        id: id
      },
      include: {
        _count: {
          select: { box: true }
        },
        box: {
          include: {
            _count: {
              select: { objects: true }
            },
            TagOnBox: {
              include: {
                tag: true
              }
            }
          },
          orderBy: [{ state: "asc" }, { id: "asc" }]
        },
        TagSociety: true
      }
    })

    if (id_user != room.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    res.status(200).send(room)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = oneRoom
