import { getServerSession } from "next-auth/next";
import RegisterModel from "./form";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/**
 * Index
 * @constructor
 */
export default async function Index(props) {
  // @ts-ignore
  const ServerSession = await getServerSession(authOptions);
  return (
    <>
      <header className="shadow-md backdrop-brightness-200">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Register
          </h1>
        </div>
      </header>
      <main className={"backdrop-brightness-150"}>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          {ServerSession ? <pre>{JSON.stringify(ServerSession,null,2)}</pre> :    <RegisterModel />}
        </div>
      </main>
    </>
  );
}
