const { prisma } = require("../../prisma")

async function createRoom(req, res)
{
    try{
        const room = await prisma.room.create({
        data: {
            id_user: req.body.id,
            name:req.body.name,
            comment:req.body.comment
        }
    })
    res.status(200).send(room)
}catch(error){
    console.log(error)
    res.status(400).send("Une erreur s'est produite")
}
}
module.exports = createRoom