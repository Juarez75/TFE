const { prisma } = require("../../prisma")

async function stateBox(req, res) {
  try {
    //on récupère les données
    const id = parseInt(req.body.id)
    const state = parseInt(req.body.state)
    const type = req.auth.type
    const id_user = req.auth.id
    // State : 0 = Prête | 1 = Déménagée | 2 = Vide
    var date = new Date()
    //vérification que c'est le bon utilisateur
    const box = await prisma.box.findUnique({
      where: {
        id: id
      },
      include: {
        user: true
      }
    })
    if (
      id_user != box.id_user &&
      type != 1 &&
      id_society != box.user.id_society
    ) {
      return res.status(403).send("BAD_REQUEST")
    }
    //on actualise les données dans la base de données
    if (state == 0 || state == 2) {
      await prisma.box.update({
        where: {
          id: id
        },
        data: {
          state: state
        }
      })
    } else if (state == 1) {
      await prisma.box.update({
        where: {
          id: id
        },
        data: {
          state: state,
          moved_date: date
        }
      })
    }
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = stateBox
