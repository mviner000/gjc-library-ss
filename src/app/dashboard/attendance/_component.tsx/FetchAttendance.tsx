'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { UserClient } from '@/components/tables/user-tables/client';
import { PaginatedAttendanceOut } from '@/types';

const ALL_VISITORS_API_URL = '/api/dashboard/all-visitors';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Attendance Data For Today', link: '/dashboard/attendance' }
];

export default function FetchAttendance() {
    const [initialData, setInitialData] = useState<PaginatedAttendanceOut | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            const target_date = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

            try {
                setIsLoading(true);
                const url = `${ALL_VISITORS_API_URL}/${target_date}?page=1&size=20`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setInitialData(data);
            } catch (error) {
                console.error('Error fetching initial data:', error);
                setError('Failed to fetch initial data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    if (isLoading) {
        return (
            <PageContainer>
                <Breadcrumbs items={breadcrumbItems} />
                <div>Loading...</div>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <Breadcrumbs items={breadcrumbItems} />
                <div>Error: {error}</div>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Breadcrumbs items={breadcrumbItems} />
            {initialData ? (
                <UserClient initialData={initialData} />
            ) : (
                <div>No data available</div>
            )}
        </PageContainer>
    );
}