const { prisma } = require("../../prisma")

async function unLinkUser(req, res) {
  try {
    //on récupère les données
    const id_user = parseInt(req.body.id_user)
    const id_society = req.auth.id_society

    const user = await prisma.user.findUnique({
      where: {
        id: id_user
      }
    })
    if (user.id_society != id_society || user.id != id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    await prisma.user.update({
      where: {
        id: id_user
      },
      data: {
        id_society: null
      }
    })
    res.status(200).send("User unlinked")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = unLinkUser
