const jwt = require("jsonwebtoken")

function restrict() {
    const authError = {
		message: "Invalid credentials",
    }
    
    return async (req, res , next) => {
        try{
          const { token } = req.cookies
          if(!token) {
              return res.status(401).json({
                  message: "no cookies"
              })
          }

          jwt.verify(token, "secret", (err, decoded) => {
              if(err) {
                return res.status(401).json({
                    message: "no cookies"
                })
              }

              req.token = decoded

              next()
          })

        } catch(err) {
            next(err)
        }
    }
}

module.exports = restrict