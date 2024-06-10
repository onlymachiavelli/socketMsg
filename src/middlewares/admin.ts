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
    console.log({
      secret: process.env.SECRET,
    })
    const decoded: any = jwt.verify(token, process.env.SECRET as string)
    req.body.id = decoded.id
    nxt()
  } catch (e) {
    return res.status(401).json({ message: "Invalid Token" })
  }
}

export default auth
