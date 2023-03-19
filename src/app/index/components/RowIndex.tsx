import ReactMarkdown from "react-markdown";
import { Row } from "../components/server/Select";

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
  return (
    <>
      <header className="shadow-md backdrop-brightness-200">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p>By {name}</p>
        </div>
      </header>
      <main className={"backdrop-brightness-150"}>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* eslint-disable-next-line react/no-children-prop */}
          <ReactMarkdown children={content} />
        </div>
      </main>
    </>
  );
};
export default RowIndex;
