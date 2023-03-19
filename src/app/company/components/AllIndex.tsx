import { All } from "./server/Select";
import Post from "./client/Post";

/**
 * AllIndex
 * @constructor
 */
const AllIndex = async () => {
  const all = await All();
  return (
    <>
      <header className="shadow-md backdrop-brightness-200">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Company</h1>
        </div>
      </header>
      <main className={"backdrop-brightness-150"}>
        <div className="mx-auto max-w-2xl py-5 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <ul>
              {all.props.all.map((post: any) => (
                <div key={post.id} className="post">
                  <Post post={post} />
                </div>
              ))}
            </ul>
        </div>
      </main>
    </>
  );
};

export default AllIndex;
