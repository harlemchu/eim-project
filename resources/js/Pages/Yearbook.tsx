// resources/js/Pages/Yearbook.tsx
import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { Profile } from '../types';
import ProfileCard from '../Components/ProfileCard';
import SearchFilter from '../Components/SearchFilter';

interface YearbookProps {
    profiles: Profile[];
}

export default function Yearbook({ profiles }: YearbookProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterYear, setFilterYear] = useState<number | null>(null);

    const years = useMemo(() => {
        const allYears = profiles.map(p => p.graduation_year);
        return Array.from(new Set(allYears)).sort((a, b) => b - a);
    }, [profiles]);

    const filteredProfiles = useMemo(() => {
        return profiles.filter(profile => {
            const matchesSearch =
                profile.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.class_name?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesYear = filterYear ? profile.graduation_year === filterYear : true;
            return matchesSearch && matchesYear;
        });
    }, [profiles, searchTerm, filterYear]);

    return (
        <>
            <Head title="Yearbook" />
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">📚 EIM Yearbook</h1>

                    <SearchFilter
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        filterYear={filterYear}
                        onFilterYearChange={setFilterYear}
                        years={years}
                    />

                    {filteredProfiles.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">No yearbook entries found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProfiles.map(profile => (
                                <ProfileCard key={profile.id} profile={profile} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}