async function disconnect(req, res) {
  try {
    res.clearCookie("access_token")
    res.status(200).send("Requête effectuée")
  } catch (error) {
    console.log(error)
    res.status(400).send("ERROR")
  }
}
module.exports = disconnect
