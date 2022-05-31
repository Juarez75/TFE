const { prisma } = require("../../prisma")

async function infoUser(req, res) {
  try {
    //on récupère l'id
    id = req.auth.id

    //on récupère les informations
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    data = {
      mail: user.mail,
      firstname: user.firstname,
      lastname: user.lastname,
      society_code: user.society_code,
      color: user.color
    }
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = infoUser
