import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

/**
 * handler
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, password } = req.body;
  if(email){
    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exists) {
      res.status(400).send("User already exists");
    } else {
      const data = {
        email,
        name: email,
        encryptedPassword: await hash(password, 10),
      };
      const user = await prisma.user.create({ data });
      res.status(200).json(user);
    }
  }
}
