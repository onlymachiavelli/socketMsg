import { RequestHandler } from "express"

import jwt from "jsonwebtoken"
const auth: RequestHandler = async (req, res, nxt) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: "Token is required" })
  }

  let token: string
  try {
    token = authorization.split(" ")[1]
  } catch (e) {
    return res.status(401).json({ message: "Token is required" })
  }

  try {
    const decoded: any = jwt.decode(token)
    req.body.sub = decoded.sub

    console.log({ decoded: decoded })
    nxt()
  } catch (e) {
    console.log({ e })
    return res.status(401).json({ message: "Invalid Token" })
  }
}

export default auth
