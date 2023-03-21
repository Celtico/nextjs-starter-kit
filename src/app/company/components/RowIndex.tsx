import ReactMarkdown from "react-markdown";
import { Row } from "../components/server/Select";
import EditPost from "../../account/drafts/components/EditPost";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

/**
 * Page
 * @constructor
 */
const RowIndex = async (props) => {
  const row = await Row(props);
  let title = "",
    name = "",
    content = "";
  if (
    row &&
    row.props &&
    row.props.row &&
    row.props.row.title &&
    row.props.row.author &&
    row.props.row.author.name
  ) {
    title = String(row.props.row.title);
    name = String(row.props.row.author.name);
    content = String(row.props.row.content);
  }
  const session = await getServerSession(authOptions);
  return (
    <>
      <header className="shadow-md backdrop-brightness-200">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Company</h1>
        </div>
      </header>
      <main className={"backdrop-brightness-150"}>
        <div className="mx-auto max-w-2xl py-10 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <a href="/company" className={'cursor-pointer'}>
            <h1 className="text-3xl font-bold tracking-tight  text-gray-500">{title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">By {name}</p>
          </a>
            {/* eslint-disable-next-line react/no-children-prop */}
            <ReactMarkdown children={content} />
            {/* eslint-disable-next-line react/no-children-prop */}
            <EditPost post={row.props.row} session={session}/>
        </div>
      </main>
    </>
  );
};
export default RowIndex;
