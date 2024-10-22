import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import getCurrentUser from '@/utils/getCurrentUser';
import { redirect } from 'next/navigation';
import AccountsByCourse from '../../_components/AccountsByCourse';

interface PageProps {
  params: {
    courseShortName: string;
  };
}

type CourseShortNames = {
  [key: string]: string;
};

const courseShortNames: CourseShortNames = {
  'JUNIOR HIGH SCHOOL': 'jhs',
  'Accountancy, Business and Management (ABM)': 'abm',
  'Science, Technology, Engineering and Mathematics': 'stem',
  'Humanities and Social Sciences': 'humms',
  'General Academic Strand': 'gas',
  'BEEd': 'beed',
  'BSEd - English': 'bsed-eng',
  'BSEd - Soc Stud': 'bsed-socstud',
  'BSA': 'bsa',
  'BSAIS': 'bsais',
  'BSMA': 'bsma',
  'BSIA': 'bsia',
  'BSBA': 'bsba',
  'BSBA-FM': 'bsba-fm',
  'BSBA-HRDM': 'bsba-hrdm',
  'BSBA-MM': 'bsba-mm',
  'BSIT': 'bsit',
  'BSHM': 'bshm',
  'Faculty': 'faculty'
};

export default async function Page({ params }: PageProps) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const { courseShortName } = params;
  
  // Convert the input to lowercase for case-insensitive comparison
  const normalizedCourseShortName = courseShortName.toLowerCase();

  // Check if the normalized course short name is valid
  const validCourseShortNames = Object.values(courseShortNames);
  if (!validCourseShortNames.includes(normalizedCourseShortName)) {
    notFound();
  }

  // Find the full course name
  const fullCourseName = Object.keys(courseShortNames).find(
    key => courseShortNames[key] === normalizedCourseShortName
  ) || normalizedCourseShortName;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Accounts for: </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AccountsByCourse courseShortName={normalizedCourseShortName} />
      </Suspense>
    </div>
  );
}