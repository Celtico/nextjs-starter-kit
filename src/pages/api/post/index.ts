import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/**
 * handle
 * @param req
 * @param res
 */
// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions)
  if (session  && session.user  && session.user.email) {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
