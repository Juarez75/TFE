const { prisma } = require("../../prisma")

async function graphMonth(req, res) {
  try {
    const month = parseInt(req.body.month)
    const year = parseInt(req.body.year)
    const id_society = req.auth.id_society

    var date = new Date(year, month, 1, 0, 0, 0, 0)
    var maxDays
    switch (month) {
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        maxDays = 31
        break
      case 3:
      case 5:
      case 8:
      case 10:
        maxDays = 30
        break
      case 1:
        maxDays = 28
        if (date.getFullYear % 4 == 0) maxDays = 29
        break
    }
    maxDays++
    var data = []
    var secondDate = new Date(date)
    secondDate.setDate(date.getDate() + 1)
    for (let i = 1; i <= maxDays; i++) {
      number = await prisma.box.count({
        where: {
          user: {
            id_society: id_society
          },
          moved_date: {
            gte: date,
            lte: secondDate
          }
        }
      })
      data.push({ date: new Date(date), value: number })
      date.setDate(date.getDate() + 1)
      if (date.getDate() - 1 == maxDays) {
        secondDate.setHours(23)
        secondDate.setMinutes(59)
        secondDate.setSeconds(59)
        secondDate.setMilliseconds(999)
      } else secondDate.setDate(secondDate.getDate() + 1)
    }
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = graphMonth
