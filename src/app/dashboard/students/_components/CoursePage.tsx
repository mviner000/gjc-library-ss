"use client"

import React, { useState, useEffect } from 'react';
import { CourseData } from '@/types';
import CourseDataTable from '@/components/accounts/CourseDataTable';

const CoursePage: React.FC = () => {
  const [courseData, setCourseData] = useState<CourseData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/counts-account-by-course');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: CourseData[] = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <CourseDataTable data={courseData} />
    </div>
  );
};

export default CoursePage;