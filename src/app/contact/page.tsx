import HomePage from "@/components/mavs/HomePage";
import getCurrentUser from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="text-center text-7xl font-bold">
        WALA PA
        <span className="text-blue-500"> CONTACT</span>
      </div>
    </div>
  );
}
