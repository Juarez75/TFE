var { expressjwt: expressjwt } = require("express-jwt")
const jwtMiddleware = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"]
}).unless({
  path: ["/user/login", "/user/create", "/"]
})

module.exports = {
  jwtMiddleware
}
