import React from "react";
import Create from "@/modules/Account/modules/Drafts/model/Create";

/**
 * Page
 * @param props
 * @constructor
 */
export default async function Page(props) {
  const {session} = props;
  return <Create session={session} />
}
