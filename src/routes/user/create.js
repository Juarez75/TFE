const { prisma } = require("../../prisma")

async function createUser(req, res) {
  try {
    const user = await prisma.user.create({
      data: {
        mail: req.body.mail,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        type: 0,
        creator: "API"
      }
    })
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur s'est produite")
  }
}
module.exports = createUser
