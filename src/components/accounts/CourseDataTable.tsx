import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

interface CourseData {
  course: string;
  count: number;
  total_book_transactions: number;
}

type CourseShortNames = {
  [key: string]: string;
};

const courseShortNames: CourseShortNames = {
  'JUNIOR HIGH SCHOOL': 'JHS',
  'Accountancy, Business and Management (ABM)': 'ABM',
  'Science, Technology, Engineering and Mathematics': 'STEM',
  'Humanities and Social Sciences': 'HUMSS',
  'General Academic Strand': 'GAS',
  'BEEd': 'BEEd',
  'BSEd - English': 'BSEd-Eng',
  'BSEd - Soc Stud': 'BSEd-SocStud',
  'BSA': 'BSA',
  'BSAIS': 'BSAIS',
  'BSMA': 'BSMA',
  'BSIA': 'BSIA',
  'BSBA': 'BSBA',
  'BSBA-FM': 'BSBA-FM',
  'BSBA-HRDM': 'BSBA-HRDM',
  'BSBA-MM': 'BSBA-MM',
  'BSIT': 'BSIT',
  'BSHM': 'BSHM',
  'Faculty': 'Faculty'
};

const highSchoolCourses = ['JUNIOR HIGH SCHOOL', 'Accountancy, Business and Management (ABM)', 'Science, Technology, Engineering and Mathematics', 'Humanities and Social Sciences', 'General Academic Strand'];
const collegeCourses = ['BEEd', 'BSEd - English', 'BSEd - Soc Stud', 'BSA', 'BSAIS', 'BSMA', 'BSIA', 'BSBA', 'BSBA-FM', 'BSBA-HRDM', 'BSBA-MM', 'BSIT', 'BSHM'];

const getShortName = (fullName: string): string => {
  return courseShortNames[fullName] || fullName;
};

const CategoryIndex: React.FC<{ data: CourseData[], title: string }> = ({ data, title }) => {
  const sortedData = [...data].sort((a, b) => getShortName(a.course).localeCompare(getShortName(b.course)));
  const totalCount = data.reduce((sum, item) => sum + item.count, 0);
  const totalTransactions = data.reduce((sum, item) => sum + item.total_book_transactions, 0);

  return (
    <AccordionItem value={title}>
      <AccordionTrigger>
        <div className="flex justify-between w-full pr-4">
          <span>{title}</span>
          <span className="text-sm text-gray-500">
            Total: {totalCount} | Transactions: {totalTransactions}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
      <div className="pl-10 pt-5 grid grid-cols-3 gap-4">
        {sortedData.map((item, index) => (
          <Link key={index} href={`/dashboard/students/list/${getShortName(item.course)}`}>
            <div className="rounded shadow-sm flex">
              <div className="font-bold text-lg mb-2 py-3 bg-white/50 dark:bg-transparent outline outline-black/50 dark:outline-white/50 outline-1 rounded-lg px-3">
                {getShortName(item.course)}
                <span className="justify-center items-center">
                  <Badge variant="outline">
                    Book Transactions: {item.total_book_transactions}
                  </Badge>
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                    {item.count} people
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
</AccordionContent>
    </AccordionItem>
  );
};

interface CourseDataIndexProps {
  data: CourseData[];
}

const CourseDataIndex: React.FC<CourseDataIndexProps> = ({ data }) => {
  const highSchoolData = data.filter(item => highSchoolCourses.includes(item.course));
  const collegeData = data.filter(item => collegeCourses.includes(item.course));
  const facultyData = data.filter(item => item.course === 'Faculty');

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Course Data Index</h2>
      <Accordion type="single" collapsible className="w-full">
        <CategoryIndex data={highSchoolData} title="High School" />
        <CategoryIndex data={collegeData} title="College" />
        <CategoryIndex data={facultyData} title="Faculty" />
      </Accordion>
    </div>
  );
};

export default CourseDataIndex;