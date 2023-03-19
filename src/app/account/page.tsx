import { getServerSession } from "next-auth/next";
import Register from "./register/components/Register";

export default async function Page() {
  const AuthStatusDataArray = await getServerSession();
  return (
    <>
      <header className="shadow-md backdrop-brightness-200">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {AuthStatusDataArray ? "Account" : "Register"}
          </h1>
        </div>
      </header>
      <main className={"backdrop-brightness-150"}>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          {AuthStatusDataArray ? "account" : <Register />}
        </div>
      </main>
    </>
  );
}
