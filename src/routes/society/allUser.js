const { prisma } = require("../../prisma")

async function allUser(req, res) {
  try {
    //on récupère l'id utilisateur grâce au token
    const id_society = req.auth.id_society
    const takingUser = 20
    var skipingUser
    const id = req.auth.id

    //on vérifie si c'est bien la société qui veut le faire
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    if (user.id_society != id_society || user.type != 1)
      return res.status(403).send("BAD_REQUEST")

    const countUser = await prisma.user.count({
      where: {
        id_society: id_society,
        type: 2
      }
    })

    skipingUser = countUser - takingUser
    if (skipingUser < 0) skipingUser = 0

    //on recherhce les 20 derniers utilisateurs
    const users = await prisma.user.findMany({
      take: takingUser,
      skip: skipingUser,
      where: {
        id_society: id_society,
        type: 2
      }
    })
    res.status(200).send(users)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = allUser
