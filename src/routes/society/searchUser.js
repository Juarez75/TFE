const { text } = require("express")
const { prisma } = require("../../prisma")

async function searchUser(req, res) {
  try {
    const text = req.body.search
    const society_code = req.auth.society_code
    var user = await prisma.user.findMany({
      where: {
        society_code: society_code,
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
