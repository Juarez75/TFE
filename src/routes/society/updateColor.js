const { prisma } = require("../../prisma")

async function updateColor(req, res) {
  try {
    const id = req.auth.id
    const id_society = req.auth.id_society
    const color = req.body.color

    //on vérifie si c'est bien la société qui veut le faire
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    if (user.id_society != id_society || user.type != 1)
      return res.status(403).send("BAD_REQUEST")
    await prisma.society.update({
      where: {
        id: id_society
      },
      data: {
        color: color
      }
    })
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(403).send("ERROR")
  }
}
module.exports = updateColor
