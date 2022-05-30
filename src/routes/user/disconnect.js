async function disconnect(req, res) {
  try {
    res.clearCookie("access_token")
    res.status(200).send("Cookie supprimé")
  } catch (error) {
    console.log(error)
    res.status(400).send("Une erreur est survenue")
  }
}
module.exports = disconnect
