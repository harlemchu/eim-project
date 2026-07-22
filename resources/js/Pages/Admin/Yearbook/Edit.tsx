// resources/js/Pages/Admin/Yearbook/Edit.tsx
import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Profile, User, PageProps } from '@/types';

interface EditProps extends PageProps {
    profile: Profile;
    users: User[];
}

export default function Edit({ auth, profile, users }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        user_id: profile.user_id,
        graduation_year: profile.graduation_year,
        bio: profile.bio || '',
        class_name: profile.class_name || '',
        quote: profile.quote || '',
        interests: profile.interests || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.profiles.update', profile.id));
    };

    // Interest management similar to Create
    const [interestInput, setInterestInput] = React.useState('');
    const addInterest = () => {
        if (interestInput.trim()) {
            setData('interests', [...data.interests, interestInput.trim()]);
            setInterestInput('');
        }
    };
    const removeInterest = (index: number) => {
        setData('interests', data.interests.filter((_, i) => i !== index));
    };

    return (
        <AuthenticatedLayout >
            <Head title="Edit Yearbook Entry" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Edit Yearbook Entry</h2>

                        <form onSubmit={handleSubmit}>
                            {/* Same fields as Create */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">User</label>
                                <select
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', Number(e.target.value))}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">Select a user</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                                    ))}
                                </select>
                                {errors.user_id && <span className="text-red-500 text-sm">{errors.user_id}</span>}
                            </div>

                            {/* Graduation Year */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                                <input
                                    type="number"
                                    value={data.graduation_year}
                                    onChange={(e) => setData('graduation_year', Number(e.target.value))}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.graduation_year && <span className="text-red-500 text-sm">{errors.graduation_year}</span>}
                            </div>

                            {/* Bio */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Bio</label>
                                <textarea
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.bio && <span className="text-red-500 text-sm">{errors.bio}</span>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Class Name</label>
                                <input
                                    type="text"
                                    value={data.class_name}
                                    onChange={(e) => setData('class_name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.class_name && <span className="text-red-500 text-sm">{errors.class_name}</span>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Quote</label>
                                <input
                                    type="text"
                                    value={data.quote}
                                    onChange={(e) => setData('quote', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.quote && <span className="text-red-500 text-sm">{errors.quote}</span>}
                            </div>

                            {/* Interests with add/remove */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Interests</label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {data.interests.map((interest, idx) => (
                                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                                            {interest}
                                            <button type="button" onClick={() => removeInterest(idx)} className="ml-1 text-red-500">×</button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex mt-2">
                                    <input
                                        type="text"
                                        value={interestInput}
                                        onChange={(e) => setInterestInput(e.target.value)}
                                        placeholder="Add interest"
                                        className="flex-1 border-gray-300 rounded-l-md shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={addInterest}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                                    >
                                        Add
                                    </button>
                                </div>
                                {errors.interests && <span className="text-red-500 text-sm">{errors.interests}</span>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Update Entry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}