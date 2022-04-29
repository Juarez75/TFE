const { prisma } = require("../../prisma")

async function createObject(req, res) {
  try {
    //on récupère les données
    const id_box = req.body.id_box
    const id_user = req.auth.id
    const name = req.body.name

    //vérification que c'est le bon utilisateur
    const box = await prisma.box.findUnique({
      where: {
        id: id_box
      }
    })
    if (id_user != box.id_user) {
      return res.status(403).send("Vous n'êtes pas autorisé à faire ceci")
    }

    //on ajoute l'objet dans la bdd
    await prisma.object.create({
      data: {
        id_box: id_box,
        id_user: id_user,
        name: name
      }
    })
    res.status(200).send("Ajout effectué")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = createObject
