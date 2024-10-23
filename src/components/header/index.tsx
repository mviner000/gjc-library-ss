import { HeaderClient } from "./header-client";
import getCurrentUser from "@/utils/getCurrentUser";

export async function Header() {
  const user = await getCurrentUser();

  return <HeaderClient user={user} />;
}
