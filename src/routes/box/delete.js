const { prisma } = require("../../prisma")
const fs = require("fs")

async function deleteBox(req, res) {
  try {
    const id_user = req.auth.id
    const id = req.body.id

    //vérification que c'est le bon utilisateur
    const box = await prisma.box.findUnique({
      where: {
        id: id
      }
    })
    if (id_user != box.id_user) {
      return res.status(403).send("BAD_REQUEST")
    }

    //on supprime l'image
    if (box.url_img != null) {
      const targetPath =
        "../uploads/" +
        box.url_img.replace(
          req.protocol + "://" + req.headers.host + "/private/",
          ""
        )

      fs.unlink(targetPath, (e) => {
        if (e) console.log(e)
      })
    }

    //on supprime la boite de la bdd
    await prisma.box.delete({
      where: {
        id: id
      }
    })
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = deleteBox
