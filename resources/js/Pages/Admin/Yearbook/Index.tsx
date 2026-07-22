// resources/js/Pages/Admin/Yearbook/Index.tsx
import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

interface Profile {
    id: number;
    user: { name: string; email: string } | null;
    graduation_year: number;
    class_name: string | null;
    // add other fields if needed
}

interface IndexProps extends PageProps {
    profiles: {
        data: Profile[];
        links: any[];
    };
    filters: { search: string };
}

export default function Index({ auth, profiles, filters }: IndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            router.delete(route('admin.profiles.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Admin – Yearbook Management" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Yearbook Entries</h2>
                            <Link
                                href={route('admin.profiles.create')}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                + Add Entry
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {profiles.data.map((profile) => (
                                        <tr key={profile.id}>
                                            <td className="px-6 py-4">{profile.user?.name} <span className="text-gray-500 text-sm">({profile.user?.email})</span></td>
                                            <td className="px-6 py-4">{profile.graduation_year}</td>
                                            <td className="px-6 py-4">{profile.class_name || '-'}</td>
                                            <td className="px-6 py-4 flex gap-2">
                                                <Link
                                                    href={route('admin.profiles.edit', profile.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(profile.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}