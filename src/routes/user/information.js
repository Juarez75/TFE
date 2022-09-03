const { prisma } = require("../../prisma")

async function infoUser(req, res) {
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
    const readyBox = await prisma.box.count({
      where: {
        id_user: id,
        state: 0
      }
    })
    const movedBox = await prisma.box.count({
      where: {
        id_user: id,
        state: 1
      }
    })
    const emptyBox = await prisma.box.count({
      where: {
        id_user: id,
        state: 2
      }
    })
    const graphData = [
      { name: "Prête", value: readyBox },
      { name: "Démanagée", value: movedBox },
      { name: "Vidée", value: emptyBox }
    ]
    data = {
      id: user.id,
      mail: user.mail,
      firstname: user.firstname,
      lastname: user.lastname,
      id_society: user.id_society,
      tag: user.Tag,
      graphData: graphData
    }
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = infoUser
