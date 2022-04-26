const { prisma } = require("../../prisma")

async function createBox(req, res)
{
    try{
        const box = await prisma.box.create({
        data: {
            id_room: req.body.id_room,
            id_user: req.body.id_user,
            name:req.body.name,
            comment:req.body.comment
        }
    })
    res.status(200).send(box)
}catch(error){
    console.log(error)
    res.status(400).send("Une erreur s'est produite")
}
}
module.exports = createBox