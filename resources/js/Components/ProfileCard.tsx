// resources/js/Components/ProfileCard.tsx
import React, { useState } from 'react';
import { Profile } from '../types';

interface ProfileCardProps {
    profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
    const [expanded, setExpanded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const avatarUrl = profile.avatar && !imageError
        ? `/storage/${profile.avatar}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.user?.name || '')}&background=10b981&color=fff&size=80`;

    const toggleExpand = () => setExpanded(!expanded);

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 relative">
            {/* Ribbon for year */}
            <div className="absolute -top-1 right-6 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-b-lg shadow">
                {profile.graduation_year}
            </div>

            <div className="flex items-center gap-4">
                <img
                    src={avatarUrl}
                    alt={profile.user?.name}
                    onError={() => setImageError(true)}
                    className="w-14 h-14 rounded-full object-cover border-2 border-emerald-200"
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{profile.user?.name}</h3>
                    {profile.class_name && (
                        <p className="text-sm text-emerald-600">{profile.class_name}</p>
                    )}
                </div>
            </div>

            {profile.quote && (
                <blockquote className="mt-3 text-sm italic text-gray-600 border-l-2 border-emerald-300 pl-3">
                    “{profile.quote}”
                </blockquote>
            )}

            <div className="mt-2">
                <p className={`text-sm text-gray-600 ${!expanded ? 'line-clamp-2' : ''}`}>
                    {profile.bio || 'No bio yet.'}
                </p>
                {profile.bio && profile.bio.length > 80 && (
                    <button
                        onClick={toggleExpand}
                        className="text-xs text-emerald-600 hover:text-emerald-800 font-medium mt-1"
                    >
                        {expanded ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>

            {profile.interests && profile.interests.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                    {profile.interests.map((interest, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full">
                            {interest}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}