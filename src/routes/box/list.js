const { prisma } = require("../../prisma")

async function listBox(req, res) {
  try {
    const id = parseInt(req.params.id)
    const box = await prisma.box.findMany({
      where: {
        id_user: id
      }
    })
    res.status(200).send(box)
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = listBox
