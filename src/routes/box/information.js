const { prisma } = require("../../prisma")

async function infoBox(req, res) {
  try {
    const id2 = req.params.id
    const isaNumber = isNaN(id2)
    if (isaNumber == false) {
      const id = parseInt(req.params.id)
      const box = await prisma.box.findUnique({
        where: {
          id: id
        }
      })
      res.status(200).send(box)
    } else {
      res.status(403).send("Une erreur est survenue")
    }
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = infoBox
