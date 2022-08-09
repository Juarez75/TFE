const { prisma } = require("../../prisma")

async function searchUser(req, res) {
  try {
    const text = req.body.search
    const id_society = req.auth.id_society
    var user = await prisma.user.findMany({
      where: {
        id_society: id_society,
        type: 2,
        OR: [
          { firstname: { contains: text, mode: "insensitive" } },
          { lastname: { contains: text, mode: "insensitive" } }
        ]
      }
    })

    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(403).send("ERROR")
  }
}
module.exports = searchUser
