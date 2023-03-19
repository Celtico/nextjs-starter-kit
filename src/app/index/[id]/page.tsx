import RowIndex from "../components/RowIndex";

/**
 * Page
 * @constructor
 */
const Page = (props) => (
  /* @ts-expect-error Server Component */
  <RowIndex {...props} />
);

export default Page;
