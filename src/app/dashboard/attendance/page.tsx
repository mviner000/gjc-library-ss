import getCurrentUser from '@/utils/getCurrentUser';
import FetchAttendance from './_component.tsx/FetchAttendance';
import { redirect } from 'next/navigation';

export default async function Page() {

  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <FetchAttendance />
  );
}