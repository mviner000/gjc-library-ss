import getCurrentUser from '@/utils/getCurrentUser';
import { redirect } from 'next/navigation';
import CoursePage from './_components/CoursePage';

export default async function Page() {

  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
   <div><CoursePage/></div>
  );
}