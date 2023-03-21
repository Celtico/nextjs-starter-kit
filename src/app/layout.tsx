import Html from "@/layout/Html";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import React from "react";

/**
 * RootLayout
 * @param children
 * @constructor
 */
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  // @ts-ignore
  const AuthStatusDataArray = await getServerSession(authOptions);
  return <Html AuthStatusDataArray={AuthStatusDataArray}>{children}</Html>;
};

export default RootLayout;
