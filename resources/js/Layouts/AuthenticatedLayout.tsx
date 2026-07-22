import ApplicationLogo from '@/Components/ApplicationLogo'; // You might still need this if used elsewhere
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';
import Navigation from '@/Components/Navigation'; // <-- Import the new component

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    // The Navigation component already uses usePage() internally,
    // so we don't need to fetch user here.

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Replace the entire old nav with this one line */}
            <Navigation />

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}