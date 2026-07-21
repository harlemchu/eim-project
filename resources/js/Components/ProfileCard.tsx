// resources/js/Components/ProfileCard.tsx
import React from 'react';
import { Profile } from '../types';

interface ProfileCardProps {
    profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    const avatarUrl = profile.avatar
        ? `/storage/${profile.avatar}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.user?.name || '')}&background=random`;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200">
            <div className="flex items-center space-x-4">
                <img
                    src={avatarUrl}
                    alt={profile.user?.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{profile.user?.name}</h3>
                    <p className="text-sm text-gray-600">{profile.class_name || 'Class of ' + profile.graduation_year}</p>
                </div>
            </div>
            {profile.quote && (
                <blockquote className="mt-2 italic text-gray-700 border-l-4 border-blue-300 pl-3">
                    "{profile.quote}"
                </blockquote>
            )}
            <div className="mt-2 text-sm text-gray-600">
                {profile.bio || 'No bio yet.'}
            </div>
            {profile.interests && profile.interests.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                    {profile.interests.map((interest, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {interest}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileCard;