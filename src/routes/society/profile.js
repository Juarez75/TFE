const { prisma } = require("../../prisma")

async function profileSociety(req, res) {
  try {
    //on récupère l'id
    const id = req.auth.id
    const type = req.auth.type

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
      id: user.id,
      mail: user.mail,
      firstname: user.firstname,
      lastname: user.lastname,
      id_society: user.id_society,
      tag: user.Tag,
      creation_date: user.creation_date
    }
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = profileSociety
