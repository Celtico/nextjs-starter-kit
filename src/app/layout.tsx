import Html from "@/layout/Html";
import React from "react";

/**
 * RootLayout
 * @param children
 * @constructor
 */
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  // const AuthStatusDataArray = await getServerSession();
  return <Html
    //AuthStatusDataArray={AuthStatusDataArray}
  >{children}</Html>;
};

export default RootLayout;
