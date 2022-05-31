const { prisma } = require("../../prisma")
const Joi = require("joi")

async function updateUser(req, res) {
  try {
    //on récupère les données
    const id = req.auth.id
    const mail = req.body.mail
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const color = req.body.color
    const society_code = req.auth.society_code
    const type = req.auth.type

    //on vérifie si l'email est valide
    const mailSchema = Joi.string().email().required()
    const validateMail = mailSchema.validate(mail)
    if (validateMail.error) {
      return res.status(403).send("E-mail invalide")
    }

    //on vérifie que l'email n'est pas déjà utilisé par un autre utilisateur
    const existingUser = await prisma.user.findUnique({
      where: {
        mail: mail
      }
    })
    if (existingUser != null && existingUser.id != id) {
      return res.status(403).send("L'email est déjà reliée à un autre compte")
    }

    //si c'est une société, on update la couleur
    if (type == 1) {
      await prisma.user.updateMany({
        where: {
          society_code: society_code
        },
        data: {
          color: color
        }
      })
    }

    //on modifie les données dans la bdd
    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        firstname: firstname,
        lastname: lastname,
        mail: mail
      }
    })
    res.status(200).send("Modification effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = updateUser
