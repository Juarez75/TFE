const { prisma } = require("../../prisma")

async function search(req, res) {
  try {
    text = req.body.search
    id_user = req.auth.id
    const room = await prisma.room.findMany({
      where: {
        id_user: id_user,
        name: {
          contains: text,
          mode: "insensitive"
        }
      }
    })
    const box = await prisma.box.findMany({
      where: {
        id_user: id_user,
        name: {
          contains: text,
          mode: "insensitive"
        }
      },
      include: {
        room: true
      }
    })
    const object = await prisma.object.findMany({
      where: {
        id_user: id_user,
        name: {
          contains: text,
          mode: "insensitive"
        }
      },
      include: {
        room: true,
        box: true
      }
    })
    data = { room, box, object }
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(403).send("Une erreur est survenue")
  }
}
module.exports = search
