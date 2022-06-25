const { prisma } = require("../../../prisma")

async function createTagSociety(req, res) {
  try {
    //on récupère les données
    const id_society = req.auth.id_society
    const typeUser = req.auth.type
    const name = req.body.name
    const color = req.body.color

    if (typeUser != 1) return res.status(403).send("BAD_REQUEST")

    await prisma.tagSociety.create({
      data: {
        id_society: id_society,
        name: name,
        color: color
      }
    })

    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    return res.status(400).send("ERROR")
  }
}
module.exports = createTagSociety
