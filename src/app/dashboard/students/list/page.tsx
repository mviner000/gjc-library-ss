import getCurrentUser from '@/utils/getCurrentUser';
import { redirect } from 'next/navigation';

export default async function Page() {

  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
   <div>List</div>
  );
}