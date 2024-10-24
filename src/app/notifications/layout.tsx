import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'GJC Library Researcher',
    description: 'Researcher notifications for staffs'
};

export default function NotificationsLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full flex-1 overflow-hidden">
                <Header />
                {children}
            </main>
        </div>
    );
}
