import DraftsController from "@/modules/Account/modules/Drafts/controller/DraftsController";
import React from "react";

const Page = (props) => {
  return DraftsController({action:'index',...props})
}
export default Page
