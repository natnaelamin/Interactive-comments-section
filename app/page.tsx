import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const {isAuthenticated} = getKindeServerSession();

  if (await isAuthenticated()){
    redirect("/dashboard")
  }
  
  return (
    <main className="text-center flex-1 py-40">
      <h1 className="md:text-5xl text-2xl font-bold">Welcome to our Interactive Comments Section</h1>
      <p className="md:text-3xl text-xl pt-4 pb-7">Enjoy your stay here!</p>
    </main>
  );
}
