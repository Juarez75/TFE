const { prisma } = require("../../prisma")
const fs = require("fs")

async function deleteMany(req, res) {
  try {
    const id_user = req.auth.id
    const list = req.body.list

    var box

    list.map(async (item) => {
      box = await prisma.box.findUnique({
        where: {
          id: item
        }
      })
      //vérification que c'est le bon utilisateur
      if (id_user != box.id_user) {
        return res.status(403).send("BAD_REQUEST")
      }
      //on supprime la photo si une est liée
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
      //Si bon utilisateur on supprime la caisse
      await prisma.box.delete({
        where: {
          id: item
        }
      })
    })

    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = deleteMany
