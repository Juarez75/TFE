const { prisma } = require("../../prisma")

async function oneBox(req, res) {
  try {
    id = req.params.id
    id_user = req.auth.id
    //on vérifie que c'est bien un nombre et on le convertit
    const isaNumber = isNaN(id)
    if (isaNumber == true) {
      return res.status(403).send("Int attendu")
    }
    id = parseInt(id)

    //on récupère les données dans la bdd
    const box = await prisma.box.findUnique({
      where: {
        id: id
      },
      include: {
        objects: true,
        room: {
          select: {
            type: true
          }
        }
      }
    })
    if (id_user != box.id_user) {
      return res.status(403).send("Vous n'êtes pas autorisé à faire ceci")
    }
    res.status(200).send(box)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = oneBox
