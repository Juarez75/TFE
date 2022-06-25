const { prisma } = require("../../prisma")

async function search(req, res) {
  try {
    text = req.body.search
    id_user = req.auth.id
    var tag

    const room = await prisma.room.findMany({
      where: {
        id_user: id_user,
        name: {
          contains: text,
          mode: "insensitive"
        }
      },
      include: {
        _count: {
          select: { box: true }
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
        room: true,
        _count: {
          select: { objects: true }
        }
      },
      orderBy: {
        name: "asc"
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
        box: {
          include: {
            room: true
          }
        }
      }
    })

    tag = await prisma.tagUser.findMany({
      where: {
        id_user: id_user,
        name: {
          contains: text,
          mode: "insensitive"
        }
      },
      orderBy: {
        name: "asc"
      },
      include: {
        link: {
          include: {
            box: {
              include: {
                room: true
              }
            }
          }
        }
      }
    })

    data = { room, box, object, tag }
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(403).send("ERROR")
  }
}
module.exports = search
