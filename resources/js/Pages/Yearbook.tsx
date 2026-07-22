// resources/js/Pages/Yearbook.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Profile } from '../types';
import ProfileCard from '../Components/ProfileCard';
import NavigationComponent from '@/Components/Navigation';

interface YearbookProps {
    profiles: Profile[];
    search?: string;
}

export default function Yearbook({ profiles, search = '' }: YearbookProps) {
    const [searchTerm, setSearchTerm] = useState(search); // <-- Use prop
    // const [searchTerm, setSearchTerm] = useState('');
    const [filterYear, setFilterYear] = useState<number | null>(null);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    // Compute unique years & interests
    const years = useMemo(() => {
        const allYears = profiles.map(p => p.graduation_year);
        return Array.from(new Set(allYears)).sort((a, b) => b - a);
    }, [profiles]);

    const allInterests = useMemo(() => {
        const set = new Set<string>();
        profiles.forEach(p => p.interests?.forEach(i => set.add(i)));
        return Array.from(set).sort();
    }, [profiles]);

    // Filter logic
    const filteredProfiles = useMemo(() => {
        return profiles.filter(profile => {
            const matchesSearch =
                profile.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.class_name?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesYear = filterYear ? profile.graduation_year === filterYear : true;
            const matchesInterests = selectedInterests.length === 0 ||
                selectedInterests.some(interest => profile.interests?.includes(interest));
            return matchesSearch && matchesYear && matchesInterests;
        });
    }, [profiles, searchTerm, filterYear, selectedInterests]);

    // Stats
    const totalAlumni = profiles.length;
    const avgYear = Math.round(profiles.reduce((sum, p) => sum + p.graduation_year, 0) / totalAlumni);

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const yearCounts = useMemo(() => {
        const counts: Record<number, number> = {};
        profiles.forEach(p => counts[p.graduation_year] = (counts[p.graduation_year] || 0) + 1);
        return Object.entries(counts).sort(([a], [b]) => Number(b) - Number(a));
    }, [profiles]);

    return (
        <>
            {/* Add Navigation */}
            <NavigationComponent />
            <Head title="Yearbook" />
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}

                        <aside className="lg:w-72 flex-shrink-0">

                            <div className="sticky top-8 space-y-6">
                                {/* <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6"> */}
                                {/* Stats card */}

                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Yearbook Stats</h3>
                                    <dl className="mt-3 space-y-2">
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Total Alumni</dt>
                                            <dd className="font-bold text-indigo-600">{totalAlumni}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Graduation Years</dt>
                                            <dd className="font-bold text-indigo-600">{years.length}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Average Year</dt>
                                            <dd className="font-bold text-indigo-600">{avgYear}</dd>
                                        </div>
                                    </dl>
                                </div>

                                {/* Search */}
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                    <input
                                        type="text"
                                        placeholder="Name or class..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className="w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                {/* Year filter */}
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                                    <select
                                        value={filterYear || ''}
                                        onChange={e => setFilterYear(e.target.value ? Number(e.target.value) : null)}
                                        className="w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">All Years</option>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Interests filter */}
                                {allInterests.length > 0 && (
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                                        <div className="space-y-1 max-h-48 overflow-y-auto">
                                            {allInterests.map(interest => (
                                                <label key={interest} className="flex items-center gap-2 text-sm">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedInterests.includes(interest)}
                                                        onChange={() => toggleInterest(interest)}
                                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    {interest}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Year filter */}
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <div className="space-y-1">
                                        {yearCounts.map(([year, count]) => (
                                            <div key={year} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded" onClick={() => setFilterYear(Number(year))}>
                                                <span className="text-sm w-12">{year}</span>
                                                <div className="flex-1 h-2 bg-indigo-200 rounded-full">
                                                    <div className="h-2 bg-indigo-600 rounded-full" style={{ width: `${(count / profiles.length) * 100}%` }} />
                                                </div>
                                                <span className="text-xs text-gray-500">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Clear filters button */}
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilterYear(null);
                                        setSelectedInterests([]);
                                    }}
                                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </aside>

                        {/* Main content */}
                        <main className="flex-1">
                            <div className="mb-4 flex justify-between items-center">
                                <h1 className="text-2xl font-bold text-gray-900">👥 Alumni</h1>
                                <span className="text-sm text-gray-500">
                                    {filteredProfiles.length} of {profiles.length} shown
                                </span>
                            </div>

                            {filteredProfiles.length === 0 ? (
                                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                                    <p className="text-gray-500">No alumni match your filters.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredProfiles.map(profile => (
                                        <ProfileCard key={profile.id} profile={profile} />
                                    ))}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}