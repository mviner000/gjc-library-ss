import getCurrentUser from "@/utils/getCurrentUser";
import InputScanner2 from "./_components/InputScanner2";
import { redirect } from "next/navigation";

export default async function LoggerPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  /**
      Ginawa ko nalang ganito kasi yung previous implementation, need ng useEffect para ma check kung is_staff/admin, pag wala kasi useEffect matic redirect agad sa unang render eh pag wala pa yung data.
      Kaso ang prob bawal na gumamit ng useEffect dahil parang nagkaka unli re-render yata kaya ayon ganito nalnag ginawa ko.
   */
  // bg-[url(/images/GenSimeonBldg.jpg)]

  return (
    <div className="relative flex h-full min-h-[calc(100vh-76px)] w-full flex-col justify-center gap-8  bg-cover bg-top text-white">
      <div className="absolute z-[1] h-full w-full bg-gray-400"></div>
      <InputScanner2 />
    </div>
  );
}
