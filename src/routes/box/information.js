const { prisma } = require("../../prisma")

async function infoBox(req, res) {
  try {
    //on récuèpre les données
    id_user = req.auth.id
    id = req.params.id

    //on vérifie si l'id est bien un nombre et on le convertit en int
    const isaNumber = isNaN(id)
    if (isaNumber == true) {
      return res.status(403).send("Int attendu")
    }
    id = parseInt(id)

    //on recherche dans la bdd la boite
    const box = await prisma.box.findUnique({
      where: {
        id: id
      },
      include: {
        TagOnBox: {
          include: {
            tag: true
          }
        }
      }
    })
    //on vérifie que c'est le bon utilisateur
    if (id_user != box.id_user) {
      return res.status(403).send("Vous n'êtes pas autorisé à faire ceci")
    }
    res.status(200).send(box)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = infoBox
