import view from "../view";
import all from "../view/all";
import row from "../view/row";
import create from "../view/create";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const DraftsController = async (props) => {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  const {action} = props
  // console.log(action)
  if(action==='row'){
    return row({session,...props})
  } else if(action==='all'){
    return all({session,...props})
  } else if(action==='create'){
    return create({session,...props})
  } else if(action==='index'){
    return view({session,...props})
  }
}

export default DraftsController
