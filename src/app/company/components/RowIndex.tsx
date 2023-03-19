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
            <div className="mt-10 flex  gap-x-6">
              <a
                href="/company"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
              >
                Back
              </a>
            </div>
        </div>
      </main>
    </>
  );
};
export default RowIndex;
