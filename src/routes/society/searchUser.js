const { prisma } = require("../../prisma")

async function searchUser(req, res) {
  try {
    text = req.body.search
    society_code = req.auth.society_code
    const user = await prisma.user.findMany({
      where: {
        society_code: society_code,
        type: 2,
        firstname: {
          contains: text,
          mode: "insensitive"
        },
        lastname: {
          contains: text,
          mode: "insensitive"
        }
      }
    })

    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(403).send("Une erreur est survenue")
  }
}
module.exports = searchUser
