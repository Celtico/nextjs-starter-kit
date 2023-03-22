import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// DELETE /api/post/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions)
  console.log('session 2',session)
  if (req.method === "DELETE") {
    if (session) {
      const post = await prisma.post.delete({
        where: { id: String(postId) },
      });
      res.json(post);
    } else {
      res.status(401).send({ message: 'Unauthorized' })
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
