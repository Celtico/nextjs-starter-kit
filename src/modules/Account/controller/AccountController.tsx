import view from "../view";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const AccountController = async () => {
  // @ts-ignore
  const ServerSession = await getServerSession(authOptions);
  return view({ServerSession})
}

export default AccountController
