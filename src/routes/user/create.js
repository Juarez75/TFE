const { prisma } = require("../../prisma")

async function createUser(req, res)
{
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
    res.status(200).send("Validé")
}
module.exports = createUser