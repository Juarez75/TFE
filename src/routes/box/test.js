const { prisma } = require("../../prisma")

async function test(req, res) {
  try {
    var random = Math.floor(Math.random() * (25 - 20 + 1)) + 20
    var min = 1569
    var date = new Date(2022, 5, 2, 1, 1, 1, 1)
    for (let i = 2; i <= 30; i++) {
      date.setDate(i)
      random = Math.floor(Math.random() * (25 - 20 + 1)) + 20
      if (date.getDay() == 0) {
        random = 0
      }
      for (y = 0; y < random; y++) {
        await prisma.box.update({
          where: {
            id: min
          },
          data: {
            state: 1,
            moved_date: date
          }
        })
        min++
      }
    }
    res.status(200).send("Yes")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = test
