const { prisma } = require("../../prisma")

async function graphLastDays(req, res) {
  try {
    const id = req.auth.id
    const id_society = req.auth.id_society
    var date = new Date()
    var maxDays
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    day = date.getDate()
    month = date.getMonth()
    day = day - 29
    while (day <= 0) {
      month = month - 1
      if (month < 0) {
        date.setFullYear(date.getFullYear - 1)
        month = 11
      }
      if ((month == 0, 2, 4, 6, 7, 9, 11)) {
        maxDays = 31
      } else if ((month == 3, 5, 8, 10)) {
        maxDays = 30
      } else if (month == 1) {
        maxDays = 28
        if (date.getFullYear % 4 == 0) maxDays = 29
      }
      day = maxDays + day
    }

    date.setDate(day)
    date.setMonth(month)
    var secondDate = new Date(verifUpDate(date, maxDays))
    var data = []
    var number

    for (let i = 29; i >= 0; i--) {
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
      data.push({ date: date, value: number })
      date = verifUpDate(date, maxDays)
      secondDate = verifUpDate(date, maxDays)
    }
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}

function verifUpDate(date, maxDays) {
  verifDate = new Date(date)
  day = verifDate.getDate()
  month = verifDate.getMonth()
  if (day == maxDays) {
    if (month == 11) {
      verifDate.setFullYear(verifDate.getFullYear() + 1)
      month = 0
    } else month = month + 1
    day = 0
  }
  day = day + 1
  verifDate.setMonth(month)
  verifDate.setDate(day)
  return verifDate
}
module.exports = graphLastDays
