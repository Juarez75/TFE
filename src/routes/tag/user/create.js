const { prisma } = require("../../../prisma")

async function createTagUser(req, res) {
  try {
    //on récupère les données
    const id_user = req.auth.id
    const name = req.body.name

    await prisma.tagUser.create({
      data: {
        id_user: id_user,
        name: name
      }
    })

    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    return res.status(400).send("ERROR")
  }
}
module.exports = createTagUser
