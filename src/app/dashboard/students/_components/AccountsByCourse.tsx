"use client"
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StudentInfo, Gender, Course } from '@/types';
import Link from 'next/link';

type CourseShortNames = {
  [key: string]: string;
};

const courseShortNames: CourseShortNames = {
  'JUNIOR HIGH SCHOOL': 'JHS',
  'Accountancy, Business and Management (ABM)': 'ABM',
  'Science, Technology, Engineering and Mathematics': 'STEM',
  'Humanities and Social Sciences': 'HUMMS',
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

interface AccountsData {
  course: string;
  account_count: number;
  accounts: StudentInfo[];
}

interface AccountsByCourseProps {
  courseShortName: string;
}

const StudentLink: React.FC<{ schoolId: string; children: React.ReactNode }> = ({ schoolId, children }) => (
  <Link href={`/student/${schoolId}`}>{children}</Link>
);

export const AccountsByCourse: React.FC<AccountsByCourseProps> = ({ courseShortName }) => {
  const [accountsData, setAccountsData] = useState<AccountsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`/api/accounts-by-course/${courseShortName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch accounts');
        }
        const data: AccountsData = await response.json();
        setAccountsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, [courseShortName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!accountsData || accountsData.account_count === 0) return <div>No accounts found for this course.</div>;

  const fullCourseName = accountsData.course;
  const displayShortName = courseShortNames[fullCourseName] || courseShortName;

  const filteredAccounts = accountsData.accounts.filter(account => {
    const fullName = `${account.last_name} ${account.first_name} ${account.middle_name}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return fullName.includes(searchLower) ||
           account.last_name.toLowerCase().includes(searchLower) ||
           account.first_name.toLowerCase().includes(searchLower) ||
           account.middle_name.toLowerCase().includes(searchLower);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fullCourseName} - ({accountsData.account_count})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search by name (full, last, first, or middle)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='py-2 pr-[-20px]'>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>School ID</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow key={account.school_id}>
                <TableCell className='py-2 pr-[-20px]'>
                  <StudentLink schoolId={account.school_id}>
                    <img
                      width='24'
                      src={account.cropped_avatar_url || "/images/def-avatar.svg"}
                      alt={account.cropped_avatar_url ? "avatar" : "default avatar"}
                    />
                  </StudentLink>
                </TableCell>
                <TableCell>
                  <StudentLink schoolId={account.school_id}>
                    {account.last_name}, {account.first_name} {account.middle_name}
                  </StudentLink>
                </TableCell>
                <TableCell>
                  <StudentLink schoolId={account.school_id}>{account.school_id}</StudentLink>
                </TableCell>
                <TableCell>
                  <StudentLink schoolId={account.school_id}>{account.gender || 'N/A'}</StudentLink>
                </TableCell>
                <TableCell>
                  <StudentLink schoolId={account.school_id}>{account.year_level}</StudentLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AccountsByCourse;