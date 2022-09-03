const { prisma } = require("../../prisma")

async function infoQrCode(req, res) {
  //on récupère les données
  try {
    const id_user = req.auth.id
    console.log(id_user)
    const id_society = req.auth.id_society
    const type = req.auth.type
    var id_box = req.params.id

    if (isNaN(id_box)) {
      return res.status(403).send("WRONG_PAGE")
    }
    id_box = parseInt(id_box)

    const box = await prisma.box.findUnique({
      where: {
        id: id_box
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
    const data = {
      name: box.name,
      state: box.state,
      url_img: box.url_img
    }
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = infoQrCode
