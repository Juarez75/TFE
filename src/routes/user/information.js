const { prisma } = require("../../prisma")

async function infoUser(req, res) {
  try {
    //on récupère l'id
    id = req.auth.id

    //on récupère les informations
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      include: {
        Tag: true
      }
    })

    data = {
      mail: user.mail,
      firstname: user.firstname,
      lastname: user.lastname,
      id_society: user.id_society,
      tag: user.Tag
    }
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = infoUser
