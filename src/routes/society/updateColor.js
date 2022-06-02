const { prisma } = require("../../prisma")

async function updateColor(req, res) {
  try {
    const id = req.auth.id
    const society_code = req.auth.society_code
    const color = req.body.color

    //on vérifie si c'est bien la société qui veut le faire
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    if (user.society_code != society_code || user.type != 1)
      return res
        .status(403)
        .send("Vous n'êtes pas autorisé à faire cette requête")
    await prisma.user.updateMany({
      where: {
        society_code: society_code
      },
      data: {
        color: color
      }
    })
    res.status(200).send("Modifcation effectuée")
  } catch (error) {
    console.log(error)
    res.status(403).send("Une erreur est survenue")
  }
}
module.exports = updateColor
