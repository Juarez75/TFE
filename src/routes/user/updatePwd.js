const { prisma } = require("../../prisma")

async function updatePwd(req, res) {
  try {
    const lastPwd = req.body.lastPwd
    const newPwd = req.body.newPwd
    const result = await prisma.user.findUnique({
      where: {
        id: req.body.id
      }
    })
    const verifyPwd = compare(lastPwd, result.password)
    if ((verifyPwd = true)) {
      await prisma.user.update({
        where: {
          id: req.body.id
        },
        data: {
          password: newPwd
        }
      })
      res.status(200).send("Validé")
    } else {
      res.status(403).send("Le mdp actuel ne correspond pas")
    }
  } catch (error) {
    console.log(error)
    res.status(400).send("Erreur")
  }
}
module.exports = updatePwd
