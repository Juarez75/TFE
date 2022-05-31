const { prisma } = require("../../prisma")

async function search(req, res) {
  try {
    text = req.body.search
    id_user = req.auth.id
    var tag
    const society_code = req.auth.society_code
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
    if (society_code != 0) {
      tag = await prisma.tag.findMany({
        where: {
          society_code: society_code,
          name: {
            contains: text,
            mode: "insensitive"
          }
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
    } else {
      tag = await prisma.tag.findMany({
        where: {
          id_user: id_user,
          name: {
            contains: text,
            mode: "insensitive"
          }
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
    }

    data = { room, box, object, tag }
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(403).send("Une erreur est survenue")
  }
}
module.exports = search
